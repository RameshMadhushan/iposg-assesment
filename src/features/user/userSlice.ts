import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    role: string;
    image: string;
}

interface UsersState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    users: [],
    loading: false,
    error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const res = await axiosInstance.get('/users');
    return res.data.users as User[];
});

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.pending, (state) => { state.loading = true; state.error = null; })
        .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => { state.loading = false; state.users = action.payload; })
        .addCase(fetchUsers.rejected, (state, action) => { state.loading = false; state.error = action.error.message || 'Failed to fetch users'; });
    },
});

export default userSlice.reducer;
