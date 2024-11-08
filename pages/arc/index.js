import {
    Typography,
    Divider,
    Box,
    Tabs,
    Tab,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

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
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleTabChange}>
                        <Tab label="About Us" />
                        <Tab label="The Team" />
                        <Tab label="FAQ" />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    Item One
                </CustomTabPanel>
            </Box>
            <div style={{ display: 'flex', flexFlow: 'column nowrap', 'alignItems': 'center' }}>
                <Typography variant="h4">What is ARC?</Typography>
                <Typography>
                    &emsp;&emsp;The Armada Ruleset Collective (ARC) is a coalition of judges, tournament organizers, and competitive players dedicated to stewarding the competitive season of Star Wars: Armada by helping maintain a high level of organized play.
                    Our primary goal is to maintain a balanced ruleset that players will use to keep the game flourishing for years to come.

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
                        <Typography variant="h5">Nicholas Brown</Typography>
                        <Typography variant="subtitle1">@cactus.cooler</Typography>
                        <Divider />
                        
                    </div>
                    <div style={{ width: '100%' }}>
                        <Typography variant="h5">Nicholas Larson</Typography>
                        <Typography variant="subtitle1">@unskilledfirstofficer</Typography>
                        <Divider />
                        <Typography>
                            <p>Stuff and more things. This is an example description for the website. This is more text to be used an example for the website. </p>
                        </Typography>
                    </div>
                    <div style={{ width: '100%' }}>
                        <Typography variant="h5">Simon Girard</Typography>
                        <Typography variant="subtitle1">@cptawesomer</Typography>
                        <Divider />
                        <Typography>
                            <p>Stuff and more things. This is an example description for the website. This is more text to be used an example for the website. </p>
                        </Typography>
                    </div>
                    <div style={{ width: '100%' }}>
                        <Typography variant="h5">Mackenzie Dalla Lana</Typography>
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