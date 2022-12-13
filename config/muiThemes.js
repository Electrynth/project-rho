import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#eee'
        },
        secondary: {
            main: '#333'
        }
    }
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#333'
        },
        secondary: {
            main: '#eee'
        }
    }
});

export {
    lightTheme,
    darkTheme
};