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
        secondary: {
            main: '#eee'
        },
        customGrey: {
            main: '#333',
            light: '#333',
            dark: '#333',
            contrastText: '#fff'
        }
    }
});

export {
    lightTheme,
    darkTheme
};