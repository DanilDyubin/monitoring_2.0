import Loader from '../../loader/Loader';
import s from './imageSkeleton.module.scss';

const ImageSkeleton = () => {
  return (
    <div className={s['image-skeleton']}>
      <Loader size="small" />
    </div>
  );
};

export default ImageSkeleton;
