import { useRouter } from 'next/router';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UpgradeBuilder from './UpgradeBuilder';
import SquadronBuilder from './SquadronBuilder';
import ShipBuilder from './ShipBuilder';

const builderTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#5ce2e7' },
        secondary: { main: '#eee' }
    }
});

export default function Builder({ breakpoints }) {
    const router = useRouter();
    const query = router.query;

    const routes = {
        'upgrade': <UpgradeBuilder breakpoints={breakpoints} />,
        'squadron': <SquadronBuilder breakpoints={breakpoints} />,
        'ship': <ShipBuilder breakpoints={breakpoints} />
    };

    return (
        <ThemeProvider theme={builderTheme}>
            <div style={{ padding: 8 }}>
                {routes[query.cardType]}
            </div>
        </ThemeProvider>
    );
}