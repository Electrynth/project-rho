import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import {
    IconButton,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    Button
} from '@mui/material';
import {
    LocalCafe as CoffeeIcon,
    Info as InfoIcon
} from '@mui/icons-material';
import SelectorInput from '../common/SelectorInput';
import ToggleGroupInput from '../common/ToggleGroupInput';
import ImageUploadButton from '../common/ImageUploadButton';
import TextInput from '../common/TextInput';
import MarkupLegend from '../common/MarkupLegend';
import {
    armadaShipFontIcons,
    upgradeTypeItems
} from 'src/utility';
import UpgradeCardDisplay from './UpgradeCardDisplay';
import urls from 'config/urls.json';

const sizeMultiplier = 0.8;

export default function UpgradeBuilder({ breakpoints }) {
    const { user } = useAuth0();
    const [isLoading, setIsLoading] = useState(true);

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
    const [maxNumAllowed, setMaxNumAllowed] = useState(0);
    const [cardName, setCardName] = useState('Untitled');
    const [cardNameFontSize, setCardNameFontSize] = useState(52);
    const [faction, setFaction] = useState('any');
    const [cardFooterText, setCardFooterText] = useState('');
    const [cardText, setCardText] = useState('');
    const [cardTextFontSize, setCardTextFontSize] = useState(18);
    const [titledShip, setTitledShip] = useState('');
    const [isExhaust, setIsExhaust] = useState(false);
    const [upgradeTypes, setUpgradeTypes] = useState([]);
    const [readyCostTokens, setReadyCostTokens] = useState([]);
    const [readyCostTokenValue, setReadyCostTokenValue] = useState(0);
    const [startingTokens, setStartingTokens] = useState([]);
    const [startingTokenValue, setStartingTokenValue] = useState(0);
    const [uploadedImage, setUploadedImage] = useState();
    const [titledShipY, setTitledShipY] = useState(0);
    const [portraitWidth, setPortraitWidth] = useState(450 * sizeMultiplier);
    const [portraitX, setPortraitX] = useState(0);
    const [portraitY, setPortraitY] = useState(0);
    const [isPortraitMirrored, setIsPortraitMirrored] = useState(false);
    const [isLegendDialogOpen, setIsLegendDialogOpen] = useState(false);
    const [builderAccess, setBuilderAccess] = useState(false);
    
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
                    Monetary contribution is required to access this feature. A one-time contribution of $3 or more will grant permanent access to every feature on this platform.
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
                <TextInput
                    fullWidth
                    elementId="card-name-input"
                    label="Card Name"
                    value={cardName}
                    handleChange={e => setCardName(e.target.value)}
                />
                <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', gap: 8 }}>
                    <SelectorInput
                        elementId="card-name-font-size-input"
                        label="Name Font Size"
                        value={cardNameFontSize}
                        handleChange={e => setCardNameFontSize(e.target.value)}
                        items={[
                            { label: '46', value: 46 },
                            { label: '48', value: 48 },
                            { label: '50', value: 50 },
                            { label: '52', value: 52 },
                            { label: '54', value: 54 },
                            { label: '56', value: 56 }
                        ]}
                        style={{ width: 110 }}
                    />
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
                        style={{ width: 130 }}
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
                            { label: '3', value: 3 }
                        ]}
                        style={{ width: 110 }}
                    />
                    <SelectorInput
                        error={upgradeTypes.length > 0 && upgradeTypes[0] === 'commander' && faction === 'any'}
                        elementId="faction-input"
                        label="Faction"
                        value={faction}
                        handleChange={e => setFaction(e.target.value)}
                        items={[
                            { label: 'Any', value: 'any' },
                            { label: 'Rebels', value: 'rebels' },
                            { label: 'Empire', value: 'empire' },
                            { label: 'Republic', value: 'republic' },
                            { label: 'Separatists', value: 'separatists' }
                        ]}
                        style={{ width: 130 }}
                    />
                    <TextInput
                        elementId="card-points-input"
                        label="Points"
                        numberRange={[-999, 999]}
                        value={points}
                        handleChange={e => setPoints(e.target.value)}
                        style={{ width: 80 }}
                    />
                </div>
                <div style={{ display: 'flex', flexFlow: 'row nowrap', width: '100%', gap: 8 }}>
                    <SelectorInput
                        error={upgradeTypes.length === 0}
                        isMultiSelect={true}
                        elementId="upgrade-types-input"
                        label="Upgrade Types (Min 1, Max 2)"
                        value={upgradeTypes}
                        items={upgradeTypeItems}
                        handleChange={e => {
                            if (e.target.value.length < 3) setUpgradeTypes(e.target.value);
                        }}
                        style={{ flexGrow: 1 }}
                    />
                </div>
                <div style={{ display: 'flex', flexFlow: 'row nowrap', width: '100%', gap: 8 }}>
                    <SelectorInput
                        error={upgradeTypes.length > 0 && upgradeTypes[0] === 'title' && !titledShip}
                        isDisabled={upgradeTypes.length === 0 || upgradeTypes.length > 0 && upgradeTypes[0] !== 'title'}
                        elementId="titled-ship-input"
                        label="Titled Ship Class"
                        value={titledShip}
                        items={[
                            ...Object.keys(armadaShipFontIcons.rebels),
                            ...Object.keys(armadaShipFontIcons.empire),
                            ...Object.keys(armadaShipFontIcons.republic),
                            ...Object.keys(armadaShipFontIcons.separatists)
                        ].sort().map(item => ({ label: item, value: item }))}
                        handleChange={e => setTitledShip(e.target.value)}
                        style={{ flexGrow: 1 }}
                    />
                    <TextInput
                        elementId="titled-ship-y-offset-input"
                        label="Title Ship Y Offset"
                        isDisabled={upgradeTypes.length === 0 || upgradeTypes.length > 0 && upgradeTypes[0] !== 'title'}
                        value={titledShipY}
                        handleChange={e => setTitledShipY(e.target.value)}
                        style={{ width: 160 }}
                    />
                </div>
                <div style={{ display: 'flex', flexFlow: 'column nowrap', width: '100%', gap: 8 }}>
                    <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', gap: 8 }}>
                        <Typography variant="subtitle1">Starting Resources</Typography>
                        <SelectorInput
                            elementId="starting-token-value-input"
                            label="# Tokens"
                            value={startingTokenValue}
                            handleChange={e => setStartingTokenValue(e.target.value)}
                            items={[
                                { label: 'None', value: 0 },
                                { label: '1', value: 1 },
                                { label: '2', value: 2 },
                                { label: '3', value: 3 },
                                { label: '4', value: 4 },
                                { label: '5', value: 5 },
                                { label: '6', value: 6 }
                            ]}
                            style={{ minWidth: 90 }}
                        />
                    </div>
                    <ToggleGroupInput
                        fullWidth
                        elementId="starting-tokens-input"
                        label="Starting Tokens"
                        value={startingTokens}
                        handleChange={(e, v) => {
                            if (!e.target.value.includes('any') && startingTokens.length > 2) {
                                setStartingTokens(['any token']);
                            } else if (e.target.value.includes('any')) {
                                if (
                                    startingTokens.includes('navigation') ||
                                    startingTokens.includes('con fire') ||
                                    startingTokens.includes('squadron') ||
                                    startingTokens.includes('repair')
                                ) setStartingTokens([e.target.value]);
                                else setStartingTokens(v);
                            } else if (!e.target.value.includes('any')) {
                                if (
                                    startingTokens.includes('any dial') ||
                                    startingTokens.includes('any token')
                                ) setStartingTokens([e.target.value]);
                                else setStartingTokens(v);
                            } else {
                                setStartingTokens(v);
                            }
                        }}
                        items={[
                            { label: 'Any dial', value: 'any dial' },
                            { label: 'Any token', value: 'any token' },
                            { label: 'Navigation', value: 'navigation' },
                            { label: 'Con Fire', value: 'con fire' },
                            { label: 'Squadron', value: 'squadron' },
                            { label: 'Repair', value: 'repair' }
                        ]}
                        style={{ maxWidth: 560 }}
                    />
                </div>
                <div style={{ display: 'flex', flexFlow: 'column nowrap', width: '100%', gap: 8 }}>
                    <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', gap: 8 }}>
                        <Typography variant="subtitle1"> Recur Cost</Typography>
                        <SelectorInput
                            elementId="ready-cost-token-value-input"
                            label="# Tokens"
                            value={readyCostTokenValue}
                            handleChange={e => setReadyCostTokenValue(e.target.value)}
                            items={[
                                { label: 'None', value: 0 },
                                { label: '1', value: 1 },
                                { label: '2', value: 2 },
                                { label: '3', value: 3 },
                                { label: '4', value: 4 },
                                { label: '5', value: 5 },
                                { label: '6', value: 6 }
                            ]}
                            style={{ minWidth: 90 }}
                        />
                        <Typography>or</Typography>
                        <SelectorInput
                            elementId="exhaustible-input"
                            label="Exhaustible"
                            value={isExhaust}
                            handleChange={e => setIsExhaust(e.target.value)}
                            items={[
                                { label: 'No', value: false },
                                { label: 'Yes', value: true }
                            ]}
                            style={{ width: 90 }}
                        />
                    </div>
                    <ToggleGroupInput
                        fullWidth
                        elementId="ready-cost-tokens-input"
                        label="Ready Cost Tokens"
                        value={readyCostTokens}
                        handleChange={(e, v) => {
                            if (!e.target.value.includes('any') && readyCostTokens.length > 2) {
                                setReadyCostTokens(['any token']);
                            } else if (e.target.value.includes('any')) {
                                if (
                                    readyCostTokens.includes('navigation') ||
                                    readyCostTokens.includes('con fire') ||
                                    readyCostTokens.includes('squadron') ||
                                    readyCostTokens.includes('repair')
                                ) setReadyCostTokens([e.target.value]);
                                else setReadyCostTokens(v);
                            } else if (!e.target.value.includes('any')) {
                                if (
                                    readyCostTokens.includes('any dial') ||
                                    readyCostTokens.includes('any token')
                                ) setReadyCostTokens([e.target.value]);
                                else setReadyCostTokens(v);
                            } else {
                                setReadyCostTokens(v);
                            }
                        }}
                        items={[
                            { label: 'Any dial', value: 'any dial' },
                            { label: 'Any token', value: 'any token' },
                            { label: 'Navigation', value: 'navigation' },
                            { label: 'Con Fire', value: 'con fire' },
                            { label: 'Squadron', value: 'squadron' },
                            { label: 'Repair', value: 'repair' }
                        ]}
                        style={{ maxWidth: 560 }}
                    />
                </div>
                <div style={{ display: 'flex', flexFlow: 'row wrap', gap: 8 }}>
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
                <div style={{ display: 'flex', flexflow: 'row nowrap', width: '100%', gap: 8 }}>
                    <div>
                        <IconButton size="small" onClick={() => setIsLegendDialogOpen(true)}>
                            <InfoIcon />
                        </IconButton>
                    </div>
                    <TextInput
                        fullWidth
                        multiline
                        elementId="card-text-input"
                        label="Card Ability Text"
                        value={cardText}
                        handleChange={e => setCardText(e.target.value)}
                        style={{ minWidth: 360 }}
                    />  
                </div>
                <TextInput
                    fullWidth
                    elementId="card-footer-text-input"
                    label="Card Footer Text (optional)"
                    value={cardFooterText}
                    handleChange={e => setCardFooterText(e.target.value)}
                    style={{ minWidth: 360 }}
                />
            </div>
            <Dialog open={isLegendDialogOpen} onClose={() => setIsLegendDialogOpen(false)}>
                <DialogTitle>Ability Text Markup Legend</DialogTitle>
                <DialogContent>
                    <MarkupLegend />
                </DialogContent>
            </Dialog>
            <UpgradeCardDisplay
                sizeMultiplier={sizeMultiplier}
                maxNumAllowed={maxNumAllowed}
                points={points}
                faction={faction}
                titledShip={titledShip}
                cardName={cardName}
                cardNameFontSize={cardNameFontSize}
                cardText={cardText}
                cardTextFontSize={cardTextFontSize}
                upgradeTypes={upgradeTypes}
                isExhaust={isExhaust}
                startingTokens={startingTokens}
                startingTokenValue={startingTokenValue}
                readyCostTokens={readyCostTokens}
                readyCostTokenValue={readyCostTokenValue}
                uploadedImage={uploadedImage}
                titledShipY={titledShipY}
                cardFooterText={cardFooterText}
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