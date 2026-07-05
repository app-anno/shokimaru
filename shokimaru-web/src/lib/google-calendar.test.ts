import { describe, it, expect } from "vitest";
import {
  parseEventTitle,
  aggregateDayStatus,
  buildSchedule,
  ScheduleEvent,
} from "./google-calendar";

// タイトル例は実際のカレンダーに登録されていた表記から抜粋
describe("parseEventTitle", () => {
  it.each([
    ["空き8名", 8],
    ["空き1名", 1],
    ["残り5枠", 5],
    ["残り1枠", 1],
    ["空き１０名", 10], // 全角数字
  ])("空きあり: %s → 残り%i", (title, remaining) => {
    expect(parseEventTitle(title)).toEqual({ status: "available", remaining });
  });

  it.each([["満席"], ["満船"], ["空き0名"], ["残り0枠"]])(
    "満席: %s",
    (title) => {
      expect(parseEventTitle(title)).toEqual({ status: "full", remaining: 0 });
    }
  );

  it.each([["休み"], ["三浦お休み"], ["欠航"], ["強風のため欠航"]])(
    "休み・欠航: %s",
    (title) => {
      expect(parseEventTitle(title)).toEqual({ status: "closed", remaining: null });
    }
  );

  it.each([
    ["I様乗り合い2名"],
    ["T様　2名様"],
    ["Y様1名乗り合い"],
    ["乗り合い2名"],
    ["MT様1名"],
  ])("お客様予約: %s", (title) => {
    expect(parseEventTitle(title)).toEqual({ status: "booking", remaining: null });
  });
});

describe("aggregateDayStatus", () => {
  const ev = (status: ScheduleEvent["status"], remaining: number | null = null): ScheduleEvent => ({
    time: null,
    title: "",
    status,
    remaining,
  });

  it("空き便が1つでもあれば空きあり（数字は最大値）", () => {
    expect(aggregateDayStatus([ev("available", 3), ev("available", 6), ev("booking")])).toEqual({
      status: "available",
      remaining: 6,
    });
  });

  it("空き便が満席便より優先される", () => {
    expect(aggregateDayStatus([ev("full", 0), ev("available", 2)]).status).toBe("available");
  });

  it("満席のみ → 満席", () => {
    expect(aggregateDayStatus([ev("full", 0), ev("booking")]).status).toBe("full");
  });

  it("休みのみ → 休み", () => {
    expect(aggregateDayStatus([ev("closed")]).status).toBe("closed");
  });

  it("お客様予約のみ → 要問い合わせ", () => {
    expect(aggregateDayStatus([ev("booking"), ev("booking")]).status).toBe("inquiry");
  });
});

describe("buildSchedule", () => {
  it("時刻付きイベントをJSTの日付・時刻で集計する", () => {
    const schedule = buildSchedule([
      {
        summary: "空き6名",
        start: { dateTime: "2026-07-08T17:30:00+09:00" },
        end: { dateTime: "2026-07-08T18:30:00+09:00" },
      },
      {
        summary: "I様乗り合い2名",
        start: { dateTime: "2026-07-08T18:30:00+09:00" },
        end: { dateTime: "2026-07-08T19:30:00+09:00" },
      },
    ]);

    expect(schedule["2026-07-08"].status).toBe("available");
    expect(schedule["2026-07-08"].remaining).toBe(6);
    expect(schedule["2026-07-08"].events.map((e) => e.time)).toEqual(["17:30", "18:30"]);
  });

  it("終日イベントは期間分の日に展開される（end.dateは排他的）", () => {
    const schedule = buildSchedule([
      {
        summary: "休み",
        start: { date: "2026-07-10" },
        end: { date: "2026-07-12" },
      },
    ]);

    expect(schedule["2026-07-10"].status).toBe("closed");
    expect(schedule["2026-07-11"].status).toBe("closed");
    expect(schedule["2026-07-12"]).toBeUndefined();
  });

  it("キャンセル済み・タイトル無しイベントは無視する", () => {
    const schedule = buildSchedule([
      {
        summary: "満席",
        status: "cancelled",
        start: { dateTime: "2026-07-08T17:30:00+09:00" },
      },
      { start: { dateTime: "2026-07-08T17:30:00+09:00" } },
    ]);

    expect(schedule["2026-07-08"]).toBeUndefined();
  });

  it("イベントは時刻順に並ぶ", () => {
    const schedule = buildSchedule([
      {
        summary: "T様3名",
        start: { dateTime: "2026-07-16T20:00:00+09:00" },
      },
      {
        summary: "空き5名",
        start: { dateTime: "2026-07-16T19:00:00+09:00" },
      },
    ]);

    expect(schedule["2026-07-16"].events.map((e) => e.title)).toEqual(["空き5名", "T様3名"]);
  });
});
