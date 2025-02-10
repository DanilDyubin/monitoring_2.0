import { useEffect, useRef } from 'react';
import Loader from '../../loader/Loader';
import s from './pageSkeleton.module.scss';

const PageSkeleton = () => {
  // const startPageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0); // поднимаем пользователя в начало страницы
    // startPageRef.current?.scrollIntoView({ behavior: 'smooth' }); // поднимаем пользователя в начало страницы
  }, []);

  return (
    <div className={s['page-skeleton']}>
      <div className={s.spinner}>
        <Loader />
      </div>
      <div className={s['page-skeleton__container']}>
        <div className={s['page-skeleton__images']}>
          <div className={s['page-skeleton__images-item']}></div>
          <div className={s['page-skeleton__images-item']}></div>
          <div className={s['page-skeleton__images-item']}></div>
          <div className={s['page-skeleton__images-item']}></div>
          <div className={s['page-skeleton__images-item']}></div>
        </div>
        <div className={s['page-skeleton__middle']}>
          <div className={s['page-skeleton__wrapper']}>
            <div className={s['page-skeleton__block']}>
              <div className={s['page-skeleton__block-big']}></div>
              <div className={s['page-skeleton__block-small']}></div>
            </div>
            <div className={s['page-skeleton__block']}>
              <div className={s['page-skeleton__block-big']}></div>
              <div className={s['page-skeleton__block-small']}></div>
            </div>
            <div className={s['page-skeleton__block']}>
              <div className={s['page-skeleton__block-big']}></div>
              <div className={s['page-skeleton__block-small']}></div>
            </div>
          </div>
          <div className={s['page-skeleton__middle-line--thin']}></div>
          <div className={s['page-skeleton__middle-line--bold']}></div>
        </div>
        <div className={s['page-skeleton__bottom']}>
          <div className={s['page-skeleton__middle-line--thin']}></div>
          <div className={s['page-skeleton__wrapper']}>
            <div className={s['page-skeleton__block']}>
              <div className={s['page-skeleton__block-big']}></div>
              <div className={s['page-skeleton__block-small']}></div>
            </div>
            <div className={s['page-skeleton__block']}>
              <div className={s['page-skeleton__block-big']}></div>
              <div className={s['page-skeleton__block-small']}></div>
            </div>
            <div className={s['page-skeleton__block']}>
              <div className={s['page-skeleton__block-big']}></div>
              <div className={s['page-skeleton__block-small']}></div>
            </div>
          </div>
          <div className={s['page-skeleton__wrapper']}>
            <div className={s['page-skeleton__block']}>
              <div className={s['page-skeleton__block-big']}></div>
              <div className={s['page-skeleton__block-small']}></div>
            </div>
            <div className={s['page-skeleton__block']}>
              <div className={s['page-skeleton__block-big']}></div>
              <div className={s['page-skeleton__block-small']}></div>
            </div>
            <div className={s['page-skeleton__block']}>
              <div className={s['page-skeleton__block-big']}></div>
              <div className={s['page-skeleton__block-small']}></div>
            </div>
          </div>
          <div className={s['page-skeleton__wrapper']}>
            <div className={s['page-skeleton__block']}>
              <div className={s['page-skeleton__block-big']}></div>
              <div className={s['page-skeleton__block-small']}></div>
            </div>
            <div className={s['page-skeleton__block']}>
              <div className={s['page-skeleton__block-big']}></div>
              <div className={s['page-skeleton__block-small']}></div>
            </div>
            <div className={s['page-skeleton__block']}>
              <div className={s['page-skeleton__block-big']}></div>
              <div className={s['page-skeleton__block-small']}></div>
            </div>
          </div>
          <div className={s['page-skeleton__wrapper']}>
            <div className={s['page-skeleton__block']}>
              <div className={s['page-skeleton__block-big']}></div>
              <div className={s['page-skeleton__block-small']}></div>
            </div>
            <div className={s['page-skeleton__block']}>
              <div className={s['page-skeleton__block-big']}></div>
              <div className={s['page-skeleton__block-small']}></div>
            </div>
            <div className={s['page-skeleton__block']}>
              <div className={s['page-skeleton__block-big']}></div>
              <div className={s['page-skeleton__block-small']}></div>
            </div>
          </div>
          <div className={s['page-skeleton__bottom-line']}></div>
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;
