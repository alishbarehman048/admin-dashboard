
import React, { useState } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const initialEvents = [
  {
    title: 'Sessional Exams',
    start: new Date(2025, 5, 10, 9, 0),
    end: new Date(2025, 5, 10, 13, 0),
  },
  {
    title: 'Family Dinner',
    start: new Date(2025, 5, 12, 15, 0),
    end: new Date(2025, 5, 12, 17, 0),
  },
];

export default function Calendar() {
  const [myEvents, setMyEvents] = useState(initialEvents);

  return (
    <div className="h-[600px] sm:h-[700px] md:h-[800px]">
      <h2 className="text-2xl font-semibold mb-4">Calendar</h2>
      <BigCalendar
        localizer={localizer}
        events={myEvents}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day', 'agenda']}
        defaultView="month"
        selectable
        onSelectSlot={(slotInfo) => {
          const title = window.prompt('New Event Name');
          if (title) {
            setMyEvents([...myEvents, {
              title,
              start: slotInfo.start,
              end: slotInfo.end,
            }]);
          }
        }}
        onSelectEvent={(event) => alert(`Event: ${event.title}`)}
        style={{ height: '100%' }}
      />
    </div>
  );
}
