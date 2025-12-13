import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler,  } from "react-hook-form";
import { login } from "../features/auth/authSlice";
import { mockUsers } from "../features/auth/mockUsers";
import { TextField, Button, Stack, Typography, Dialog, DialogTitle, DialogContent, DialogActions, useTheme, Box, Divider } from "@mui/material";

interface LoginFormInputs {
  username: string;
  password: string;
}

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();

    const { register, handleSubmit, formState: { errors }, reset  } = useForm<LoginFormInputs>();

    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleClose = () => setErrorDialogOpen(false);

    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
        const user = mockUsers.find(
            (u) => u.username === data.username && u.password === data.password
        );

        if (!user) {
            setErrorMessage("Invalid username or password. Please try again.");
            setErrorDialogOpen(true);
            reset({ username: data.username, password: "" });
            return;
        }

        dispatch(login(user.role));
        reset(); 
        navigate("/");
    };


    return (

        <Stack 
            spacing={2} 
            alignItems="center" 
            mt={10} 
            maxWidth={500} 
            mx="auto"
            p={6}
            sx={{                
                borderRadius: 2,                           
                backgroundColor: theme.palette.background.paper, 
            }}
        >

            <Typography 
                variant="h5"
            >
                Welcome To IPOSG
            </Typography>

            <Typography
                variant="body2"
            >

                Please enter your username and password to log in.

            </Typography>


            <form 
                onSubmit={handleSubmit(onSubmit)} 
                style={{ width: "100%" }}
            >

                <TextField
                    label="Username"
                    fullWidth
                    {...register("username", { required: "Username is required" })}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    margin="normal"
                />

                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    {...register("password", { required: "Password is required" })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    margin="normal"
                />
                
                <Button 
                    type="submit" 
                    variant="contained" 
                    fullWidth 
                    sx={{ mt: 2 }}
                >
                    Login
                </Button>



                <Box
                    my={2}
                >


                    <Typography
                        variant="body2"
                    >
                        Username: admin
                    </Typography>

                    <Typography
                        variant="body2"
                    >
                        Password: admin123
                    </Typography>

                </Box>

                <Divider />



                <Box
                    mt={2}
                >

                    <Typography
                        variant="body2"
                    >
                        Username: user
                    </Typography>

                    <Typography
                        variant="body2"
                    >
                        Password: user123
                    </Typography>

                </Box>



            </form>

            {/* Error Dialog */}
            <Dialog 
                open={errorDialogOpen} 
                onClose={handleClose}
            >
                <DialogTitle>
                    Error
                </DialogTitle>
                
                <DialogContent>
                    <Typography>
                        {errorMessage}
                    </Typography>
                </DialogContent>
                
                <DialogActions>
                    <Button 
                        onClick={handleClose}
                        color="primary">OK
                    </Button>
                </DialogActions>

            </Dialog>

        </Stack>
    );
};

export default Login;
