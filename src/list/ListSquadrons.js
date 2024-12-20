import {
    Button,
    Divider
} from '@mui/material';
import robotoCondensed from 'config/font';
import SquadronRow from './SquadronRow';

function ListSquadrons({
    version,
    squadrons,
    squadronPoints,
    swapSquadron,
    removeSquadron,
    incrementSquadron,
    decrementSquadron,
    setEligibleSquadronsToAdd,
    setEligibleSquadronsToSwap,
    handleSetZoomOnCard,
    shiftSquadronInList
}) {
    return (
        <div id="list-squadrons" style={{ display: 'flex', flexFlow: 'column' }}>
            {squadrons.map((squadron, index) =>
                <SquadronRow
                    version={version}
                    key={squadron.id}
                    index={index}
                    squadron={squadron}
                    swapSquadron={swapSquadron}
                    removeSquadron={removeSquadron}
                    incrementSquadron={incrementSquadron}
                    decrementSquadron={decrementSquadron}
                    setEligibleSquadronsToSwap={setEligibleSquadronsToSwap}
                    handleSetZoomOnCard={handleSetZoomOnCard}
                    shiftSquadronInList={shiftSquadronInList}
                />
            )}
            <Button
                fullWidth
                disabled={squadrons.length > 11}
                disableElevation
                disableRipple
                size="large"
                variant="contained"
                color="customGrey"
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