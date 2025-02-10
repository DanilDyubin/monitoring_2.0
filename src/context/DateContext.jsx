import { createContext, useState, useMemo } from 'react';

// const defaultState = {
//   range: { to: null, from: null },
// };
export const DateContext = createContext({});

const DateProvider = ({ children }) => {
  const [date, setDate] = useState({});
  console.log(date);

  const handleSelect = (newDate) => {
    const isRangeSelected = newDate.from && newDate.to;
    setDate(newDate);
  };

  //   const defaultValue = useMemo(
  //     () => ({
  //       // чтобы избежать повторного рендеринга
  //       urls: urls,
  //       addImages: addImages,
  //     }),
  //     [urls],
  //   );

  return <DateContext.Provider value={{ date, handleSelect }}>{children}</DateContext.Provider>;
};

export default DateProvider;
