import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  imgsIds: [], //'1e3b6309-1fc9-402d-ba67-23822cfcacf1', 'fb5dcafc-e446-4d21-84ca-d09e604ec98f'
  currentDate: null,
  items: [],
  groups: [
    {
      id: 0,
      title: 'Земляные работы',
      done: 0,
      deviation: 0,
      height: 40,
      progress: true,
      color: '#FF8080',
      color_light: '#FFD9D9',
    },
    {
      id: 1,
      title: 'Шпунтовое ограждение',
      done: 0,
      deviation: 0,
      height: 40,
      progress: false,
      color: '#80E6CB',
      color_light: '#D9F8EF',
    },
    {
      id: 2,
      title: 'Распорная система',
      done: 0,
      deviation: 0,
      height: 40,
      progress: true,
      color: '#8080FF',
      color_light: '#D9D9FF',
    },
    {
      id: 3,
      title: 'Устройство фундамента',
      done: 0,
      deviation: 0,
      height: 40,
      progress: true,
      color: '#FFFF80',
      color_light: '#FFFFD9',
    },
    {
      id: 4,
      title: 'Монолит',
      done: 0,
      deviation: 0,
      height: 40,
      progress: true,
      color: '#80FFFF',
      color_light: '#D9FFFF',
    },
    {
      id: 5,
      title: 'Кладка',
      done: 0,
      deviation: 0,
      height: 40,
      progress: false,
      color: '#FFB3C9',
      color_light: '#FFE8EF',
    },
    {
      id: 6,
      title: 'Теплоизоляция',
      done: 0,
      deviation: 0,
      height: 40,
      progress: true,
      color: '#D280FF',
      color_light: '#F1D9FF',
    },
    {
      id: 7,
      title: 'Подсистема фасада',
      done: 0,
      deviation: 0,
      height: 40,
      progress: true,
      color: '#80D2FF',
      color_light: '#D9F1FF',
    },
    {
      id: 8,
      title: 'Облицовка фасада',
      done: 0,
      deviation: 0,
      height: 40,
      progress: true,
      color: '#D2FF80',
      color_light: '#F1FFD9',
    },
    {
      id: 9,
      title: 'Остекление',
      done: 0,
      deviation: 0,
      height: 40,
      progress: true,
      color: '#FFD394',
      color_light: '#FFF2DF',
    },
    {
      id: 10,
      title: 'Благоустройство',
      done: 0,
      deviation: 0,
      height: 40,
      progress: true,
      color: '#A9E7A4',
      color_light: '#E5F8E4',
    },
    // {
    //   id: 11,
    //   title: 'Работы завершены',
    //   done: 0,
    //   deviation: 0,
    //   height: 40,
    //   progress: true,
    //   color: '#B2FFE4',
    // },
  ],
};

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    addImgsIds(state, action) {
      state.imgsIds = [...state.imgsIds, ...action.payload];
    },
    removeImgId(state, action) {
      state.imgsIds = state.imgsIds.filter((id) => id !== action.payload);
    },
    addItem(state, action) {
      const newItem = action.payload;

      // Находим, есть ли уже item с таким id
      const existingIndex = state.items.findIndex((item) => item.id === newItem.id);

      if (existingIndex === -1) {
        // Если нет такого id, то обавляем в конец
        state.items = [...state.items, newItem];
      } else {
        // Удаляем старый item
        const filtered = state.items.filter((item) => item.id !== newItem.id);

        // И добавляем новый
        state.items = [...filtered, newItem];
      }

      // const indexItem = state.items.findIndex((item) => item.id === action.payload.id);
      // if (indexItem !== -1) {
      //   state.items[indexItem] = action.payload;
      //   // state.items = [...state.items, action.payload]; // если пользователь меняет уже существующий item в таймлайне, нужно в items передавать полностью новый массив с новым item (библиотека требует иммутабильности, иначе будут баги)
      // } else {
      //   state.items.push(action.payload);
      //   // state.items = [...state.items, action.payload];
      // }

      // добавление процентов "выполнено" в поле done
      const findGroup = state.groups.find((obj) => obj.id === action.payload.id);
      if (findGroup && state.currentDate && action.payload.start_time && action.payload.end_time) {
        const { start_time, end_time } = action.payload;
        const current = state.currentDate;

        // Проверка границ
        let donePercent;
        if (current <= start_time) {
          donePercent = 0;
        } else if (current >= end_time) {
          donePercent = 100;
        } else {
          const totalTime = end_time - start_time;
          const overTime = current - start_time;
          donePercent = (overTime / totalTime) * 100;
        }

        findGroup.done = donePercent;
        newItem.done = donePercent;
        // findGroup.done = Math.round(donePercent);
      }
    },
    clearItems(state) {
      state.items = [];
      state.groups = initialState.groups;
    },
    deleteItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      const findGroup = state.groups.find((group) => group.id === action.payload);
      if (findGroup) {
        findGroup.done = 0;
      }
    },
    addCurrentDate(state, action) {
      state.currentDate = action.payload;
    },
    clearSchedule() {
      // state.imgsIds = [];
      // state.currentDate = null;
      // state.items = [];
      return initialState;
    },
  },
});

export const {
  addItem,
  addCurrentDate,
  addImgsIds,
  removeImgId,
  clearItems,
  clearSchedule,
  deleteItem,
} = scheduleSlice.actions;
export default scheduleSlice.reducer;
