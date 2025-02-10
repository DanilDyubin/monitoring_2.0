import { Outlet } from 'react-router-dom';

import Title from '../components/title/Title';

import s from './layout.module.scss';

const Layout = () => {
  return (
    <div className={s['layout-container']}>
      <div className={s['title-container']}>
        <Title />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
