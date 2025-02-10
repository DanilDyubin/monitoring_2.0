import s from './form.module.scss';

const PdfForm = ({ formData }) => {
  const FormItem = ({ title, data }) => {
    return (
      <div className={s['form__item']}>
        <span className={s['form__item-title']}>{title}</span>
        <div className={s['form__item-data']}>{data}</div>
      </div>
    );
  };
  return (
    <div className={s.form}>
      <div className={s.wrapper}>
        <FormItem title="УИН *" data={formData.uin} />
        <FormItem title="Дата съемки *" data={formData.date} />
        <FormItem title="Этажность *" data={formData.floors} />
      </div>
      <FormItem title="Адрес *" data={formData.address} />
    </div>
  );
};

export default PdfForm;
