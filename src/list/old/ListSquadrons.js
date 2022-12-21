import { useMemo } from 'react';
import { Button, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import robotoCondensed from 'config/font';
import cards from 'config/cards';

function getEligibleSquadronIds(faction, uniques) {
    const eligibleSquadronIds = [];
    for (let i = 0; i < cards.idList.length; i++) {
        const id = cards.idList[i];
        const card = cards.cardsById[id];
        if (card.cardType !== 'squadron') continue;
        if (card.faction !== faction) continue;
        if (uniques.includes(id)) continue;
        eligibleSquadronIds.push(id);
    }
    return eligibleSquadronIds;
}

function SquadronRow({ id }) {
    const card = cards.cardsById;
}

function ListSquadrons({ faction, uniques, points = 0, squadrons, handleSetUserPrioAction, handleSetFilteredCardIds }) {
    const eligibleSquadronIds = useMemo(() => getEligibleSquadronIds(faction, uniques));
    return (
        <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
                <Button
                    disableRipple
                    disableElevation
                    variant="contained"
                    onClick={() => {
                        handleSetUserPrioAction('addSquadron');
                        handleSetFilteredCardIds(eligibleSquadronIds);
                    }}
                >
                    <Add />
                    <div
                        className={robotoCondensed.className}
                        style={{ width: 110, fontSize: 12, marginLeft: 4, position: 'absolute', left: 60 }}
                    >
                        Add Squadron
                    </div>
                </Button>
                
            </div>
            <div style={{ flexGrow: 1 }} />
            <Typography
                className={robotoCondensed.className}
                style={{ border: '1px solid #999', paddingLeft: 5, paddingRight: 5, paddingTop: 2, borderRadius: 5 }}
            >
                {points}
            </Typography>
        </div>
    );
}

export default ListSquadrons;