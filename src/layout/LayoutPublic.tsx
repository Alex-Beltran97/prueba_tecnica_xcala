import React from 'react';

import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import OrdersProvider from '../context/OrdersContext';

const LayoutPublic = () => {
  return (<>
    <Navbar />
    <main>
      <OrdersProvider>
        <Outlet />
      </OrdersProvider>
    </main>
  </>
  );
};

export default LayoutPublic;