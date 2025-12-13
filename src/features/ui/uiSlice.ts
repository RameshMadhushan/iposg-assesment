import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


type ThemeMode = 'light' | 'dark';

interface UIState {
    themeMode: ThemeMode;
}

const savedTheme = localStorage.getItem('theme') as ThemeMode | null;

const initialState: UIState = {
    themeMode: savedTheme ?? 'light',
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleTheme(state) {
        state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', state.themeMode);
        },
        setTheme(state, action: PayloadAction<ThemeMode>) {
        state.themeMode = action.payload;
        localStorage.setItem('theme', state.themeMode);
        },
    },
});

export const { toggleTheme, setTheme } = uiSlice.actions;
export default uiSlice.reducer;
