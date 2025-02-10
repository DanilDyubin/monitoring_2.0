import { useDispatch } from 'react-redux';
import { addImgsIds } from '../redux/slices/scheduleSlice';
import { setLoadingImages, setArrayFilesLength } from '../redux/slices/reportSlice';

export function useUploadImages() {
  // const loadingImages = useSelector((state) => state.report.loadingImages);
  const dispatch = useDispatch();

  const uploadImages = async (files) => {
    if (!files.length) return;

    const formData = new FormData();
    files.forEach((file) => formData.append('upl_img', file));

    try {
      dispatch(setArrayFilesLength(files.length));
      dispatch(setLoadingImages(true));
      const response = await fetch(
        'https://msi.stage-detection.contextmachine.cloud/upload_images',
        {
          method: 'POST',
          body: formData,
        },
      );
      if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.status}`);
      }

      const result = await response.json();
      dispatch(setLoadingImages(false));
      if (result.upload_img_ids) {
        dispatch(addImgsIds(result.upload_img_ids));
      }
      return result.upload_img_ids;
    } catch (error) {
      dispatch(setLoadingImages(false));
      console.error('Upload failed:', error);
    }
  };
  return { uploadImages };
}
