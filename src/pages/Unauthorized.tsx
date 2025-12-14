import { Box, Typography } from '@mui/material';

const Unauthorized = () => {
    return  (

        <Box
            sx={{
                p : 6,
                borderRadius : 3,
                backgroundColor : '#ff000020'
            }}
        >

            <Typography 
                variant="h4" 
                align="center" 
                color="error" 
                gutterBottom
            >
                Unauthorized
            </Typography>

            <Typography 
                variant="body1" 
                align="center" 
                gutterBottom
                color='error'
                fontWeight={500}
            >
                You do not have permission to access this page.
            </Typography>

        </Box>
    )
};

export default Unauthorized;
