import * as React from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import EditUser from './components/EditUser/EditUser';
import TableAdmin from './components/tableAdmin/TableAdmin';
import PostTable from './components/PostTabele/PostTable';
import ProfileUser from './components/ProfileUser/ProfileUser';
import { useState } from 'react';

import './adminPanel.scss';

const menuItems = [
  { text: 'Admin Panel', key: 'admin-panel' },
  { text: 'Posts News', key: 'posts' },
  { text: 'Edit User', key: 'edit-user' },
  { text: 'Profile User', key: 'profile-user' },
];

const AdminPanel = () => {
  const [tabActive, setTabActive] = useState('');

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
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={item.key} disablePadding>
              <ListItemButton onClick={() => setTabActive(item.key)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['NoN'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <div className="render-item">{renderItem()}</div>
    </div>
  );
};

export default AdminPanel;
