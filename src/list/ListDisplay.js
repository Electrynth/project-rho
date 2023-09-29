import {
    Divider
} from '@mui/material';
import CardButton from 'src/common/CardButton';
import cards from 'config/cards.js';

function ShipRows({ version, ships, cardZoomClick }) {
    if (ships.length === 0) return undefined;

    return (
        <div>
            {ships.map((ship) => {
                const upgrades = ship.upgradesEquipped.map((upgrade) => {
                    if (upgrade.id && upgrade.id !== true) {
                        return <CardButton version={version} id={upgrade.id} key={upgrade.id} cardStyles={{ maxHeight: 200 }} />
                    } else {
                        return undefined;
                    }
                });
                return (
                    <div key={ship.id} style={{ display: 'flex', flexFlow: 'row wrap' }}>
                        <CardButton version={version} id={ship.id} cardStyles={{ maxHeight: 300 }} />
                        {upgrades}
                    </div>
                );
            })}
            <Divider style={{ marginBottom: 8 }} />
        </div>
    );
}

function SquadronsRow({ version, squadrons, cardZoomClick }) {
    if (squadrons.length === 0 ) return undefined;
    return (
        <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
            {squadrons.map((squadron) => {
                return (
                    <CardButton version={version} id={squadron.id} key={squadron.id} cardStyles={{ maxHeight: 240 }} />
                );
            })}
        </div>
    );
}

function ObjectivesRow({
    version,
    redObjId,
    blueObjId,
    yellowObjId,
    cardZoomClick
}) {
    return (
        <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
            {redObjId && <CardButton version={version} id={redObjId} cardStyles={{ maxHeight: 240 }} />}
            {blueObjId && <CardButton version={version} id={blueObjId} cardStyles={{ maxHeight: 240 }} />}
            {yellowObjId && <CardButton version={version} id={yellowObjId} cardStyles={{ maxHeight: 240 }} />}
        </div>
    );
}

function ListDisplay({
    version,
    ships = [],
    squadrons = [],
    redObjId,
    yellowObjId,
    blueObjId,
    handleSetUserPrioAction = () => {}
}) {

    const cardZoomClick = (id) => {
        handleSetUserPrioAction('viewCard');
    }
    return (
        <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
            <ShipRows version={version} ships={ships} cardZoomClick={cardZoomClick} />
            <SquadronsRow version={version} squadrons={squadrons} cardZoomClick={cardZoomClick} />
            <Divider style={{ marginBottom: 8 }} />
            <ObjectivesRow
                version={version}
                redObjId={redObjId}
                blueObjId={blueObjId}
                yellowObjId={yellowObjId}
                cardZoomClick={cardZoomClick}
            />
        </div>
    );
}

export default ListDisplay;