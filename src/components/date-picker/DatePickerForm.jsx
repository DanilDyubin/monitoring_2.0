import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { ru } from 'react-day-picker/locale';

import 'react-day-picker/style.css';
import s from './datePicker.module.scss';

const DatePickerForm = ({ setOpenCalendar, setCalendarDate }) => {
  const [selected, setSelected] = useState();

  const handleSelect = (date) => {
    if (date) {
      setSelected(date);
      setCalendarDate(date);
      setOpenCalendar(false);
    }
  };

  return (
    <div className={s.container}>
      <DayPicker
        locale={ru}
        mode="single"
        captionLayout="dropdown"
        endMonth={new Date(2069, 9)}
        selected={selected}
        onSelect={handleSelect}
        showOutsideDays
      />
    </div>
  );
};

export default DatePickerForm;
