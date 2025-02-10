// Zoom (a)

// import Timeline from 'react-calendar-timeline';
// import { useRef } from 'react';

// function MyTimelineComponent() {
//   const timelineRef = useRef(null);

//   const handleZoomIn = () => {
//     if (timelineRef.current) {
//       const { visibleTimeStart, visibleTimeEnd } = timelineRef.current.state;
//       const zoom = (visibleTimeEnd - visibleTimeStart) * 0.75; // уменьшаем интервал на 25%
//       const centerTime = (visibleTimeStart + visibleTimeEnd) / 2;

//       timelineRef.current.updateScrollCanvas(
//         centerTime - zoom / 2,
//         centerTime + zoom / 2
//       );
//     }
//   };

//   const handleZoomOut = () => {
//     if (timelineRef.current) {
//       const { visibleTimeStart, visibleTimeEnd } = timelineRef.current.state;
//       const zoom = (visibleTimeEnd - visibleTimeStart) * 1.25; // увеличиваем интервал на 25%
//       const centerTime = (visibleTimeStart + visibleTimeEnd) / 2;

//       timelineRef.current.updateScrollCanvas(
//         centerTime - zoom / 2,
//         centerTime + zoom / 2
//       );
//     }
//   };

//   return (
//     <div>
//       <div>
//         <button onClick={handleZoomIn}>Zoom In</button>
//         <button onClick={handleZoomOut}>Zoom Out</button>
//       </div>

//       <Timeline
//         ref={timelineRef}
//         // ... другие пропсы
//       />
//     </div>
//   );
// }

// Zoom (b)

// import Timeline from 'react-calendar-timeline';
// import { useRef } from 'react';

// function MyTimelineComponent() {
//   const timelineRef = useRef(null);

//   const handleZoomIn = () => {
//     if (timelineRef.current) {
//       timelineRef.current.changeZoom(0.75); // уменьшаем масштаб на 25%
//     }
//   };

//   const handleZoomOut = () => {
//     if (timelineRef.current) {
//       timelineRef.current.changeZoom(1.25); // увеличиваем масштаб на 25%
//     }
//   };

//   return (
//     <div>
//       <div>
//         <button onClick={handleZoomIn}>Zoom In</button>
//         <button onClick={handleZoomOut}>Zoom Out</button>
//       </div>

//       <Timeline
//         ref={timelineRef}
//         // ... другие пропсы
//       />
//     </div>
//   );
// }
