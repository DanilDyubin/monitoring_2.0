import React from 'react';
import ReactDOM from 'react-dom/client';
import ImageProvider from './context/ImageContext';
import DateProvider from './context/DateContext';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './styles/index.scss';
import App from './app/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DateProvider>
        <ImageProvider>
          <App />
        </ImageProvider>
      </DateProvider>
    </Provider>
  </React.StrictMode>,
);
