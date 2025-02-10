import { groupRendererSinglePage } from '../custom-group/CustomGroup';
import { CustomSidebarHeaderWithoutColls } from '../custom-sidebar-header/CustomSidebarHeader';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen, setGroupId } from '../../../redux/slices/calendarSlice';
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
import { BiPlusCircle, BiMinusCircle } from 'react-icons/bi';
import { PiMagnifyingGlassPlus } from 'react-icons/pi';
import { BiSolidPlusSquare, BiSolidMinusSquare } from 'react-icons/bi';
import { FaSearchPlus, FaSearchMinus } from 'react-icons/fa';
import { TfiZoomIn, TfiZoomOut } from 'react-icons/tfi';

import Calendar from '../../calendar/Calendar';

import '../../../styles/timeLine.css';
import '../../trash/style.scss';
// import './styles.scss';

moment.locale('ru');

const TimeLineSinglePage = () => {
  //   const [groupId, setGroupId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentDate = useSelector((state) => state.report.total.current_date);
  // const open = useSelector((state) => state.calendar.open);
  const reportGroups = useSelector((state) => state.report.groupsReport);
  const reportItems = useSelector((state) => state.report.itemsReport);
  const byImage = useSelector((state) => state.report.byImage);
  const sliceCurrentDate = useSelector((state) => state.schedule.currentDate);
  const index = useSelector((state) => state.report.index);

  // console.log(`sliceItems - ${JSON.stringify(sliceItems)}`);

  // console.log(JSON.stringify(byImage));
  const byImageTest = useSelector((state) => state.report.groupsReportByImage);
  // const groupsByImage = byImageTest[index].stages;

  let groupsByImage = [];
  if (byImageTest[index]?.stages) {
    groupsByImage = byImageTest[index].stages;
  }
  // const currentImageObj = byImage[2];

  // const groupsByImage = useMemo(() => {
  //   if (!currentImageObj?.report?.stages) return [];
  //   return currentImageObj.report.stages.map((stg) => ({
  //     id: stg.id,
  //     title: stg.name,
  //     done: stg.factValue,
  //     color: stg.color,
  //     height: 40,
  //     progress: true,
  //   }));
  // }, [currentImageObj]);

  const dispatch = useDispatch();

  const timelineRef = useRef(null);

  const onVisibleTimeChange = () => {
    // когда введена дата съемки, перебрасываем пользователя на CustomMarker
    if (currentDate && timelineRef.current) {
      const visibleTimeStart = moment(currentDate).add(-15, 'days').valueOf(); // видимые 15 дней до currentDate
      const visibleTimeEnd = moment(currentDate).add(15, 'days').valueOf(); // 15 дней после currentDate

      timelineRef.current.updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
    }
  };

  // useEffect(() => {
  //   onVisibleTimeChange();
  // }, [currentDate]);

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

  // const itemHandler = (itemId, e, time) => {
  //   // вызывается при клике на временной интервал
  //   // console.log('Item ID:', itemId);
  //   // console.log('Event:', e);
  //   // console.log('Time:', time);
  // };

  // const canvasHandler = (groupId, time, e) => {
  //   // вызывается при клике на сетку/таблицу canvas
  //   dispatch(setOpen(true));
  //   dispatch(setGroupId(groupId));
  //   // console.log('groupId:', groupId);
  //   // console.log('Event:', e);
  //   // console.log('Time:', time);
  // };
  console.log(`Ref - ${timelineRef.current}`);

  return (
    <div id="calendar" className="timelinecomponent">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '5px',
          // background: '#daeaff',
          // borderRadius: '5px',
          width: '80px',
          padding: '4px 6px',
          marginLeft: 'auto',
          marginBottom: '3px',
        }}>
        <TfiZoomIn
          onClick={handleZoomIn}
          style={{ fontSize: '24px', cursor: 'pointer', color: '#131313' }}
        />
        <TfiZoomOut
          onClick={handleZoomOut}
          style={{ fontSize: '24px', cursor: 'pointer', color: '#131313' }}
        />
        {/* <FaSearchPlus onClick={handleZoomIn} style={{ fontSize: '24px', cursor: 'pointer' }} />
        <FaSearchMinus onClick={handleZoomOut} style={{ fontSize: '24px', cursor: 'pointer' }} /> */}
      </div>
      <Timeline
        groups={groupsByImage}
        items={reportItems}
        lineHeight={40} // высота линии календаря
        itemHeightRatio={1} // сколько процентов занимает item от линии
        // defaultTimeStart={moment().startOf('date')}
        defaultTimeStart={moment(currentDate).add(-15, 'days').startOf('day')} //  moment().startOf('day')
        defaultTimeEnd={moment(currentDate).add(15, 'days').toDate()}
        // defaultTimeStart={moment(currentDate).startOf('day')} //  moment().startOf('day')
        // defaultTimeEnd={moment().startOf('day').add(1, 'month').toDate()}
        // visibleTimeStart={sliceCurrentDate || moment().startOf('day')}
        // visibleTimeEnd={moment().startOf('day').add(1, 'month').toDate()}
        // defaultTimeStart={moment().add(-12, 'hour')}
        // defaultTimeEnd={moment().add(12, 'hour')}
        // stackItems // 1 item под вторым
        canMove={false} // запретить перемещение
        canResize={true} // запретить изменение размера
        // canSelect={false}
        // minZoom={1000 * 60 * 60 * 24 * 90}
        sidebarWidth={310}
        // minZoom={moment.duration(1, 'day').asMilliseconds()}
        // maxZoom={moment.duration(5, 'year').asMilliseconds()}
        // onItemSelect={itemHandler}
        groupRenderer={groupRendererSinglePage}
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
          <CustomMarker date={moment(currentDate).valueOf()}>
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
      {/* {open && <Calendar />} */}
    </div>
  );
};

export default TimeLineSinglePage;
