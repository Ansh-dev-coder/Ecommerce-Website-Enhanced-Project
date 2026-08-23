import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BiUser } from 'react-icons/bi';
import { FiShoppingBag, FiLogOut, FiGrid } from 'react-icons/fi';
import BackDrop from './BackDrop';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.roles?.includes('ROLE_ADMIN');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        onClick={handleClick}
        aria-controls={open ? 'user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        className="border border-slate-200 bg-white shadow-sm hover:shadow-md"
        sx={{ p: 0 }}
      >
        <Avatar alt="Menu" src="" />
      </IconButton>

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { minWidth: 220 } }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          component={Link}
          to="/profile"
          onClick={handleClose}
          className="gap-2"
        >
          <BiUser />
          <span>{user?.username || user?.userName || 'Profile'}</span>
        </MenuItem>
        <MenuItem
          component={Link}
          to="/orders"
          onClick={handleClose}
          className="gap-2"
        >
          <FiShoppingBag />
          <span>Orders</span>
        </MenuItem>
        {isAdmin && (
          <MenuItem
            component={Link}
            to="/admin"
            onClick={handleClose}
            className="gap-2"
          >
            <FiGrid />
            <span>Admin Panel</span>
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            localStorage.removeItem('auth');
            window.location.href = '/login';
            handleClose();
          }}
          className="gap-2"
        >
          <FiLogOut className="flex items-center space-x-2 px-4 py-[6px] bg-gradient-to-r from-purple-600 to-red-500 text-white font-semibold rounded-md shadow-lg hover:from-purple-500 hover:to-red-400 transition duration-300 ease-in-out transform"/>
          <span>Logout</span>
        </MenuItem>
      </Menu>
      {open && <BackDrop/>}
    </div>
  );
};

export default UserMenu;
