// import { groupRenderer } from '../time-line/custom-group/CustomGroup';
// import { CustomSidebarHeader } from '../time-line/custom-sidebar-header/CustomSidebarHeader';
// import React, { useState, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setOpen, setGroupId } from '../../redux/slices/calendarSlice';
// import moment from 'moment';
// import 'moment/locale/ru';
// import Timeline, {
//   TimelineHeaders,
//   SidebarHeader,
//   DateHeader,
//   TimelineMarkers,
//   TodayMarker,
//   CustomMarker,
//   CursorMarker,
// } from 'react-calendar-timeline';

// import Calendar from '../calendar/Calendar';
// import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
// import 'react-horizontal-scrolling-menu/dist/styles.css';

// import '../../styles/timeLine.css';
// import './style.scss';
// // import './styles.scss';

// moment.locale('ru');

// // const groups = [
// //   { id: 1, title: 'Зеленый', color: 'additional information', height: 60 },
// //   { id: 2, title: 'group 2', color: 'additional information', height: 60 },
// // ];

// const items = [
//   {
//     id: 0,
//     group: 0,
//     title: 'item 0',
//     start_time: moment('12.05.2024'),
//     end_time: moment('12.12.2024'),
//     itemProps: {
//       className: 'bordernone',
//       style: {
//         background: 'fuchsia',
//         border: 'none',
//       },
//     },
//   },
//   {
//     id: 1,
//     group: 1,
//     title: 'item 1',
//     start_time: 1732752000000,
//     end_time: 1733097600000,
//     itemProps: {
//       className: 'bordernone',
//       style: {
//         background: 'fuchsia',
//         border: 'none',
//       },
//     },
//   },
//   {
//     id: 2,
//     group: 2,
//     title: 'item 2',
//     start_time: moment().add(+1, 'day'),
//     end_time: moment().add(4, 'day'),
//   },
//   {
//     id: 3,
//     group: 4,
//     title: 'item 3',
//     start_time: 1733097400000,
//     end_time: moment().add(7, 'day'),
//   },
// ];

// const format = {
//   long: 'YYYY',
//   mediumLong: 'YYYY',
//   medium: 'YYYY',
//   short: 'YY',
// };

// const TimeLineExampleLocale = ({ data }) => {
//   //   const [groupId, setGroupId] = useState(null);

//   const open = useSelector((state) => state.calendar.open);
//   const sliceItems = useSelector((state) => state.schedule.items);
//   console.log(`sliceItems - ${sliceItems}`);
//   const dispatch = useDispatch();

//   const timelineRef = useRef(null);

//   const handleZoomIn = () => {
//     if (timelineRef.current) {
//       timelineRef.current.changeZoom(0.5); // уменьшаем масштаб на 25%
//     }
//   };

//   const handleZoomOut = () => {
//     if (timelineRef.current) {
//       timelineRef.current.changeZoom(1.5); // увеличиваем масштаб на 25%
//     }
//   };

//   const itemHandler = (itemId, e, time) => {
//     // вызывается при клике на временной интервал
//     console.log('Item ID:', itemId);
//     console.log('Event:', e);
//     console.log('Time:', time);
//   };

//   const canvasHandler = (groupId, time, e) => {
//     // вызывается при клике на сетку/таблицу canvas
//     dispatch(setOpen(true));
//     dispatch(setGroupId(groupId));
//     console.log('groupId:', groupId);
//     console.log('Event:', e);
//     console.log('Time:', time);
//   };

//   //   console.log(moment());
//   //   console.log(moment().format('MMMM-DD-YYYY'));
//   //   console.log(moment().get('day'));
//   //   console.log(moment('1732752000000'));
//   console.log(timelineRef.current);

//   const customItemRenderer = ({ item, itemContext, getItemProps, getResizeProps }) => {
//     const { dimensions } = itemContext;
//     const todayPosition = moment().valueOf(); // Текущая дата в миллисекундах

//     // Проверяем положение элемента относительно сегодняшнего дня
//     const isBeforeToday = item.end_time < todayPosition;
//     const isAfterToday = item.start_time >= todayPosition;

//     // Определяем цвет в зависимости от положения
//     const backgroundColor = isBeforeToday
//       ? 'red' // До сегодняшнего дня
//       : isAfterToday
//       ? 'green' // После сегодняшнего дня
//       : 'linear-gradient(to right, red 50%, green 50%)'; // Если пересекает TodayMarker

//     return (
//       <div
//         {...getItemProps({
//           style: {
//             backgroundColor,
//             color: 'white',
//             borderRadius: '4px',
//             padding: '5px',
//             height: `${dimensions.height}px`,
//             border: 'none',
//           },
//         })}>
//         <div>{item.title}</div>
//       </div>
//     );
//   };

//   return (
//     <div id="calendar" className="timelinecomponent">
//       <div>
//         <button onClick={handleZoomIn}>Zoom In</button>
//         <button onClick={handleZoomOut}>ZoomOut</button>
//         <button onClick={() => setOpen(false)}>close calendar</button>
//       </div>
//       <Timeline
//         groups={data.total.stages}
//         items={items}
//         defaultTimeStart={moment().startOf('date')}
//         defaultTimeEnd={moment().startOf('day').add(1, 'month').toDate()}
//         // visibleTimeStart={moment().startOf('1733097600000').toDate()}
//         // visibleTimeEnd={moment().add(1, 'month').startOf('month').toDate()}
//         // defaultTimeStart={moment().add(-12, 'hour')}
//         // defaultTimeEnd={moment().add(12, 'hour')}
//         itemHeightRatio={1} // изменяет высоту элементов
//         // stackItems // 1 item под вторым
//         canMove={false} // запретить перемещение
//         canResize={true} // запретить изменение размера
//         // canSelect={false}
//         // minZoom={1000 * 60 * 60 * 24 * 90}
//         sidebarWidth={400}
//         // minZoom={moment.duration(1, 'month').asMilliseconds()}
//         // maxZoom={moment.duration(2, 'month').asMilliseconds()}
//         // minZoom={1000 * 60 * 60 * 24 * 30}
//         // maxZoom={1000 * 60 * 60 * 24 * 280}
//         onItemSelect={itemHandler}
//         onCanvasClick={canvasHandler}
//         groupRenderer={groupRenderer}
//         ref={timelineRef}
//         itemRenderer={customItemRenderer}>
//         <TimelineHeaders>
//           <SidebarHeader>
//             {({ getRootProps }) => {
//               return <CustomSidebarHeader getRootProps={getRootProps} />;
//             }}
//           </SidebarHeader>
//           <DateHeader unit="primaryHeader" />
//           <DateHeader />
//         </TimelineHeaders>
//         <TimelineMarkers>
//           <TodayMarker>
//             {({ styles, date }) => {
//               const newStyles = { ...styles, backgroundColor: '#036bfd', zIndex: '100' };
//               return <div style={newStyles}>{moment(date).format('DD MM YY')}</div>;
//             }}
//           </TodayMarker>
//         </TimelineMarkers>
//       </Timeline>
//       {open && <Calendar />}
//     </div>
//   );
// };

// export default TimeLineExampleLocale;
