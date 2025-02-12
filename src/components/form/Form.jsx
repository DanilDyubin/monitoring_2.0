import {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { LiaCalendarAlt } from 'react-icons/lia';

import { addCurrentDate } from '../../redux/slices/scheduleSlice';
import { useClickOutside } from '../../hooks/useClickOutside';

import DatePickerForm from '../date-picker/DatePickerForm';

import s from './form.module.scss';

const Form = forwardRef(({ onFormValideChange }, ref) => {
  // forwardRef - позволяет передать ref из родителя (FormPage)
  const methods = useForm({
    mode: 'onBlur',
  });

  const {
    register,
    watch,
    reset,
    trigger,
    setValue,
    formState: { errors, isValid },
  } = methods;

  const [openCalendar, setOpenCalendar] = useState(false);

  const calendarRef = useRef();

  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    getValues: methods.getValues,
  }));

  useEffect(() => {
    if (onFormValideChange) {
      onFormValideChange(isValid); // передаем локальное состояние isValid в FormPage для button disabled
    }
  }, [isValid]);

  const setCalendarDate = (calendarDate) => {
    setValue('date', moment(calendarDate).format('DD.MM.YYYY'), {
      shouldValidate: true,
    });
    dispatch(addCurrentDate(moment(calendarDate, 'DD.MM.YYYY').valueOf()));
  };

  useClickOutside(calendarRef, () => setOpenCalendar(false)); // закрываем календарь по клику вне его области

  const handleInputsValidate = (e) => {
    // запускает валидацию инпута date по клику на Enter
    if (e.key === 'Enter') {
      e.preventDefault();
      trigger('date');
    }
  };

  // const onSubmit = (data) => {
  //   // alert(JSON.stringify(data));
  //   dispatch(setFormData(data));
  //   reset();
  // };

  return (
    <div className={s.container}>
      <form className={s.form}>
        <div className={s.wrapper}>
          <div className={s.field}>
            <label className={s.label} htmlFor="uin">
              УИН *
            </label>
            <input
              {...register('uin', { required: true })}
              className={errors.uin ? `${s.input} ${s.error}` : s.input}
              type="text"
            />
            <div>
              {errors?.uin && <p className={s['error__txt']}>Укажите УИН</p>}
            </div>
          </div>
          <div
            className={s.field + ` ` + s.relative}
            ref={calendarRef}
            onKeyDown={handleInputsValidate}
          >
            <label className={s.label} htmlFor="date">
              Дата съемки *
            </label>
            <div
              className={
                errors.date
                  ? `${s.inputContainer} ${s.error}`
                  : s.inputContainer
              }
            >
              <input
                {...register('date', {
                  required: true,
                  validate: (value) => {
                    // Если не валидна по moment
                    if (!moment(value, 'DD.MM.YYYY', true).isValid()) {
                      return 'Формат даты: ДД.ММ.ГГГГ';
                    }
                    // Если валидна — можно делать dispatch
                    const dateMoment = moment(value, 'DD.MM.YYYY').valueOf();
                    dispatch(addCurrentDate(dateMoment));
                    return true; // значит всё ок
                  },
                  // pattern: {
                  //   value: /^\d{2}\.\d{2}\.\d{4}$/,
                  //   message: 'Формат даты: ДД.ММ.ГГГГ',
                  // },
                })}
                className={s.inputDate}
                type="text"
                // readOnly={true}
                // onFocus={() => setOpenCalendar(true)}
                // onBlur={() => setOpenCalendar(false)}
                //   onBlur={handleDateValidate}
              />
              <LiaCalendarAlt
                className={s.icon}
                onClick={() => setOpenCalendar(!openCalendar)}
              />
            </div>
            <div>
              {errors?.date && (
                <p className={s['error__txt']}>
                  {errors?.date?.message || 'Укажите дату съемки'}
                </p>
              )}
            </div>
            {openCalendar && (
              <div className={s.calendar}>
                <DatePickerForm
                  setOpenCalendar={setOpenCalendar}
                  setCalendarDate={setCalendarDate}
                />
              </div>
            )}
          </div>
          <div className={s.field}>
            <label className={s.label} htmlFor="floors">
              Этажность *
            </label>
            <input
              {...register('floors', { required: true })}
              className={errors.floors ? `${s.input} ${s.error}` : s.input}
              type="text"
            />
            <div>
              {errors?.floors && (
                <p className={s['error__txt']}>Укажите этажность</p>
              )}
            </div>
          </div>
        </div>
        <div className={s.field}>
          <label className={s.label}>
            Адрес *
            <textarea
              className={
                errors.address ? `${s.textarea} ${s.error}` : s.textarea
              }
              {...register('address', { required: true })}
              rows={2}
            />
            <div>
              {errors?.address && (
                <p className={s['error__txt']}>Заполните адрес</p>
              )}
            </div>
          </label>
        </div>
      </form>
    </div>
  );
});

export default Form;
