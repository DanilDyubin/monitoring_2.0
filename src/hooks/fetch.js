import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setReportData,
  setReportGroups,
  setReportItems,
  setReportGroupsByImage,
} from '../redux/slices/reportSlice';

const transFormGroup = (group) => {
  return {
    id: group.id,
    title: group.name,
    done: Math.round(group.planValue),
    deviation: Math.round(group.factValue),
    height: 40,
    progress: true,
    color: group.color,
  };
};

const transFormItem = (group) => {
  return {
    id: group.id,
    group: group.id, // обязательно для привязки item к group
    // group_title: group.title,
    color: group.color,
    current_date: moment().valueOf(),
    title:
      group.plannedStart && group.plannedEnd
        ? `${moment(group.plannedStart).format('DD.MM')} — ${moment(group.plannedEnd).format(
            'DD.MM',
          )}`
        : null,
    start_time: group.plannedStart ? moment(group.plannedStart).valueOf() : null,
    end_time: group.plannedEnd ? moment(group.plannedEnd).endOf('day').valueOf() : null, // endOf('day') устанавливаем время в конце дня на 23:59 чтобы выбранный день в item был подностью закрашен
    itemProps: {
      className: 'bordernone',
      style: {
        background: group.color,
        border: 'none',
      },
    },
  };
};

function transformByImageArray(byImageArr) {
  return byImageArr.map((byImgObj) => {
    // Преобразуем каждую stage
    const transformedStages = (byImgObj.report?.stages || []).map((stage) => ({
      id: stage.id,
      title: stage.name,
      done: stage.factValue,
      color: stage.color,
      height: 40,
      progress: true, // поменять
    }));

    return {
      image: byImgObj.image,
      predicted_image: byImgObj.predicted_image,
      stages: transformedStages,
    };
  });
}

export function useSendRequest() {
  const items = useSelector((state) => state.schedule.items);
  const imgsIds = useSelector((state) => state.schedule.imgsIds);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendRequest = async () => {
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

      const resultCalendar = await responseCalendar.json();
      if (resultCalendar) {
        console.log(resultCalendar);
        console.log(JSON.stringify(resultCalendar));
      }

      const calendarId = resultCalendar.upload_calendar_id;
      if (!calendarId) {
        throw new Error('Не удалось получить upload_calendar_id');
      }

      const responseStage = await fetch(
        `https://msi.stage-detection.contextmachine.cloud/stage_detection/?calendar_id=${calendarId}&model=ksm-4_v3-mid`,

        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(imgsIds),
        },
      );
      if (!responseStage.ok) {
        throw new Error(`Ошибка на stage_detection: ${responseStage.status}`);
      }
      const resultStage = await responseStage.json();
      console.log('stage_detection:', resultStage);

      const taskId = resultStage.task_id;

      const finalResult = await pollStageDetection(taskId);
      console.log('Финальный ответ stage_detection_status:', finalResult);
    } catch (error) {
      console.error(error);
    }
  };

  async function pollStageDetection(taskId) {
    while (true) {
      const res = await fetch(
        `https://msi.stage-detection.contextmachine.cloud/stage_detection_status/${taskId}`,
      );
      if (!res.ok) {
        throw new Error(`Ошибка stage_detection_status: ${res.status}`);
      }
      const data = await res.json();
      console.log('Промежуточный статус:', data.status);

      if (data.status === 'done' || data.status === 'error') {
        const groups = data.result.total.stages.map((group) => transFormGroup(group));
        const items = data.result.total.stages.map((item) => transFormItem(item));
        const byImageTransformed = transformByImageArray(data.result.byImage);
        console.log(JSON.stringify(groups));
        dispatch(setReportData(data.result));
        dispatch(setReportGroups(groups));
        dispatch(setReportItems(items));
        dispatch(setReportGroupsByImage(byImageTransformed));
        navigate('/report');
        // Вернём финальный ответ
        return data;
      }

      // status === 'processing', подождем 10 сек, повторим
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }
  }

  return { sendRequest };
}
