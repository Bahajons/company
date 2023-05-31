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
import { NavbarStyle } from '../styleComponent/NavbarStyle';
import MenuIcon from '@mui/icons-material/Menu';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { get_profile } from './utils/api_fetch';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const navigated = useNavigate()
  const [state, setState] = React.useState({
    left: false,
  });
  const [user, setUser] = React.useState({
    first_name: '',
    last_name: '',
    avatar: '',
    phone: '',
    role: ''
  })
  const selector = useSelector(state => state)

  function navigate(to) {
    navigated(to)
    setState({ ...state, left: false })
  }

  async function get_image() {
    if (localStorage.getItem('token')) {

      try {
        const user_avatar = await get_profile()
        console.log(user_avatar.data.avatar)
        setUser(user_avatar.data)
      } catch (error) {
        setUser('')
      }
    }
    else {
      setUser('')
    }

  }

  React.useEffect(() => {
    get_image()
  }, [state.left])


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
      {user?.first_name ?
        <List>
          <ListItem className='py-1 px-2'  >
            <ListItemButton>
              <div className='d-flex align-items-center'>
                <div className='py-1 px-2' style={{ width: '70px', height: '70px', marginRight: '10px', border: '1px solid #a1a1a1', borderRadius: '50%', overflow: 'hidden' }} >
                  <img src={user?.avatar} className='w-100' alt="" />
                </div>
                <div className='pt-2'>
                  <span>{user?.first_name} <br /> {user?.last_name}</span>
                </div>
              </div>
              <ListItemIcon>
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List> : <Toolbar />}
      {/*  */}
      <Divider />
      {/* <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} className='py-1 px-2'>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
      <Divider />
      <List>
        {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} className='py-1 px-2'>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))} */}
      </List>
      {user?.role ?
        <List>
          <ListItem className='py-1 px-2' onClick={() => navigate('/participation')} >
            <ListItemButton>
              <ListItemIcon>
                <BusinessCenterIcon />
              </ListItemIcon>
              <ListItemText primary={'Participated'} />
            </ListItemButton>
          </ListItem>
        </List> : ''
      }
      {user?.role == 2 ?
        <List>
          <ListItem className='py-1 px-2' onClick={() => navigate('/competition')} >
            <ListItemButton>
              <ListItemIcon>
                <BusinessCenterIcon />
              </ListItemIcon>
              <ListItemText primary={'Competition'} />
            </ListItemButton>
          </ListItem>
        </List> : ''
      }
      {user?.role == 2 ?
        <List>
          <ListItem className='py-1 px-2' onClick={() => navigate('/competition/promocode')} >
            <ListItemButton>
              <ListItemIcon>
                <BusinessCenterIcon />
              </ListItemIcon>
              <ListItemText primary={'Promocode'} />
            </ListItemButton>
          </ListItem>
        </List> : ''
      }
      {/* <List>
        <ListItem className='py-1 px-2' onClick={() => navigate('/question')} >
          <ListItemButton>
            <ListItemIcon>
              <BusinessCenterIcon />
            </ListItemIcon>
            <ListItemText primary={'Question'} />
          </ListItemButton>
        </ListItem>
      </List> */}
      {user?.role ?
        <List onClick={() => navigate('/profile')}>
          <ListItem className='py-1 px-2'>
            <ListItemButton>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={'Profile'} />
            </ListItemButton>
          </ListItem>
        </List> : ''
      }
      {
        localStorage.getItem('token') ?
          <List onClick={() => navigate('/logout')}>
            <ListItem className='text-danger'>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon className='text-danger' />
                </ListItemIcon>
                <ListItemText primary={'Log out'} />
              </ListItemButton>
            </ListItem>
          </List> :
          <List onClick={() => navigate('/login')}>
            <ListItem className='text-primary'>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon className='text-primary' />
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





      <div key={'left'}>
        <Drawer
          anchor={'left'}
          open={state['left']}
          onClose={toggleDrawer('left', false)}
        >

          {list('left')}
        </Drawer>
      </div>
    </NavbarStyle>
  );
}