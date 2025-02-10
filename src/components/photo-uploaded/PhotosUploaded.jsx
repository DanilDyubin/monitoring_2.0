import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeImgId } from '../../redux/slices/scheduleSlice';
import { useUploadImages } from '../../hooks/useUploadImages';
import { PhotoItemHovered } from '../photo-item/PhotoItem';
import { ReactComponent as IconClose } from '../../assets/icons/close.svg';
import ImageSkeleton from '../../ui/skeletons/image-skeleton/ImageSkeleton';
import { AddImageButton } from '../../ui/add-image-button/AddImageButton';
import s from './photosUploaded.module.scss';

const PhotosUploaded = () => {
  const { imgsIds } = useSelector((state) => state.schedule);
  const { loadingImages, arrayFilesLength } = useSelector((state) => state.report);
  const dispatch = useDispatch();

  const { uploadImages } = useUploadImages();

  const filePicker = useRef(null);

  const handleAddImages = () => {
    filePicker.current.click();
  };

  const skeletonArray = Array.from({ length: arrayFilesLength }); // arrayFilesLength приходит в слайс из хука uploadImages с количеством фото, которые загрузил юзер, чтобы знать сколько скелетонов отображать

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    try {
      await uploadImages(files); // дозагрузка пользователем
    } catch (error) {
      console.error('Не удалось дозагрузить', error);
    }
  };

  const handleDelete = (id) => {
    dispatch(removeImgId(id)); // удаление фото
  };

  return (
    <div className={s['photos-uploaded']}>
      <div className={s['photos-uploaded__list']}>
        {imgsIds.length > 0
          ? imgsIds.map((id) => (
              <PhotoItemHovered
                key={id}
                id={id}
                Icon={IconClose}
                onDelete={() => handleDelete(id)}
              />
            ))
          : null}
        {loadingImages && skeletonArray.map((_, i) => <ImageSkeleton key={i} />)}
        <div>
          <input
            className={s['photos-uploaded__input']}
            type="file"
            multiple
            accept="image/*, .png, .jpg, .jpeg, .gif, .webp, .svg"
            name="images"
            onChange={handleFiles}
            ref={filePicker}
            style={{ display: 'none' }}
          />
          <AddImageButton onClick={handleAddImages} loading={loadingImages} />
        </div>
      </div>
    </div>
  );
};

export default PhotosUploaded;
