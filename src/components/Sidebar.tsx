
import { Drawer, List, ListItem, ListItemText, Button, Box, Typography, useTheme } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import type { RootState } from '../app/store';

interface SidebarProps {
    variant?: "permanent" | "temporary"; 
    open?: boolean; 
    onClose?: () => void; 
}


export const drawerWidth = 275;

const Sidebar: React.FC<SidebarProps> = ({ variant = "permanent", open = true, onClose }) => {

    
    const user = useSelector((state: RootState) => state.auth);
    const role = useSelector((state: RootState) => state.auth.role);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme(); 
    



    const handleLogout = () => {
        dispatch(logout());
        navigate('/login'); 
    };

    return (
        <Drawer             
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
                display: { xs: variant === "permanent" ? "none" : "block", md: "block" },
            }}            
            variant={variant}
            open={open}
            onClose={onClose}

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
                        sx={{ color: theme.palette.text.primary }}
                        onClick={onClose}
                    >
                        <ListItemText 
                            primary="Dashboard" 
                        />
                    </ListItem>


                    <ListItem  
                        component={Link} 
                        to="/products-management"
                        sx={{ color: theme.palette.text.primary }}
                        onClick={onClose}
                    >
                        <ListItemText 
                            primary="Product Management" 
                        />
                    </ListItem>

                    <ListItem  
                        component={Link} 
                        to="/order-management"
                        sx={{ color: theme.palette.text.primary }}
                        onClick={onClose}
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
                                sx={{ color: theme.palette.text.primary }}
                                onClick={onClose}
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