import {
    Box,
    Typography, 
    Card,
    CardActionArea,
    CardMedia
} from '@mui/material';
import cards from 'config/cards.json';
import versions from 'config/versions';


function CardButton({ id, version = 1, isDisabled, onClick }) {
    const card = cards.cardsById[id];
    console.log(versions[version]);
    if (card.imageUrl) {
        return (
            <Card
                sx={{ maxWidth: card.cardType === 'upgrade' ? 180 : 240, marginRight: 1, marginBottom: 1 }}
                onClick={isDisabled ? undefined : onClick}
            >
                <CardActionArea style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <CardMedia
                        component="img"
                        image={card.imageUrl}
                        alt={card.cardName}
                        style={{ opacity: isDisabled ? '0.25' : '1.0' }}
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
    } else {
        return (<div>{card.cardName}</div>)
    }
}

export default CardButton;