import { useMemo } from 'react';
import {
    Button,
    Divider
} from '@mui/material';
import { Add } from '@mui/icons-material';
import Image from 'next/image';
import robotoCondensed from 'config/font';
import cards from 'config/cards.json';

function getEligibleShipIds(faction, uniques) {
    const eligibleShipIds = [];
    for (let i = 0; i < cards.idList.length; i++) {
        const id = cards.idList[i];
        const card = cards.cardsById[id];
        if (card.cardType !== 'ship') continue;
        if (card.faction !== faction) continue;
        if (uniques.includes(id)) continue;
        eligibleShipIds.push(id);
    }
    return eligibleShipIds;
}

function ShipRow({ ship }) {
    const upgradesEquipped = ship.upgradesEquipped.map((upgrade) => {
        return undefined;
    })
    const shipCard = cards.cardsById[ship.id];
    return (
        <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
            <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
                <div
                    style={{
                        overflow: 'hidden',
                        width: 80,
                        height: 40,
                        borderRadius: 5,
                        marginRight: 8
                    }}
                >
                    <Image
                        src={shipCard.imageUrl}
                        width={240}
                        height={412}
                        alt={shipCard.cardName}
                        style={{ margin: '-113px 0px 0px -80px', transform: 'scale(0.45)' }}
                    />
                </div>
                <div style={{ fontWeight: 300 }}>{shipCard.cardName}</div>
                <span style={{ flexGrow: 1 }} />
                <div>{shipCard.points}</div>
            </div>
            <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', marginTop: 4 }}>
                <span style={{ width: 15 }} />
                <Button
                    disableRipple
                    disableElevation
                    variant="contained"
                >
                    <Add />
                    <div
                        className={robotoCondensed.className}
                        style={{ width: 110, fontSize: 12, marginLeft: 4, position: 'absolute', left: 60 }}
                    >
                        Add Upgrade
                    </div>
                </Button>
            </div>
            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
        </div>
    );
}

function ListShips({
    ships,
    faction,
    uniques,
    handleSetUserPrioAction,
    handleSetFilteredCardIds
}) {
    const eligibleShipIds = useMemo(() => getEligibleShipIds(faction, uniques), [faction, uniques]);

    const shipRows = [];

    for (let i = 0; i < ships.length; i++) {
        const ship = ships[i];
        shipRows.push(
            <ShipRow
                key={ship.id}
                ship={ship}
            />
        );
    }

    return (
        <div className={robotoCondensed.className} style={{ display: 'flex', flexFlow: 'column nowrap' }}>
            {shipRows}
            <Button
                fullWidth
                disableRipple
                disableElevation
                color="primary"
                variant="contained"
                onClick={() => {
                    handleSetUserPrioAction('addShip');
                    handleSetFilteredCardIds(eligibleShipIds);
                }}
                style={{ fontFamily: 'inherit' }}
            >
                Add Ship
            </Button>
        </div>
    );
}

export default ListShips;