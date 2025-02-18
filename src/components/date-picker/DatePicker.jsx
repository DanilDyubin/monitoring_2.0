import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../../redux/slices/calendarSlice';
import { addItem } from '../../redux/slices/scheduleSlice';
import moment from 'moment';

import { DayPicker } from 'react-day-picker';
import { ru } from 'react-day-picker/locale';
import Footer from './calendar-footer/CalendarFooter';

import 'react-day-picker/style.css';
// import '../../styles/datePicker.css';
import s from './datePicker.module.scss';

const DatePicker = () => {
  const [selected, setSelected] = useState();
  const [inputValue, setInputValue] = useState({ from: '', to: '' }); // выбор даты в input

  const currentDate = useSelector((state) => state.schedule.currentDate); // получаем дату съемки
  const groups = useSelector((state) => state.schedule.groups);
  const groupId = useSelector((state) => state.calendar.groupId); // получаем id группы для которой ввели даты на таймлайне

  const dispatch = useDispatch();

  const handleSelect = (newSelected) => {
    if (newSelected) {
      setSelected(newSelected);
      const fromValue = moment(newSelected.from).format('DD.MM.YYYY');
      const toValue = moment(newSelected.to).format('DD.MM.YYYY');
      setInputValue({ from: fromValue, to: toValue });
    }
  };

  const handleClearDates = () => {
    setSelected(null);
    setInputValue({ from: '', to: '' });
  };

  const handleClose = () => {
    dispatch(setOpen(false));
  };

  // добавление дат через инпуты
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => {
      const updated = { ...prev, [name]: value };

      const fromMoment = moment(updated.from, 'DD.MM.YYYY', true);
      const toMoment = moment(updated.to, 'DD.MM.YYYY', true);

      if (fromMoment.isValid() && toMoment.isValid()) {
        setSelected({ from: fromMoment.toDate(), to: toMoment.toDate() });
      }
      return updated;
    });
  };

  const isDateSelected = selected && selected.from && selected.to;
  const group = groups.find((obj) => obj.id === groupId); // получаем нужную группу чтобы в item передать нужный цвет и group_title

  const handleAddItem = () => {
    if (isDateSelected) {
      const newItem = {
        id: groupId,
        group: groupId, // обязательно для привязки item к group
        group_title: group.title,
        color: group.color,
        color_light: group.color_light,
        current_date: currentDate,
        title: `${moment(selected.from).format('DD.MM')} — ${moment(
          selected.to
        ).format('DD.MM')}`,
        start_time: moment(selected.from).valueOf(),
        end_time: moment(selected.to).endOf('day').valueOf(), // endOf('day') устанавливаем время в конце дня на 23:59 чтобы выбранный день в item был подностью закрашен
        itemProps: {
          // className: 'bordernone',
          style: {
            background: group.color_light,
            border: 'none',
            color: '#131313',
            fontWeight: '400',
            fontSize: '16px',
          },
        },
      };
      dispatch(addItem(newItem));
      dispatch(setOpen(false));
    }
  };

  return (
    <div className={s.container}>
      <DayPicker
        locale={ru}
        mode="range"
        captionLayout="dropdown"
        defaultMonth={currentDate ? new Date(currentDate) : new Date()}
        // defaultMonth={selected.to ? new Date(selected.to) : new Date()}
        endMonth={new Date(2069, 9)}
        selected={selected}
        onSelect={handleSelect}
        showOutsideDays
        footer={
          <Footer
            handleClose={handleClose}
            handleClearDates={handleClearDates}
            handleAddItem={handleAddItem}
            isDateSelected={isDateSelected}
            inputValue={inputValue}
            onChange={handleInputChange}
          />
        }
      />
    </div>
  );
};

export default DatePicker;
