import s from './customSidebarHeader.module.scss';

import React from 'react';

export const CustomSidebarHeader = ({ getRootProps }) => {
  return (
    <div
      {...getRootProps({
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      })}
      className={s['custom-sidebar-header']}>
      <div className={s['custom-sidebar-header__title']}>Этапы</div>
      <div className={s['custom-sidebar-header__subtitles']}>
        <div className={s['custom-sidebar-header__subtitles-plan']}>План</div>
        <div className={s['custom-sidebar-header__subtitles-fact']}>Факт</div>
        <div className={s['custom-sidebar-header__subtitles-deviation']}>Отклонение</div>
      </div>
    </div>
  );
};

export const CustomSidebarHeaderWithoutColls = ({ getRootProps }) => {
  return (
    <div
      {...getRootProps({
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      })}
      className={s['custom-sidebar-header']}>
      <div className={s['custom-sidebar-header__title']}>Этапы</div>
      <div className={s['custom-sidebar-header__subtitles-done']}>Выполнено</div>
    </div>
  );
};
