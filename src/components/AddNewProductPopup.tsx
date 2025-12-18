import { Button, Dialog, DialogContent, TextField, Typography } from "@mui/material"
import { useState } from "react";

import { useForm, Controller } from "react-hook-form";

interface Props {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}



interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

const AddNewProductPopup = ({open, onClose, onSuccess} : Props) => {


    const [updating, setUpdating] = useState<boolean>(false)

    const { control, handleSubmit, } = useForm<Product>({
        defaultValues: {
            title: "",
            description: "",
            price: 0,

        },
    });

    const onSubmit = (data: Product) => {
        setUpdating(true)
        console.log(data);

        //somne function

        setTimeout(() => {
            setUpdating(false)
            onSuccess();    
        }, 2000);

        


    };



    return (
        <>
        
            <Dialog 
                open={open} 
                fullWidth 
                maxWidth="md"
                sx={{
                    p : 3
                }}
                onClose={onClose}   
            >

                <DialogContent
                    
                >

                    <Typography variant="h5">
                        Add new product
                    </Typography>
                

                    <form onSubmit={handleSubmit(onSubmit)}>


                            
                        <Controller
                            name="title"
                            control={control}
                            rules={{ required: "Title is required" }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Title"
                                    fullWidth
                                    margin="normal"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />


                            
                        <Controller
                            name="description"
                            control={control}
                            rules={{ required: "Description is required" }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Description"
                                    fullWidth
                                    margin="normal"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />

                            
                        <Controller
                            name="price"
                            control={control}
                            rules={{ required: "Price is required" }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Price"
                                    fullWidth
                                    margin="normal"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />



                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3 }}
                            disabled={updating}
                        >
                            {updating ? "Updating..." : "Update Product"}
                        </Button>


                    </form>

                </DialogContent>

            </Dialog>

        </>
    )
}

export default AddNewProductPopup
