import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, CircularProgress } from '@mui/material';
import type { AppDispatch, RootState } from '../app/store';
import { fetchUsers, type User } from '../features/user/userSlice';
import UserCard from '../components/UserCard';

const UserManagement = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading, error } = useSelector((state: RootState) => state.users);

    useEffect(() => { dispatch(fetchUsers()); }, [dispatch]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <div>
            <Typography variant="h5" gutterBottom fontWeight={500}>User Management</Typography>
            <Typography mb={0.25} fontWeight={500}>Manage your users,</Typography>
            <Typography variant="body2" mb={4}>This page is only visible to admins</Typography>

            <Grid 
                container 
                spacing={3}
            >
                {
                    users.map((user: User) => (
                        <Grid 
                            key={user.id}
                            size={{ xs: 12, sm: 6, md: 4 }}
                        >
                            <UserCard {...user} />
                        
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    );
};

export default UserManagement;
