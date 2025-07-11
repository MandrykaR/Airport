import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { menuItems } from './config/adminMenu';
import { NavLink, Outlet } from 'react-router-dom';

import './adminPanel.scss';

const AdminPanel = () => {
  return (
    <div className="container-admin">
      <Box className="admin-panel" role="presentation">
        <div className="sidebar-wrapper">
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.key} disablePadding>
                <NavLink
                  to={`/admin/${item.key}`}
                  style={{
                    textDecoration: 'none',
                    width: '100%',
                  }}
                >
                  {({ isActive }) => (
                    <ListItemButton
                      className={`list-item-button ${isActive ? 'active' : ''}`}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  )}
                </NavLink>
              </ListItem>
            ))}
          </List>
        </div>
      </Box>
      <div className="render-item">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
