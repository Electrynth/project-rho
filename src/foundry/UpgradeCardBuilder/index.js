import { useState, useEffect } from 'react';
import CardTextLegend from './CardTextLegend';
import UpgradeCardDisplay from './UpgradeCardDisplay';
import TabbedContent from '../common/TabbedContent';
import SelectorInput from '../common/SelectorInput';
import TextValueInput from '../common/TextValueInput';
import ToggleGroupInput from '../common/ToggleGroupInput';
import ImageUploadInput from '../common/ImageUploadInput';
import { armadaShipFontIcons, upgradeTypeItems } from '../../utility';
import { Button, Typography } from '@mui/material';


export default function UpgradeCardBuilder() {

    const [points, setPoints] = useState(0);
    const [maxNumAllowed, setMaxNumAllowed] = useState(0);
    const [cardName, setCardName] = useState('');
    const [cardNameFontSize, setCardNameFontSize] = useState(52);
    const [faction, setFaction] = useState('any');
    const [cardText, setCardText] = useState('');
    const [cardTextFontSize, setCardTextFontSize] = useState(18);
    const [titledShip, setTitledShip] = useState('');
    const [isExhaust, setIsExhaust] = useState(false);
    const [upgradeTypes, setUpgradeTypes] = useState([]);
    const [readyCostTokens, setReadyCostTokens] = useState([]);
    const [readyCostTokenValue, setReadyCostTokenValue] = useState(0);
    const [startingTokens, setStartingTokens] = useState([]);
    const [startingTokenValue, setStartingTokenValue] = useState(0);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [portraitWidth, setPortraitWidth] = useState(450);
    const [portraitX, setPortraitX] = useState(0);
    const [portraitY, setPortraitY] = useState(0);
    const [isUploadedFileMirrored, setIsUploadedFileMirrored] = useState(false);

    const titledShipItems = [
        ...Object.keys(armadaShipFontIcons.rebels),
        ...Object.keys(armadaShipFontIcons.empire),
        ...Object.keys(armadaShipFontIcons.republic),
        ...Object.keys(armadaShipFontIcons.separatists)
    ];

    return (
        <div style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'center', gap: 16 }}>
            <TabbedContent
                tabHeaderItems={[
                    { label: 'Basic Card Information' },
                    { label: 'Starting Tokens' },
                    { label: 'Ready Cost Tokens' },
                    { label: 'Card Portrait' }
                ]}
                tabBodyComponents={[
                    (
                        <div key="basic-info-tab">
                            <div style={{ display: 'flex', flexFlow: 'row nowrap', gap: 16 }}>
                                <TextValueInput
                                    fullWidth
                                    elementId="card-name-input"
                                    label="Card Name"
                                    value={cardName}
                                    handleChange={e => setCardName(e.target.value)}
                                />
                                <SelectorInput
                                    elementId="card-name-font-size-input"
                                    label="Name Font Size"
                                    value={cardNameFontSize}
                                    handleChange={e => setCardNameFontSize(e.target.value)}
                                    items={[
                                        { label: '44', value: 44 },
                                        { label: '46', value: 46 },
                                        { label: '48', value: 48 },
                                        { label: '50', value: 50 },
                                        { label: '52', value: 52 }
                                    ]}
                                    style={{ minWidth: 125 }}
                                />
                                <SelectorInput
                                    elementId="max-allowed-input"
                                    label="Max #"
                                    value={maxNumAllowed}
                                    handleChange={e => setMaxNumAllowed(e.target.value)}
                                    items={[
                                        { key: 'any-allowed', label: 'Any', value: 0 },
                                        { key: '1-allowed', label: '1', value: 1 },
                                        { key: '2-allowed', label: '2', value: 2 },
                                        { key: '3-allowed', label: '3', value: 3 },
                                        { key: '4-allowed', label: '4', value: 4 },
                                        { key: '5-allowed', label: '5', value: 5 }
                                    ]}
                                    style={{ minWidth: 75 }}
                                />
                                <SelectorInput
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
                                    style={{ minWidth: 150 }}
                                />
                                <SelectorInput
                                    elementId="exhaust-input"
                                    label="Exhaustible"
                                    value={isExhaust}
                                    handleChange={e => setIsExhaust(e.target.value)}
                                    items={[
                                        { label: 'No', value: false },
                                        { label: 'Yes', value: true }
                                    ]}
                                    style={{ minWidth: 100 }}
                                />
                            </div>
                            <br />
                            <div style={{ display: 'flex', flexFlow: 'row nowrap', gap: 16 }}>
                                <TextValueInput
                                    numberRange={[-999, 999]}
                                    elementId="card-points-input"
                                    label="Points"
                                    value={points}
                                    handleChange={e => setPoints(e.target.value)}
                                    style={{ minWidth: 75 }}
                                />
                                <SelectorInput
                                    fullWidth
                                    isMultiSelect={true}
                                    elementId="upgrade-types-input"
                                    label="Upgrade Types (Max 2)"
                                    value={upgradeTypes}
                                    items={upgradeTypeItems}
                                    handleChange={e => {
                                        if (e.target.value.length < 3) setUpgradeTypes(e.target.value);
                                    }}
                                />
                                {upgradeTypes.length > 0 && upgradeTypes[0] === 'title' ? (
                                    <SelectorInput
                                        fullWidth
                                        elementId="titled-ship-input"
                                        label="Titled Ship Class"
                                        value={titledShip}
                                        items={titledShipItems.sort().map(item => ({ label: item, value: item }))}
                                        handleChange={e => setTitledShip(e.target.value)}
                                    />
                                ) : undefined}
                                <SelectorInput
                                    elementId="card-text-font-size-input"
                                    label="Card Text Font Size"
                                    value={cardTextFontSize}
                                    items={[
                                        { label: '15', value: 15 },
                                        { label: '16', value: 16 },
                                        { label: '17', value: 17 },
                                        { label: '18', value: 18 },
                                        { label: '19', value: 19 },
                                        { label: '20', value: 20 }
                                    ]}
                                    handleChange={e => setCardTextFontSize(e.target.value)}
                                    style={{ minWidth: 150 }}
                                />
                            </div>
                        </div>
                    ),
                    (
                        <div key="starting-tokens-tab" style={{ display: 'flex', flexFlow: 'row nowrap', gap: 16 }}>
                            <SelectorInput
                                elementId="starting-token-value-input"
                                label="# Tokens"
                                value={startingTokenValue}
                                handleChange={e => setStartingTokenValue(e.target.value)}
                                items={[
                                    { label: '0', value: 0 },
                                    { label: '1', value: 1 },
                                    { label: '2', value: 2 },
                                    { label: '3', value: 3 },
                                    { label: '4', value: 4 },
                                    { label: '5', value: 5 },
                                    { label: '6', value: 6 }
                                ]}
                                style={{ minWidth: 75 }}
                            />
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
                                style={{ flexGrow: 1 }}
                            />
                        </div>
                    ),
                    (
                        <div key="ready-cost-token-tab" style={{ display: 'flex', flexFlow: 'row nowrap', gap: 16 }}>
                            <SelectorInput
                                elementId="ready-cost-token-value-input"
                                label="# Tokens"
                                value={readyCostTokenValue}
                                handleChange={e => setReadyCostTokenValue(e.target.value)}
                                items={[
                                    { label: '0', value: 0 },
                                    { label: '1', value: 1 },
                                    { label: '2', value: 2 },
                                    { label: '3', value: 3 },
                                    { label: '4', value: 4 },
                                    { label: '5', value: 5 },
                                    { label: '6', value: 6 }
                                ]}
                                style={{ minWidth: 75 }}
                            />
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
                                style={{ flexGrow: 1 }}
                            />
                        </div>
                    ),
                    (
                        <div key="card-portrait-tab" style={{ display: 'flex', flexFlow: 'column nowrap', gap: 16 }}>
                            <Typography style={{ marginLeft: 4, marginRight: 4 }}>
                                Note: Images that have a width to height ratio of about 3:2 tend to fit easiest. Default width is 450 pixels.
                            </Typography>
                            <div style={{ display: 'flex', flexFlow: 'row nowrap', gap: 16 }}>
                                <SelectorInput
                                    elementId="image-mirror-input"
                                    label="Mirror Image"
                                    value={isUploadedFileMirrored}
                                    items={[
                                        { label: 'No', value: false },
                                        { label: 'Yes', value: true }
                                    ]}
                                    handleChange={e => setIsUploadedFileMirrored(e.target.value)}
                                    style={{ minWidth: 150 }}
                                />
                                <TextValueInput
                                    isDisabled={!Boolean(uploadedFile)}
                                    elementId="portrait-width-input"
                                    label="Portrait Width"
                                    value={portraitWidth}
                                    handleChange={e => setPortraitWidth(e.target.value)}
                                    style={{ minWidth: 75 }}
                                />
                                <TextValueInput
                                    isDisabled={!Boolean(uploadedFile)}
                                    elementId="portrait-x-input"
                                    label="X Transform"
                                    value={portraitX}
                                    handleChange={e => setPortraitX(e.target.value)}
                                    style={{ minWidth: 75 }}
                                />
                                <TextValueInput
                                    isDisabled={!Boolean(uploadedFile)}
                                    elementId="portrait-y-input"
                                    label="Y Transform"
                                    value={portraitY}
                                    handleChange={e => setPortraitY(e.target.value)}
                                    style={{ minWidth: 75 }}
                                />
                            </div>
                            <ImageUploadInput
                                uploadedFile={uploadedFile}
                                handleSetUploadedFile={file => setUploadedFile(file)}
                            />
                            
                        </div>
                    )
                ]}
            />
            <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between', gap: 16, width: '100%' }}>
                <UpgradeCardDisplay
                    maxNumAllowed={maxNumAllowed}
                    points={points}
                    cardName={cardName}
                    cardNameFontSize={cardNameFontSize}
                    faction={faction}
                    cardText={cardText}
                    cardTextFontSize={cardTextFontSize}
                    isExhaust={isExhaust}
                    titledShip={titledShip}
                    upgradeTypes={upgradeTypes}
                    startingTokenValue={startingTokenValue}
                    startingTokens={startingTokens}
                    readyCostTokenValue={readyCostTokenValue}
                    readyCostTokens={readyCostTokens}
                    uploadedFile={uploadedFile}
                    uploadedFileStyles={{
                        marginTop: Number(portraitY) ? Number.parseInt(portraitY) : 0,
                        marginLeft: Number(portraitX) ? Number.parseInt(portraitX) : 0,
                        width: Number(portraitWidth) ? Number.parseInt(portraitWidth) : 0,
                        transform: `scaleX(${isUploadedFileMirrored ? '-1' : '1'})`
                    }}
                />
                <div style={{ display: 'flex', flexFlow: 'column nowrap', flexGrow: 1, gap: 16 }}>
                    <TextValueInput
                        fullWidth
                        multiline
                        elementId="card-text-input"
                        label="Card Text"
                        value={cardText}
                        handleChange={e => setCardText(e.target.value)}
                    />  
                    <CardTextLegend />
                </div>
            </div>
        </div>
    );
}