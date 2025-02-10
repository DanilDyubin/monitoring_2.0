import { useSelector } from 'react-redux';
import noImg from '../../assets/images/no-photo.png';
import s from './imageBlock.module.scss';
import Locker from '../../ui/locker/Locker';

const ImageBlock = () => {
  const images = useSelector((state) => state.report.total.images);

  if (!images) {
    return (
      <div className={s['image-block']}>
        <div className={s['image-block__images']}>
          <div className={s['image-block__images-item']}>
            <img src={noImg} alt="photo" />
          </div>
          <div className={s['image-block__images-item']}>
            <Locker />
          </div>
          <div className={s['image-block__images-item']}>
            <Locker />
          </div>
          <div className={s['image-block__images-item']}>
            <Locker />
          </div>
          <div className={s['image-block__images-item']}>
            <Locker />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={s['image-block']}>
      <div className={s['image-block__images']}>
        {images.map((img, i) => (
          <div className={s['image-block__images-item']}>
            <img
              src={`https://msi.stage-detection.contextmachine.cloud/get_images?uid=${img}`}
              alt="photo"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageBlock;
