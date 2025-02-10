import ImageBlock from '../../../components/image-block/ImageBlock';
import TimeLineReport from '../../../components/trash/TimeLineReport';
import Subtitle from '../../../components/subtitle/Subtitle';
import TimeLineSinglePage from '../../../components/time-line/time-line-single-page/TimeLineSinglePage';
import TimeLineTotalPage from '../../../components/time-line/time-line-total-page/TimeLineTotalPage';
import TimeLineTotalPageStyled from '../../../components/time-line/time-line-total-page/TimeLineTotalPageStyled';

const ReportPageTotal = () => {
  return (
    <div>
      <ImageBlock />
      <div style={{ marginTop: '80px', marginBottom: '24px' }}>
        <Subtitle />
      </div>
      {/* <TimeLineTotalPage /> */}
      <TimeLineTotalPageStyled />
    </div>
  );
};

export default ReportPageTotal;
