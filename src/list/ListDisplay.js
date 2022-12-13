import {
    Divider
} from '@mui/material';
import CardButton from 'src/common/CardButton';
import cards from 'config/cards.json';

function ShipRows({ ships, cardZoomClick }) {
    if (ships.length === 0) return undefined;
    return (
        <div>
            {ships.map((ship) => {
                return (
                    <div key={ship.id} style={{ width: '40%' }}>
                        <CardButton id={ship.id} />
                    </div>
                );
            })}
            <Divider />
        </div>
    );
}

function SquadronsRow({ squadrons, cardZoomClick }) {
    if (squadrons.length === 0 ) return undefined;
    return (
        <div>
            {squadrons.length}
            <Divider />
        </div>
    );
}

function ObjectivesRow({
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
            <ShipRows ships={ships} cardZoomClick={cardZoomClick} />
            <SquadronsRow squadrons={squadrons} cardZoomClick={cardZoomClick} />
            <ObjectivesRow
                redObjId={redObjId}
                blueObjId={blueObjId}
                yellowObjId={yellowObjId}
                cardZoomClick={cardZoomClick}
            />
        </div>
    );
}

export default ListDisplay;