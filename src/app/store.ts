import { configureStore } from '@reduxjs/toolkit'; // <- missing import
import uiReducer from '../features/ui/uiSlice';

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        // products, orders later
    },
});
