// import './customItems.scss';

// export const CustomItem = ({ item, itemContext, getItemProps, getResizeProps }) => {
//   console.log(`Item ${JSON.stringify(item)}`);
//   console.log(`ItemContext ${JSON.stringify(itemContext)}`);
//   const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
//   return (
//     <div {...getItemProps(item.itemProps)}>
//       {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ''}

//       <div className="rct-item">
//         <div
//           className="color-done"
//           style={{
//             width: `${itemContext.dimensions.order.group.done}%`,
//             background: `${itemContext.dimensions.order.group.color}`,
//           }}></div>
//         <div className="rct-item-content" style={{ maxHeight: `${itemContext.dimensions.height}` }}>
//           {/* {itemContext.title} */}
//           {item.title}
//         </div>
//       </div>

//       {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ''}
//     </div>
//   );
// };

// export const CustomItemTotalPage = ({ item, itemContext, getItemProps, getResizeProps }) => {
//   console.log(`Item ${JSON.stringify(item)}`);
//   console.log(`ItemContext ${JSON.stringify(itemContext)}`);
//   const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
//   return (
//     <div {...getItemProps(item.itemProps)}>
//       {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ''}

//       <div className="rct-item">
//         <div
//           className="color-done"
//           style={{
//             width: `${item.plan}%`,
//             backgroundColor: `${item.color}`,
//           }}></div>
//         <div className="rct-item-content" style={{ maxHeight: `${itemContext.dimensions.height}` }}>
//           {itemContext.title}
//         </div>
//       </div>

//       {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ''}
//     </div>
//   );
// };

// export const CustomItemSinglePage = ({ item, itemContext, getItemProps, getResizeProps }) => {
//   console.log(`Item ${JSON.stringify(item)}`);
//   console.log(`ItemContext ${JSON.stringify(itemContext)}`);
//   const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
//   return (
//     <div {...getItemProps(item.itemProps)}>
//       {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ''}

//       <div className="rct-item">
//         <div
//           className="color-done"
//           style={{
//             width: `${item.plan}%`,
//             backgroundColor: `${item.color}`,
//             // width: `${itemContext.dimensions.order.group.done}%`,
//             // backgroundColor: `${itemContext.dimensions.order.group.color}`,
//           }}></div>
//         <div className="rct-item-content" style={{ maxHeight: `${itemContext.dimensions.height}` }}>
//           {itemContext.title}
//         </div>
//       </div>

//       {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ''}
//     </div>
//   );
// };

import { TiDelete } from 'react-icons/ti';
import { IoMdCloseCircle } from 'react-icons/io';
import { RiCloseCircleLine } from 'react-icons/ri';
import './customItems.scss';

export const CustomItem = ({ item, itemContext, getItemProps, timelineContext }) => {
  // console.log(`Item ${JSON.stringify(item)}`);
  // console.log(`ItemContext ${JSON.stringify(itemContext)}`);
  // console.log(`timelineContext ${JSON.stringify(timelineContext)}`);

  // const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();

  const canvasStartTime = timelineContext.canvasTimeStart; // Таймштамп начала канваса
  const canvasEndTime = timelineContext.canvasTimeEnd; // Таймштамп окончания канваса
  const itemStartTime = item.start_time; // Таймштамп начала этапа
  const itemEndTime = item.end_time; // Таймштамп окончания этапа
  const currentDate = item.current_date; // Таймштамп даты съемки.
  // const percentOfDone = itemContext.dimensions.order.group.done; // Процент выполнения этапа
  // const doneTime = itemStartTime + (itemEndTime - itemStartTime) * (percentOfDone / 100); // Таймштамп даты съемки. (?)возможно это можно получить без лишних вычислений

  // Таймштамп начала этапа на канвасе, если этап начинается раньше начала канваса, то берем за начало этапа начало канваса
  const startTime = Math.max(canvasStartTime, itemStartTime);

  // Таймштамп окончания этапа на канвасе, если этап заканчивается позже конца канваса, то берем за конец этапа конец канваса
  const endTime = Math.min(canvasEndTime, itemEndTime);

  // Находим процент ширины линии до таймштампа даты съемки относительно отрендеренного таймлайна этапа
  let percentWidthDoneLine;
  if (endTime < currentDate) {
    percentWidthDoneLine = 100;
  } else if (startTime > currentDate) {
    percentWidthDoneLine = 0;
  } else {
    percentWidthDoneLine = ((currentDate - startTime) / (endTime - startTime)) * 100;
  }
  // const percentWidthDoneLine = ((currentDate - startTime) / (endTime - startTime)) * 100;

  return (
    <div {...getItemProps(item.itemProps)}>
      <div className={`${itemContext.selected ? 'custom-item item-selected' : 'custom-item'}`}>
        <div
          className="color-done"
          style={{
            width: `${percentWidthDoneLine}%`,
            background: `${itemContext.dimensions.order.group.color}`,
          }}></div>
        <div className="rct-item-content" style={{ maxHeight: `${itemContext.dimensions.height}` }}>
          {itemContext.selected ? (
            <div className="item-delete">
              УДАЛИТЬ
              <IoMdCloseCircle className="item-delete--icon" />{' '}
            </div>
          ) : (
            item.title
          )}
        </div>
      </div>
    </div>
  );
};

