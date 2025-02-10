import s from './singlePhotoItem.module.scss';
import image from '../../../../assets/images/true-photo/2024-04-02_Z5Z_7450.jpg';

export const SinglePhotoItem = ({ item }) => {
  console.log(`Item - ${item}`);

  return (
    <div className={s.container}>
      <img
        className={s.img}
        src={
          `https://msi.stage-detection.contextmachine.cloud/get_predicted_images?uid=${item.predicted_image}` ||
          null
        }
        // src={item}
        alt="photo"
      />
      <div>
        <div className={s.subtitles}>
          <div>Этапы</div>
          <div>Выполнено</div>
        </div>
        <ul className={s.list}>
          {item.stages.map((stage, i) => (
            <li className={s['list-item']} key={i}>
              <div className="stages">{stage.title}</div>
              <div className="percent">{stage.done}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SinglePhotoItem;
