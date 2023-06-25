import React from 'react';

import { Box, AppBar } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (<>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <NavLink to='/'>Orders</NavLink>
        <NavLink to='/products'>Products</NavLink>
      </AppBar>
    </Box>
  </>
  );
};

export default Navbar;