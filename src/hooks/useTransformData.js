// import moment from 'moment';
// import {
//   setReportData,
//   setReportGroups,
//   setReportItems,
//   setReportGroupsByImage,
// } from '../redux/slices/reportSlice';
// import { useSendRequest } from "./useSendRequest";

// const useTransformData = () => {
//     const {sendRequest} = useSendRequest();

//     const getAllCharacters = async (offset = _baseOffset) => {
//         const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
//         return res.data.results.map(_transformCharacter);
//     }

//     const getCharacter = async (id) => {
//         const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
//         return _transformCharacter(res.data.results[0]);
//     }

//     const getAllComics = async (offset = _comicsOffset) => {
//         const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
//         return res.data.results.map(_transformComics);
//     }

//     const getComic = async (id) => {
// 		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
// 		return _transformComics(res.data.results[0]);
// 	};

//     const getFindChar = async (name) => {
// 		const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
//         return res.data.results.map(_transformCharacter);
// 	};

//     const _transformCharacter = (char) => {
//         return {
//             id: char.id,
//             name: char.name,
//             description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
//             thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
//             homepage: char.urls[0].url,
//             wiki: char.urls[1].url,
//             comics: char.comics.items
//         }
//     }

//     const _transformComics = (comic) => {
//         return {
//             id: comic.id,
//             title: comic.title,
//             description: comic.description || 'There is no description',
//             pageCount: comic.pageCount ? `${comic.pageCount} p.` : 'No information',
//             language: comic.textObjects.language || 'en-us',
//             price: comic.prices[0].price,
//             thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension
//         };
//     };

//     const transFormGroup = (group) => {
//         return {
//           id: group.id,
//           title: group.name.slice(3),
//           done: Math.round(group.planValue),
//           deviation: Math.round(group.factValue),
//           height: 40,
//           progress: true,
//           color: group.color,
//         };
//       };

//       const transFormItem = (group) => {
//         return {
//           id: group.id,
//           group: group.id, // обязательно для привязки item к group
//           // group_title: group.title,
//           color: group.color,
//           current_date: moment().valueOf(),
//           title: `${moment(group.plannedStart).format('DD.MM')} — ${moment(group.plannedEnd).format(
//             'DD.MM',
//           )}`,
//           start_time: moment(group.plannedStart).valueOf(),
//           end_time: moment(group.plannedEnd).endOf('day').valueOf(), // endOf('day') устанавливаем время в конце дня на 23:59 чтобы выбранный день в item был подностью закрашен
//           itemProps: {
//             className: 'bordernone',
//             style: {
//               background: group.color,
//               border: 'none',
//             },
//           },
//         };
//       };

//       function transformByImageArray(byImageArr) {
//         // По структуре: byImageRaw = [ { image, predicted_image, report: { stages: [...] } }, ... ]
//         return byImageArr.map((byImgObj) => {
//           // Преобразуем каждую stage
//           const transformedStages = (byImgObj.report?.stages || []).map((stage) => ({
//             id: stage.id,
//             title: stage.name,
//             done: stage.factValue,
//             color: stage.color,
//             height: 40,
//             progress: true, // поменять
//           }));

//           return {
//             image: byImgObj.image,
//             predicted_image: byImgObj.predicted_image,
//             stages: transformedStages,
//             // можно добавить ещё поля
//           };
//         });
//       }

//       const getAllCharacters = async (offset = _baseOffset) => {
//         const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
//         return res.data.results.map(_transformCharacter);
//     }

//     return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics, getComic, getFindChar};
// }

// export default useTransformData;

// const transFormGroup = (group) => {
//   return {
//     id: group.id,
//     title: group.name.slice(3),
//     done: Math.round(group.planValue),
//     deviation: Math.round(group.factValue),
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
//     title: `${moment(group.plannedStart).format('DD.MM')} — ${moment(group.plannedEnd).format(
//       'DD.MM',
//     )}`,
//     start_time: moment(group.plannedStart).valueOf(),
//     end_time: moment(group.plannedEnd).endOf('day').valueOf(), // endOf('day') устанавливаем время в конце дня на 23:59 чтобы выбранный день в item был подностью закрашен
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
//   // По структуре: byImageRaw = [ { image, predicted_image, report: { stages: [...] } }, ... ]
//   return byImageArr.map((byImgObj) => {
//     // Преобразуем каждую stage
//     const transformedStages = (byImgObj.report?.stages || []).map((stage) => ({
//       id: stage.id,
//       title: stage.name,
//       done: stage.factValue,
//       color: stage.color,
//       height: 40,
//       progress: true, // поменять
//     }));

//     return {
//       image: byImgObj.image,
//       predicted_image: byImgObj.predicted_image,
//       stages: transformedStages,
//       // можно добавить ещё поля
//     };
//   });
// }
