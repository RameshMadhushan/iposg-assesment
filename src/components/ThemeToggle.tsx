import { IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../features/ui/uiSlice';

const ThemeToggle = () => {
    const dispatch = useDispatch();
    const mode = useSelector((state: any) => state.ui.themeMode);

    return (
        <IconButton color="inherit" onClick={() => dispatch(toggleTheme())}>
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
    );
};

export default ThemeToggle;
