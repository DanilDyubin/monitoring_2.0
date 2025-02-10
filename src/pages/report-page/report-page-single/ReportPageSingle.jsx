import { useSelector } from 'react-redux';
import ImageBlockSlider from '../../../components/image-block-slider/ImageBlockSlider';
import Slider from '../../../components/slider/Slider';
import Subtitle from '../../../components/subtitle/Subtitle';
import TimeLineSinglePage from '../../../components/time-line/time-line-single-page/TimeLineSinglePage';
import TimeLineSinglePageStyled from '../../../components/time-line/time-line-single-page/TimeLineSinglePageStyled';

const ReportPageSingle = () => {
  const images = useSelector((state) => state.report.byImage);
  return (
    <div>
      <div>
        {/* <ImageBlockSlider images={images} /> */}
        <Slider />
        <div style={{ marginTop: '80px' }}>
          <Subtitle />
          {/* <TimeLineSinglePage /> */}
          <TimeLineSinglePageStyled />
        </div>
      </div>
    </div>
  );
};

export default ReportPageSingle;
