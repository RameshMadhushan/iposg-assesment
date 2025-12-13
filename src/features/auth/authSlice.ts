// src/features/auth/authSlice.ts
import { createSlice,  } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { createMockToken, parseToken } from './authUtils';

interface AuthState {
    token: string | null;
    role: 'admin' | 'user' | null;
}

const initialToken = localStorage.getItem('token');
const initialState: AuthState = {
    token: initialToken,
    role: initialToken ? parseToken(initialToken)?.role : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<'admin' | 'user'>) => {
            const token = createMockToken(action.payload);
            localStorage.setItem('token', token);
            state.token = token;
            state.role = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.role = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
