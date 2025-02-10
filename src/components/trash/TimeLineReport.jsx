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

// const groups = [
//   {
//     id: 0,
//     title: 'Земляные работы',
//     done: 25,
//     deviation: 10,
//     plannedStart: 1,
//     plannedEnd: 2,
//     factStart: 1,
//     factEnd: 2,
//     height: 40,
//     progress: true,
//     color: '#FDB1B1',
//   },
//   {
//     id: 1,
//     title: 'Шпунтовое ограждение',
//     done: 80,
//     deviation: 5,
//     plannedStart: 1,
//     plannedEnd: 2,
//     factStart: 1,
//     factEnd: 2,
//     height: 40,
//     progress: false,
//     color: '#B2FFB4',
//   },
//   {
//     id: 2,
//     title: 'Распорная система',
//     done: 24,
//     deviation: 24,
//     plannedStart: 1,
//     plannedEnd: 2,
//     factStart: 1,
//     factEnd: 2,
//     height: 40,
//     progress: true,
//     color: '#B3B2FE',
//   },
//   {
//     id: 3,
//     title: 'Устройство фундамента',
//     done: 10,
//     deviation: 0,
//     plannedStart: 1,
//     plannedEnd: 2,
//     factStart: 1,
//     factEnd: 2,
//     height: 40,
//     progress: true,
//     color: '#FFFEB2',
//   },
//   {
//     id: 4,
//     title: 'Монолит',
//     done: 100,
//     deviation: 100,
//     plannedStart: 1,
//     plannedEnd: 2,
//     factStart: 1,
//     factEnd: 2,
//     height: 40,
//     progress: true,
//     color: '#FFB2FF',
//   },
//   {
//     id: 5,
//     title: 'Кладка',
//     done: 69,
//     deviation: 1,
//     plannedStart: 1,
//     plannedEnd: 2,
//     factStart: 1,
//     factEnd: 2,
//     height: 40,
//     progress: false,
//     color: '#8CFFFF',
//   },
//   {
//     id: 6,
//     title: 'Теплоизоляция',
//     done: 30,
//     deviation: 12,
//     plannedStart: 1,
//     plannedEnd: 2,
//     factStart: 1,
//     factEnd: 2,
//     height: 40,
//     progress: true,
//     color: '#FEDFA5',
//   },
//   {
//     id: 7,
//     title: 'Подсистема фасада',
//     done: 30,
//     deviation: 0,
//     plannedStart: 1,
//     plannedEnd: 2,
//     factStart: 1,
//     factEnd: 2,
//     height: 40,
//     progress: true,
//     color: '#FFB2E4',
//   },
//   {
//     id: 8,
//     title: 'Облицовка фасада',
//     done: 30,
//     deviation: 0,
//     plannedStart: 1,
//     plannedEnd: 2,
//     factStart: 1,
//     factEnd: 2,
//     height: 40,
//     progress: true,
//     color: '#FFB2FF',
//   },
//   {
//     id: 9,
//     title: 'Остекление',
//     done: 30,
//     deviation: 0,
//     plannedStart: 1,
//     plannedEnd: 2,
//     factStart: 1,
//     factEnd: 2,
//     height: 40,
//     progress: true,
//     color: '#B2E3FF',
//   },
//   {
//     id: 10,
//     title: 'Благоустройство',
//     done: 30,
//     deviation: 12,
//     plannedStart: 1,
//     plannedEnd: 2,
//     factStart: 1,
//     factEnd: 2,
//     height: 40,
//     progress: true,
//     color: '#E3FFB2',
//   },
//   {
//     id: 11,
//     title: 'Работы завершены',
//     done: 30,
//     deviation: 12,
//     plannedStart: 1,
//     plannedEnd: 2,
//     factStart: 1,
//     factEnd: 2,
//     height: 40,
//     progress: true,
//     color: '#B2FFE4',
//   },
// ];

// const itemsColors = [
//   // '#FDB1B1',
//   // '#B2FFB4',
//   // '#B3B2FE',
//   // '#FFFEB2',
//   // '#FFB2FF',
//   // '#8CFFFF',
//   // '#FEDFA5',
//   // '#FFB2E4',
//   // '#FFB2FF',
//   // '#B2E3FF',
//   // '#E3FFB2',
//   // '#B2FFE4',
// ];

