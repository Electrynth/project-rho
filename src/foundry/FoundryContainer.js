import { useState } from 'react';
import { useRouter } from 'next/router';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider, StylesProvider } from '@mui/material/styles';
import UpgradeCardBuilder from './UpgradeCardBuilder';
import SquadronCardBuilder from './SquadronCardBuilder';
import ShipCardBuilder from './ShipCardBuilder';


const foundryTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#5ce2e7'
        },
        secondary: {
            main: '#eee'
        }
    }
});

export default function FoundryContainer() {
    const router = useRouter();
    const query = router.query;

    const routes = {
        'upgrade': <UpgradeCardBuilder />,
        'squadron': <SquadronCardBuilder />,
        'ship': <ShipCardBuilder />
    };
    
    return (
        <ThemeProvider theme={foundryTheme}>
            <div style={{ padding: 8 }}>
                {routes[query.cardType]}
            </div>
        </ThemeProvider>
    );
}