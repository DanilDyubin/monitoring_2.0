import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setReportData,
  setReportGroups,
  setReportItems,
  setReportGroupsByImage,
} from '../redux/slices/reportSlice';
import {
  transFormGroup,
  transFormItem,
  transformByImageArray,
} from '../service/transformResponseData';
import { setLoadingPage } from '../redux/slices/reportSlice';

// const transFormGroup = (group) => {
//   return {
//     id: group.id,
//     title: group.name,
//     done: Math.round(group.planValue),
//     deviation: Math.round(group.progress_diff),
//     height: 40,
//     progress: true,
//     color: group.color,
//   };
// };

// const transFormItem = (group) => {
//   return {
//     id: group.id,
//     group: group.id, // обязательно для привязки item к group
//     // group_title: group.title,
//     color: group.color,
//     current_date: moment().valueOf(),
//     title:
//       group.plannedStart && group.plannedEnd
//         ? `${moment(group.plannedStart).format('DD.MM')} — ${moment(group.plannedEnd).format(
//             'DD.MM',
//           )}`
//         : null,
//     start_time: group.plannedStart ? moment(group.plannedStart).valueOf() : null,
//     end_time: group.plannedEnd ? moment(group.plannedEnd).endOf('day').valueOf() : null, // endOf('day') устанавливаем время в конце дня на 23:59 чтобы выбранный день в item был подностью закрашен
//     itemProps: {
//       className: 'bordernone',
//       style: {
//         background: group.color,
//         border: 'none',
//       },
//     },
//   };
// };

// function transformByImageArray(byImageArr) {
//   return byImageArr.map((byImgObj) => {
//     // создаем копию массива и сортируем его
//     const sortedStages = [...(byImgObj.report?.stages || [])].sort((a, b) => a.id - b.id);
//     // Преобразуем каждую stage
//     const transformedStages = sortedStages.map((stage) => ({
//       id: stage.id,
//       title: stage.name,
//       done: Math.round(stage.factValue),
//       color: stage.color,
//       height: 40,
//       progress: true, // поменять
//     }));

//     return {
//       image: byImgObj.image,
//       predicted_image: byImgObj.predicted_image,
//       stages: transformedStages,
//     };
//   });
// }

// export function useSendRequest() {
//   const items = useSelector((state) => state.schedule.items);
//   const imgsIds = useSelector((state) => state.schedule.imgsIds);
//   const loadingImage = useSelector((state) => state.report.loadingImage);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const sendRequest = async () => {
//     dispatch(setLoadingPage(true));
//     const sendItems = items.map((item) => {
//       return {
//         id: item.id,
//         title: item.group_title,
//         start_time: item.start_time,
//         end_time: item.end_time,
//         current_time: item.current_date,
//       };
//     });

//     const requestBody = {
//       stages: sendItems,
//     };

//     try {
//       // отправляем items из таймлана
//       const responseCalendar = await fetch(
//         'https://msi.stage-detection.contextmachine.cloud/upload_calendar',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(requestBody),
//         },
//       );
//       if (!responseCalendar.ok) {
//         throw new Error(`Ошибка загрузки: ${responseCalendar.status}`);
//       }

//       const resultCalendar = await responseCalendar.json(); // получаем upload_calendar_id
//       if (resultCalendar) {
//         console.log(resultCalendar);
//         console.log(JSON.stringify(resultCalendar));
//       }

//       const calendarId = resultCalendar.upload_calendar_id;
//       if (!calendarId) {
//         throw new Error('Не удалось получить upload_calendar_id');
//       }

//       const responseStage = await fetch(
//         `https://msi.stage-detection.contextmachine.cloud/stage_detection/?calendar_id=${calendarId}`, // отправляем calendar_id вместе с id изображений

//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(imgsIds),
//         },
//       );
//       if (!responseStage.ok) {
//         throw new Error(`Ошибка на stage_detection: ${responseStage.status}`);
//       }
//       const resultStage = await responseStage.json(); // получаем task_id
//       console.log('stage_detection:', resultStage);

//       const taskId = resultStage.task_id;

//       const finalResult = await pollStageDetection(taskId);
//       console.log('Финальный ответ stage_detection_status:', finalResult);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   async function pollStageDetection(taskId) {
//     while (true) {
//       const res = await fetch(
//         `https://msi.stage-detection.contextmachine.cloud/stage_detection_status/${taskId}`,
//       );
//       if (!res.ok) {
//         throw new Error(`Ошибка stage_detection_status: ${res.status}`);
//       }
//       const data = await res.json();
//       console.log('Промежуточный статус:', data.status);

