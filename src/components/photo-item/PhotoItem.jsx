import s from './photoItem.module.scss';

export const PhotoItem = ({ img, Icon }) => {
  return (
    <div className={s['photo-item']}>
      <img src={img} alt="photo" />
      <Icon className={s['photo-item__icon']} />
    </div>
  );
};

export const PhotoItemHovered = ({ id, img, Icon, onDelete }) => {
  const imageUrl = `https://msi.stage-detection.contextmachine.cloud/get_images?uid=${id}`;
  return (
    <div className={s['photo-item-hovered']}>
      <img src={imageUrl} alt="photo" />
      <div className={s['photo-item-hovered__overlay']}></div>
      <Icon className={s['photo-item-hovered__icon']} onClick={onDelete} />
    </div>
  );
};

export default PhotoItem;
