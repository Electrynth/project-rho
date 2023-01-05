import {
    Button,
    Divider
} from '@mui/material';
import robotoCondensed from 'config/font';
import SquadronRow from './SquadronRow';

function ListSquadrons({
    squadrons,
    squadronPoints,
    swapSquadron,
    removeSquadron,
    incrementSquadron,
    decrementSquadron,
    setEligibleSquadronsToAdd,
    setEligibleSquadronsToSwap
}) {
    return (
        <div style={{ display: 'flex', flexFlow: 'column' }}>
            {squadrons.map((squadron, index) =>
                <SquadronRow
                    key={squadron.id}
                    index={index}
                    squadron={squadron}
                    swapSquadron={swapSquadron}
                    removeSquadron={removeSquadron}
                    incrementSquadron={incrementSquadron}
                    decrementSquadron={decrementSquadron}
                    setEligibleSquadronsToSwap={setEligibleSquadronsToSwap}
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