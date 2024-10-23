import { useState } from 'react';
import {
    Box,
    Typography,
    Chip,
    Card,
    CardActionArea,
    CardMedia,
    CardActions,
    Dialog,
    DialogTitle,
    DialogContent
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import cards from 'config/cards.js';
import versions from 'config/versions';


function CardButton({ id, version, isDisabled, onClick, cardStyles = { } }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    if (id === true) return undefined;
    const card = cards.cardsById[id];
    const { footnoteChanges, textChanges } = versions[version];
    const footnoteActions = []; // not actually "actions", more just notes

    const handleSetDialogOpen = () => setIsDialogOpen(true);
    const handleSetDialogClose = () => setIsDialogOpen(false);

    if (id in footnoteChanges && footnoteChanges[id].length > 0) {
        footnoteChanges[id].forEach((footnote, i) => {
            footnoteActions.push(
                <Chip
                    size="small"
                    key={`footnote-${i}`}
                    label={footnote}
                />
            );
        });
    }
    if (id in versions[version].pointDeltas) {
        const pointDelta = versions[version].pointDeltas[id];
        footnoteActions.push(
            <Chip
                size="small"
                key="pt-change-footnote"
                label={`Cost: ${card.points}->${card.points + pointDelta}`}
            />
        );
    }

    const maxWidth = '45%';

    return (
        <Card
            sx={{ marginRight: 1, marginBottom: 1 }}
            style={{ maxWidth, ...cardStyles }}
        >
            <CardActionArea onClick={isDisabled ? undefined : onClick} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <CardMedia
                    component="img"
                    image={cards.getCardImageUrl(card.imageName ? card.imageName : card.cardName, card.cardType)}
                    alt={card.cardName}
                    style={{ maxHeight: card.cardType === 'upgrade' ? 245 : 290, opacity: isDisabled ? '0.25' : '1.0', ...cardStyles }}
                />
                <Box
                    style={{
                        backgroundColor: `rgb(255, 255, 255, ${isDisabled ? '0.75' : '1.0'}`,
                        borderRadius: 4,
                        bottom: 2,
                        right: 7,
                        width: 30,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Typography
                        variant="body2"
                        style={{ padding: '1px 3px', color: '#333', fontWeight: 'bold' }}
                    >
                        {versions[version].pointDeltas[id] ? card.points + versions[version].pointDeltas[id] : card.points}
                    </Typography>
                </Box>
            </CardActionArea>
            {version >= 0 ? (
                <CardActions>
                    {textChanges[id] && textChanges[id].length > 0 ? <Chip icon={<SearchIcon />} size="small" label="Text Change" onClick={handleSetDialogOpen} /> : undefined}
                    {footnoteActions.length > 0 ? footnoteActions : undefined}
                    {footnoteActions.length === 0 && !textChanges[id] ? <div /> : undefined}
                </CardActions>
            ) : undefined}
            <Dialog open={isDialogOpen} onClose={handleSetDialogClose}>
                <DialogTitle>{card.cardName}</DialogTitle>
                <DialogContent>
                    {textChanges[id] && textChanges[id].length > 0 ? textChanges[id].map((line, i) => {
                        return (
                            <Typography key={`line-${i}`}>
                                {line} <br/> <br/>
                            </Typography>
                        );
                    }) : undefined}
                </DialogContent>
            </Dialog>
        </Card>
    );
}

/*
{id in versions[version].pointDeltas ? card.points + versions[version].pointDeltas[id] : card.points}
*/

export default CardButton;