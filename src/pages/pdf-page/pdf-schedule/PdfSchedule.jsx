import moment from 'moment';
import s from './pdfSchedule.module.scss';

const data = [
  { stage: 'Земляные работы', date: '1.11 — 14.11', done: '100%', deviation: '0%' },
  { stage: 'Шпунтовое ограждение', date: '4.11 — 10.11', done: '75%', deviation: '16%' },
  { stage: 'Распорная система', date: '1.11 — 14.11', done: '0%', deviation: '0%' },
  { stage: 'Устройство фундамента', date: '1.11 — 14.11', done: '100%', deviation: '0%' },
  { stage: 'Монолит', date: '1.11 — 14.11', done: '100%', deviation: '0%' },
  { stage: 'Кладка', date: '1.11 — 14.11', done: '100%', deviation: '0%' },
  { stage: 'Подсистема фасада', date: '1.11 — 14.11', done: '100%', deviation: '0%' },
  { stage: 'Облицовка фасада', date: '1.11 — 14.11', done: '100%', deviation: '0%' },
  { stage: 'Остекление', date: '1.11 — 14.11', done: '100%', deviation: '0%' },
  { stage: 'Благоустройство', date: '1.11 — 14.11', done: '100%', deviation: '0%' },
  { stage: 'Работы завершены', date: '1.11 — 14.11', done: '100%', deviation: '0%' },
];

const PdfSchedule = ({ stages }) => {
  if (!stages) return null;
  return (
    <div className={s.schedule}>
      <h2 className={s.title}>График строительных работ</h2>
      {/* <div className={s.subtitle}>
        <div className={s['subtitle__stages']}>Этапы</div>
        <div className={s['subtitle__dates']}>Начало — завершение </div>
        <div className={s['subtitle__done']}>Выполнено</div>
        <div className={s['subtitle__deviation']}>Отклонение</div>
      </div>
      <div className={s.cells}>
        <div className={`${s['cells__cell']} ${s['cells__cell--stages']}`}>Земляные работы</div>
        <div className={`${s['cells__cell']} ${s['cells__cell--dates']}`}>1.11 — 14.11</div>
        <div className={`${s['cells__cell']} ${s['cells__cell--done']}`}>100%</div>
        <div className={`${s['cells__cell']} ${s['cells__cell--deviation']}`}>0%</div>
      </div> */}
      <table className={s.table}>
        <thead className={s['table__header']}>
          <tr className={s['table__row']}>
            <th className={s['table__th']}>Этапы</th>
            <th className={s['table__th']}>Начало — завершение</th>
            <th className={s['table__th']}>Выполнено</th>
            <th className={s['table__th']}>Отклонение</th>
          </tr>
        </thead>
        <tbody className={s['table__body']}>
          {/* {data.map((item, i) => (
            <tr className={s['table__row']}>
              <td className={s['table__col']}>{item.stage}</td>
              <td className={s['table__col']}>{item.date}</td>
              <td className={s['table__col']}>{item.done}</td>
              <td className={s['table__col']}>{item.deviation}</td>
            </tr>
          ))} */}
          {stages.map((stage, i) => (
            <tr className={s['table__row']}>
              <td className={s['table__col']}>{stage.name}</td>
              <td className={s['table__col']}>
                {stage.plannedStart
                  ? `${moment(stage.plannedStart).format('DD.MM')} - ${moment(
                      stage.plannedEnd,
                    ).format('DD.MM')}`
                  : `-`}
              </td>
              <td className={s['table__col']}>{Math.round(stage.planValue)}%</td>
              <td className={s['table__col']}>
                <span className={stage.progress_diff < 0 ? s.warning : ''}>
                  {Math.round(stage.progress_diff)}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PdfSchedule;