export const CustomItemTotalPage = ({
  item,
  itemContext,
  getItemProps,
  getResizeProps,
  timelineContext,
}) => {
  // const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();

  const canvasStartTime = timelineContext.canvasTimeStart; // Таймштамп начала канваса
  const canvasEndTime = timelineContext.canvasTimeEnd; // Таймштамп окончания канваса
  const itemStartTime = item.start_time; // Таймштамп начала этапа
  const itemEndTime = item.end_time; // Таймштамп окончания этапа
  const currentDate = item.current_date;
  // const percentOfDone = item.plan; // Процент выполнения этапа
  //const doneTime = itemStartTime + (itemEndTime - itemStartTime) * (percentOfDone / 100); // Таймштамп даты съемки. (?)возможно это можно получить без лишних вычислений

  // Таймштамп начала этапа на канвасе, если этап начинается раньше начала канваса, то берем за начало этапа начало канваса
  const startTime = Math.max(canvasStartTime, itemStartTime);

  // Таймштамп окончания этапа на канвасе, если этап заканчивается позже конца канваса, то берем за конец этапа конец канваса
  const endTime = Math.min(canvasEndTime, itemEndTime);

  // Находим процент ширины линии до таймштампа даты съемки относительно отрендеренного таймлайна этапа
  let percentWidthDoneLine;
  if (endTime < currentDate) {
    percentWidthDoneLine = 100;
  } else if (startTime > currentDate) {
    percentWidthDoneLine = 0;
  } else {
    percentWidthDoneLine = ((currentDate - startTime) / (endTime - startTime)) * 100;
  }

  return (
    <div {...getItemProps(item.itemProps)}>
      {/* {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ''} */}

      <div className="custom-item">
        <div
          className="color-done"
          style={{
            width: `${percentWidthDoneLine}%`,
            backgroundColor: `${item.color}`,
          }}></div>
        <div className="rct-item-content" style={{ maxHeight: `${itemContext.dimensions.height}` }}>
          {itemContext.title}
        </div>
      </div>

      {/* {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ''} */}
    </div>
  );
};

