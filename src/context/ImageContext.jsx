import { createContext, useState, useMemo } from 'react';

export const ImageContext = createContext([]);

const ImageProvider = ({ children }) => {
  const [urls, setUrls] = useState([]);

  const addImages = (newImages) => {
    setUrls(newImages);
  };

  const defaultValue = useMemo(
    () => ({
      // чтобы избежать повторного рендеринга
      urls: urls,
      addImages: addImages,
    }),
    [urls],
  );

  return <ImageContext.Provider value={defaultValue}>{children}</ImageContext.Provider>;
};

export default ImageProvider;
