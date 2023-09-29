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
                return (
                    <div key={ship.id} style={{ maxWidth: 205 }}>
                        <CardButton version={version} id={ship.id} />
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
                    <CardButton version={version} id={squadron.id} key={squadron.id} />
                );
            })}
            <Divider style={{ marginBottom: 8 }} />
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
    if (!redObjId && !blueObjId && !yellowObjId) return undefined;
    return (
        <div>
            {redObjId}
            {blueObjId}
            {yellowObjId}
            <Divider />
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