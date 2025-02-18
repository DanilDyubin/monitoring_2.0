import InputMask from 'react-input-mask';

import s from './style.module.scss';

const CalendarInput = ({ name, title, onChange, value, placeholder }) => {
  return (
    <InputMask
      mask="99.99.9999"
      onChange={onChange}
      value={value}
      className={s.input}
      name={name}
      placeholder={placeholder}
    />
  );
};

const CalendarFooter = ({
  handleClose,
  handleClearDates,
  handleAddItem,
  isDateSelected,
  inputValue,
  onChange,
}) => {
  return (
    <div className={s.footer}>
      <div className={s.inputs}>
        <CalendarInput
          name="from"
          title="с"
          placeholder="начало"
          value={inputValue.from}
          onChange={onChange}
        />
        <CalendarInput
          name="to"
          title="по"
          placeholder="завершение"
          value={inputValue.to}
          onChange={onChange}
        />
      </div>
      <div className={s.btns}>
        <div className={s.wrapper}>
          <button className={s.cancel} onClick={handleClose}>
            Отмена
          </button>
          <button className={s.clear} onClick={handleClearDates}>
            Очистить
          </button>
        </div>
        <button
          className={s.done}
          onClick={handleAddItem}
          disabled={!isDateSelected}
        >
          Готово
        </button>
      </div>
    </div>
  );
};

export default CalendarFooter;
