
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axiosInstance from "../api/axiosInstance";


import {
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    Paper,    
    FormControlLabel,
    Switch,    
} from "@mui/material";
import { toast } from "react-toastify";
import ProductDetailsSkeleton from "../components/ProductDetailsSkeleton";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  active: boolean;
  images: string[];
  category: string;
  rating: number;
}

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { control, handleSubmit, setValue } = useForm<Product>({
        defaultValues: {
        title: "",
        description: "",
        price: 0,
        stock: 0,
        active: true,
        category: "",
        rating: 0,
        images: [],
        id: 0,
        },
    });

    useEffect(() => {
        const fetchProduct = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get(`/products/${id}`);
            setProduct(res.data);
            setValue("title", res.data.title);
            setValue("description", res.data.description);
            setValue("price", res.data.price);
            setValue("stock", res.data.stock);
            setValue("active", true); // Assuming all products are active by default
            setValue("category", res.data.category);
            setValue("rating", res.data.rating);
            setValue("images", res.data.images);
            setValue("id", res.data.id);
        } catch (err: any) {
            setError(err.message || "Failed to fetch product");
        } finally {
            setLoading(false);
        }
        };

        fetchProduct();
    }, [id, setValue]);

    const onSubmit = async (data: Product) => {
    try {
        setUpdating(true);
        const res = await axiosInstance.post(`/products/add`, data);
        setProduct(res.data);        
        toast.success(
            <Box>
                
                <Typography>
                    Product updated successfully.
                </Typography>

                <Typography
                    variant="caption"
                    color="text.secondary"
                >
                    Updating a product will not update it into the server.It will simulate a PUT/PATCH request and will return updated product with modified data
                </Typography>

            </Box>
        );

    } catch (err: any) {
        
        toast.error(err.message || "Failed to update product");
    } finally {
        setUpdating(false);
    }
    };


    if (loading) {
        return <ProductDetailsSkeleton />;
    }

    if (!product) {
        return (
            <Paper
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                    py: 4,
                    px: 2,                    
                }}
            >
                <Typography>Product not found</Typography>
            </Paper>
        )
    }


    if (error) {
        return (
            <Paper
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                    py: 4,
                    px: 2,                    
                }}
            >
                <Typography color="error">{error}</Typography>
            </Paper>
        )
    }


    
    

    return (

        <>

            <Typography 
                variant="h5" 
                gutterBottom
                fontWeight={500}
            >
                Product Details
            </Typography>

            <Typography
                mb={0.25}
                fontWeight={500}
            >
                Everything about this product,
            </Typography>

            <Typography
                variant="body2"
                mb={6}
            >
                View complete product information, pricing, stock status, and related details.
            </Typography>



            <Paper sx={{ p: 4 }}>

                <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
                    
                    <Box sx={{ flex: 1 }}>
                    {product.images && product.images.length > 0 && (
                        <img
                            src={product.images[0]}
                            alt={product.title}
                            style={{ width: "100%", borderRadius: 8 }}
                        />
                    )}
                    </Box>

                    {/* Form */}
                    <Box sx={{ flex: 2 }}>
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
                                    multiline
                                    rows={4}
                                    margin="normal"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />

                        
                        <Controller
                            name="price"
                            control={control}
                            rules={{
                                required: "Price is required",
                                min: { value: 0, message: "Price cannot be negative" },
                            }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Price"
                                    type="number"
                                    margin="normal"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    sx={{ width: 200 }}
                                />
                            )}
                        />

                        
                        <Controller
                            name="stock"
                            control={control}
                            rules={{
                                required: "Stock is required",
                                min: { value: 0, message: "Stock cannot be negative" },
                            }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Stock"
                                    type="number"
                                    margin="normal"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    sx={{ width: 200 }}
                                />
                            )}
                        />

                        
                        <Controller
                            name="active"
                            control={control}
                            render={({ field }) => (
                                <FormControlLabel
                                    control={<Switch {...field} checked={field.value} />}
                                    label={field.value ? "Active" : "Inactive"}
                                    sx={{ mt: 2 }}
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
                    </Box>
                </Stack>
            </Paper>

        </>
  );
};

export default ProductDetails;
