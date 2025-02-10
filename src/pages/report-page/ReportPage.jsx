import { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useSelector, useDispatch } from 'react-redux';
import { clearReport } from '../../redux/slices/reportSlice';
import { clearSchedule } from '../../redux/slices/scheduleSlice';
import { useSendRequest } from '../../hooks/useSendRequest';
import NavigationMenu from '../../components/navigation-menu/NavigationMenu';
import ReportDocument from '../pdf-page/ReportDocument';
import Button from '../../ui/button/Button';
import PageSkeleton from '../../ui/skeletons/page-skeleton/PageSkeleton';

import s from './reportPage.module.scss';

const ReportPage = () => {
  const { id } = useParams();

  const formData = useSelector((state) => state.report.formData);
  const stages = useSelector((state) => state.report.total.stages || []);
  const stagesSort = [...stages].sort((a, b) => a.id - b.id);
  const reportByImage = useSelector((state) => state.report.groupsReportByImage);
  const loadingPage = useSelector((state) => state.report.loadingPage);
  const { pollStageDetection } = useSendRequest();
  const isDataLoaded = formData && stages && reportByImage;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    pollStageDetection(id);
  }, [id]);

  // if (!id) {
  //   return <PageSkeleton />;
  // }

  const handleStateClear = () => {
    dispatch(clearReport());
    dispatch(clearSchedule());
    navigate('/');
  };

  return (
    <>
      {loadingPage ? (
        <PageSkeleton />
      ) : (
        <div className={s.container}>
          <div className={s.navigation}>
            <NavigationMenu id={id} />{' '}
          </div>
          <div>
            <Outlet />
          </div>
          <div className={s.btns}>
            {isDataLoaded ? (
              <PDFDownloadLink
                className={s.btn}
                document={
                  <ReportDocument
                    formData={formData}
                    stages={stagesSort}
                    reportByImage={reportByImage}
                  />
                }
                fileName="Отчет.pdf">
                {({ blob, url, loading, error }) => (
                  <Button
                    title={loading ? 'Загрузка...' : 'Скачать отчет'}
                    size="big"
                    variant="secondaryHovered"
                    disabled={loading}
                  />
                )}
              </PDFDownloadLink>
            ) : (
              <Button title="Загрузка..." size="big" disabled />
            )}
            <Button
              title="Создать новый отчет"
              size="big"
              variant="secondaryHovered"
              onClick={handleStateClear}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ReportPage;
