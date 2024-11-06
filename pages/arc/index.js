import {
    Typography,
    Divider,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function Arc() {

    const theme = useTheme();
    const breakpoints = {
        sm: useMediaQuery(theme.breakpoints.up('sm')),
        md: useMediaQuery(theme.breakpoints.up('md')),
        lg: useMediaQuery(theme.breakpoints.up('lg'))
    };

    return (
        <div style={{ gap: 36, padding: 24, display: 'flex', flexFlow: 'column nowrap', alignItems: 'center' }}>
            <Typography variant="h2">
                Armada Ruleset Collective
            </Typography>
            <div style={{ display: 'flex', flexFlow: 'column nowrap', 'alignItems': 'center' }}>
                <Typography variant="h4">What is ARC?</Typography>
                <Typography>
                    We are stuff and things. Maybe a picture of the hierarchy.
                </Typography>
            </div>
            <div style={{ display: 'flex', flexFlow: 'column nowrap', 'alignItems': 'center' }}>
                <Typography variant="h4">Roadmap</Typography>
                <Typography>
                    We are stuff and things. Maybe a picture of the roadmap?
                </Typography>
            </div>
            <div style={{ display: 'flex', flexFlow: 'column nowrap', 'alignItems': 'center' }}>
                <Typography variant="h4">The Team</Typography>
                <Typography>Description about the differences between Core and Mid Rim and all the other stuff.</Typography>
                <div
                    style={{
                        margin: 16,
                        gap: 16,
                        display: 'flex',
                        flexFlow: breakpoints.lg ? 'row nowrap' : 'column nowrap',
                        justifyContent: 'space-evenly'
                    }}
                >
                    <div style={{ width: '100%' }}>
                        <Typography variant="h5">Nick</Typography>
                        <Typography variant="subtitle1">@cactus.cooler</Typography>
                        <Divider />
                        
                    </div>
                    <div style={{ width: '100%' }}>
                        <Typography variant="h5">Nick</Typography>
                        <Typography variant="subtitle1">@unskilledfirstofficer</Typography>
                        <Divider />
                        <Typography>
                            <p>Stuff and more things. This is an example description for the website. This is more text to be used an example for the website. </p>
                        </Typography>
                    </div>
                    <div style={{ width: '100%' }}>
                        <Typography variant="h5">Simon</Typography>
                        <Typography variant="subtitle1">@cptawesomer</Typography>
                        <Divider />
                        <Typography>
                            <p>Stuff and more things. This is an example description for the website. This is more text to be used an example for the website. </p>
                        </Typography>
                    </div>
                    <div style={{ width: '100%' }}>
                        <Typography variant="h5">Mack</Typography>
                        <Typography variant="subtitle1">@largepackage</Typography>
                        <Divider />
                        <Typography>
                            <p>Stuff and more things. This is an example description for the website. This is more text to be used an example for the website. </p>
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}