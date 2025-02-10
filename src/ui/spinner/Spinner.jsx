import imgSmall from '../../assets/images/spinner-small.png';
import imgBig from '../../assets/images/spinner-big.png';
import s from './spinner.module.scss';

export const Spinner = ({ size }) => {
  return (
    <div className={s.spinner}>
      <img src={size === 'small' ? imgSmall : imgBig} alt="spinner" />
    </div>
  );
};
