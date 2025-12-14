import { Card, CardContent, Typography, Avatar, Chip } from '@mui/material';
import type { User } from '../features/user/userSlice';


const UserCard: React.FC<User> = ({ firstName, lastName, username, email, role, image }) => {
    return (
        <Card 
            sx={{
                display: 'flex', 
                alignItems: 'center', 
                p: 2, 
                gap: 2 
            }}
        >

            <Avatar 
                src={image} 
                alt={firstName} 
                sx={{ width: 56, height: 56 }} 
            />

            <CardContent 
                sx={{ flex: 1 }}
            >

                <Typography 
                    variant="subtitle1" 
                    fontWeight={500}
                >
                    {firstName} {lastName}
                </Typography>

                <Typography 
                    variant="body2" 
                    color="text.secondary"
                >
                    @{username}
                </Typography>
                
                <Typography 
                    variant="body2" 
                    color="text.secondary"
                >
                    {email}
                </Typography>
            
                <Chip 
                    label={role.toUpperCase()} 
                    size="small" 
                    sx={{ mt: 1 }} 
                    color={role === 'admin' ? 'error' : role === 'moderator' ? 'warning' : 'success'} 
                />
            
            
            </CardContent>
        </Card>
    );
};

export default UserCard;
