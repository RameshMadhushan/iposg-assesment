// src/pages/Dashboard.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { fetchProducts } from "../features/products/productSlice";
import { fetchOrders } from "../features/orders/orderSlice";

import {    
    Card,
    CardContent,
    Typography,
    Box,
    useTheme,
    Skeleton,
    Grid,
} from "@mui/material";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const theme = useTheme();

    
    const totalProducts = useSelector((state: RootState) => state.products.total);
    const productsLoading = useSelector((state: RootState) => state.products.loading);

    const orders = useSelector((state: RootState) => state.orders.orders);
    const ordersLoading = useSelector((state: RootState) => state.orders.loading);

    // Fetch data on mount
    useEffect(() => {
        dispatch(fetchProducts({ page: 1, limit: 10 }));
        dispatch(fetchOrders());
    }, [dispatch]);

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

    const orderStatusData = ["Pending", "Shipped", "Delivered", "Cancelled"].map(
        (status) => ({
        name: status,
        value: orders.filter((o) => o.status === status).length,
        })
    );

    const revenueByOrder = orders.map((o) => ({
        name: `Order ${o.id}`,
        value: o.total,
    }));

    return (
        <Box>
            
        <Typography 
            variant="h5" 
            gutterBottom
            fontWeight={500}
        >
            Dashboard
        </Typography>


        <Typography
            mb={0.25}
            fontWeight={500}
        >
            Welcome to your IPOSG Dashboard,
        </Typography>

        <Typography
            variant="body2"
        >
            Monitor your activity, manage your products, and stay on top of your tasks.
        </Typography>



        <Grid 
            container 
            spacing={2}
            
            mt={4}
        >
            <Grid 
                size={{xs:12, md:4}}
                
            >
                    
                <Card>
                    <CardContent>
                        <Typography variant="caption" color="text.secondary">
                            Total Products
                        </Typography>
                        {productsLoading ? (
                            <Skeleton variant="text" width={50} />
                        ) : (
                            <Typography variant="h5">{totalProducts}</Typography>
                        )}
                    </CardContent>
                </Card>

            </Grid>

            <Grid 
                size={{xs:12, md:4}}
                
            >
                    
                <Card>
                    <CardContent>
                        <Typography variant="caption" color="text.secondary">
                            Total Orders
                        </Typography>
                        {ordersLoading ? (
                            <Skeleton variant="text" width={50} />
                        ) : (
                            <Typography variant="h5">{totalOrders}</Typography>
                        )}
                    </CardContent>
                </Card>

            </Grid>


            <Grid 
                size={{xs:12, md:4}}
                
            >
                
                <Card>
                    <CardContent>
                        <Typography variant="caption" color="text.secondary">
                            Total Revenue
                        </Typography>
                        {ordersLoading ? (
                            <Skeleton variant="text" width={80} />
                        ) : (
                            <Typography variant="h5">${totalRevenue.toFixed(2)}</Typography>
                        )}
                    </CardContent>
                </Card>

            </Grid>
            
        </Grid>



        <Grid 
            container 
            spacing={2}
            
            mt={4}
        >
            <Grid 
                size={{xs:12, md:6}}
                
            >

                <Card sx={{ height: 350 }}>
                    <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                            Orders by Status
                        </Typography>

                        {ordersLoading ? (
                            <Skeleton variant="rectangular" height={260} />
                        ) : (
                            <ResponsiveContainer width="100%" height={260}>
                            <PieChart>
                                <Pie
                                data={orderStatusData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={90}
                                label
                                >
                                {orderStatusData.map((_, index) => (
                                    <Cell
                                    key={index}
                                    fill={theme.palette.primary.main}
                                    opacity={0.3 + index * 0.15}
                                    />
                                ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>

            </Grid>

            <Grid 
                size={{xs:12, md:6}}
                
            >
                <Card sx={{ height: 350 }}>
                    <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                            Revenue by Order
                        </Typography>

                        {ordersLoading ? (
                            <Skeleton variant="rectangular" height={260} />
                        ) : (
                            <ResponsiveContainer width="100%" height={260}>
                            <BarChart data={revenueByOrder}>
                                <XAxis dataKey="name" hide />
                                <YAxis />
                                <Tooltip />
                                <Bar
                                    dataKey="value"
                                    fill={theme.palette.secondary.main}
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>
            
            
            </Grid>



        </Grid>                        



        



        </Box>
    );
};

export default Dashboard;
