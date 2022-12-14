import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, StylesProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from 'config/muiThemes';
import robotoCondensed from 'config/font';
import 'styles/globals.css'

function MyApp({ Component, pageProps }) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    return (
        <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <main className={robotoCondensed.className}>
                <Component {...pageProps} />
            </main>
        </ThemeProvider>
    );
}

export default MyApp
