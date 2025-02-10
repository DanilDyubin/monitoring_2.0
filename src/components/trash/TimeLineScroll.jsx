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

// const groups = [
//   { id: 1, title: 'Зеленый', color: 'additional information', height: 60 },
//   { id: 2, title: 'group 2', color: 'additional information', height: 60 },
// ];

// const items = [
//   {
//     id: 1,
//     group: 1,
//     title: 'item 1',
//     start_time: moment().add(1, 'day'),
//     end_time: moment().add(5, 'day'),
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
//     start_time: moment().add(1, 'day'),
//     end_time: moment().add(7, 'day'),
//   },
// ];

// const MyTimeline = () => {
//   const timelineRef = useRef(null); // Ссылка на Timeline

//   // Функция для прокрутки временной шкалы
//   const handleScroll = (event) => {
//     if (timelineRef.current) {
//       timelineRef.current.scrollLeft = event.target.scrollLeft;
//     }
//   };

//   return (
//     <div>
//       {/* Временная шкала */}
//       <Timeline
//         groups={groups}
//         items={items}
//         defaultTimeStart={moment().add(-7, 'day')}
//         defaultTimeEnd={moment().add(7, 'day')}
//         scrollRef={(el) => {
//           timelineRef.current = el; // Привязываем scrollRef к нашему useRef
//         }}
//       />

//       {/* Горизонтальный скроллбар */}
//       <div
//         style={{
//           overflowX: 'auto',
//           overflowY: 'hidden',
//           height: '20px',
//           background: '#ddd',
//         }}
//         onScroll={handleScroll}>
//         <div style={{ width: '2000px', height: '1px' }} />
//       </div>
//     </div>
//   );
// };

// export default MyTimeline;
