import { ReactComponent as IconGreen } from '../assets/icons/check-green.svg';
import { ReactComponent as IconRed } from '../assets/icons/check-red.svg';
import img1 from '../assets/images/photo-examples/photo1.jpg';
import img2 from '../assets/images/photo-examples/photo2.jpg';
import img3 from '../assets/images/photo-examples/photo3.jpg';
import img4 from '../assets/images/photo-examples/photo4.jpg';
import img5 from '../assets/images/photo-examples/photo5.jpg';
import imgBad1 from '../assets/images/photo-examples/photo-bad1.jpg';
import imgBad2 from '../assets/images/photo-examples/photo-bad2.jpg';
import imgBad3 from '../assets/images/photo-examples/photo-bad3.jpg';
import imgBad4 from '../assets/images/photo-examples/photo-bad4.jpg';
import imgBad5 from '../assets/images/photo-examples/photo-bad5.jpg';

export const dataPhotoExamplesGood = {
  icon: IconGreen,
  title: 'Рекомендуемый формат снимков для загрузки',
  list: [
    'Общий ракурс квартала или здания',
    'Фото не должны повторяться',
    'Избегать перекрытия объекта',
  ],
  images: [img1, img2, img3, img4, img5],
};

export const dataPhotoExamplesBad = {
  icon: IconRed,
  title: 'Нерекомендуемый  формат снимков для загрузки',
  list: [
    'Изображен не общий ракурс квартала или здания',
    'Фото повторяются',
    'Объект перекрывается',
  ],
  images: [imgBad1, imgBad2, imgBad3, imgBad4, imgBad5],
};
