import React, { useEffect, useState } from 'react';

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/calendar')
      .then(res => res.json())
      .then(setEvents)
      .catch(() => setEvents([]));
  }, []);

  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
      <ul>
        {events.map(ev => (
          <li key={ev.id} className="mb-2">
            <span className="font-medium">{ev.summary}</span> – {ev.start}
          </li>
        ))}
        {events.length === 0 && <li className="text-gray-500">No events found.</li>}
      </ul>
    </section>
  );
};

export default Calendar;
