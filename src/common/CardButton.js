import {
    Box,
    Typography, 
    Card,
    CardActionArea,
    CardMedia
} from '@mui/material';
import cards from 'config/cards.js';
import versions from 'config/versions';


function CardButton({ id, version, isDisabled, onClick, cardStyles = {} }) {
    const card = cards.cardsById[id];

    return (
        <Card
            sx={{ marginRight: 1, marginBottom: 1 }}
            onClick={isDisabled ? undefined : onClick}
            style={{ ...cardStyles }}
        >
            <CardActionArea style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <CardMedia
                    component="img"
                    image={cards.getCardImageUrl(card.cardName, card.cardType)}
                    alt={card.cardName}
                    style={{ maxHeight: card.cardType === 'upgrade' ? 300 : 340, opacity: isDisabled ? '0.25' : '1.0', ...cardStyles }}
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
                        {id in versions[version].pointDeltas ? card.points + versions[version].pointDeltas[id] : card.points}
                    </Typography>
                </Box>
            </CardActionArea>
        </Card>
    );
}

/*

*/

export default CardButton;