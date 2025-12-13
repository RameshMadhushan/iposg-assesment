// Root.tsx
import { useSelector } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import App from './App';
import { getTheme } from './theme';


const Root = () => {
  const mode = useSelector((state:any) => state.ui.themeMode);
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

export default Root;