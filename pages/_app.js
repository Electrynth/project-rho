import useMediaQuery from '@mui/material/useMediaQuery';
import { Auth0Provider } from '@auth0/auth0-react';
import { ThemeProvider, StylesProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from 'config/muiThemes';
import robotoCondensed from 'config/font';
import { Analytics } from '@vercel/analytics/react';
import 'styles/globals.css'
// import urls from 'config/urls.json';

// <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>

function MyApp({ Component, pageProps }) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    return (
        <Auth0Provider
            domain="armada-hub.us.auth0.com"
            clientId="vv0GnNycfl6htKsc2rTHjAhTBnWrPGzy"
            authorizationParams={{
                redirect_uri: typeof window !== 'undefined' ? window.location.origin : undefined
            }}
        >
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <main className={robotoCondensed.className}>
                    <Component {...pageProps} />
                </main>
                <Analytics />
            </ThemeProvider>
        </Auth0Provider>
    );
}

export default MyApp
