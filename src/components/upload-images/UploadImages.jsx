// const UploadImages = () => {
//   const [images, setImages] = useState([]);
//   const [drag, setDrag] = useState(false);
//   const dragCounter = useRef(0); // Счётчик событий drag

//   const navigate = useNavigate();
//   const { uploadImages } = useUploadImages();
//   const filePicker = useRef(null);

//   const handleImages = (e) => {
//     setImages(Array.from(e.target.files));
//   };

//   useEffect(() => {
//     if (images.length) {
//       navigate('/form');
//       uploadImages(images);
//     }
//   }, [images]);

//   const handleClick = () => {
//     filePicker.current.click();
//   };

//   const dragEnterHandler = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     dragCounter.current += 1; // Увеличиваем счётчик
//     console.log(dragCounter.current);
//     if (!drag) {
//       setDrag(true);
//     }
//   };

//   const dragLeaveHandler = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     dragCounter.current -= 1; // Уменьшаем счётчик
//     if (dragCounter.current === 0) {
//       setDrag(false);
//     }
//   };

//   const dropHandler = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setImages([...e.dataTransfer.files]);
//     dragCounter.current = 0; // Сбрасываем счётчик
//     setDrag(false);
//   };

//   return (
//     <div
//       className={s['images-upload']}
//       onDragEnter={dragEnterHandler}
//       onDragLeave={dragLeaveHandler}
//       onDragOver={(e) => e.preventDefault()}
//       onDrop={dropHandler}>
//       {drag && <div className={s['images-upload__overlay']}>Отпустите файлы</div>}
//       <h3 className={s['images-upload__title']}>
//         Перетащите фотографии сюда
//         <br /> или
//       </h3>
//       <input
//         className={s['images-upload__input']}
//         type="file"
//         multiple
//         accept="image/*, .png, .jpg, .jpeg, .gif, .web, .svg"
//         name="images"
//         onChange={handleImages}
//         ref={filePicker}
//       />
//       <Button onClick={handleClick} title="Выберите файл" />
//     </div>
//   );
// };

// export default UploadImages;

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { useUploadImages } from '../../hooks/useUploadImages';
import Button from '../../ui/button/Button';

import s from './uploadImages.module.scss';

const UploadImages = () => {
  const navigate = useNavigate();
  const { uploadImages } = useUploadImages();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length) {
      uploadImages(acceptedFiles);
      navigate('/form');
    }
  }, []);

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [], // все типы изображений
    },
    noClick: true,
    noKeyboard: true,
  });

  return (
    <section className="container">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className={s['images-upload']}>
            <div className={s['images-upload__overlay']}>Отпустите файлы</div>
            <h3 className={s['images-upload__title']}>
              Перетащите фотографии сюда
              <br /> или
            </h3>
            <Button title="Выберите файл" />
          </div>
        ) : (
          <div className={s['images-upload']}>
            <h3 className={s['images-upload__title']}>
              Перетащите фотографии сюда
              <br /> или
            </h3>
            <Button title="Выберите файл" variant="secondaryHovered" onClick={open} />
          </div>
        )}
      </div>
    </section>
  );
};

export default UploadImages;
