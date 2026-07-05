// 予約状況カレンダー（Google Calendar）のイベント取得とタイトル解析
// タイトルの表記は船長の手入力なので、実データに存在した表記ゆれ
// （空きN名 / 残りN枠 / 満席 / 満船 / 休み / 欠航 / お客様名イベント）を吸収する

const CALENDAR_ID = "shokimaru.schedule@gmail.com";
const REVALIDATE_SECONDS = 300;

export type SlotStatus = "available" | "full" | "closed" | "booking";
export type DayStatus = "available" | "full" | "closed" | "inquiry";

export interface ScheduleEvent {
  time: string | null; // "HH:MM"（JST）。終日イベントは null
  title: string;
  status: SlotStatus;
  remaining: number | null;
}

export interface DaySchedule {
  status: DayStatus;
  remaining: number | null;
  events: ScheduleEvent[];
}

export type ScheduleByDate = Record<string, DaySchedule>;

export interface BookingCalendarData {
  schedule: ScheduleByDate;
  months: string[]; // "YYYY-MM"
  today: string; // "YYYY-MM-DD"（JST）
}

export function parseEventTitle(title: string): {
  status: SlotStatus;
  remaining: number | null;
} {
  const normalized = title.replace(/[０-９]/g, (d) =>
    String.fromCharCode(d.charCodeAt(0) - 0xfee0)
  );

  const availableMatch = normalized.match(/(?:空き|残り)\s*(\d+)\s*[名枠]/);
  if (availableMatch) {
    const remaining = parseInt(availableMatch[1], 10);
    return remaining > 0
      ? { status: "available", remaining }
      : { status: "full", remaining: 0 };
  }
  if (/満席|満船/.test(normalized)) {
    return { status: "full", remaining: 0 };
  }
  if (/休み|欠航/.test(normalized)) {
    return { status: "closed", remaining: null };
  }
  return { status: "booking", remaining: null };
}

// 1便でも空きがあれば予約可能な日として扱う（数字は全便の最大値）
export function aggregateDayStatus(events: ScheduleEvent[]): {
  status: DayStatus;
  remaining: number | null;
} {
  const available = events.filter((e) => e.status === "available");
  if (available.length > 0) {
    return {
      status: "available",
      remaining: Math.max(...available.map((e) => e.remaining ?? 0)),
    };
  }
  if (events.some((e) => e.status === "full")) {
    return { status: "full", remaining: 0 };
  }
  if (events.some((e) => e.status === "closed")) {
    return { status: "closed", remaining: null };
  }
  return { status: "inquiry", remaining: null };
}

export interface GoogleCalendarApiEvent {
  summary?: string;
  status?: string;
  start?: { date?: string; dateTime?: string };
  end?: { date?: string; dateTime?: string };
}

export function buildSchedule(items: GoogleCalendarApiEvent[]): ScheduleByDate {
  const eventsByDate: Record<string, ScheduleEvent[]> = {};

  const addEvent = (date: string, time: string | null, title: string) => {
    const { status, remaining } = parseEventTitle(title);
    (eventsByDate[date] ??= []).push({ time, title, status, remaining });
  };

  for (const item of items) {
    if (item.status === "cancelled") continue;
    const title = item.summary?.trim();
    if (!title) continue;

    if (item.start?.dateTime) {
      // timeZone=Asia/Tokyo 指定で取得しているため dateTime は JST
      addEvent(item.start.dateTime.slice(0, 10), item.start.dateTime.slice(11, 16), title);
    } else if (item.start?.date) {
      for (const date of expandAllDayDates(item.start.date, item.end?.date)) {
        addEvent(date, null, title);
      }
    }
  }

  const schedule: ScheduleByDate = {};
  for (const [date, events] of Object.entries(eventsByDate)) {
    events.sort((a, b) => (a.time ?? "").localeCompare(b.time ?? ""));
    schedule[date] = { ...aggregateDayStatus(events), events };
  }
  return schedule;
}

// 終日イベントの end.date は排他的（Google Calendar API仕様）
function expandAllDayDates(startDate: string, endDateExclusive?: string): string[] {
  const dates: string[] = [];
  const d = new Date(`${startDate}T00:00:00Z`);
  const end = endDateExclusive ? new Date(`${endDateExclusive}T00:00:00Z`) : null;

  if (!end || end <= d) return [startDate];

  while (d < end && dates.length < 62) {
    dates.push(d.toISOString().slice(0, 10));
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return dates;
}

function jstTodayIso(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo" }).format(new Date());
}

export async function getBookingCalendarData(
  monthsAhead = 2
): Promise<BookingCalendarData | null> {
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
  if (!apiKey) return null;

  const today = jstTodayIso();
  const [year, month] = today.split("-").map(Number);

  const months: string[] = [];
  for (let i = 0; i <= monthsAhead; i++) {
    const m = new Date(Date.UTC(year, month - 1 + i, 1));
    months.push(m.toISOString().slice(0, 7));
  }

  const timeMin = `${months[0]}-01T00:00:00+09:00`;
  const afterLast = new Date(Date.UTC(year, month + monthsAhead, 1));
  const timeMax = `${afterLast.toISOString().slice(0, 7)}-01T00:00:00+09:00`;

  const params = new URLSearchParams({
    key: apiKey,
    singleEvents: "true",
    orderBy: "startTime",
    timeZone: "Asia/Tokyo",
    maxResults: "2500",
    timeMin,
    timeMax,
  });

  try {
    const res = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?${params.toString()}`,
      { next: { revalidate: REVALIDATE_SECONDS } }
    );
    if (!res.ok) {
      console.error("Google Calendar API error:", res.status, await res.text());
      return null;
    }
    const data = (await res.json()) as { items?: GoogleCalendarApiEvent[] };
    return { schedule: buildSchedule(data.items ?? []), months, today };
  } catch (error) {
    console.error("Google Calendar fetch failed:", error);
    return null;
  }
}
