import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { RouterProvider } from 'react-router-dom';
import { router } from './router';

import ProductsProvider from './context/ProductsContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ProductsProvider>
      <RouterProvider router={router} />
    </ProductsProvider>
  </React.StrictMode>,
);
