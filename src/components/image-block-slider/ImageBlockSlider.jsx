import Slider from '../slider/Slider';
import { data } from '../slider/Slider';
import s from './imageBlockSlider.module.scss';
import Locker from '../../ui/locker/Locker';

// const images = [<Locker />, <Locker />, <Locker />, <Locker />, <Locker />];

const ImageBlock = ({ images }) => {
  return (
    <div className={s['image-block']}>
      <div className={s['image-block__images']}>
        <div className={s['image-block__images-item']}>
          <Slider data={data} />
        </div>
        {images.map((img, i) => (
          <div className={s['image-block__images-item']} key={i}>
            <img
              src={
                `https://msi.stage-detection.contextmachine.cloud/get_predicted_images?uid=${img.predicted_image}` ||
                null
              }
              className={s['image-block__images-image']}
              alt="photo"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageBlock;
