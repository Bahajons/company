import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import { Toolbar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useNavigate } from 'react-router-dom';
import { NavbarStyle } from './style-component/NavbarStyle';
import MenuIcon from '@mui/icons-material/Menu';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { get_profile } from './api_fetch';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const navigated = useNavigate()
  const [state, setState] = React.useState({
    left: false,
  });
  const [avatar, setAvatar] = React.useState()
  const selector = useSelector(state => state)

  function navigate(to) {
    navigated(to)
    setState({ ...state, left: false })
  }

  async function get_image() {
    try {
      const user_avatar = await get_profile()
      console.log(user_avatar.data.avatar)
      setAvatar(user_avatar.data)
    } catch (error) {

    }
  }

  React.useEffect(() => {
    get_image()
  }, [])


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
    //   onClick={toggleDrawer(anchor, false)}
    //   onKeyDown={toggleDrawer(anchor, false)}
    >
      {avatar?.first_name ?
        <List>
          <ListItem disablePadding >
            <ListItemButton>
              <div className='d-flex align-items-center'>
                <div style={{ width: '70px', height: '70px', marginRight: '10px', border: '1px solid #a1a1a1', borderRadius: '50%', overflow: 'hidden' }} disablePadding>
                  <img src={avatar?.avatar} className='w-100' alt="" />
                </div>
                <div className='pt-2'>
                  <p>{avatar?.first_name} <br /> {avatar?.last_name}</p>
                </div>
              </div>
              <ListItemIcon>
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List> : <Toolbar />}
      {/*  */}
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
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
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
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
      <List>
        <ListItem disablePadding onClick={() => navigate('/competition')} >
          <ListItemButton>
            <ListItemIcon>
              <BusinessCenterIcon />
            </ListItemIcon>
            <ListItemText primary={'Competition'} />
          </ListItemButton>
        </ListItem>
      </List>
      <List onClick={() => navigate('/profile')}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={'Profile'} />
          </ListItemButton>
        </ListItem>
      </List>
      {localStorage.getItem('token') ?
        <List onClick={() => navigate('/logout')}>
          <ListItem >
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={'Log out'} />
            </ListItemButton>
          </ListItem>
        </List> :
        <List onClick={() => navigate('/login')}>
          <ListItem >
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={'Log in'} />
            </ListItemButton>
          </ListItem>
        </List>
      }
    </Box >
  );

  return (
    <NavbarStyle>
      <div className='navba'>
        <Button onClick={toggleDrawer('left', true)}>
          <MenuIcon className='icon' />
        </Button>

      </div>





      <React.Fragment key={'left'}>
        <Drawer
          anchor={'left'}
          open={state['left']}
          onClose={toggleDrawer('left', false)}
        >

          {list('left')}
        </Drawer>
      </React.Fragment>
    </NavbarStyle>
  );
}