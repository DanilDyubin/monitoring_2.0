import { useSelector } from 'react-redux';
import s from './customGroup.module.scss';

// props group приходят из <Timeline groups/>

export const groupRenderer = ({ group }) => {
  const clazz =
    group.progress >= 0
      ? `${s['custom-group__values-progress']}`
      : `${s['custom-group__values-progress']}` + ` ` + `${s.warning}`;
  return (
    <div className={s['custom-group']}>
      <div className={s['custom-group__title']}>{group.title}</div>
      <div className={s['custom-group__values']}>
        <div className={s['custom-group__values-plan']}>{`${group.plan}%`}</div>
        <div className={s['custom-group__values-fact']}>{`${group.fact}%`}</div>
        <div className={clazz}>
          {group.progress > 0 ? `+${group.progress}%` : `${group.progress}%`}
        </div>
      </div>
    </div>
  );
};

export const groupRendererWithoutColls = ({ group }) => {
  return (
    <div className={s['custom-group']}>
      <div className={s['custom-group__title']}>{group.title}</div>
      <div className={s['custom-group__values-done']}>{`${Math.round(group.done)}%`}</div>
    </div>
  );
};

export const groupRendererSinglePage = ({ group }) => {
  return (
    <div className={s['custom-group']}>
      <div className={s.wrapper}>
        <div className={s.color} style={{ background: `${group.color}` }}></div>
        <div className={s['custom-group__title']}>{group.title}</div>
      </div>
      <div className={s['custom-group__values-done']}>{`${Math.round(group.done)}%`}</div>
    </div>
  );
};
