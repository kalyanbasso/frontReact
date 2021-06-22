import React from 'react';


import AssignmentIcon from '@material-ui/icons/Assignment';
import HomeIcon from '@material-ui/icons/Home';
import WarningIcon from '@material-ui/icons/Warning';
import PersonIcon from '@material-ui/icons/Person';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ChatIcon from '@material-ui/icons/Chat';
import GroupIcon from '@material-ui/icons/Group';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import ListAltIcon from '@material-ui/icons/ListAlt';

export const SidebarData = [
  {
    title: 'Sistema',
    path: '/sistema',
    icon: <HomeIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Projeto',
    path: '/projeto',
    icon: <AssignmentIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Prioridade',
    path: '/prioridade',
    icon: <WarningIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Usuario',
    path: '/usuario',
    icon: <PersonIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Projetos de Usuarios',
    path: '/projeto-usuarios',
    icon: <AssignmentIndIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Comentario',
    path: '/comentario',
    icon: <ChatIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Grupo',
    path: '/grupo',
    icon: <GroupIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Tarefa',
    path: '/tarefa',
    icon: <AssignmentTurnedInIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Tarefa Status',
    path: '/tarefa-status',
    icon: <AssignmentLateIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Tarefa Tipo',
    path: '/tarefa-tipo',
    icon: <ListAltIcon />,
    cName: 'nav-text'
  },
];