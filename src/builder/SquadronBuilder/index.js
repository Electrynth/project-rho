import { useState } from 'react';
import {
    IconButton,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent
} from '@mui/material';
import {
    Info as InfoIcon
} from '@mui/icons-material';
import {
    armadaFontIcons,
    squadronTemplateImages,
    armadaSquadronFontIcons
} from 'src/utility';
import ImageUploadButton from '../common/ImageUploadButton';
import TextInput from '../common/TextInput';
import MarkupLegend from '../common/MarkupLegend';
import SelectorInput from '../common/SelectorInput';
import SquadronCardDisplay from './SquadronCardDisplay';

const sizeMultiplier = 0.8;

export default function SquadronBuilder({ breakpoints }) {
    const [points, setPoints] = useState(0);
    const [faction, setFaction] = useState('rebels');
    const [maxNumAllowed, setMaxNumAllowed] = useState(1);
    const [squadronName, setSquadronName] = useState('');
    const [squadronChassis, setSquadronChassis] = useState('');
    const [isChassisItalic, setIsChassisItalic] = useState(false);
    const [squadronIcon, setSquadronIcon] = useState('');
    const [squadronSpeed, setSquadronSpeed] = useState(1);
    const [squadronHull, setSquadronHull] = useState(2);
    const [cardText, setCardText] = useState('');
    const [cardTextFontSize, setCardTextFontSize] = useState(16);
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
                        numberRange={[-999, 999]}
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
                </div>
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
                            { label: '3', value: 3 },
                        ]}
                        style={{ width: 110 }}
                    />
                    <TextInput
                        elementId="squadron-name-input"
                        label="Squadron Ace Name (if any)"
                        value={squadronName}
                        handleChange={e => setSquadronName(e.target.value)}
                        style={{ flexGrow: 1 }}
                    />
                </div>
                <SelectorInput
                    fullWidth
                    elementId="squadron-icon-input"
                    label="Squadron Icon"
                    value={squadronIcon}
                    handleChange={e => setSquadronIcon(e.target.value)}
                    items={Object.keys(armadaSquadronFontIcons).sort().map(sqdName => ({ label: sqdName, value: sqdName }))}
                />
                <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100%', gap: 8 }}>
                    <SelectorInput
                        elementId="italic-chassis"
                        label="Italicize Chassis Name"
                        value={isChassisItalic}
                        handleChange={e => setIsChassisItalic(e.target.value)}
                        items={[
                            { label: 'No', value: false },
                            { label: 'Yes', value: true }
                        ]}
                        style={{ width: 150  }}
                    />
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
                <div style={{ display: 'flex', flexFlow: 'column nowrap', width: '100%', gap: 8}}>
                    <SelectorInput
                        elementId="card-text-font-size-input"
                        label="Card Text Font Size"
                        value={cardTextFontSize}
                        items={[
                            { label: '14', value: 14 },
                            { label: '15', value: 15 },
                            { label: '16', value: 16 },
                            { label: '17', value: 17 },
                            { label: '18', value: 18 }
                        ]}
                        handleChange={e => setCardTextFontSize(e.target.value)}
                        style={{ width: 130 }}
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
            </div>
            <Dialog open={isLegendDialogOpen} onClose={() => setIsLegendDialogOpen(false)}>
                <DialogTitle>Ability Text Markup Legend</DialogTitle>
                <DialogContent>
                    <MarkupLegend />
                </DialogContent>
            </Dialog>
            <SquadronCardDisplay
                sizeMultiplier={sizeMultiplier}
                isChassisItalic={isChassisItalic}
                points={points}
                faction={faction}
                squadronName={squadronName}
                squadronChassis={squadronChassis}
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