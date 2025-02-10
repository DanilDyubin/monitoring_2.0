import { createHashRouter, RouterProvider } from 'react-router-dom';

import Layout from '../layout/Layout';
import MainPage from '../pages/main-page/MainPage';
import FormPage from '../pages/form-page/FormPage';
import ReportPage from '../pages/report-page/ReportPage';
import ReportPageTotal from '../pages/report-page/report-page-total/ReportPageTotal';
import ReportPageSingle from '../pages/report-page/report-page-single/ReportPageSingle';
import PdfPage from '../pages/pdf-page/PdfPage';

const App = () => {
  const router = createHashRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          path: '/form',
          element: <FormPage />,
        },
        {
          path: '/report/:id',
          element: <ReportPage />,
          children: [
            {
              path: '',
              element: <ReportPageTotal />,
            },
            {
              path: 'single', // /report/:id/single
              element: <ReportPageSingle />,
            },
          ],
        },
      ],
    },
    {
      path: '/pdf',
      element: <PdfPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
