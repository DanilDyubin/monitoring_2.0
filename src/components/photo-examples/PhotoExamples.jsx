import s from './photoExamples.module.scss';

const PhotoItem = ({ img, Icon }) => {
  return (
    <div className={s['photo-examples__images-item']}>
      <img src={img} alt="photo" />
      <Icon className={s['photo-examples__images-item--icon']} />
    </div>
  );
};

const PhotoExamples = ({ data, Icon }) => {
  return (
    <div className={s['photo-examples']}>
      <div className={s['photo-examples__title']}>
        <Icon />
        <h3 className={s['photo-examples__title-text']}>{data.title}</h3>
      </div>

      <ul className={s['photo-examples__list']}>
        {data.list.map((item, i) => (
          <li className={s['photo-examples__list-item']} key={i}>
            {item}
          </li>
        ))}
      </ul>

      <div className={s['photo-examples__images']}>
        {data.images.map((image, i) => (
          <PhotoItem img={image} Icon={Icon} key={i} />
        ))}
      </div>
    </div>
  );
};

export default PhotoExamples;
