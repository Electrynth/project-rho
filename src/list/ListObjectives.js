import { ButtonGroup, Button } from '@mui/material';
import { Circle, SwapHoriz, Clear } from '@mui/icons-material';
import cards from 'config/cards.js';
import robotoCondensed from 'config/font';

function ObjectiveButton({ children, iconStyle, cardId, setEligibleObjectiveToAdd, setEligibleObjectiveToSwap, removeObjective, handleSetZoomOnCard }) {
    if (!cardId) {
        return (
            <Button
                startIcon={<Circle style={iconStyle} />}
                fullWidth
                disableRipple
                disableElevation
                variant="text"
                color="secondary"
                style={{ marginBottom: 8, justifyContent: 'flex-start' }}
                onClick={setEligibleObjectiveToAdd}
            >
                <div className={robotoCondensed.className} style={{ paddingTop: 2 }}>
                    {children}
                </div>
            </Button>
        );
    }
    return (
        <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}>
            <Button
                fullWidth
                variant="text"
                color="secondary"
                startIcon={<Circle style={iconStyle} />}
                disableRipple
                disableElevation
                style={{ justifyContent: 'flex-start' }}
                onClick={() => handleSetZoomOnCard(cardId)}
            >
                <div className={robotoCondensed.className} style={{ paddingTop: 2 }}>
                    {children}
                </div>
            </Button>
            <SwapHoriz style={{ cursor: 'pointer', marginLeft: 4 }} onClick={setEligibleObjectiveToSwap} />
            <Clear style={{ cursor: 'pointer', marginLeft: 4 }} onClick={removeObjective} />
        </div>
    );
}

function ListObjectives({ redObjId, yellowObjId, blueObjId, removeObjective, setEligibleObjectiveToAdd, setEligibleObjectiveToSwap, handleSetZoomOnCard }) {

    return (
        <div id="list-objectives" style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'flex-start' }}>
            <ObjectiveButton
                iconStyle={{ color: '#cc2b29' }}
                cardId={redObjId}
                removeObjective={() => removeObjective('assault')}
                setEligibleObjectiveToAdd={() => setEligibleObjectiveToAdd('assault')}
                setEligibleObjectiveToSwap={() => setEligibleObjectiveToSwap('assault')}
                handleSetZoomOnCard={handleSetZoomOnCard}
            >
                {redObjId ? cards.cardsById[redObjId].cardName : 'Add Assault Objective'}
            </ObjectiveButton>
            <ObjectiveButton
                iconStyle={{ color: '#ffee00' }}
                cardId={yellowObjId}
                removeObjective={() => removeObjective('defense')}
                setEligibleObjectiveToAdd={() => setEligibleObjectiveToAdd('defense')}
                setEligibleObjectiveToSwap={() => setEligibleObjectiveToSwap('defense')}
                handleSetZoomOnCard={handleSetZoomOnCard}
            >
                {yellowObjId ? cards.cardsById[yellowObjId].cardName : 'Add Defense Objective'}
            </ObjectiveButton>
            <ObjectiveButton
                iconStyle={{ color: '#00b7ca' }}
                cardId={blueObjId}
                removeObjective={() => removeObjective('navigation')}
                setEligibleObjectiveToAdd={() => setEligibleObjectiveToAdd('navigation')}
                setEligibleObjectiveToSwap={() => setEligibleObjectiveToSwap('navigation')}
                handleSetZoomOnCard={handleSetZoomOnCard}
            >
                {blueObjId ? cards.cardsById[blueObjId].cardName : 'Add Navigation Objective'}
            </ObjectiveButton>
        </div>
    );
}

/*
function ObjectiveButtonOld({ children, style, xf, ...props }) {
    return (
        <Button
            startIcon={<Circle style={iconStyle} />}
            fullWidth
            disableRipple
            disableElevation
            variant="text"
            color="secondary"
            style={{ marginBottom: 8, justifyContent: 'flex-start', ...style }}
            {...props}
        >
            <div className={robotoCondensed.className} style={{ paddingTop: 2 }}>
                {children}
            </div>
        </Button>
    );
}
*/

export default ListObjectives;