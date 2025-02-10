import randomColor from 'randomcolor';
import moment from 'moment';

export const generateFakeData = (groupCount = 30, itemCount = 1000, daysInPast = 30) => {
  let randomSeed = Math.floor(Math.random() * 1000);
  let groups = [];

  for (let i = 0; i < groupCount; i++) {
    groups.push({
      id: `${i + 1}`,
      title: `Group ${i + 1}`,
      rightTitle: `Person ${i + 1}`,
      bgColor: randomColor({ luminosity: 'light', seed: randomSeed + i }),
    });
  }

  let items = [];

  for (let i = 0; i < itemCount; i++) {
    const startDate =
      new Date().getTime() -
      daysInPast * 24 * 60 * 60 * 1000 +
      Math.random() * daysInPast * 24 * 60 * 60 * 1000;
    const startValue = Math.floor(startDate / 10000000) * 10000000;
    const endValue = startValue + Math.floor(Math.random() * 20) * 15 * 60 * 1000;

    items.push({
      id: i + '',
      group: `${Math.floor(Math.random() * (groupCount - 1)) + 1}`,
      title: `Item ${i + 1}`,
      start: startValue,
      end: endValue,
      className:
        moment(startDate).day() === 6 || moment(startDate).day() === 0 ? 'item-weekend' : '',
      itemProps: {
        'data-tip': `This is item ${i + 1}`,
      },
    });
  }

  items = items.sort((a, b) => b - a);

  return { groups, items };
};
