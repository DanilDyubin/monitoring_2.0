import s from './loader.module.scss';

const Loader = ({ size }) => {
  return <div className={size === 'small' ? s['loader-small'] : s.loader}></div>;
};

export default Loader;
