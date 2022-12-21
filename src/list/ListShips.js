import { Button } from '@mui/material';
import ShipRow from './ShipRow';
import robotoCondensed from 'config/font';

function ListShips({
    ships,
    shipPoints,
    removeShip,
    setEligibleShipsToAdd
}) {
    return (
        <div style={{ display: 'flex', flexFlow: 'column' }}>
            {ships.map((ship) => <ShipRow key={ship.id} ship={ship} shipPoints={shipPoints} removeShip={removeShip} />)}
            <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
                <Button
                    fullWidth
                    disableElevation
                    disableRipple
                    variant="contained"
                    onClick={setEligibleShipsToAdd}
                    style={{ height: 40 }}
                >
                    <span className={robotoCondensed.className}>
                        Add Ship
                    </span>
                    <div style={{ flexGrow: 1 }} />
                    <span className={robotoCondensed.className}>
                        {shipPoints > 0 ? `${shipPoints}` : ''}
                    </span>
                </Button>
            </div>
        </div>
    );
}

export default ListShips;