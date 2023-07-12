import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './BottomNav.css'; // Create a CSS file for styling

function BottomNav() {
  const [value, setValue] = useState('home');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className="bottom-nav">
      <BottomNavigationAction
        component={Link}
        to="/"
        label="Home"
        value="home"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/cart"
        label="Cart"
        value="cart"
        icon={<ShoppingCartIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/login"
        label="Me"
        value="me"
        icon={<AccountCircleIcon />}
      />
    </BottomNavigation>
  );
}

export default BottomNav;
