import { groupRendererWithoutColls } from './custom-group/CustomGroup';
import { CustomSidebarHeaderWithoutColls } from './custom-sidebar-header/CustomSidebarHeader';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen, setGroupId } from '../../redux/slices/calendarSlice';
import { clearItems } from '../../redux/slices/scheduleSlice';
import moment from 'moment';
import 'moment/locale/ru';
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  TimelineMarkers,
  TodayMarker,
  CustomMarker,
  CursorMarker,
} from 'react-calendar-timeline';

import { FaSearchPlus, FaSearchMinus } from 'react-icons/fa';
import { CiZoomOut, CiZoomIn } from 'react-icons/ci';
import { TfiZoomIn, TfiZoomOut } from 'react-icons/tfi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { GoTrash } from 'react-icons/go';

import Calendar from '../calendar/Calendar';

import '../../styles/timeLine.css';
// import './style.scss';
// import './styles.scss';

moment.locale('ru');

const TimeLineExampleLocale = () => {
  //   const [groupId, setGroupId] = useState(null);

  const open = useSelector((state) => state.calendar.open);
  const sliceItems = useSelector((state) => state.schedule.items);
  const sliceGroups = useSelector((state) => state.schedule.groups);
  const sliceCurrentDate = useSelector((state) => state.schedule.currentDate);
  console.log(`sliceItems - ${JSON.stringify(sliceItems)}`);

  const dispatch = useDispatch();

  const timelineRef = useRef(null);

  const handleZoomIn = () => {
    if (timelineRef.current) {
      timelineRef.current.changeZoom(0.5); // уменьшаем масштаб на 25%
    }
  };

  const handleZoomOut = () => {
    if (timelineRef.current) {
      timelineRef.current.changeZoom(1.5); // увеличиваем масштаб на 25%
    }
  };

  const itemHandler = (itemId, e, time) => {
    // вызывается при клике на временной интервал
    // console.log('Item ID:', itemId);
    // console.log('Event:', e);
    // console.log('Time:', time);
  };

  const canvasHandler = (groupId, time, e) => {
    // вызывается при клике на сетку/таблицу canvas
    dispatch(setOpen(true));
    dispatch(setGroupId(groupId));
    // console.log('groupId:', groupId);
    // console.log('Event:', e);
    // console.log('Time:', time);
  };

  const handleClear = () => {
    dispatch(clearItems());
  };

  //   console.log(moment());
  //   console.log(moment().format('MMMM-DD-YYYY'));
  //   console.log(moment().get('day'));
  //   console.log(moment('1732752000000'));
  console.log(`Ref - ${timelineRef.current}`);

  const onVisibleTimeChange = () => {
    // когда введена дата съемки, перебрасываем пользователя на CustomMarker
    if (sliceCurrentDate && timelineRef.current) {
      const visibleTimeStart = moment(sliceCurrentDate).add(-15, 'days').valueOf(); // видимые 15 дней до currentDate
      const visibleTimeEnd = moment(sliceCurrentDate).add(15, 'days').valueOf(); // 15 дней после currentDate

      timelineRef.current.updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
    }
  };

  useEffect(() => {
    onVisibleTimeChange();
  }, [sliceCurrentDate]);

  return (
    <div id="calendar" className="timelinecomponent">
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '5px',
          // background: '#daeaff',
          // borderRadius: '5px',
          width: '140px',
          padding: '4px 6px',
          marginLeft: 'auto',
          marginBottom: '3px',
        }}>
        {/* <FaSearchPlus onClick={handleZoomIn} style={{ fontSize: '24px', cursor: 'pointer' }} />
        <FaSearchMinus onClick={handleZoomOut} style={{ fontSize: '24px', cursor: 'pointer' }} /> */}
        {/* <CiZoomIn onClick={handleZoomIn} style={{ fontSize: '28px', cursor: 'pointer' }} />
        <CiZoomOut onClick={handleZoomOut} style={{ fontSize: '24px', cursor: 'pointer' }} /> */}
        <GoTrash
          onClick={handleClear}
          style={{ fontSize: '24px', cursor: 'pointer', marginRight: '10px', color: '#131313' }}
        />
        <TfiZoomIn
          onClick={handleZoomIn}
          style={{ fontSize: '24px', cursor: 'pointer', color: '#131313' }}
        />
        <TfiZoomOut
          onClick={handleZoomOut}
          style={{ fontSize: '24px', cursor: 'pointer', color: '#131313' }}
        />
      </div>
      <Timeline
        groups={sliceGroups}
        items={sliceItems}
        // defaultTimeStart={moment().startOf('date')}
        defaultTimeStart={moment().startOf('day')} //  moment().startOf('day')
        defaultTimeEnd={moment().startOf('day').add(1, 'month').toDate()}
        // visibleTimeStart={sliceCurrentDate || moment().startOf('day')}
        // visibleTimeEnd={moment().startOf('day').add(1, 'month').toDate()}
        // defaultTimeStart={moment().add(-12, 'hour')}
        // defaultTimeEnd={moment().add(12, 'hour')}
        itemHeightRatio={1} // изменяет высоту элементов
        // stackItems // 1 item под вторым
        canMove={false} // запретить перемещение
        canResize={true} // запретить изменение размера
        // canSelect={true}
        // minZoom={1000 * 60 * 60 * 24 * 90}
        sidebarWidth={296}
        // minZoom={moment.duration(1, 'day').asMilliseconds()}
        // maxZoom={moment.duration(5, 'year').asMilliseconds()}
        // onItemSelect={itemHandler}
        onCanvasClick={canvasHandler}
        groupRenderer={groupRendererWithoutColls}
        minZoom={60 * 60 * 1000 * 24 * 14}
        maxZoom={1000 * 60 * 60 * 24 * 360}
        ref={timelineRef}>
        <TimelineHeaders>
          <SidebarHeader>
            {({ getRootProps }) => {
              return <CustomSidebarHeaderWithoutColls getRootProps={getRootProps} />;
            }}
          </SidebarHeader>
          <DateHeader unit="primaryHeader" />
          <DateHeader />
        </TimelineHeaders>
        <TimelineMarkers>
          {/* <TodayMarker>
            {({ styles, date }) => {
              const newStyles = { ...styles, backgroundColor: '#036bfd', zIndex: '100' };
              return <div style={newStyles} className="todayMarkerLocale"></div>; // {moment(date).format('DD MM YY')}
            }}
          </TodayMarker> */}
          <CustomMarker date={sliceCurrentDate}>
            {({ styles }) => {
              const newStyles = {
                ...styles,
                width: '2px',
                backgroundColor: '#036bfd',
                zIndex: '100',
              };
              return <div className="customMarkerLocale" style={newStyles} />;
            }}
          </CustomMarker>
        </TimelineMarkers>
      </Timeline>
      {open && <Calendar />}
    </div>
  );
};

export default TimeLineExampleLocale;
