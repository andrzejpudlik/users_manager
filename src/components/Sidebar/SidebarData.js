import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Użytkownicy',
    path: '/admin/dashboard/users',
    icon: <FaIcons.FaUserAlt />,
    cName: 'nav-text'
  },
  {
    title: 'Grupy',
    path: '/admin/dashboard/groups',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Zadania',
    path: '/admin/dashboard/tasks',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Ustawienia',
    path: '/admin/dashboard/setting',
    icon: <AiIcons.AiTwotoneSetting />,
    cName: 'nav-text'
  }
];