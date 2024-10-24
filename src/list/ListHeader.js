import { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
    red,
    green
} from '@mui/material/colors'
import FactionIcon from 'src/common/FactionIcon';
import robotoCondensed from 'config/font';
import cards from 'config/cards.js';
import versions from 'config/versions';
import roles from 'config/roles';

import {
    KeyboardArrowUp as ArrowUpIcon,
    KeyboardDoubleArrowUp as DoubleArrowUpIcon,
    KeyboardArrowDown as ArrowDownIcon,
    KeyboardDoubleArrowDown as DoubleArrowDownIcon
} from '@mui/icons-material'

function PointsDeltaArrowIcon({ pointDelta }) {
    if (pointDelta > 4) return <DoubleArrowUpIcon sx={{ color: red[500] }} />;
    else if (pointDelta > 0) return <ArrowUpIcon sx={{ color: red[500] }} />;
    else if (pointDelta < -4) return <DoubleArrowDownIcon sx={{ color: green[500] }} />;
    else if (pointDelta < 0) return <ArrowDownIcon sx={{ color: green[500] }} />;
}

function PointDeltaList({ version = 0, pointDeltas = {} }) {
    const shipChanges = [], squadronChanges = [], upgradeChanges = [];
    shipChanges.push(
        <div key="empire-ship-header">
            <Typography variant="h6"><span className={robotoCondensed.className}>Empire Ships</span></Typography>
        </div>
    );
    Object.keys(pointDeltas).filter(id => cards.cardsById[id].cardType === 'ship' && cards.cardsById[id].faction === 'empire').map(id => {
        const card = cards.cardsById[id];
        shipChanges.push(
            <li key={id} className={robotoCondensed.className} style={{ display: 'flex', alignItems: 'center' }}>
                - {card.cardName}: {card.points} {'->'} {card.points + versions[version].pointDeltas[id]}
                <PointsDeltaArrowIcon pointDelta={versions[version].pointDeltas[id]} style={{ marginLeft: 4 }} />
            </li>
        );
    });

    shipChanges.push(
        <div key="rebels-ship-header">
            <Typography variant="h6"><span className={robotoCondensed.className}>Rebel Ships</span></Typography>
        </div>
    );
    Object.keys(pointDeltas).filter(id => cards.cardsById[id].cardType === 'ship' && cards.cardsById[id].faction === 'rebels').map(id => {
        const card = cards.cardsById[id];
        shipChanges.push(
            <li key={id} className={robotoCondensed.className} style={{ display: 'flex', alignItems: 'center' }}>
                - {card.cardName}: {card.points} {'->'} {card.points + versions[version].pointDeltas[id]}
                <PointsDeltaArrowIcon pointDelta={versions[version].pointDeltas[id]} style={{ marginLeft: 4 }} />
            </li>
        );
    });

    shipChanges.push(
        <div key="republic-ship-header">
            <Typography variant="h6"><span className={robotoCondensed.className}>Republic Ships</span></Typography>
        </div>
    );
    Object.keys(pointDeltas).filter(id => cards.cardsById[id].cardType === 'ship' && cards.cardsById[id].faction === 'republic').map(id => {
        const card = cards.cardsById[id];
        shipChanges.push(
            <li key={id} className={robotoCondensed.className} style={{ display: 'flex', alignItems: 'center' }}>
                - {card.cardName}: {card.points} {'->'} {card.points + versions[version].pointDeltas[id]}
                <PointsDeltaArrowIcon pointDelta={versions[version].pointDeltas[id]} style={{ marginLeft: 4 }} />
            </li>
        );
    });

    shipChanges.push(
        <div key="separatists-ship-header">
            <Typography variant="h6"><span className={robotoCondensed.className}>Separatist Ships</span></Typography>
        </div>
    );
    Object.keys(pointDeltas).filter(id => cards.cardsById[id].cardType === 'ship' && cards.cardsById[id].faction === 'separatists').map(id => {
        const card = cards.cardsById[id];
        shipChanges.push(
            <li key={id} className={robotoCondensed.className} style={{ display: 'flex', alignItems: 'center' }}>
                - {card.cardName}: {card.points} {'->'} {card.points + versions[version].pointDeltas[id]}
                <PointsDeltaArrowIcon pointDelta={versions[version].pointDeltas[id]} style={{ marginLeft: 4 }} />
            </li>
        );
    });

    squadronChanges.push(
        <div key="empire-squadron-header">
            <Typography variant="h6"><span className={robotoCondensed.className}>Empire Squadrons:</span></Typography>
        </div>
    );
    Object.keys(pointDeltas).filter(id => cards.cardsById[id].cardType === 'squadron' && cards.cardsById[id].faction === 'empire').map(id => {
        const card = cards.cardsById[id];
        squadronChanges.push(
            <li key={id} className={robotoCondensed.className} style={{ display: 'flex', alignItems: 'center' }}>
                - {card.cardName}: {card.points} {'->'} {card.points + versions[version].pointDeltas[id]}
                <PointsDeltaArrowIcon pointDelta={versions[version].pointDeltas[id]} style={{ marginLeft: 4 }} />
            </li>
        );
    });

    squadronChanges.push(
        <div key="rebel-squadron-header">
            <Typography variant="h6"><span className={robotoCondensed.className}>Rebel Squadrons:</span></Typography>
        </div>
    );
    Object.keys(pointDeltas).filter(id => cards.cardsById[id].cardType === 'squadron' && cards.cardsById[id].faction === 'rebels').map(id => {
        const card = cards.cardsById[id];
        squadronChanges.push(
            <li key={id} className={robotoCondensed.className} style={{ display: 'flex', alignItems: 'center' }}>
                - {card.cardName}: {card.points} {'->'} {card.points + versions[version].pointDeltas[id]}
                <PointsDeltaArrowIcon pointDelta={versions[version].pointDeltas[id]} style={{ marginLeft: 4 }} />
            </li>
        );
    });

    squadronChanges.push(
        <div key="republic-squadron-header">
            <Typography variant="h6"><span className={robotoCondensed.className}>Republic Squadrons:</span></Typography>
        </div>
    );
    Object.keys(pointDeltas).filter(id => cards.cardsById[id].cardType === 'squadron' && cards.cardsById[id].faction === 'republic').map(id => {
        const card = cards.cardsById[id];
        squadronChanges.push(
            <li key={id} className={robotoCondensed.className} style={{ display: 'flex', alignItems: 'center' }}>
                - {card.cardName}: {card.points} {'->'} {card.points + versions[version].pointDeltas[id]}
                <PointsDeltaArrowIcon pointDelta={versions[version].pointDeltas[id]} style={{ marginLeft: 4 }} />
            </li>
        );
    });

    squadronChanges.push(
        <div key="separatists-squadron-header">
            <Typography variant="h6"><span className={robotoCondensed.className}>Separatist Squadrons:</span></Typography>
        </div>
    );
    Object.keys(pointDeltas).filter(id => cards.cardsById[id].cardType === 'squadron' && cards.cardsById[id].faction === 'separatists').map(id => {
        const card = cards.cardsById[id];
        squadronChanges.push(
            <li key={id} className={robotoCondensed.className} style={{ display: 'flex', alignItems: 'center' }}>
                - {card.cardName}: {card.points} {'->'} {card.points + versions[version].pointDeltas[id]}
                <PointsDeltaArrowIcon pointDelta={versions[version].pointDeltas[id]} style={{ marginLeft: 4 }} />
            </li>
        );
    });


    upgradeChanges.push(
        <div key="empire-upgrade-header">
            <Typography variant="h6"><span className={robotoCondensed.className}>Empire Upgrades:</span></Typography>
        </div>
    );
    Object.keys(pointDeltas).filter(id => cards.cardsById[id].cardType === 'upgrade' && cards.cardsById[id].faction === 'empire').map(id => {
        const card = cards.cardsById[id];
        upgradeChanges.push(
            <li key={id} className={robotoCondensed.className} style={{ display: 'flex', alignItems: 'center' }}>
                - {card.cardName} ({card.cardType === 'upgrade' ? card.upgradeSlots.join(',') : card.cardType }): {card.points} {'->'} {card.points + versions[version].pointDeltas[id]}
                <PointsDeltaArrowIcon pointDelta={versions[version].pointDeltas[id]} style={{ marginLeft: 4 }} />
            </li>
        );
    });

    upgradeChanges.push(
        <div key="rebel-upgrade-header">
            <Typography variant="h6"><span className={robotoCondensed.className}>Rebel Upgrades:</span></Typography>
        </div>
    );
    Object.keys(pointDeltas).filter(id => cards.cardsById[id].cardType === 'upgrade' && cards.cardsById[id].faction === 'rebels').map(id => {
        const card = cards.cardsById[id];
        upgradeChanges.push(
            <li key={id} className={robotoCondensed.className} style={{ display: 'flex', alignItems: 'center' }}>
                - {card.cardName} ({card.cardType === 'upgrade' ? card.upgradeSlots.join(',') : card.cardType }): {card.points} {'->'} {card.points + versions[version].pointDeltas[id]}
                <PointsDeltaArrowIcon pointDelta={versions[version].pointDeltas[id]} style={{ marginLeft: 4 }} />
            </li>
        );
    });

    upgradeChanges.push(
        <div key="republic-upgrade-header">
            <Typography variant="h6"><span className={robotoCondensed.className}>Republic Upgrades:</span></Typography>
        </div>
    );
    Object.keys(pointDeltas).filter(id => cards.cardsById[id].cardType === 'upgrade' && cards.cardsById[id].faction === 'republic').map(id => {
        const card = cards.cardsById[id];
        upgradeChanges.push(
            <li key={id} className={robotoCondensed.className} style={{ display: 'flex', alignItems: 'center' }}>
                - {card.cardName} ({card.cardType === 'upgrade' ? card.upgradeSlots.join(',') : card.cardType }): {card.points} {'->'} {card.points + versions[version].pointDeltas[id]}
                <PointsDeltaArrowIcon pointDelta={versions[version].pointDeltas[id]} style={{ marginLeft: 4 }} />
            </li>
        );
    });
    
    upgradeChanges.push(
        <div key="separatists-upgrade-header">
            <Typography variant="h6"><span className={robotoCondensed.className}>Separatist Upgrades:</span></Typography>
        </div>
    );
    Object.keys(pointDeltas).filter(id => cards.cardsById[id].cardType === 'upgrade' && cards.cardsById[id].faction === 'separatists').map(id => {
        const card = cards.cardsById[id];
        upgradeChanges.push(
            <li key={id} className={robotoCondensed.className} style={{ display: 'flex', alignItems: 'center' }}>
                - {card.cardName} ({card.cardType === 'upgrade' ? card.upgradeSlots.join(',') : card.cardType }): {card.points} {'->'} {card.points + versions[version].pointDeltas[id]}
                <PointsDeltaArrowIcon pointDelta={versions[version].pointDeltas[id]} style={{ marginLeft: 4 }} />
            </li>
        );
    });

    upgradeChanges.push(
        <div key="generic-upgrade-header">
            <Typography variant="h6"><span className={robotoCondensed.className}>Generic Upgrades:</span></Typography>
        </div>
    );
    Object.keys(pointDeltas).filter(id => cards.cardsById[id].cardType === 'upgrade' && !cards.cardsById[id].faction).map(id => {
        const card = cards.cardsById[id];
        upgradeChanges.push(
            <li key={id} className={robotoCondensed.className} style={{ display: 'flex', alignItems: 'center' }}>
                - {card.cardName} ({card.cardType === 'upgrade' ? card.upgradeSlots.join(',') : card.cardType }): {card.points} {'->'} {card.points + versions[version].pointDeltas[id]}
                <PointsDeltaArrowIcon pointDelta={versions[version].pointDeltas[id]} style={{ marginLeft: 4 }} />
            </li>
        );
    });

    return [...shipChanges, <br key="linebreak-1" />, ...squadronChanges, <br key="linebreak-2" />, ...upgradeChanges];
}