export const CustomItemSinglePage = ({
  item,
  itemContext,
  getItemProps,
  getResizeProps,
  timelineContext,
}) => {
  console.log(`Item ${JSON.stringify(item)}`);
  console.log(`ItemContext ${JSON.stringify(itemContext)}`);
  console.log(`timelineContext ${JSON.stringify(timelineContext)}`);
  const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();

  const canvasStartTime = timelineContext.canvasTimeStart; // Таймштамп начала канваса
  const canvasEndTime = timelineContext.canvasTimeEnd; // Таймштамп окончания канваса
  const itemStartTime = item.start_time; // Таймштамп начала этапа
  const itemEndTime = item.end_time; // Таймштамп окончания этапа
  const currentDate = item.current_date;

  // Таймштамп начала этапа на канвасе, если этап начинается раньше начала канваса, то берем за начало этапа начало канваса
  const startTime = Math.max(canvasStartTime, itemStartTime);

  // Таймштамп окончания этапа на канвасе, если этап заканчивается позже конца канваса, то берем за конец этапа конец канваса
  const endTime = Math.min(canvasEndTime, itemEndTime);

  // Находим процент ширины линии до таймштампа даты съемки относительно отрендеренного таймлайна этапа
  let percentWidthDoneLine;
  if (endTime < currentDate) {
    percentWidthDoneLine = 100;
  } else if (startTime > currentDate) {
    percentWidthDoneLine = 0;
  } else {
    percentWidthDoneLine = ((currentDate - startTime) / (endTime - startTime)) * 100;
  }

  return (
    <div {...getItemProps(item.itemProps)}>
      {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ''}

      <div className="custom-item">
        <div
          className="color-done"
          style={{
            width: `${percentWidthDoneLine}%`,
            backgroundColor: `${item.color}`,

            // width: `${itemContext.dimensions.order.group.done}%`,
            // backgroundColor: `${itemContext.dimensions.order.group.color}`,
          }}></div>
        <div className="rct-item-content" style={{ maxHeight: `${itemContext.dimensions.height}` }}>
          {itemContext.title}
        </div>
      </div>

      {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ''}
    </div>
  );
};

// import './customItems.scss';

// export const CustomItem = ({
//   item,
//   itemContext,
//   getItemProps,
//   getResizeProps,
//   timelineContext,
// }) => {
//   // console.log(`Item ${JSON.stringify(item)}`);
//   // console.log(`ItemContext ${JSON.stringify(itemContext)}`);
//   // console.log(`timelineContext ${JSON.stringify(timelineContext)}`);
//   console.log(`Item rendered: ${item.id}`);
//   const props = getItemProps({
//     onClick: (e) => {
//       console.log('✅ Клик по item:', item.id);
//     },
//   });

//   console.log('🔍 getItemProps для item', item.id, props);
//   // const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();

//   const canvasStartTime = timelineContext.canvasTimeStart; // Таймштамп начала канваса
//   const canvasEndTime = timelineContext.canvasTimeEnd; // Таймштамп окончания канваса
//   const itemStartTime = item.start_time; // Таймштамп начала этапа
//   const itemEndTime = item.end_time; // Таймштамп окончания этапа
//   const currentDate = item.current_date; // Таймштамп даты съемки.
//   // const percentOfDone = itemContext.dimensions.order.group.done; // Процент выполнения этапа
//   // const doneTime = itemStartTime + (itemEndTime - itemStartTime) * (percentOfDone / 100); // Таймштамп даты съемки. (?)возможно это можно получить без лишних вычислений

//   // Таймштамп начала этапа на канвасе, если этап начинается раньше начала канваса, то берем за начало этапа начало канваса
//   const startTime = Math.max(canvasStartTime, itemStartTime);

//   // Таймштамп окончания этапа на канвасе, если этап заканчивается позже конца канваса, то берем за конец этапа конец канваса
//   const endTime = Math.min(canvasEndTime, itemEndTime);

//   // Находим процент ширины линии до таймштампа даты съемки относительно отрендеренного таймлайна этапа
//   let percentWidthDoneLine;
//   if (endTime < currentDate) {
//     percentWidthDoneLine = 100;
//   } else if (startTime > currentDate) {
//     percentWidthDoneLine = 0;
//   } else {
//     percentWidthDoneLine = ((currentDate - startTime) / (endTime - startTime)) * 100;
//   }
//   // const percentWidthDoneLine = ((currentDate - startTime) / (endTime - startTime)) * 100;

//   return (
//     <div {...getItemProps(item.itemProps)}>
//       {/* {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ''} */}

//       <div className={`${itemContext.selected ? 'rct-item item-selected' : 'rct-item'}`}>
//         <div
//           className="color-done"
//           style={{
//             width: `${percentWidthDoneLine}%`,
//             background: `${itemContext.dimensions.order.group.color}`,
//           }}></div>
//         <div className="rct-item-content" style={{ maxHeight: `${itemContext.dimensions.height}` }}>
//           {/* {itemContext.title} */}
//           {item.title}
//         </div>
//       </div>

//       {/* {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ''} */}
//     </div>
//   );
// };

