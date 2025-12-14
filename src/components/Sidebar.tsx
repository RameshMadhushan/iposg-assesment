
import { Drawer, List, ListItem, ListItemText, Button, Box, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import type { RootState } from '../app/store';

export const drawerWidth = 275;

const Sidebar = () => {

    
    const user = useSelector((state: RootState) => state.auth);
    const role = useSelector((state: RootState) => state.auth.role);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login'); 
    };

    return (
        <Drawer 
            variant="permanent" 
            anchor="left"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100vh",
                },
            }}            
        >

            <Box>

                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                        p: 2,
                    }}
                >

                    <Typography 
                        variant="body2"                     
                    >
                        Welcome {user.role}
                    </Typography>
                    
                </Box>

                                
                <List>

                    <ListItem  
                        component={Link} 
                        to="/"
                    >
                        <ListItemText 
                            primary="Dashboard" 
                        />
                    </ListItem>


                    <ListItem  
                        component={Link} 
                        to="/products-management"
                    >
                        <ListItemText 
                            primary="Product Management" 
                        />
                    </ListItem>

                    <ListItem  
                        component={Link} 
                        to="/order-management"
                    >
                        <ListItemText 
                            primary="Order Management" 
                        />
                    </ListItem>


                    {
                        role === 'admin' && (
                            <ListItem  
                                component={Link} 
                                to="/user-management"
                            >
                                <ListItemText primary="User Management" />
                            </ListItem>
                        )
                    }
                </List>

            </Box>

            <Box p={2}>


                <Button variant="contained" color="error"  onClick={handleLogout} fullWidth>
                Logout
                </Button>
            </Box>
        </Drawer>
    );
};

export default Sidebar;