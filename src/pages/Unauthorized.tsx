import { Typography } from '@mui/material';

const Unauthorized = () => {
    return  (
        <>
            <Typography variant="h4" color="error" mt={5} textAlign="center">
                You are not authorized to view this page.
            </Typography>;
        </>
    )
};

export default Unauthorized;
