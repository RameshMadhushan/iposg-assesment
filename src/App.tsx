// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import ThemeToggle from "./components/ThemeToggle";
import Sidebar from "./components/Sidebar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import Unauthorized from "./pages/Unauthorized";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { useSelector } from "react-redux";
import type { RootState } from "./app/store";
import ProductList from "./pages/ProductList";
import { drawerWidth } from "./components/Sidebar";

const App = () => {

        
    const token = useSelector((state: RootState) => state.auth.token);

    return (
        <BrowserRouter>

            <ThemeToggle />

            <Box >
                
                {
                    token && (
                        <Box>
                            <Sidebar />
                        </Box>
                    )
                }
                

                <Box
                    component="main"
                    flex={1}
                    p={3}
                    ml={token ? `${drawerWidth}px` : 0} // offset content only if drawer is visible
                >

                    <Routes>
                        
                        
                        <Route path="/login" element={<Login />} />

                        
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute allowedRoles={['admin', 'user']}>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/products-management"
                            element={
                                <ProtectedRoute allowedRoles={['admin', 'user']}>
                                    <ProductList />
                                </ProtectedRoute>
                            }
                        />



                        <Route
                            path="/user-management"
                            element={
                                <ProtectedRoute allowedRoles={['admin']}>
                                    <UserManagement />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/unauthorized"
                            element={<Unauthorized />}
                        />

                        <Route
                            path="*"
                            element={<ProtectedRoute allowedRoles={['admin', 'user']}><Dashboard /></ProtectedRoute>}
                        />
                    </Routes>
                </Box>
            </Box>

        </BrowserRouter>
    );
};

export default App;
