import {
    Button,
    Typography
} from '@mui/material';
import { Add } from '@mui/icons-material';
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
            {ships.map((ship) => <ShipRow key={ship.id} ship={ship} removeShip={removeShip} />)}
            <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={setEligibleShipsToAdd}
                    style={{ height: 40, width: 80 }}
                >
                    <Add />
                    <div
                        className={robotoCondensed.className}
                        style={{ width: 110, marginLeft: 4, position: 'absolute', left: 60 }}
                    >
                        Add Ship
                    </div>
                </Button>
                <div style={{ flexGrow: 1 }} />
                <Typography
                    className={robotoCondensed.className}
                    style={{ border: '1px solid #333', paddingLeft: 5, paddingRight: 5, paddingTop: 2, borderRadius: 5 }}
                >
                    {shipPoints}
                </Typography>
            </div>
        </div>
    );
}

export default ListShips;