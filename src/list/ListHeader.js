import { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FactionIcon from 'src/common/FactionIcon';
import robotoCondensed from 'config/font';
import cards from 'config/cards.json';
import versions from 'config/versions';

function ListHeader({
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
        <div style={{ display: 'flex', flexFlow: 'column' }}>
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
            <Dialog onClose={handleClose} open={isDialogOpen}>
                <DialogTitle className={robotoCondensed.className}>Game Versions</DialogTitle>
                <div style={{ padding: 12 }}>
                    <FormControl fullWidth>
                        <InputLabel id="select-game-version" className={robotoCondensed.className}>Version</InputLabel>
                        <Select
                            id="select-game-version"
                            value={version}
                            label="Version"
                            onChange={handleSetVersion}
                        >
                            {versions.map(version => (
                                <MenuItem key={version.id} value={version.id}>
                                    <span className={robotoCondensed.className}>
                                        {version.label}
                                    </span>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Paper style={{ marginTop: 8, padding: 12 }} className={robotoCondensed.className}>
                        <Typography variant="h5" className={robotoCondensed.className}>Changelog</Typography>
                        <div style={{ maxHeight: 600, overflowY: 'scroll' }}>
                            {Object.keys(versions[version].pointDeltas).map((id) => {
                                const card = cards.cardsById[id];
                                return (
                                    <li key={id}>
                                        {card.cardName} ({card.cardType}): {card.points} {'->'} {card.points + versions[version].pointDeltas[id]}
                                    </li>
                                );
                            })}
                        </div>
                    </Paper>
                </div>
            </Dialog>
        </div>
    );
}

export default ListHeader;