import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import {
    IconButton,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Tabs,
    Tab
} from '@mui/material';
import {
    LocalCafe as CoffeeIcon,
    Info as InfoIcon
} from '@mui/icons-material';
import ImageUploadButton from '../common/ImageUploadButton';
import TextInput from '../common/TextInput';
import MarkupLegend from '../common/MarkupLegend';
import SelectorInput from '../common/SelectorInput';
import {
    armadaShipFontIcons,
    upgradeTypeItems
} from 'src/utility';
import urls from 'config/urls.json';
import ShipCardDisplay from './ShipCardDisplay';
import ShipTokenDisplay from './ShipTokenDisplay';

const sizeMultiplier = 1.25;

function TabContent(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        {...other}
      >
        {value === index && children}
      </div>
    );
}

export default function ShipBuilder({ breakpoints }) {
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
    
    
    const [size, setSize] = useState('small');
    const [nameFontSize, setNameFontSize] = useState(46);
    const [name, setName] = useState('Untitled Ship');
    const [traitText, setTraitText] = useState('');
    const [maxNumAllowed, setMaxNumAllowed] = useState(0);
    const [points, setPoints] = useState(0);
    const [faction, setFaction] = useState('rebels');
    const [commandValue, setCommandValue] = useState(1);
    const [squadronValue, setSquadronValue] = useState(1);
    const [engineeringValue, setEngineeringValue] = useState(1);
    const [hullValue, setHullValue] = useState(1);
    const [squadArmament, setSquadArmament] = useState([0, 0, 0]);
    const [frontShieldValue, setFrontShieldValue] = useState(1);
    const [frontArmamentValue, setFrontArmamentValue] = useState([0, 0, 0]);
    const [sideShieldValue, setSideShieldValue] = useState(1);
    const [sideArmamentValue, setSideArmamentValue] = useState([0, 0, 0]);
    const [rearShieldValue, setRearShieldValue] = useState(1);
    const [rearArmamentValue, setRearArmamentValue] = useState([0, 0, 0]);
    const [numTitleSlots, setNumTitleSlots] = useState(1);
    const [numOfficerSlots, setNumOfficerSlots] = useState(1);
    const [numWeaponTeamSlots, setNumWeaponTeamSlots] = useState(0);
    const [numSupportTeamSlots, setNumSupportTeamSlots] = useState(0);
    const [numOffRetrofitSlots, setNumOffRetrofitSlots] = useState(0);
    const [numDefRetrofitSlots, setNumDefRetrofitSlots] = useState(0);
    const [numOrdnanceSlots, setNumOrdnanceSlots] = useState(0);
    const [numIonCannonSlots, setNumIonCannonSlots] = useState(0);
    const [numTurbolaserSlots, setNumTurbolaserSlots] = useState(0);
    const [numFleetCommandSlots, setNumFleetCommandSlots] = useState(0);
    const [numFleetSupportSlots, setNumFleetSupportSlots] = useState(0);
    const [numExperimentalSlots, setNumExperimentalSlots] = useState(0);
    const [numSuperWeaponSlots, setSuperWeaponSlots] = useState(0);
    const [defenseTokens, setDefenseTokens] = useState(['', '', '', '', '', '']);
    const [maxSpeed, setMaxSpeed] = useState(1);
    const [speed1Chart, setSpeed1Chart] = useState([0]);
    const [speed2Chart, setSpeed2Chart] = useState([0, 0]);
    const [speed3Chart, setSpeed3Chart] = useState([0, 0, 0]);
    const [speed4Chart, setSpeed4Chart] = useState([0, 0, 0, 0]);
    const [shipAvatar, setShipAvatar] = useState('');
    const [isLegendDialogOpen, setIsLegendDialogOpen] = useState(false);

    const [uploadedShipPortrait, setUploadedShipPortrait] = useState();
    const [portraitWidth, setPortraitWidth] = useState(450 * sizeMultiplier);
    const [portraitX, setPortraitX] = useState(0);
    const [portraitY, setPortraitY] = useState(0);
    const [isPortraitMirrored, setIsPortraitMirrored] = useState(false);

    const [currentTabIndex, setCurrentTabIndex] = useState(0);

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
                    Not accessible
                </Typography>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexFlow: `${breakpoints.lg ? 'row' : 'column'} nowrap`, alignItems: `${breakpoints.lg ? 'flex-start' : 'center'}`, gap: 8, margin: 8 }}>
            <div style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'flex-start', gap: 16, margin: 8, width: '100%' }}>
                <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', gap: 8 }}>
                    <SelectorInput
                        elementId="max-allowed-input"
                        label="Max # Allowed"
                        value={maxNumAllowed}
                        handleChange={e => setMaxNumAllowed(e.target.value)}
                        items={[
                            { label: 'Any', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 }
                        ]}
                        style={{ width: 110 }}
                    />
                    <TextInput
                        elementId="points-input"
                        label="Points"
                        value={points}
                        handleChange={e => setPoints(e.target.value)}
                        style={{ width: 80 }}
                    />
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
                    <SelectorInput
                        elementId="max-speed-input"
                        label="Max Speed"
                        value={maxSpeed}
                        items={[
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 }
                        ]}
                        handleChange={e => setMaxSpeed(e.target.value)}
                        style={{ width: 90 }}
                    />
                    <SelectorInput
                        elementId="size-input"
                        label="Size"
                        value={size}
                        items={[
                            { label: 'Small', value: 'small' },
                            { label: 'Medium', value: 'medium' },
                            { label: 'Large', value: 'large' }
                        ]}
                        handleChange={e => setSize(e.target.value)}
                        style={{ width: 110 }}
                    />
                </div>
                <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', gap: 8 }}>
                    <SelectorInput
                        elementId="name-font-size-input"
                        label="Name Font Size"
                        value={nameFontSize}
                        handleChange={e => setNameFontSize(e.target.value)}
                        items={[
                            { label: '30', value: 30 },
                            { label: '32', value: 32 },
                            { label: '34', value: 34 },
                            { label: '36', value: 36 },
                            { label: '38', value: 38 },
                            { label: '40', value: 40 },
                            { label: '42', value: 42 },
                            { label: '44', value: 44 },
                            { label: '46', value: 46 }
                        ]}
                        style={{ width: 140 }}
                    />
                    <SelectorInput
                        elementId="ship-avatar-input"
                        label="Ship Avatar"
                        value={shipAvatar}
                        items={[
                            ...Object.keys(armadaShipFontIcons.rebels),
                            ...Object.keys(armadaShipFontIcons.empire),
                            ...Object.keys(armadaShipFontIcons.republic),
                            ...Object.keys(armadaShipFontIcons.separatists)
                        ].sort().map(item => ({ label: item, value: item }))}
                        handleChange={e => setShipAvatar(e.target.value)}
                        style={{ flexGrow: 1 }}
                    />
                </div>
                <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', gap: 8 }}>
                    <IconButton size="small" onClick={() => setIsLegendDialogOpen(true)}>
                        <InfoIcon />
                    </IconButton>
                    <TextInput
                        elementId="name-input"
                        label="Name"
                        value={name}
                        handleChange={e => setName(e.target.value)}
                        style={{ flexGrow: 1 }}
                    />
                </div>
                <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', gap: 8 }}>
                    <TextInput
                        elementId="trait-text-input"
                        label="Traits"
                        value={traitText}
                        handleChange={e => setTraitText(e.target.value)}
                        style={{ flexGrow: 1 }}
                    />
                </div>
                <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', gap: 8 }}>
                    <TextInput
                        elementId="hull-value-input"
                        label="Hull"
                        numberRange={[0, 99]}
                        value={hullValue}
                        handleChange={e => setHullValue(e.target.value)}
                        style={{ width: 50 }}
                    />
                    <SelectorInput
                        elementId="command-value-input"
                        label="Command Value"
                        value={commandValue}
                        items={[
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 },
                            { label: '5', value: 5 },
                            { label: '6', value: 6 },
                        ]}
                        handleChange={e => setCommandValue(e.target.value)}
                        style={{ width: 120 }}
                    />
                    <SelectorInput
                        elementId="squadron-value-input"
                        label="Squadron Value"
                        value={squadronValue}
                        items={[
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 },
                            { label: '5', value: 5 },
                            { label: '6', value: 6 },
                        ]}
                        handleChange={e => setSquadronValue(e.target.value)}
                        style={{ width: 120 }}
                    />
                    <SelectorInput
                        elementId="engineering-value-input"
                        label="Engineering Value"
                        value={engineeringValue}
                        items={[
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 },
                            { label: '5', value: 5 },
                            { label: '6', value: 6 },
                        ]}
                        handleChange={e => setEngineeringValue(e.target.value)}
                        style={{ width: 125 }}
                    />
                </div>
                <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', gap: 8 }}>
                    <SelectorInput
                        elementId="defense-input-1"
                        label="Defense Token 1"
                        value={defenseTokens[0]}
                        items={[
                            { label: 'None', value: '' },
                            { label: 'Evade', value: 'evade' },
                            { label: 'Brace', value: 'brace' },
                            { label: 'Redirect', value: 'redirect' },
                            { label: 'Contain', value: 'contain' },
                            { label: 'Scatter', value: 'scatter' },
                            { label: 'Salvo', value: 'salvo' }
                        ]}
                        handleChange={e => setDefenseTokens([
                            e.target.value,
                            defenseTokens[1],
                            defenseTokens[2],
                            defenseTokens[3],
                            defenseTokens[4],
                            defenseTokens[5]
                        ])}
                        style={{ width: 175 }}
                    />
                    <SelectorInput
                        elementId="defense-input-2"
                        label="Defense Token 2"
                        value={defenseTokens[1]}
                        items={[
                            { label: 'None', value: '' },
                            { label: 'Evade', value: 'evade' },
                            { label: 'Brace', value: 'brace' },
                            { label: 'Redirect', value: 'redirect' },
                            { label: 'Contain', value: 'contain' },
                            { label: 'Scatter', value: 'scatter' },
                            { label: 'Salvo', value: 'salvo' }
                        ]}
                        handleChange={e => setDefenseTokens([
                            defenseTokens[0],
                            e.target.value,
                            defenseTokens[2],
                            defenseTokens[3],
                            defenseTokens[4],
                            defenseTokens[5]
                        ])}
                        style={{ width: 175 }}
                    />
                </div>
                <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', gap: 8 }}>
                    <SelectorInput
                        elementId="defense-input-3"
                        label="Defense Token 3"
                        value={defenseTokens[2]}
                        items={[
                            { label: 'None', value: '' },
                            { label: 'Evade', value: 'evade' },
                            { label: 'Brace', value: 'brace' },
                            { label: 'Redirect', value: 'redirect' },
                            { label: 'Contain', value: 'contain' },
                            { label: 'Scatter', value: 'scatter' },
                            { label: 'Salvo', value: 'salvo' }
                        ]}
                        handleChange={e => setDefenseTokens([
                            defenseTokens[0],
                            defenseTokens[1],
                            e.target.value,
                            defenseTokens[3],
                            defenseTokens[4],
                            defenseTokens[5]
                        ])}
                        style={{ width: 175 }}
                    />
                    <SelectorInput
                        elementId="defense-input-4"
                        label="Defense Token 4"
                        value={defenseTokens[3]}
                        items={[
                            { label: 'None', value: '' },
                            { label: 'Evade', value: 'evade' },
                            { label: 'Brace', value: 'brace' },
                            { label: 'Redirect', value: 'redirect' },
                            { label: 'Contain', value: 'contain' },
                            { label: 'Scatter', value: 'scatter' },
                            { label: 'Salvo', value: 'salvo' }
                        ]}
                        handleChange={e => setDefenseTokens([
                            defenseTokens[0],
                            defenseTokens[1],
                            defenseTokens[2],
                            e.target.value,
                            defenseTokens[4],
                            defenseTokens[5]
                        ])}
                        style={{ width: 175 }}
                    />
                </div>
                <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', alignItems: 'center', gap: 8 }}>
                    <SelectorInput
                        elementId="speed-1-chart-input"
                        label="Click 1"
                        value={speed1Chart[0]}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 }
                        ]}
                        handleChange={e => setSpeed1Chart([e.target.value])}
                        style={{ width: 70 }}
                    />
                    <div style={{ flexGrow: 1 }} />
                    Speed 1
                </div>
                {maxSpeed > 1 && <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', alignItems: 'center', gap: 8 }}>
                    <SelectorInput
                        elementId="speed-2-1-chart-input"
                        label="Click 1"
                        value={speed2Chart[0]}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                        ]}
                        handleChange={e => setSpeed2Chart([e.target.value, speed2Chart[1]])}
                        style={{ width: 70 }}
                    />
                    <SelectorInput
                        elementId="speed-2-2-chart-input"
                        label="Click 2"
                        value={speed2Chart[1]}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                        ]}
                        handleChange={e => setSpeed2Chart([speed2Chart[0], e.target.value])}
                        style={{ width: 70 }}
                    />
                    <div style={{ flexGrow: 1 }} />
                    Speed 2
                </div>}
                {maxSpeed > 2 && <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', alignItems: 'center', gap: 8 }}>
                    <SelectorInput
                        elementId="speed-3-1-chart-input"
                        label="Click 1"
                        value={speed3Chart[0]}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                        ]}
                        handleChange={e => setSpeed3Chart([e.target.value, speed3Chart[1], speed3Chart[2]])}
                        style={{ width: 70 }}
                    />
                    <SelectorInput
                        elementId="speed-3-2-chart-input"
                        label="Click 2"
                        value={speed3Chart[1]}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                        ]}
                        handleChange={e => setSpeed3Chart([speed3Chart[0], e.target.value, speed3Chart[2]])}
                        style={{ width: 70 }}
                    />
                    <SelectorInput
                        elementId="speed-3-3-chart-input"
                        label="Click 3"
                        value={speed3Chart[2]}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                        ]}
                        handleChange={e => setSpeed3Chart([speed3Chart[0], speed3Chart[1], e.target.value])}
                        style={{ width: 70 }}
                    />
                    <div style={{ flexGrow: 1 }} />
                    Speed 3
                </div>}
                {maxSpeed > 3 && <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', alignItems: 'center', gap: 8 }}>
                    <SelectorInput
                        elementId="speed-4-1-chart-input"
                        label="Click 1"
                        value={speed4Chart[0]}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                        ]}
                        handleChange={e => setSpeed4Chart([e.target.value, speed4Chart[1], speed4Chart[2], speed4Chart[3]])}
                        style={{ width: 70 }}
                    />
                    <SelectorInput
                        elementId="speed-4-2-chart-input"
                        label="Click 2"
                        value={speed4Chart[1]}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                        ]}
                        handleChange={e => setSpeed4Chart([speed4Chart[0], e.target.value, speed4Chart[2], speed4Chart[3]])}
                        style={{ width: 70 }}
                    />
                    <SelectorInput
                        elementId="speed-4-3-chart-input"
                        label="Click 3"
                        value={speed4Chart[2]}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                        ]}
                        handleChange={e => setSpeed4Chart([speed4Chart[0], speed4Chart[1], e.target.value, speed4Chart[3]])}
                        style={{ width: 70 }}
                    />
                    <SelectorInput
                        elementId="speed-4-4-chart-input"
                        label="Click 4"
                        value={speed4Chart[3]}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                        ]}
                        handleChange={e => setSpeed4Chart([speed4Chart[0], speed4Chart[1], speed4Chart[2], e.target.value])}
                        style={{ width: 70 }}
                    />
                    <div style={{ flexGrow: 1 }} />
                    Speed 4
                </div>}
                <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', alignItems: 'center', gap: 8 }}>
                    Front
                    <div style={{ flexGrow: 1 }} />
                    <SelectorInput
                        elementId="front-shield-value-input"
                        label="Shields"
                        value={frontShieldValue}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 },
                            { label: '5', value: 5 },
                            { label: '6', value: 6 },
                        ]}
                        handleChange={e => setFrontShieldValue(e.target.value)}
                        style={{ width: 65 }}
                    />
                    <SelectorInput
                        elementId="front-armament-red-value"
                        label="Reds"
                        value={frontArmamentValue[0]}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 },
                            { label: '5', value: 5 },
                            { label: '6', value: 6 },
                        ]}
                        handleChange={e => setFrontArmamentValue([e.target.value, frontArmamentValue[1], frontArmamentValue[2]])}
                        style={{ width: 65 }}
                    />
                    <SelectorInput
                        elementId="front-armament-blue-value"
                        label="Blues"
                        value={frontArmamentValue[1]}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 },
                            { label: '5', value: 5 },
                            { label: '6', value: 6 },
                        ]}
                        handleChange={e => setFrontArmamentValue([frontArmamentValue[0], e.target.value, frontArmamentValue[2]])}
                        style={{ width: 65 }}
                    />
                    <SelectorInput
                        elementId="front-armament-black-value"
                        label="Blacks"
                        value={frontArmamentValue[2]}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 },
                            { label: '5', value: 5 },
                            { label: '6', value: 6 },
                        ]}
                        handleChange={e => setFrontArmamentValue([frontArmamentValue[0], frontArmamentValue[1], e.target.value])}
                        style={{ width: 65 }}
                    />
                </div>
                <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', alignItems: 'center', gap: 8 }}>
                    Sides
                    <div style={{ flexGrow: 1 }} />
                    <SelectorInput
                        elementId="side-shield-value-input"
                        label="Shields"
                        value={sideShieldValue}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 },
                            { label: '5', value: 5 },
                            { label: '6', value: 6 },
                        ]}
                        handleChange={e => setSideShieldValue(e.target.value)}
                        style={{ width: 65 }}
                    />
                    <SelectorInput
                        elementId="side-armament-red-value"
                        label="Reds"
                        value={sideArmamentValue[0]}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 },
                            { label: '5', value: 5 },
                            { label: '6', value: 6 },
                        ]}
                        handleChange={e => setSideArmamentValue([e.target.value, sideArmamentValue[1], sideArmamentValue[2]])}
                        style={{ width: 65 }}
                    />
                    <SelectorInput
                        elementId="side-armament-blue-value"
                        label="Blues"
                        value={sideArmamentValue[1]}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 },
                            { label: '5', value: 5 },
                            { label: '6', value: 6 },
                        ]}
                        handleChange={e => setSideArmamentValue([sideArmamentValue[0], e.target.value, sideArmamentValue[2]])}
                        style={{ width: 65 }}
                    />
                    <SelectorInput
                        elementId="side-armament-black-value"
                        label="Blacks"
                        value={sideArmamentValue[2]}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 },
                            { label: '5', value: 5 },
                            { label: '6', value: 6 },
                        ]}
                        handleChange={e => setSideArmamentValue([sideArmamentValue[0], sideArmamentValue[1], e.target.value])}
                        style={{ width: 65 }}
                    />
                </div>
                <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', alignItems: 'center', gap: 8 }}>
                    Rear
                    <div style={{ flexGrow: 1 }} />
                    <SelectorInput
                        elementId="front-shield-value-input"
                        label="Shields"
                        value={rearShieldValue}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 },
                            { label: '5', value: 5 },
                            { label: '6', value: 6 },
                        ]}
                        handleChange={e => setRearShieldValue(e.target.value)}
                        style={{ width: 65 }}
                    />
                    <SelectorInput
                        elementId="rear-armament-red-value"
                        label="Reds"
                        value={rearArmamentValue[0]}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 },
                            { label: '5', value: 5 },
                            { label: '6', value: 6 },
                        ]}
                        handleChange={e => setRearArmamentValue([e.target.value, rearArmamentValue[1], rearArmamentValue[2]])}
                        style={{ width: 65 }}
                    />
                    <SelectorInput
                        elementId="rear-armament-blue-value"
                        label="Blues"
                        value={rearArmamentValue[1]}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 },
                            { label: '5', value: 5 },
                            { label: '6', value: 6 },
                        ]}
                        handleChange={e => setRearArmamentValue([rearArmamentValue[0], e.target.value, rearArmamentValue[2]])}
                        style={{ width: 65 }}
                    />
                    <SelectorInput
                        elementId="rear-armament-black-value"
                        label="Blacks"
                        value={rearArmamentValue[2]}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 },
                            { label: '5', value: 5 },
                            { label: '6', value: 6 },
                        ]}
                        handleChange={e => setRearArmamentValue([rearArmamentValue[0], rearArmamentValue[1], e.target.value])}
                        style={{ width: 65 }}
                    />
                </div>
                <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', alignItems: 'center', gap: 8 }}>
                    Anti-squadron Armament
                    <div style={{ flexGrow: 1 }} />
                    <SelectorInput
                        elementId="squad-armament-red-value"
                        label="Reds"
                        value={squadArmament[0]}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 }
                        ]}
                        handleChange={e => setSquadArmament([e.target.value, squadArmament[1], squadArmament[2]])}
                        style={{ width: 65 }}
                    />
                    <SelectorInput
                        elementId="squad-armament-blue-value"
                        label="Blues"
                        value={squadArmament[1]}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 }
                        ]}
                        handleChange={e => setSquadArmament([squadArmament[0], e.target.value, squadArmament[2]])}
                        style={{ width: 65 }}
                    />
                    <SelectorInput
                        elementId="squad-armament-black-value"
                        label="Blacks"
                        value={squadArmament[2]}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 }
                        ]}
                        handleChange={e => setSquadArmament([squadArmament[0], squadArmament[1], e.target.value])}
                        style={{ width: 65 }}
                    />
                </div>
                <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', alignItems: 'center', gap: 8 }}>
                    Core Upgrades
                    <div style={{ flexGrow: 1 }} />
                    <SelectorInput
                        elementId="title-input"
                        label="Titles"
                        value={numTitleSlots}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 }
                        ]}
                        handleChange={e => setNumTitleSlots(e.target.value)}
                        style={{ width: 60 }}
                    />
                    <SelectorInput
                        elementId="officer-input"
                        label="Officers"
                        value={numOfficerSlots}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 }
                        ]}
                        handleChange={e => setNumOfficerSlots(e.target.value)}
                        style={{ width: 70 }}
                    />
                </div>
                <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', alignItems: 'center', gap: 8 }}>
                    Team Upgrades
                    <div style={{ flexGrow: 1 }} />
                    <SelectorInput
                        elementId="weapons-team-input"
                        label="Weapons Teams"
                        value={numWeaponTeamSlots}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 }
                        ]}
                        handleChange={e => setNumWeaponTeamSlots(e.target.value)}
                        style={{ width: 120 }}
                    />
                    <SelectorInput
                        elementId="support-team-input"
                        label="Support Teams"
                        value={numSupportTeamSlots}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 }
                        ]}
                        handleChange={e => setNumSupportTeamSlots(e.target.value)}
                        style={{ width: 110 }}
                    />
                </div>
                <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', alignItems: 'center', gap: 8 }}>
                    Retrofit Upgrades
                    <div style={{ flexGrow: 1 }} />
                    <SelectorInput
                        elementId="offensive-retrofit-input"
                        label="Offensive Retrofits"
                        value={numOffRetrofitSlots}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 }
                        ]}
                        handleChange={e => setNumOffRetrofitSlots(e.target.value)}
                        style={{ width: 130 }}
                    />
                    <SelectorInput
                        elementId="defensive-retrofit-input"
                        label="Defensive Retrofits"
                        value={numDefRetrofitSlots}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 }
                        ]}
                        handleChange={e => setNumDefRetrofitSlots(e.target.value)}
                        style={{ width: 130 }}
                    />
                </div>
                <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', alignItems: 'center', gap: 8 }}>
                    Armament Upgrades
                    <div style={{ flexGrow: 1 }} />
                    <SelectorInput
                        elementId="ordnance-input"
                        label="Ordnance"
                        value={numOrdnanceSlots}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 }
                        ]}
                        handleChange={e => setNumOrdnanceSlots(e.target.value)}
                        style={{ width: 80 }}
                    />
                    <SelectorInput
                        elementId="ion-cannon-input"
                        label="Ion Cannons"
                        value={numIonCannonSlots}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 }
                        ]}
                        handleChange={e => setNumIonCannonSlots(e.target.value)}
                        style={{ width: 95 }}
                    />
                    <SelectorInput
                        elementId="turbolaser-input"
                        label="Turbolasers"
                        value={numTurbolaserSlots}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 }
                        ]}
                        handleChange={e => setNumTurbolaserSlots(e.target.value)}
                        style={{ width: 90 }}
                    />
                </div>
                <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', alignItems: 'center', gap: 8 }}>
                    Support Upgrades
                    <div style={{ flexGrow: 1 }} />
                    <SelectorInput
                        elementId="fleet-command-input"
                        label="Fleet Commands"
                        value={numFleetCommandSlots}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 }
                        ]}
                        handleChange={e => setNumFleetCommandSlots(e.target.value)}
                        style={{ width: 120 }}
                    />
                    <SelectorInput
                        elementId="fleet-support-input"
                        label="Fleet Supports"
                        value={numFleetSupportSlots}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 }
                        ]}
                        handleChange={e => setNumFleetSupportSlots(e.target.value)}
                        style={{ width: 110 }}
                    />
                </div>
                <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', alignItems: 'center', gap: 8 }}>
                    Special Upgrades
                    <div style={{ flexGrow: 1 }} />
                    <SelectorInput
                        elementId="experimental-input"
                        label="Experimental Retrofits"
                        value={numExperimentalSlots}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 }
                        ]}
                        handleChange={e => setNumExperimentalSlots(e.target.value)}
                        style={{ width: 150 }}
                    />
                    <SelectorInput
                        elementId="super-weapon-input"
                        label="Super Weapons"
                        value={numSuperWeaponSlots}
                        items={[
                            { label: '0', value: 0 },
                            { label: '1', value: 1 }
                        ]}
                        handleChange={e => setSuperWeaponSlots(e.target.value)}
                        style={{ width: 120 }}
                    />
                </div>
                <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', alignItems: 'center', gap: 8 }}>
                    <ImageUploadButton
                        uploadedImage={uploadedShipPortrait}
                        handleSetUploadedImage={file => setUploadedShipPortrait(file)}
                    />
                    <SelectorInput
                        isDisabled={!Boolean(uploadedShipPortrait)}
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
                        isDisabled={!Boolean(uploadedShipPortrait)}
                        elementId="portrait-width-input"
                        label="Portrait Width"
                        value={portraitWidth}
                        handleChange={e => setPortraitWidth(e.target.value)}
                        style={{ width: 100 }}
                    />
                    <TextInput
                        isDisabled={!Boolean(uploadedShipPortrait)}
                        elementId="portrait-x-input"
                        label="X Transform"
                        value={portraitX}
                        handleChange={e => setPortraitX(e.target.value)}
                        style={{ width: 100 }}
                    />
                    <TextInput
                        isDisabled={!Boolean(uploadedShipPortrait)}
                        elementId="portrait-y-input"
                        label="Y Transform"
                        value={portraitY}
                        handleChange={e => setPortraitY(e.target.value)}
                        style={{ width: 100 }}
                    />
                </div>
                <Dialog open={isLegendDialogOpen} onClose={() => setIsLegendDialogOpen(false)}>
                    <DialogTitle>Ability Text Markup Legend</DialogTitle>
                    <DialogContent>
                        <MarkupLegend />
                    </DialogContent>
                </Dialog>
            </div>
            <div style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'flex-start', gap: 8, margin: 8, width: '100%' }}>
                <Tabs value={currentTabIndex} onChange={(e, newValue) => setCurrentTabIndex(newValue)}>
                    <Tab label="Ship Card" />
                    <Tab label="Ship Token" />
                </Tabs>
                <TabContent index={0} value={currentTabIndex}>
                    <ShipCardDisplay
                        sizeMultiplier={sizeMultiplier}
                        nameFontSize={nameFontSize}
                        name={name}
                        traitText={traitText}
                        maxNumAllowed={maxNumAllowed}
                        points={points}
                        faction={faction}
                        commandValue={commandValue}
                        squadronValue={squadronValue}
                        engineeringValue={engineeringValue}
                        hullValue={hullValue}
                        squadArmament={squadArmament}
                        frontShieldValue={frontShieldValue}
                        frontArmamentValue={frontArmamentValue}
                        sideShieldValue={sideShieldValue}
                        sideArmamentValue={sideArmamentValue}
                        rearShieldValue={rearShieldValue}
                        rearArmamentValue={rearArmamentValue}
                        numTitleSlots={numTitleSlots}
                        numOfficerSlots={numOfficerSlots}
                        numWeaponTeamSlots={numWeaponTeamSlots}
                        numSupportTeamSlots={numSupportTeamSlots}
                        numOffRetrofitSlots={numOffRetrofitSlots}
                        numDefRetrofitSlots={numDefRetrofitSlots}
                        numOrdnanceSlots={numOrdnanceSlots}
                        numIonCannonSlots={numIonCannonSlots}
                        numTurbolaserSlots={numTurbolaserSlots}
                        numFleetCommandSlots={numFleetCommandSlots}
                        numFleetSupportSlots={numFleetSupportSlots}
                        numExperimentalSlots={numExperimentalSlots}
                        numSuperWeaponSlots={numSuperWeaponSlots}
                        defenseTokens={defenseTokens}
                        maxSpeed={maxSpeed}
                        speed1Chart={speed1Chart}
                        speed2Chart={speed2Chart}
                        speed3Chart={speed3Chart}
                        speed4Chart={speed4Chart}
                        shipAvatar={shipAvatar}
                        uploadedShipPortrait={uploadedShipPortrait}
                        portraitWidth={portraitWidth}
                        portraitX={portraitX}
                        portraitY={portraitY}
                        isPortraitMirrored={isPortraitMirrored}
                        uploadedShipPortraitStyles={{
                            marginTop: Number(portraitY) ? Number.parseInt(portraitY) * sizeMultiplier : 0,
                            marginLeft: Number(portraitX) ? Number.parseInt(portraitX) * sizeMultiplier : 0,
                            width: Number(portraitWidth) ? Number.parseInt(portraitWidth) * sizeMultiplier : 0,
                            height: 'auto',
                            transform: `scaleX(${isPortraitMirrored ? '-1' : '1'})`
                        }}
                    />
                </TabContent>
                <TabContent index={1} value={currentTabIndex} style={{ width: '100%' }}>
                    <ShipTokenDisplay
                        size={size}
                        shipAvatar={shipAvatar}
                        hullValue={hullValue}
                        squadArmament={squadArmament}
                        frontShieldValue={frontShieldValue}
                        frontArmamentValue={frontArmamentValue}
                        sideShieldValue={sideShieldValue}
                        sideArmamentValue={sideArmamentValue}
                        rearShieldValue={rearShieldValue}
                        rearArmamentValue={rearArmamentValue}
                    />
                </TabContent>
            </div>
        </div>
    );
}