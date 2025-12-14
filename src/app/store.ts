import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../features/ui/uiSlice';
import authReducer from '../features/auth/authSlice';
import productReducer from "../features/products/productSlice";
import ordersReducer from "../features/orders/orderSlice";
import userReducer from '../features/user/userSlice';

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
        products: productReducer,
        orders: ordersReducer,
        users: userReducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
