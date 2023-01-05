import { Button } from '@mui/material';
import ShipRow from './ShipRow';
import robotoCondensed from 'config/font';

function ListShips({
    ships,
    shipPoints,
    removeShip,
    setEligibleShipsToAdd,
    setEligibleUpgradesToAdd
}) {
    return (
        <div style={{ display: 'flex', flexFlow: 'column' }}>
            {ships.map((ship, index) =>
                <ShipRow
                    key={ship.id}
                    ship={ship}
                    index={index}
                    shipPoints={shipPoints}
                    removeShip={removeShip}
                    setEligibleUpgradesToAdd={setEligibleUpgradesToAdd}
                />
            )}
            <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
                <Button
                    fullWidth
                    disableElevation
                    disableRipple
                    variant="contained"
                    size="large"
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