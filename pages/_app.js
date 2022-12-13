import 'styles/globals.css'
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from 'config/muiThemes';
import robotoCondensed from 'config/font';

function MyApp({ Component, pageProps }) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    return (
    <main className={robotoCondensed.className}>
        <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <Component {...pageProps} />
        </ThemeProvider>
    </main>
    );
}

export default MyApp
