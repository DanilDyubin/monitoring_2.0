import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PdfSchedule from './pdf-schedule/PdfSchedule';
import PdfForm from './pdf-form/PdfForm';
import SinglePhotoReport from './single-photo-report/SinglePhotoReport';
import Button from '../../ui/button/Button';
import ReportPdfPage from './ReportPdfPage';
import ReportDocumentViewer from './ReportDocumentViewer';

import s from './pdfPage.module.scss';

const PdfPage = () => {
  const formData = useSelector((state) => state.report.formData);
  const stages = useSelector((state) => state.report.total.stages || []);
  const stagesSort = [...stages].sort((a, b) => a.id - b.id);
  const reportByImage = useSelector((state) => state.report.groupsReportByImage);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const printTimer = setTimeout(() => {
  //     window.print(); // открывает диалог печати
  //   }, 1300);

  //   return () => clearTimeout(printTimer);
  // }, []);

  return (
    <div className={s.report}>
      <div className={s.container}>
        <h2 className={s.title}>Отчет о выполненных работах</h2>
        <PdfForm formData={formData} />
        <PdfSchedule stages={stagesSort} />
        <div className={s['page-break']}></div>
        <SinglePhotoReport reportByImage={reportByImage} />
        {/* <div className={s.btns}>
          <Button title="Скачать отчет" size="big" onClick={() => window.print()} />
          <Button title="Вернуться назад" size="big" onClick={() => navigate('/report')} />
        </div> */}
        {/* <ReportPdfPage formData={formData} stages={stagesSort} reportByImage={reportByImage} /> */}
        {/* <ReportDocumentViewer
          formData={formData}
          stages={stagesSort}
          reportByImage={reportByImage}
        /> */}
      </div>
    </div>
  );
};

export default PdfPage;
