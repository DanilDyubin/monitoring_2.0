import moment from 'moment';
import { useDispatch } from 'react-redux';
import {
  setReportData,
  setReportGroups,
  setReportItems,
  setReportGroupsByImage,
} from '../redux/slices/reportSlice';

// "stages": [
//     {
//       "id": 1,
//       "name": "01 Земляные работы",
//       "factValue": 100,
//       "planValue": 0,
//       "plannedStart": null,
//       "plannedEnd": null,
//       "progress_diff": 100,
//       "color": "#FF0000"
//     },

//     groups: [
//         {
//           id: 0,
//           title: 'Земляные работы',
//           done: 0,
//           deviation: 0,
//           height: 40,
//           progress: true,
//           color: '#FDB1B1',
//         },

const transFormGroup = (group) => {
  return {
    id: group.id,
    title: group.name.slice(3),
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
    title: `${moment(group.plannedStart).format('DD.MM')} — ${moment(group.plannedEnd).format(
      'DD.MM',
    )}`,
    start_time: moment(group.plannedStart).valueOf(),
    end_time: moment(group.plannedEnd).endOf('day').valueOf(), // endOf('day') устанавливаем время в конце дня на 23:59 чтобы выбранный день в item был подностью закрашен
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
  // По структуре: byImageRaw = [ { image, predicted_image, report: { stages: [...] } }, ... ]
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
      // можно добавить ещё поля
    };
  });
}

export function useMokRequest() {
  const dispatch = useDispatch();

  const mokRequest = async () => {
    try {
      const response = await fetch('http://localhost:3001/result');
      if (!response.ok) {
        throw new Error(`Ошибка stage_detection_status: ${response.status}`);
      }
      const result = await response.json();
      if (result) {
        const groups = result.total.stages.map((group) => transFormGroup(group));
        const items = result.total.stages.map((item) => transFormItem(item));
        const byImageTransformed = transformByImageArray(result.byImage);
        // console.log(JSON.stringify(groups));
        dispatch(setReportData(result));
        dispatch(setReportGroups(groups));
        dispatch(setReportItems(items));
        dispatch(setReportGroupsByImage(byImageTransformed));
      }
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  };
  return { mokRequest };
}