// export const CustomItemTotalPage = ({
//   item,
//   itemContext,
//   getItemProps,
//   getResizeProps,
//   timelineContext,
// }) => {
//   console.log(`Item ${JSON.stringify(item)}`);
//   console.log(`ItemContext ${JSON.stringify(itemContext)}`);
//   console.log(`timelineContext ${JSON.stringify(timelineContext)}`);
//   const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();

//   const canvasStartTime = timelineContext.canvasTimeStart; // Таймштамп начала канваса
//   const canvasEndTime = timelineContext.canvasTimeEnd; // Таймштамп окончания канваса
//   const itemStartTime = item.start_time; // Таймштамп начала этапа
//   const itemEndTime = item.end_time; // Таймштамп окончания этапа
//   const percentOfDone = item.plan; // Процент выполнения этапа
//   const doneTime = itemStartTime + (itemEndTime - itemStartTime) * (percentOfDone / 100); // Таймштамп даты съемки. (?)возможно это можно получить без лишних вычислений

//   // Таймштамп начала этапа на канвасе, если этап начинается раньше начала канваса, то берем за начало этапа начало канваса
//   const startTime = Math.max(canvasStartTime, itemStartTime);

//   // Таймштамп окончания этапа на канвасе, если этап заканчивается позже конца канваса, то берем за конец этапа конец канваса
//   const endTime = Math.min(canvasEndTime, itemEndTime);

//   // Находим процент ширины линии до таймштампа даты съемки относительно отрендеренного таймлайна этапа
//   const percentWidthDoneLine = ((doneTime - startTime) / (endTime - startTime)) * 100;

//   return (
//     <div {...getItemProps(item.itemProps)}>
//       {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ''}

//       <div className="rct-item">
//         <div
//           className="color-done"
//           style={{
//             width: `${percentWidthDoneLine}%`,
//             backgroundColor: `${item.color}`,
//           }}></div>
//         <div className="rct-item-content" style={{ maxHeight: `${itemContext.dimensions.height}` }}>
//           {itemContext.title}
//         </div>
//       </div>

//       {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ''}
//     </div>
//   );
// };

// export const CustomItemSinglePage = ({
//   item,
//   itemContext,
//   getItemProps,
//   getResizeProps,
//   timelineContext,
// }) => {
//   console.log(`Item ${JSON.stringify(item)}`);
//   console.log(`ItemContext ${JSON.stringify(itemContext)}`);
//   console.log(`timelineContext ${JSON.stringify(timelineContext)}`);
//   const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();

//   const canvasStartTime = timelineContext.canvasTimeStart; // Таймштамп начала канваса
//   const canvasEndTime = timelineContext.canvasTimeEnd; // Таймштамп окончания канваса
//   const itemStartTime = item.start_time; // Таймштамп начала этапа
//   const itemEndTime = item.end_time; // Таймштамп окончания этапа
//   const percentOfDone = item.plan; // Процент выполнения этапа
//   const doneTime = itemStartTime + (itemEndTime - itemStartTime) * (percentOfDone / 100); // Таймштамп даты съемки. (?)возможно это можно получить без лишних вычислений

//   // Таймштамп начала этапа на канвасе, если этап начинается раньше начала канваса, то берем за начало этапа начало канваса
//   const startTime = Math.max(canvasStartTime, itemStartTime);

//   // Таймштамп окончания этапа на канвасе, если этап заканчивается позже конца канваса, то берем за конец этапа конец канваса
//   const endTime = Math.min(canvasEndTime, itemEndTime);

//   // Находим процент ширины линии до таймштампа даты съемки относительно отрендеренного таймлайна этапа
//   const percentWidthDoneLine = ((doneTime - startTime) / (endTime - startTime)) * 100;

//   return (
//     <div {...getItemProps(item.itemProps)}>
//       {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ''}

//       <div className="rct-item">
//         <div
//           className="color-done"
//           style={{
//             width: `${percentWidthDoneLine}%`,
//             backgroundColor: `${item.color}`,

//             // width: `${itemContext.dimensions.order.group.done}%`,
//             // backgroundColor: `${itemContext.dimensions.order.group.color}`,
//           }}></div>
//         <div className="rct-item-content" style={{ maxHeight: `${itemContext.dimensions.height}` }}>
//           {itemContext.title}
//         </div>
//       </div>

//       {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ''}
//     </div>
//   );
// };
