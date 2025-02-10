import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { DateContext } from '../../context/DateContext';
import PhotosUploaded from '../../components/photo-uploaded/PhotosUploaded';
// import DatePicker from '../../components/date-picker/DatePicker';
import { dataTimeLine } from '../../data/dataTimeLine';
// import ImageSkeleton from '../../ui/skeletons/image-skeleton/ImageSkeleton';
import { setFormData } from '../../redux/slices/reportSlice';
// import TimeLineExample from '../../components/trash/TimeLineExample';
// import TimeLineExampleLocale from '../../components/time-line/TimeLineExampleLocale';
// import TimeLineExampleColored from '../../components/trash/TimeLineExampleColored';
// import ProgrmScroll from '../../components/trash/ProgrmScroll';
// import MyTimeline from '../../components/trash/TimeLineScroll';
import Subtitle from '../../components/subtitle/Subtitle';
import Form from '../../components/form/Form';
import { useSendRequest } from '../../hooks/useSendRequest';
import Button from '../../ui/button/Button';
// import { useEffect } from 'react';
// import { useMokRequest } from '../../hooks/useMok';
// import { useNavigate } from 'react-router-dom';
// import { Spinner } from '../../ui/Spinner_new/Spinner';
import PageSkeleton from '../../ui/skeletons/page-skeleton/PageSkeleton';
import TimeLineItemsStyled from '../../components/time-line/TimeLineItemsStyled';

const FormPage = () => {
  const [formValide, setFormValide] = useState(false); // локальное состояние для проверки валдности формы и активности btn
  // const { date } = useSelector((state) => state.calendar);
  const { sendRequest } = useSendRequest();
  const loadingPage = useSelector((state) => state.report.loadingPage);
  const items = useSelector((state) => state.schedule.items);
  const imgsIds = useSelector((state) => state.schedule.imgsIds);
  // const form = useSelector((state) => state.report.formData);
  // const currentDate = useSelector((state) => state.schedule.currentDate);
  const hasItemsAndImgs = items.length > 0 && imgsIds.length > 0; // проверяем загружены ли фото и даты на таймлайне

  const formRef = useRef();
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    const formData = formRef.current.getValues(); // вызываем из react-hook-form метод getValues(), который возвращает актуальные данные формы
    dispatch(setFormData(formData));
    sendRequest();
  };

  return (
    <>
      {loadingPage ? (
        <PageSkeleton />
      ) : (
        <div>
          <PhotosUploaded />
          <div style={{ marginTop: '64px' }}>
            <Form ref={formRef} onFormValideChange={setFormValide} />
          </div>
          <div style={{ marginTop: '80px' }}>
            <Subtitle />
            <TimeLineItemsStyled data={dataTimeLine} />
          </div>
          <div style={{ marginTop: '57px' }}></div>
          <Button
            disabled={!formValide || !hasItemsAndImgs}
            title="Обработать фотографии"
            size="big"
            variant="secondaryHovered"
            onClick={handleButtonClick}
          />
        </div>
      )}
    </>
  );
};

export default FormPage;
