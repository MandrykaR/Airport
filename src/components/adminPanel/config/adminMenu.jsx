import React from 'react';
import FactCheckSharpIcon from '@mui/icons-material/FactCheckSharp';
import AnnouncementSharpIcon from '@mui/icons-material/AnnouncementSharp';
import GroupAddSharpIcon from '@mui/icons-material/GroupAddSharp';
import AssignmentIndSharpIcon from '@mui/icons-material/AssignmentIndSharp';

export const menuItems = [
  {
    text: 'List Posts',
    key: 'list-posts',
    icon: <FactCheckSharpIcon />,
  },
  {
    text: 'Create News',
    key: 'create-news',
    icon: <AnnouncementSharpIcon />,
  },
  {
    text: 'Edit Users',
    key: 'edit-user',
    icon: <GroupAddSharpIcon />,
  },
  {
    text: 'Profile User',
    key: 'profile-user',
    icon: <AssignmentIndSharpIcon />,
  },
];
