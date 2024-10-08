import { useMemo } from "react";
import { Transition } from "@headlessui/react";

import { standardCategories } from "@/data/calendar-events";

import { classes } from "@/utils/classes";

import {
  Calendar,
  useCalendarEventsQuery,
  useMonthSelection,
} from "@/components/calendar/Calendar";
import { CalendarItem } from "@/components/calendar/CalendarItem";

import useTimezone from "@/hooks/timezone";
import useToday from "@/hooks/today";

export function Schedule() {
  const [timeZone, setTimeZone] = useTimezone();
  const today = useToday(timeZone);
  const [selected, setSelected] = useMonthSelection(timeZone, today);
  const events = useCalendarEventsQuery(timeZone, selected);
  const eventsWithChildren = useMemo(
    () =>
      today &&
      events.data?.map((event) => ({
        date: event.startAt,
        children: (
          <CalendarItem
            key={event.id}
            event={event}
            today={today}
            href={event.link}
            timeZone={timeZone}
            external
          />
        ),
      })),
    [today, events.data, timeZone],
  );

  if (!selected) return null;

  return (
    <Calendar
      events={eventsWithChildren || []}
      selectedDateTime={selected}
      loading={events.isLoading}
      onChange={setSelected}
      className="mt-2 md:mt-6"
      timeZone={timeZone}
      setTimeZone={setTimeZone}
    >
      <div className="flex justify-between gap-2 italic opacity-50">
        <p>
          Events and dates/times are subject to change. Enable notifications to
          know when streams go live.
        </p>

        <Transition
          show={events.isLoading}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          entered="animate-pulse"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          as="p"
        >
          Loading...
        </Transition>
      </div>

      <div className="grid grid-cols-1 gap-x-4 gap-y-1 md:grid-cols-2 lg:grid-cols-3">
        {standardCategories.map((category) => (
          <div key={category.name} className="flex items-center gap-2">
            <div
              className={classes(category.color, "rounded-md p-2 shadow-sm")}
            />
            <p className="flex-shrink-0 opacity-75">{category.name}</p>
          </div>
        ))}
      </div>
    </Calendar>
  );
}