//       if (data.status === 'done' || data.status === 'error') {
//         // Создаем копию stages и сортируем, чтобы вывести stages по id
//         const sortedStages = [...(data.result.total.stages || [])].sort((a, b) => a.id - b.id);

//         const groups = sortedStages.map((group) => transFormGroup(group));
//         const items = sortedStages.map((item) => transFormItem(item));
//         const byImageTransformed = transformByImageArray(data.result.byImage);
//         console.log(JSON.stringify(groups));
//         dispatch(setReportData(data.result));
//         dispatch(setReportGroups(groups));
//         dispatch(setReportItems(items));
//         dispatch(setReportGroupsByImage(byImageTransformed));
//         navigate('/report');
//         dispatch(setLoadingPage(false));

//         return data;
//       }

//       // status === 'processing', подождем 10 сек, повторим
//       await new Promise((resolve) => setTimeout(resolve, 10000));
//     }
//   }

//   return { sendRequest };
// }

export function useSendRequest() {
  const items = useSelector((state) => state.schedule.items);
  const imgsIds = useSelector((state) => state.schedule.imgsIds);
  const loadingImage = useSelector((state) => state.report.loadingImage);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendRequest = async () => {
    // dispatch(setLoadingPage(true));
    const sendItems = items.map((item) => {
      return {
        id: item.id,
        title: item.group_title,
        start_time: item.start_time,
        end_time: item.end_time,
        current_time: item.current_date,
      };
    });

    const requestBody = {
      stages: sendItems,
    };

    try {
      // отправляем items из таймлана
      const responseCalendar = await fetch(
        'https://msi.stage-detection.contextmachine.cloud/upload_calendar',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        },
      );
      if (!responseCalendar.ok) {
        throw new Error(`Ошибка загрузки: ${responseCalendar.status}`);
      }

      const resultCalendar = await responseCalendar.json(); // получаем upload_calendar_id
      if (resultCalendar) {
        console.log(resultCalendar);
        console.log(JSON.stringify(resultCalendar));
      }

      const calendarId = resultCalendar.upload_calendar_id;
      if (!calendarId) {
        throw new Error('Не удалось получить upload_calendar_id');
      }

      const responseStage = await fetch(
        `https://msi.stage-detection.contextmachine.cloud/stage_detection/?calendar_id=${calendarId}`, // отправляем calendar_id вместе с id изображений

        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(imgsIds),
        },
      );
      if (!responseStage.ok) {
        throw new Error(`Ошибка на stage_detection: ${responseStage.status}`);
      }
      const resultStage = await responseStage.json(); // получаем task_id
      console.log('stage_detection:', resultStage);

      const taskId = resultStage.task_id;

      navigate(`/report/${taskId}`);
    } catch (error) {
      console.error(error);
    }
  };

  async function pollStageDetection(taskId) {
    while (true) {
      dispatch(setLoadingPage(true));
      const res = await fetch(
        `https://msi.stage-detection.contextmachine.cloud/stage_detection_status/${taskId}`,
      );
      if (!res.ok) {
        throw new Error(`Ошибка stage_detection_status: ${res.status}`);
      }
      const data = await res.json();
      console.log('Промежуточный статус:', data.status);

      if (data.status === 'done' || data.status === 'error') {
        // Создаем копию stages и сортируем, чтобы вывести stages по id
        const sortedStages = [...(data.result.total.stages || [])].sort((a, b) => a.id - b.id);
        const currentDate = data.result.total.current_date;

        const groups = sortedStages.map((group) => transFormGroup(group));
        const items = sortedStages.map((item) => transFormItem(item, currentDate));
        const byImageTransformed = transformByImageArray(data.result.byImage);

        dispatch(setReportData(data.result));
        dispatch(setReportGroups(groups));
        dispatch(setReportItems(items));
        dispatch(setReportGroupsByImage(byImageTransformed));
        dispatch(setLoadingPage(false));

        return data;
      }

      // status === 'processing', тут мы ставим на паузу 10 сек бесконечное выполнение функции
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }
  }

  return { sendRequest, pollStageDetection };
}