// const items = [
//   {
//     id: 0,
//     group: 0,
//     title: 'item 0',
//     start_time: 1733950800000,
//     end_time: 1764536400000,
//     itemProps: {
//       className: 'bordernone',
//       style: {
//         background: '#FDB1B1',
//         border: 'none',
//       },
//     },
//   },
//   {
//     id: 1,
//     group: 1,
//     title: 'item 1',
//     start_time: 1733950800000,
//     end_time: 1764536400000,
//     itemProps: {
//       className: 'bordernone',
//       style: {
//         background: '#B2FFB4',
//         border: 'none',
//       },
//     },
//   },
//   {
//     id: 2,
//     group: 2,
//     title: 'item 2',
//     start_time: moment().add(-1, 'day'),
//     end_time: moment().add(2, 'day'),
//     itemProps: {
//       className: 'bordernone',
//       style: {
//         background: '#B3B2FE',
//         border: 'none',
//       },
//     },
//   },
//   {
//     id: 3,
//     group: 3,
//     title: 'item 3',
//     start_time: 1733259600000,
//     end_time: moment().add(7, 'day'),
//     itemProps: {
//       className: 'bordernone',
//       style: {
//         background: '#FFFEB2',
//         border: 'none',
//       },
//     },
//   },
//   {
//     id: 4,
//     group: 4,
//     title: 'item 3',
//     start_time: 1733518800000,
//     end_time: 1738903000000,
//     itemProps: {
//       className: 'bordernone',
//       style: {
//         background: '#FFB2FF',
//         border: 'none',
//       },
//     },
//   },
//   {
//     id: 5,
//     group: 5,
//     title: 'item 3',
//     start_time: 1733778000000,
//     end_time: moment().add(7, 'day'),
//     itemProps: {
//       className: 'bordernone',
//       style: {
//         background: '#8CFFFF',
//         border: 'none',
//       },
//     },
//   },
//   {
//     id: 6,
//     group: 6,
//     title: 'item 3',
//     start_time: 1736802000000,
//     end_time: 1738903000000,
//     itemProps: {
//       className: 'bordernone',
//       style: {
//         background: '#FEDFA5',
//         border: 'none',
//       },
//     },
//   },
//   {
//     id: 7,
//     group: 7,
//     title: 'item 3',
//     start_time: 1737147600000,
//     end_time: 1739903000000,
//     itemProps: {
//       className: 'bordernone',
//       style: {
//         background: '#FFB2E4',
//         border: 'none',
//       },
//     },
//   },
//   {
//     id: 8,
//     group: 8,
//     title: 'item 3',
//     start_time: 1734160400000,
//     end_time: 1739983000000,
//     itemProps: {
//       className: 'bordernone',
//       style: {
//         background: '#FFB2FF',
//         border: 'none',
//       },
//     },
//   },
//   {
//     id: 9,
//     group: 9,
//     title: 'item 3',
//     start_time: 1733097400000,
//     end_time: moment().add(7, 'day'),
//     itemProps: {
//       className: 'bordernone',
//       style: {
//         background: '#B2E3FF',
//         border: 'none',
//       },
//     },
//   },
//   {
//     id: 10,
//     group: 10,
//     title: 'item 3',
//     start_time: 1733097400000,
//     end_time: moment().add(7, 'day'),
//     itemProps: {
//       className: 'bordernone',
//       style: {
//         background: '#E3FFB2',
//         border: 'none',
//       },
//     },
//   },
//   {
//     id: 11,
//     group: 11,
//     title: 'item 3',
//     start_time: 1733097400000,
//     end_time: moment().add(7, 'day'),
//     itemProps: {
//       className: 'bordernone',
//       style: {
//         background: '#B2FFE4',
//         border: 'none',
//       },
//     },
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
//   console.log(moment('12-04-2024').valueOf());
//   console.log(moment('12-07-2024').valueOf());
//   console.log(moment('12-10-2024').valueOf());
//   console.log(moment('01-14-2025').valueOf());
//   console.log(moment('01-18-2025').valueOf());
//   console.log(moment('12-26-2025').valueOf());
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

//   return (
//     <div id="calendar" className="timelinecomponent">
//       <div>
//         <button onClick={handleZoomIn}>Zoom In</button>
//         <button onClick={handleZoomOut}>ZoomOut</button>
//       </div>
//       <Timeline
//         groups={groups}
//         items={items}
//         // defaultTimeStart={moment().startOf('date')}
//         defaultTimeStart={moment().startOf('day')}
//         defaultTimeEnd={moment().startOf('day').add(1, 'year').toDate()}
//         // visibleTimeStart={moment('12-12-2024').startOf('day').toDate()}
//         // visibleTimeEnd={moment('12-12-20245').startOf('day').toDate()}
//         // defaultTimeStart={moment().add(-12, 'hour')}
//         // defaultTimeEnd={moment().add(12, 'hour')}
//         itemHeightRatio={1} // изменяет высоту элементов
//         // stackItems // 1 item под вторым
//         canMove={false} // запретить перемещение
//         canResize={true} // запретить изменение размера
//         // canSelect={false}
//         // minZoom={1000 * 60 * 60 * 24 * 90}
//         sidebarWidth={400}
//         // minZoom={moment.duration(1, 'day').asMilliseconds()}
//         // maxZoom={moment.duration(5, 'year').asMilliseconds()}
//         onItemSelect={itemHandler}
//         onCanvasClick={canvasHandler}
//         groupRenderer={groupRenderer}
//         minZoom={60 * 60 * 1000 * 24 * 7}
//         maxZoom={1000 * 60 * 60 * 24 * 360 * 1.5}
//         ref={timelineRef}>
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
//               return <div style={newStyles} className="todayMarkerLocale"></div>; // {moment(date).format('DD MM YY')}
//             }}
//           </TodayMarker>
//         </TimelineMarkers>
//       </Timeline>
//       {open && <Calendar />}
//     </div>
//   );
// };

// export default TimeLineExampleLocale;
