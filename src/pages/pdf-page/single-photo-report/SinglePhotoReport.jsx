import SinglePhotoItem from './single-photo-item/SinglePhotoItem';
import s from './singlePhotoReport.module.scss';

const SinglePhotoReport = ({ reportByImage }) => {
  if (!reportByImage) return null;
  return (
    <div className={s.container}>
      <h2 className={s.title}>Отчёт по каждому снимку</h2>
      <div className={s.wrapper}>
        {reportByImage.map((item, i) => (
          <SinglePhotoItem item={item} key={i} />
        ))}
        {/* <SinglePhotoItem />
        <SinglePhotoItem />
        <SinglePhotoItem /> */}
      </div>
    </div>
  );
};

export default SinglePhotoReport;
