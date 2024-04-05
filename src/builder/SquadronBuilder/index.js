import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import {
    IconButton,
    Button,
    Menu,
    MenuItem,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent
} from '@mui/material';
import {
    Add,
    LocalCafe as CoffeeIcon,
    Info as InfoIcon
} from '@mui/icons-material';
import {
    armadaSquadronFontIcons
} from 'src/utility';
import ImageUploadButton from '../common/ImageUploadButton';
import TextInput from '../common/TextInput';
import MarkupLegend from '../common/MarkupLegend';
import SelectorInput from '../common/SelectorInput';
import SquadronCardDisplay from './SquadronCardDisplay';
import urls from 'config/urls.json';
import keywords from './keywords.json';

const sizeMultiplier = 1.25;

export default function SquadronBuilder({ breakpoints }) {
    const { user } = useAuth0();
    const [isLoading, setIsLoading] = useState(true);
    const [builderAccess, setBuilderAccess] = useState(false);

    useEffect(() => {
        setIsLoading(false);
        if (user && user.email) {
            setIsLoading(true);
            axios.get(`${urls.api}/users?email=${user.email}`).then(({ data }) => {
                if (data.settings && data.settings.builderAccess) setBuilderAccess(data.settings.builderAccess);
                setIsLoading(false);
            });
        }
    }, [user]);

    const [points, setPoints] = useState(0);
    const [faction, setFaction] = useState('rebels');
    const [maxNumAllowed, setMaxNumAllowed] = useState(1);
    const [squadronName, setSquadronName] = useState('');
    const [squadronChassis, setSquadronChassis] = useState('');
    const [chassisIconYOffset, setChassisIconYOffset] = useState(-6);
    const [squadronIcon, setSquadronIcon] = useState('');
    const [squadronSpeed, setSquadronSpeed] = useState(1);
    const [squadronHull, setSquadronHull] = useState(2);
    const [cardText, setCardText] = useState('');
    const [cardTextFontSize, setCardTextFontSize] = useState(18);
    const [chassisTextFontSize, setChassisTextFontSize] = useState(44);
    const [vsSquadronArmament, setVsSquadronArmament] = useState([0, 0, 0]);
    const [vsShipArmament, setVsShipArmament] = useState([0, 0, 0]);
    const [firstDefenseToken, setFirstDefenseToken] = useState('none');
    const [secondDefenseToken, setSecondDefenseToken] = useState('none');

    const [uploadedImage, setUploadedImage] = useState();
    const [portraitWidth, setPortraitWidth] = useState(450 * sizeMultiplier);
    const [portraitX, setPortraitX] = useState(0);
    const [portraitY, setPortraitY] = useState(0);
    const [isPortraitMirrored, setIsPortraitMirrored] = useState(false);
    const [isLegendDialogOpen, setIsLegendDialogOpen] = useState(false);

    const [menuAnchorEl, setMenuAnchorEl] = useState(null);

    if (isLoading) {
        return (
            <Typography style={{ margin: 16 }}>
                Loading...
            </Typography>
        );
    } else if (!isLoading && !builderAccess) {
        return (
            <div style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'center' }}>
                <Typography style={{ margin: 16 }}>
                Monetary contribution and creating an account is required to access this feature. A one-time contribution of $3 or more will grant permanent access to every feature on this platform.
                </Typography>
                <Button
                    variant="contained"
                    href="https://www.buymeacoffee.com/holofoundry"
                    startIcon={<CoffeeIcon />}
                    target="_blank"
                >
                    Buy me a coffee
                </Button>
            </div>
        );
    }
    return (
        <div style={{ display: 'flex', flexFlow: `${breakpoints.lg ? 'row' : 'column'} nowrap`, alignItems: `${breakpoints.lg ? 'flex-start' : 'center'}`, gap: 8 }}>
            <div style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'flex-start', gap: 16, margin: 8 }}>
                <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', gap: 8 }}>
                    <SelectorInput
                        elementId="faction-input"
                        label="Faction"
                        value={faction}
                        handleChange={e => setFaction(e.target.value)}
                        items={[
                            { label: 'Rebels', value: 'rebels' },
                            { label: 'Empire', value: 'empire' },
                            { label: 'Republic', value: 'republic' },
                            { label: 'Separatists', value: 'separatists' }
                        ]}
                        style={{ width: 130 }}
                    />
                    <TextInput
                        elementId="points-input"
                        label="Points"
                        value={points}
                        numberRange={[0, 999]}
                        handleChange={e => setPoints(e.target.value)}
                        style={{ width: 60 }}
                    />
                    <SelectorInput
                        elementId="squadron-speed-input"
                        label="Speed"
                        value={squadronSpeed}
                        handleChange={e => setSquadronSpeed(e.target.value)}
                        items={[
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 },
                            { label: '5', value: 5 },
                        ]}
                        style={{ width: 60  }}
                    />
                    <SelectorInput
                        elementId="squadron-hull-input"
                        label="Hull"
                        value={squadronHull}
                        handleChange={e => setSquadronHull(e.target.value)}
                        items={[
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 },
                            { label: '5', value: 5 },
                            { label: '6', value: 6 },
                            { label: '7', value: 7 },
                            { label: '8', value: 8 },
                        ]}
                        style={{ width: 60 }}
                    />
                    <SelectorInput
                        elementId="max-allowed-input"
                        label="Max # Allowed"
                        value={maxNumAllowed}
                        handleChange={e => setMaxNumAllowed(e.target.value)}
                        items={[
                            { label: 'Any', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                        ]}
                        style={{ width: 110 }}
                    />
                </div>
                <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', gap: 8 }}>
                    <TextInput
                        elementId="squadron-name-input"
                        label="Squadron Ace Name (if any)"
                        value={squadronName}
                        handleChange={e => setSquadronName(e.target.value)}
                        style={{ flexGrow: 1 }}
                    />
                </div>
                <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', gap: 8 }}>
                    <IconButton size="small" onClick={() => setIsLegendDialogOpen(true)}>
                        <InfoIcon />
                    </IconButton>
                    <TextInput
                        required
                        error={squadronChassis === ''}
                        elementId="squadron-chassis-input"
                        label="Squadron Chassis Name"
                        value={squadronChassis}
                        handleChange={e => setSquadronChassis(e.target.value)}
                        style={{ flexGrow: 1 }}
                    />
                </div>
                <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', gap: 8 }}>
                    <SelectorInput
                        elementId="squadron-icon-input"
                        label="Squadron Icon"
                        value={squadronIcon}
                        handleChange={e => setSquadronIcon(e.target.value)}
                        items={Object.keys(armadaSquadronFontIcons).sort().map(sqdName => ({ label: sqdName, value: sqdName }))}
                        style={{ flexGrow: 1 }}
                    />
                </div>
                <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', gap: 8 }}>
                    <SelectorInput
                        elementId="card-text-font-size-input"
                        label="Card Text Font Size"
                        value={cardTextFontSize}
                        items={[
                            { label: '16', value: 16 },
                            { label: '17', value: 17 },
                            { label: '18', value: 18 },
                            { label: '19', value: 19 },
                            { label: '20', value: 20 }
                        ]}
                        handleChange={e => setCardTextFontSize(e.target.value)}
                        style={{ width: 140 }}
                    />
                    <SelectorInput
                        elementId="chassis-font-text-size-input"
                        label="Chassis Font Size"
                        value={chassisTextFontSize}
                        handleChange={e => setChassisTextFontSize(e.target.value)}
                        items={[
                            { label: '36', value: 36 },
                            { label: '38', value: 38 },
                            { label: '40', value: 40 },
                            { label: '42', value: 42 },
                            { label: '44', value: 44 },
                        ]}
                        style={{ width: 125 }}
                    />
                    <TextInput
                        elementId="portrait-width-input"
                        label="Chassis Icon Y Offset"
                        value={chassisIconYOffset}
                        handleChange={e => setChassisIconYOffset(e.target.value)}
                        style={{ width: 170 }}
                    />
                </div>
                <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', gap: 8 }}>
                    <SelectorInput
                        elementId="first-defense-token-input"
                        label="First Defense Token"
                        value={firstDefenseToken}
                        handleChange={e => setFirstDefenseToken(e.target.value)}
                        items={[
                            { label: 'None', value: 'none' },
                            { label: 'Brace', value: 'brace' },
                            { label: 'Evade', value: 'evade' },
                            { label: 'Scatter', value: 'scatter' }
                        ]}
                        style={{ width: 150 }}
                    />
                    {firstDefenseToken !== 'none' ? (
                        <SelectorInput
                            elementId="second-defense-token-input"
                            label="Second Defense Token"
                            value={secondDefenseToken}
                            handleChange={e => setSecondDefenseToken(e.target.value)}
                            items={[
                                { label: 'None', value: 'none' },
                                { label: 'Brace', value: 'brace' },
                                { label: 'Evade', value: 'evade' },
                                { label: 'Scatter', value: 'scatter' }
                            ]}
                            style={{ width: 150 }}
                        />
                    ) : undefined}
                </div>
                <div style={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center', width: '100%', gap: 4 }}>
                    <Typography>Squadron Armament</Typography>
                    <div style={{ flexGrow: 1 }} />
                    <SelectorInput
                        elementId="vs-squadron-red-input"
                        label="Reds"
                        value={vsSquadronArmament[0]}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 }
                        ]}
                        handleChange={e => setVsSquadronArmament([e.target.value, vsSquadronArmament[1], vsSquadronArmament[2]])}
                        style={{ width: 65 }}
                    />
                    <SelectorInput
                        elementId="vs-squadron-blue-input"
                        label="Blues"
                        value={vsSquadronArmament[1]}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 }
                        ]}
                        handleChange={e => setVsSquadronArmament([vsSquadronArmament[0], e.target.value, vsSquadronArmament[2]])}
                        style={{ width: 65 }}
                    />
                    <SelectorInput
                        elementId="vs-squadron-black-input"
                        label="Blacks"
                        value={vsSquadronArmament[2]}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 }
                        ]}
                        handleChange={e => setVsSquadronArmament([vsSquadronArmament[0], vsSquadronArmament[1], e.target.value])}
                        style={{ width: 65 }}
                    />
                </div>
                <div style={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center', width: '100%', gap: 4 }}>
                    <Typography>Squadron Battery</Typography>
                    <div style={{ flexGrow: 1 }} />
                    <SelectorInput
                        elementId="vs-ship-red-input"
                        label="Reds"
                        value={vsShipArmament[0]}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 }
                        ]}
                        handleChange={e => setVsShipArmament([e.target.value, vsShipArmament[1], vsShipArmament[2]])}
                        style={{ width: 65 }}
                    />
                    <SelectorInput
                        elementId="vs-ship-blue-input"
                        label="Blues"
                        value={vsShipArmament[1]}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 }
                        ]}
                        handleChange={e => setVsShipArmament([vsShipArmament[0], e.target.value, vsShipArmament[2]])}
                        style={{ width: 65 }}
                    />
                    <SelectorInput
                        elementId="vs-ship-black-input"
                        label="Blacks"
                        value={vsShipArmament[2]}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 }
                        ]}
                        handleChange={e => setVsShipArmament([vsShipArmament[0], vsShipArmament[1], e.target.value])}
                        style={{ width: 65 }}
                    />
                </div>
                <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', gap: 8}}>
                    <ImageUploadButton
                        uploadedImage={uploadedImage}
                        handleSetUploadedImage={file => setUploadedImage(file)}
                    />
                    <SelectorInput
                            isDisabled={!Boolean(uploadedImage)}
                            elementId="image-mirror-input"
                            label="Mirror Portrait"
                            value={isPortraitMirrored}
                            items={[
                                { label: 'No', value: false },
                                { label: 'Yes', value: true }
                            ]}
                            handleChange={e => setIsPortraitMirrored(e.target.value)}
                            style={{ width: 110 }}
                        />
                        <TextInput
                            isDisabled={!Boolean(uploadedImage)}
                            elementId="portrait-width-input"
                            label="Portrait Width"
                            value={portraitWidth}
                            handleChange={e => setPortraitWidth(e.target.value)}
                            style={{ width: 100 }}
                        />
                        <TextInput
                            isDisabled={!Boolean(uploadedImage)}
                            elementId="portrait-x-input"
                            label="X Transform"
                            value={portraitX}
                            handleChange={e => setPortraitX(e.target.value)}
                            style={{ width: 100 }}
                        />
                        <TextInput
                            isDisabled={!Boolean(uploadedImage)}
                            elementId="portrait-y-input"
                            label="Y Transform"
                            value={portraitY}
                            handleChange={e => setPortraitY(e.target.value)}
                            style={{ width: 100 }}
                        />
                </div>
                <div style={{ display: 'flex', flexFlow: 'row nowrap', width: '100%', gap: 8  }}>
                    <IconButton size="small" onClick={() => setIsLegendDialogOpen(true)}>
                        <InfoIcon />
                    </IconButton>
                    <TextInput
                        fullWidth
                        multiline
                        elementId="card-text-input"
                        label="Card Ability Text"
                        value={cardText}
                        handleChange={e => setCardText(e.target.value)}
                        style={{ flexGrow: 1 }}
                    />

                </div>
                <div style={{ display: 'flex', flexFlow: 'row nowrap', width: '100%', gap: 8 }}>
                    <Button
                        startIcon={<Add />}
                        variant="contained"
                        onClick={e => setMenuAnchorEl(e.currentTarget)}
                    >
                        Add Keyword From Library
                    </Button>
                    <Menu
                        open={Boolean(menuAnchorEl)}
                        anchorEl={menuAnchorEl}
                        onClick={() => setMenuAnchorEl(null)}
                    >
                        {Object.keys(keywords).map(keyword => {
                            return (
                                <MenuItem
                                    key={keyword}
                                    onClick={() => setCardText(cardText + keywords[keyword])}
                                >
                                    {keyword}
                                </MenuItem>
                            );
                        })}
                    </Menu>
                </div>
            </div>
            <Dialog open={isLegendDialogOpen} onClose={() => setIsLegendDialogOpen(false)}>
                <DialogTitle>Ability Text Markup Legend</DialogTitle>
                <DialogContent>
                    <MarkupLegend />
                </DialogContent>
            </Dialog>
            <SquadronCardDisplay
                sizeMultiplier={sizeMultiplier}
                chassisTextFontSize={chassisTextFontSize}
                points={points}
                faction={faction}
                squadronName={squadronName}
                squadronChassis={squadronChassis}
                chassisIconYOffset={Number(chassisIconYOffset) ? Number.parseInt(chassisIconYOffset) * sizeMultiplier : 0}
                squadronIcon={squadronIcon}
                squadronHull={squadronHull}
                squadronSpeed={squadronSpeed}
                vsSquadronArmament={vsSquadronArmament}
                vsShipArmament={vsShipArmament}
                maxNumAllowed={maxNumAllowed}
                firstDefenseToken={firstDefenseToken}
                secondDefenseToken={secondDefenseToken}
                cardText={cardText}
                cardTextFontSize={cardTextFontSize}
                uploadedImage={uploadedImage}
                uploadedImageStyles={{
                    marginTop: Number(portraitY) ? Number.parseInt(portraitY) * sizeMultiplier : 0,
                    marginLeft: Number(portraitX) ? Number.parseInt(portraitX) * sizeMultiplier : 0,
                    width: Number(portraitWidth) ? Number.parseInt(portraitWidth) * sizeMultiplier : 0,
                    height: 'auto',
                    transform: `scaleX(${isPortraitMirrored ? '-1' : '1'})`
                }}
            />
        </div>
    );
}