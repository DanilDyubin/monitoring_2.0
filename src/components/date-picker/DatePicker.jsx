import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../../redux/slices/calendarSlice';
import { addItem } from '../../redux/slices/scheduleSlice';
import moment from 'moment';

import { DayPicker } from 'react-day-picker';
import { ru } from 'react-day-picker/locale';
import 'react-day-picker/style.css';
// import '../../styles/datePicker.css';
import s from './datePicker.module.scss';

const DatePicker = () => {
  const currentDate = useSelector((state) => state.schedule.currentDate); // получаем дату съемки
  const groups = useSelector((state) => state.schedule.groups);
  const groupId = useSelector((state) => state.calendar.groupId); // получаем id группы для которой ввели даты на таймлайне
  const [selected, setSelected] = useState();

  // const initialRange = currentDate
  //   ? {
  //       from: new Date(currentDate),
  //       to: new Date(currentDate).setDate(new Date(currentDate).getDate() + 1),
  //     }
  //   : null; // формируем объект для date picker чтобы изначально в календаре было отмечено число, которое ввели в форму 'date'

  const dispatch = useDispatch();

  const handleSelect = (newSelected) => {
    setSelected(newSelected);
  };

  const handleClearDates = () => {
    setSelected(null);
  };

  const handleClose = () => {
    dispatch(setOpen(false));
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

  const Footer = () => {
    return (
      <div className={s.footer}>
        <div className={s.wrapper}>
          <div className={s.cancel} onClick={handleClose}>
            Отмена
          </div>
          <div className={s.clear} onClick={handleClearDates}>
            Очистить
          </div>
        </div>
        <div
          className={s.done}
          onClick={handleAddItem}
          disabled={!isDateSelected}
        >
          Готово
        </div>
      </div>
    );
  };

  return (
    <div className={s.container}>
      <DayPicker
        locale={ru}
        mode="range"
        captionLayout="dropdown"
        defaultMonth={currentDate ? new Date(currentDate) : new Date()}
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

export default DatePicker;
