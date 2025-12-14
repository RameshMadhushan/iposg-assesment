// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, useTheme, useMediaQuery, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ThemeToggle from "./components/ThemeToggle";
import Sidebar from "./components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import Unauthorized from "./pages/Unauthorized";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { useSelector } from "react-redux";
import type { RootState } from "./app/store";
import ProductList from "./pages/ProductList";
import OrderList from "./pages/OrderList";
import ProductDetails from "./pages/ProductDetails";
import { useState } from "react";

const App = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md")); // md breakpoint
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <BrowserRouter>
                
                <ThemeToggle />

                <Box display="flex">
                {/* Desktop Sidebar */}
                {token && isDesktop && <Sidebar />}

                
                {token && !isDesktop && (
                    <IconButton
                    color="inherit"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ position: "fixed", top: 16, left: 16, zIndex: 2000 }}
                    >
                    <MenuIcon />
                    </IconButton>
                )}

                
                {token && !isDesktop && (
                    <Sidebar
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    />
                )}

                
                <Box
                    component="main"
                    flex={1}
                    px={3}
                    py={8}
                    
                >
                    <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route
                        path="/"
                        element={
                        <ProtectedRoute allowedRoles={["admin", "user"]}>
                            <Dashboard />
                        </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/products-management"
                        element={
                        <ProtectedRoute allowedRoles={["admin", "user"]}>
                            <ProductList />
                        </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/order-management"
                        element={
                        <ProtectedRoute allowedRoles={["admin", "user"]}>
                            <OrderList />
                        </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/product/:id"
                        element={
                        <ProtectedRoute allowedRoles={["admin", "user"]}>
                            <ProductDetails />
                        </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/user-management"
                        element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <UserManagement />
                        </ProtectedRoute>
                        }
                    />

                    <Route path="/unauthorized" element={<Unauthorized />} />

                    <Route
                        path="*"
                        element={
                        <ProtectedRoute allowedRoles={["admin", "user"]}>
                            <Dashboard />
                        </ProtectedRoute>
                        }
                    />
                    </Routes>
                </Box>
                </Box>
            </BrowserRouter>

            
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                theme={theme.palette.mode === "dark" ? "dark" : "light"}
            />
        </>
    );
};

export default App;
