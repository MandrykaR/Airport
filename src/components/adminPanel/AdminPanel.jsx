import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import EditUser from './components/EditUser/EditUser';
import TableAdmin from './components/tableAdmin/TableAdmin';
import PostTable from './components/PostTable/PostTable';
import ProfileUser from './components/ProfileUser/ProfileUser';
import { useState } from 'react';

import './adminPanel.scss';

const menuItems = [
  {
    text: 'Admin Panel',
    key: 'admin-panel',
    icon: <InboxIcon />,
  },
  {
    text: 'Posts News',
    key: 'posts',
    icon: <MailIcon />,
  },
  {
    text: 'Edit Users',
    key: 'edit-user',
    icon: <InboxIcon />,
  },
  {
    text: 'Profile User',
    key: 'profile-user',
    icon: <MailIcon />,
  },
];

const AdminPanel = () => {
  const [tabActive, setTabActive] = useState('admin-panel');

  const renderItem = () => {
    switch (tabActive) {
      case 'posts':
        return <PostTable />;
      case 'edit-user':
        return <EditUser />;
      case 'profile-user':
        return <ProfileUser />;
      default:
        return <TableAdmin />;
    }
  };

  return (
    <div className="container-admin">
      <Box className="admin-panel" role="presentation">
        <div className="sidebar-wrapper">
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.key} disablePadding>
                <ListItemButton
                  selected={tabActive === item.key}
                  onClick={() => setTabActive(item.key)}
                  className="list-item-button"
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      </Box>

      <div className="render-item">{renderItem()}</div>
    </div>
  );
};

export default AdminPanel;
