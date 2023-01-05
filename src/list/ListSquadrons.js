import {
    Button,
    Divider
} from '@mui/material';
import robotoCondensed from 'config/font';
import SquadronRow from './SquadronRow';

function ListSquadrons({
    squadrons,
    squadronPoints,
    removeSquadron,
    incrementSquadron,
    decrementSquadron,
    setEligibleSquadronsToAdd
}) {
    return (
        <div style={{ display: 'flex', flexFlow: 'column' }}>
            {squadrons.map((squadron, index) =>
                <SquadronRow
                    key={squadron.id}
                    index={index}
                    squadron={squadron}
                    removeSquadron={removeSquadron}
                    incrementSquadron={incrementSquadron}
                    decrementSquadron={decrementSquadron}
                />
            )}
            <Button
                fullWidth
                disableElevation
                disableRipple
                size="large"
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