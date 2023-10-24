import {
    Divider
} from '@mui/material';
import CardButton from 'src/common/CardButton';
import cards from 'config/cards.js';

function ShipRows({ version, ships, handleSetZoomOnCard }) {
    if (ships.length === 0) return undefined;

    return (
        <div>
            {ships.map((ship, index) => {
                const upgrades = ship.upgradesEquipped.map((upgrade) => {
                    if (upgrade.id && upgrade.id !== true) {
                        return <CardButton version={version} id={upgrade.id} key={upgrade.id} cardStyles={{ maxHeight: 200 }} onClick={() => handleSetZoomOnCard(upgrade.id)} />
                    } else {
                        return undefined;
                    }
                });
                return (
                    <div key={`${ship.id}_${index}`} style={{ display: 'flex', flexFlow: 'row wrap' }}>
                        <CardButton version={version} id={ship.id} cardStyles={{ maxHeight: 300 }} onClick={() => handleSetZoomOnCard(ship.id)} />
                        {upgrades}
                    </div>
                );
            })}
            <Divider style={{ marginBottom: 8 }} />
        </div>
    );
}

function SquadronsRow({ version, squadrons, handleSetZoomOnCard }) {
    if (squadrons.length === 0 ) return undefined;
    return (
        <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
            {squadrons.map((squadron) => {
                return (
                    <CardButton version={version} id={squadron.id} key={squadron.id} cardStyles={{ maxHeight: 240 }} onClick={() => handleSetZoomOnCard(squadron.id)} />
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
    handleSetZoomOnCard
}) {
    return (
        <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
            {redObjId && <CardButton version={version} id={redObjId} cardStyles={{ maxHeight: 240 }} onClick={() => handleSetZoomOnCard(redObjId)} />}
            {blueObjId && <CardButton version={version} id={blueObjId} cardStyles={{ maxHeight: 240 }} onClick={() => handleSetZoomOnCard(blueObjId)} />}
            {yellowObjId && <CardButton version={version} id={yellowObjId} cardStyles={{ maxHeight: 240 }} onClick={() => handleSetZoomOnCard(yellowObjId)} />}
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
    handleSetUserPrioAction = () => {},
    handleSetZoomOnCard
}) {

    return (
        <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
            <ShipRows version={version} ships={ships} handleSetZoomOnCard={handleSetZoomOnCard} />
            <SquadronsRow version={version} squadrons={squadrons} handleSetZoomOnCard={handleSetZoomOnCard} />
            <Divider style={{ marginBottom: 8 }} />
            <ObjectivesRow
                version={version}
                redObjId={redObjId}
                blueObjId={blueObjId}
                yellowObjId={yellowObjId}
                handleSetZoomOnCard={handleSetZoomOnCard}
            />
        </div>
    );
}

export default ListDisplay;