import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from "react-router-dom";
import { SidebarData } from './SlideBarData';
import { logout } from "../../services/auth";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    drawerPaper: { 
      width: 'inherit', 
      backgroundColor: '#6892bb',
      boxShadow: "5px 5px 12px #9E9E9E"
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.text.primary
    }
  }))

export default function MiniDrawer() {
  const classes = useStyles();
  const history = useHistory();

  const handleLogut = () => {
    logout()
    history.push('/')
  }

  return ( 
    <div>
        <Drawer
          style={{ width: '220px' }}
          variant="persistent"
          anchor="left"
          open={true}
          classes={{ paper: classes.drawerPaper }}
        >
          <List>
          {SidebarData.map((item, index) => (
            <Link key={index} to={item.path} className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          </Link>
          ))}
          <ListItem button onClick={handleLogut}>
              <ListItemIcon>
                <ExitToAppIcon/>
              </ListItemIcon>
              <ListItemText primary='Sair' />
            </ListItem>
          </List>
        </Drawer>
    </div>
  );
}