function ListHeader({
    email,
    title,
    faction,
    version,
    points,
    handleSetTitle,
    handleSetVersion
}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleOpen = () => setIsDialogOpen(true);
    const handleClose = () => setIsDialogOpen(false);
    return (
        <div id="list-header" style={{ display: 'flex', flexFlow: 'column', paddingTop: 20 }}>
            <div className={robotoCondensed.className} style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginRight: 16 }}>
                    <FactionIcon faction={faction} style={{ width: 30, height: 30 }} />
                </div>
                <InputBase
                    fullWidth
                    size="small"
                    placeholder="Untitled Fleet"
                    variant="standard"
                    value={title}
                    onChange={handleSetTitle}
                    style={{ fontSize: 20, fontFamily: 'inherit' }}
                />
                <div style={{ display: 'flex', justifyContent: 'center', marginLeft: 16, fontSize: 20 }}>
                    {points}
                </div>
            </div>
            <Chip
                clickable
                variant="outlined"
                label={
                    <div className={robotoCondensed.className}>
                        <Typography
                            variant="body1"
                            style={{ fontFamily: 'inherit' }}
                        >
                            Version: {versions[version].label}
                        </Typography>
                    </div>
                }
                onClick={handleOpen}
            />
            <Dialog fullWidth maxWidth="sm" onClose={handleClose} open={isDialogOpen}>
                <DialogTitle><span className={robotoCondensed.className}>Game Ruleset Versions</span></DialogTitle>
                <div style={{ padding: 12 }}>
                    <FormControl fullWidth>
                        <InputLabel id="select-game-version" className={robotoCondensed.className}>Version</InputLabel>
                        <Select
                            id="select-game-version"
                            value={version}
                            label="Version"
                            onChange={handleSetVersion}
                        >
                            {versions.map(version => {
                                const userRoles = [];
                                Object.keys(roles).forEach(roleKey => {
                                    if (email && roles[roleKey].userEmails.includes(email)) userRoles.push(roleKey);
                                });

                                let hasAccess = false;
                                userRoles.forEach(userRole => {
                                    if (version.roles.includes(userRole)) hasAccess = true
                                });

                                if (version.roles.includes('everyone') || hasAccess) {
                                    return (
                                        <MenuItem key={version.id} value={version.id}>
                                            <span className={robotoCondensed.className}>
                                                {version.label}
                                            </span>
                                        </MenuItem>
                                    );
                                } else {
                                    return undefined;
                                }
                            })}
                        </Select>
                    </FormControl>
                    <Typography className={robotoCondensed.className}>*Changing the version will reset your list</Typography>
                    <Paper style={{ marginTop: 8, padding: 12 }}>
                        <Typography variant="h4"><span className={robotoCondensed.className}>Description</span></Typography>
                        <div style={{ maxHeight: 600, overflowY: 'scroll' }}>
                            {versions[version].description ? (
                                <Typography><span className={robotoCondensed.className}>{versions[version].description}</span></Typography>
                            ) : (
                                <Typography><span className={robotoCondensed.className}>None</span></Typography>
                            )}
                        </div>
                    </Paper>
                    <Paper style={{ marginTop: 8, padding: 12 }} className={robotoCondensed.className}>
                        <Typography variant="h4"><span className={robotoCondensed.className}>Point Changes</span></Typography>
                        <div style={{ maxHeight: 300, overflowY: 'scroll' }}>
                            {Object.keys(versions[version].pointDeltas).length > 0 ? (
                                <PointDeltaList version={version} pointDeltas={versions[version].pointDeltas} />
                            ) : (
                                <Typography><span className={robotoCondensed.className}>None</span></Typography>
                            )}
                        </div>
                    </Paper>
                    <Paper style={{ marginTop: 8, padding: 12 }} className={robotoCondensed.className}>
                        <Typography variant="h4"><span className={robotoCondensed.className}>Enabled Cards</span></Typography>
                        <div style={{ maxHeight: 300, overflowY: 'scroll' }}>
                            {versions[version].enabledCards.length > 0 ? (
                                versions[version].enabledCards.map(id => {
                                    const card = cards.cardsById[id];
                                    return (
                                        <li key={id} className={robotoCondensed.className}>
                                            {card.displayName ? card.displayName : card.cardName} ({card.faction ? card.faction : ''} {`${card.cardType === 'upgrade' ? card.upgradeSlots.map(upgrade => (upgrade)) : card.cardType}`})
                                        </li>
                                    );
                                })
                            ) : (
                                <Typography><span className={robotoCondensed.className}>None</span></Typography>
                            )}
                        </div>
                    </Paper>
                   
                </div>
                <DialogActions>
                    <Button color="secondary" size="large" onClick={() => setZoomDialogCard()}>
                        <span className={robotoCondensed.className}>Back</span>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ListHeader;