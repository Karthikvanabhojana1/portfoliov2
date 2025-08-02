import React, { useEffect, useState } from 'react';

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/calendar')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(() => setEvents([]));
  }, []);

  return (
    <section className="max-w-2xl mx-auto my-16 bg-white rounded-lg shadow p-8">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Upcoming Events</h2>
      <div className="space-y-4">
        {events.map(evt => (
          <div key={evt.id} className="flex items-center p-4 border border-gray-200 rounded hover:shadow transition-shadow">
            <div className="w-20 text-center mr-4">
              <p className="text-indigo-600 font-bold">{evt.date}</p>
            </div>
            <p className="text-gray-700">{evt.title}</p>
          </div>
        ))}
        {events.length === 0 && (
          <p className="text-gray-500 text-center">No events found.</p>
        )}
      </div>
    </section>
  );
};

export default Calendar;
