// src/components/Sidebar.tsx
import { Drawer, List, ListItem, ListItemText, Button, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import type { RootState } from '../app/store';

const Sidebar = () => {
    const role = useSelector((state: RootState) => state.auth.role);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login'); 
    };

    return (
        <Drawer variant="permanent" anchor="left">
        <List>
            <ListItem  component={Link} to="/">
            <ListItemText primary="Dashboard" />
            </ListItem>
            {role === 'admin' && (
            <ListItem  component={Link} to="/user-management">
                <ListItemText primary="User Management" />
            </ListItem>
            )}
        </List>
        <Box p={2}>
            <Button variant="outlined" color="error" onClick={handleLogout} fullWidth>
            Logout
            </Button>
        </Box>
        </Drawer>
    );
};

export default Sidebar;
