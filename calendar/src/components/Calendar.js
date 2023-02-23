import React, { useState } from 'react';
import './Calendar.css';

function Calendar() {
  const [date, setDate] = useState(new Date());

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const dayOfWeek = firstDayOfMonth.getDay();

  const days = [];

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  for (let i = 0; i < dayOfWeek; i++) {
    days.unshift(null);
  }

  const prevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="btn" onClick={prevMonth}><b>{`<`}</b></button>
        <div><b>{months[date.getMonth()]} {date.getFullYear()}</b></div>
        <button className="btn" onClick={nextMonth}><b>{`>`}</b></button>
      </div>
      <div className="calendar-body">
        {weekdays.map((weekday) => (
          <div className="calendar-weekday" key={weekday}><b>{weekday}</b></div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={day ? 'calendar-day' : 'calendar-day calendar-empty'}
            onClick={() =>
              day &&
              console.log(new Date(date.getFullYear(), date.getMonth(), day))
            }
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;