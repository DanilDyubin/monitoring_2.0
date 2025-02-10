import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../../redux/slices/calendarSlice';
import { addItem } from '../../redux/slices/scheduleSlice';
import moment from 'moment';

import { DayPicker } from 'react-day-picker';
import { ru } from 'react-day-picker/locale';
import 'react-day-picker/style.css';
import '../../styles/datePicker.css';
import s from './datePicker.module.scss';

const DatePickerForm = ({ setOpenCalendar, setCalendarDate, setReset }) => {
  const [selected, setSelected] = useState();

  const handleSelect = (newSelected) => {
    setSelected(newSelected);
  };

  const handleClearDates = () => {
    setSelected(null);
  };

  const handleClose = () => {
    setOpenCalendar(false);
  };

  const handleAddDate = () => {
    if (!selected) {
      setOpenCalendar(false);
      return;
    }
    setCalendarDate(selected);
    setOpenCalendar(false);
  };

  const Footer = () => {
    return (
      <div className={s.footer}>
        <div className={s.wrapper}>
          <div className={s.cancel} onClick={handleClose}>
            Отмена
          </div>
          {/* <div className={s.clear} onClick={handleClearDates}>
            Очистить
          </div> */}
        </div>
        <div className={s.done} onClick={handleAddDate}>
          Готово
        </div>
      </div>
    );
  };

  return (
    <div className={s.container}>
      <DayPicker
        locale={ru}
        mode="single"
        captionLayout="dropdown"
        //   defaultMonth={currentDate ? new Date(currentDate) : new Date()}
        // defaultMonth={selected.to ? new Date(selected.to) : new Date()}
        endMonth={new Date(2039, 9)}
        selected={selected}
        onSelect={handleSelect}
        showOutsideDays
        footer={<Footer />}
      />
    </div>
  );
};

export default DatePickerForm;
