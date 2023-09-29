import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, StylesProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from 'config/muiThemes';
import robotoCondensed from 'config/font';
import { Analytics } from '@vercel/analytics/react';
import 'styles/globals.css'

// <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>

function MyApp({ Component, pageProps }) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    return (
        <>
            <Analytics />
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <main className={robotoCondensed.className}>
                    <Component {...pageProps} />
                </main>
            </ThemeProvider>
        </>
    );
}

export default MyApp
