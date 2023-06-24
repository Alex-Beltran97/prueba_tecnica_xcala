import React from 'react';

import { createBrowserRouter } from 'react-router-dom';
import LayoutPublic from '../layout/LayoutPublic';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPublic />
  }
]);