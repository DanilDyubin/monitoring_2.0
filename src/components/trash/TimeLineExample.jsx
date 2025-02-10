// import { groupRenderer } from '../time-line/custom-group/CustomGroup';
// import { CustomSidebarHeader } from '../time-line/custom-sidebar-header/CustomSidebarHeader';
// import React, { useRef } from 'react';
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

// import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
// import 'react-horizontal-scrolling-menu/dist/styles.css';

// import '../../styles/timeLine.css';
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
//     start_time: moment().add(-1, 'day'),
//     end_time: moment().add(2, 'day'),
//   },
//   {
//     id: 3,
//     group: 1,
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

// const itemHandler = (itemId, e, time) => {
//   // вызывается при клике на временной интервал
//   console.log('Item ID:', itemId);
//   console.log('Event:', e);
//   console.log('Time:', time);
// };

// const canvasHandler = (groupId, time, e) => {
//   // вызывается при клике на сетку/таблицу canvas
//   console.log('groupId:', groupId);
//   console.log('Event:', e);
//   console.log('Time:', time);
// };

// const TimeLineExample = ({ data }) => {
//   console.log(moment());
//   console.log(moment().format('MMMM-DD-YYYY'));
//   console.log(moment().get('day'));
//   console.log(moment('1732752000000'));

//   return (
//     <div>
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
//         stackItems // 1 item под вторым
//         canMove={false} // запретить перемещение
//         canResize={false} // запретить изменение размера
//         // canSelect={false}
//         // minZoom={1000 * 60 * 60 * 24 * 90}
//         sidebarWidth={400}
//         // minZoom={moment.duration(1, 'month').asMilliseconds()}
//         // maxZoom={moment.duration(2, 'month').asMilliseconds()}
//         // minZoom={1000 * 60 * 60 * 24 * 30}
//         // maxZoom={1000 * 60 * 60 * 24 * 280}
//         onItemSelect={itemHandler}
//         onCanvasClick={canvasHandler}
//         groupRenderer={groupRenderer}>
//         <TimelineHeaders>
//           <SidebarHeader>
//             {({ getRootProps }) => {
//               return <CustomSidebarHeader getRootProps={getRootProps} />;
//             }}
//           </SidebarHeader>
//           <DateHeader unit="year" />
//           <DateHeader
//             unit="month"
//             labelFormat={(dates) => {
//               return moment(dates[0]?.$d).format('MMM YYYY'); // костыльная функция которая помогла привязать локаль
//             }}
//           />
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
//     </div>
//   );
// };

// export default TimeLineExample;
