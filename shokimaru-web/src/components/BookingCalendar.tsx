'use client'

import { useState } from 'react'
import type { BookingCalendarData, DayStatus, ScheduleEvent } from '@/lib/google-calendar'

const WEEKDAY_LABELS = ['日', '月', '火', '水', '木', '金', '土']

const DAY_CHIP: Record<DayStatus, { label: (remaining: number | null) => string; className: string }> = {
  available: {
    label: (remaining) => `空き${remaining ?? ''}`,
    className: 'bg-primary-500 text-white',
  },
  full: {
    label: () => '満席',
    className: 'bg-red-500 text-white',
  },
  closed: {
    label: () => '休み',
    className: 'bg-gray-300 text-gray-600',
  },
  inquiry: {
    label: () => '問合せ',
    className: 'bg-amber-400 text-white',
  },
}

const EVENT_LABEL: Record<ScheduleEvent['status'], { text: string; className: string }> = {
  available: { text: '予約可', className: 'bg-primary-100 text-primary-700' },
  full: { text: '満席', className: 'bg-red-100 text-red-600' },
  closed: { text: '休み・欠航', className: 'bg-gray-200 text-gray-600' },
  booking: { text: 'ご予約', className: 'bg-gray-100 text-gray-500' },
}

const DAY_NOTE: Record<DayStatus, string | null> = {
  available: null,
  full: 'この日は満席です。キャンセル待ち等はお問い合わせください。',
  closed: 'この日はお休み・欠航です。',
  inquiry: '空き状況はお問い合わせにてご確認ください。',
}

interface BookingCalendarProps {
  data: BookingCalendarData
}

export default function BookingCalendar({ data }: BookingCalendarProps) {
  const { schedule, months, today } = data
  const [monthIndex, setMonthIndex] = useState(0)
  const [selectedDate, setSelectedDate] = useState<string | null>(
    schedule[today] ? today : null
  )

  const monthKey = months[monthIndex]
  const [year, month] = monthKey.split('-').map(Number)
  const firstWeekday = new Date(Date.UTC(year, month - 1, 1)).getUTCDay()
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate()

  const cells: (string | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) =>
      `${monthKey}-${String(i + 1).padStart(2, '0')}`
    ),
  ]

  const changeMonth = (delta: number) => {
    setMonthIndex((prev) => Math.min(months.length - 1, Math.max(0, prev + delta)))
    setSelectedDate(null)
  }

  const formatDayLabel = (date: string) => {
    const [, m, d] = date.split('-').map(Number)
    const weekday = WEEKDAY_LABELS[new Date(`${date}T00:00:00Z`).getUTCDay()]
    return `${m}月${d}日（${weekday}）`
  }

  const selectedSchedule = selectedDate ? schedule[selectedDate] : null

  return (
    <div>
      {/* 月ナビゲーション */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          disabled={monthIndex === 0}
          className="w-10 h-10 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-50 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors"
          aria-label="前の月"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <p className="text-lg font-bold text-gray-800">
          {year}年{month}月
        </p>
        <button
          type="button"
          onClick={() => changeMonth(1)}
          disabled={monthIndex === months.length - 1}
          className="w-10 h-10 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-50 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors"
          aria-label="次の月"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 曜日ヘッダー */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {WEEKDAY_LABELS.map((label, i) => (
          <div
            key={label}
            className={`text-center text-xs font-medium py-1 ${
              i === 0 ? 'text-red-500' : i === 6 ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* 日付グリッド */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} />
          }

          const day = schedule[date]
          const dayNumber = Number(date.slice(8, 10))
          const weekday = index % 7
          const isPast = date < today
          const isToday = date === today
          const isSelected = date === selectedDate
          const chip = day ? DAY_CHIP[day.status] : null

          return (
            <button
              key={date}
              type="button"
              onClick={() => day && setSelectedDate(isSelected ? null : date)}
              disabled={!day}
              aria-label={`${formatDayLabel(date)} ${chip ? chip.label(day!.remaining) : '予定なし'}`}
              className={`min-h-[3.5rem] sm:min-h-[4.25rem] rounded-lg p-1 flex flex-col items-center gap-0.5 border transition-all ${
                isSelected
                  ? 'border-primary-500 bg-primary-50 shadow-md'
                  : 'border-transparent'
              } ${day && !isSelected ? 'hover:bg-gray-50 cursor-pointer' : ''} ${
                !day ? 'cursor-default' : ''
              } ${isPast ? 'opacity-40' : ''}`}
            >
              <span
                className={`text-xs sm:text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full ${
                  isToday
                    ? 'bg-primary-600 text-white'
                    : weekday === 0
                      ? 'text-red-500'
                      : weekday === 6
                        ? 'text-blue-500'
                        : 'text-gray-700'
                }`}
              >
                {dayNumber}
              </span>
              {chip && day && (
                <span
                  className={`text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded-full leading-none whitespace-nowrap ${chip.className}`}
                >
                  {chip.label(day.remaining)}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* 選択日の詳細 */}
      {selectedDate && selectedSchedule ? (
        <div className="mt-4 rounded-xl border border-primary-100 bg-primary-50/50 p-4">
          <h4 className="font-bold text-gray-800 mb-3">
            {formatDayLabel(selectedDate)}の予定
          </h4>
          <ul className="space-y-2">
            {selectedSchedule.events.map((event, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <span className="font-medium text-gray-600 w-12 shrink-0">
                  {event.time ?? '終日'}
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${EVENT_LABEL[event.status].className}`}
                >
                  {EVENT_LABEL[event.status].text}
                </span>
                <span className="text-gray-800">{event.title}</span>
              </li>
            ))}
          </ul>
          {DAY_NOTE[selectedSchedule.status] && (
            <p className="mt-3 text-xs text-gray-500">{DAY_NOTE[selectedSchedule.status]}</p>
          )}
        </div>
      ) : (
        <p className="mt-4 text-center text-sm text-gray-500">
          予定のある日をタップすると詳細を確認できます
        </p>
      )}
    </div>
  )
}
