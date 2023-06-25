import React from 'react';

import { createBrowserRouter } from 'react-router-dom';
import LayoutPublic from '../layout/LayoutPublic';
import Orders from '../pages/Orders';
import Products from '../pages/Products';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPublic />,
    children: [
      {
        index: true,
        element: <Orders />
      },
      {
        path: '/products',
        element: <Products />
      }
    ]
  }
]);