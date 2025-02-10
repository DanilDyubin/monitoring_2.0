import DatePicker from '../date-picker/DatePicker';
import Portal from '../portal/Portal';

import s from './calendar.module.scss';

const Calendar = () => {
  return (
    <Portal wrapperId="calendar">
      <div className={s.calendar}>
        <DatePicker />
      </div>
    </Portal>
  );
};

export default Calendar;
