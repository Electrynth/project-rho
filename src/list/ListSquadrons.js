import {
    Button
} from '@mui/material';
import robotoCondensed from 'config/font';

function SquadronRow({ squadron }) {
    return (
        <div>

        </div>
    );
}

function ListSquadrons({
    squadrons,
    squadronPoints,
    removeSquadron,
    setEligibleSquadronsToAdd
}) {
    return (
        <div style={{ display: 'flex', flexFlow: 'column' }}>
            <div>
            </div>
            <Button
                fullWidth
                disableElevation
                disableRipple
                variant="contained"
                onClick={setEligibleSquadronsToAdd}
                style={{ height: 40 }}
            >
                <span className={robotoCondensed.className}>
                    Add Squadron
                </span>
                <div style={{ flexGrow: 1 }} />
                <span className={robotoCondensed.className}>
                    {squadronPoints > 0 ? `${squadronPoints}` : ''}
                </span>
            </Button>
        </div>
    );
}

export default ListSquadrons;