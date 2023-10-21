import React from 'react';
import Image from 'next/image';
import { Button, Divider } from '@mui/material';
import {
    Add,
    Remove,
    SwapHoriz,
    Search,
    Clear,
    KeyboardArrowDown,
    KeyboardArrowUp
} from '@mui/icons-material';
import DualHoverButton from 'src/common/DualHoverButton';
import cards from 'config/cards';
import versions from 'config/versions';
import robotoCondensed from 'config/font';

function SquadronRow({
    version,
    index,
    squadron,
    swapSquadron,
    removeSquadron,
    incrementSquadron,
    decrementSquadron,
    setEligibleSquadronsToSwap,
    handleSetZoomOnCard,
    shiftSquadronInList
}) {
    const squadronCard = cards.cardsById[squadron.id];
    const squadronPoints = squadronCard.points * squadron.count;
    return (
        <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
            <DualHoverButton
                buttonActions={(
                    <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
                        <div
                            style={{
                                overflow: 'hidden',
                                width: 80,
                                height: 40,
                                borderRadius: 5,
                                marginRight: 6
                            }}
                        >
                            <Image
                                src={cards.getCardImageUrl(squadronCard.imageName ? squadronCard.imageName : squadronCard.cardName, 'squadron')}
                                width={256}
                                height={357}
                                alt={squadronCard.cardName}
                                style={{ margin: '-105px 0 0 -85px', transform: 'scale(0.45)' }}
                            />
                        </div>
                        <div style={{ fontWeight: 300 }}>
                            {squadron.count > 1 ? `${squadron.count} × ` : ''}{squadronCard.displayName ? squadronCard.displayName : squadronCard.cardName}
                        </div>
                        <span style={{ flexGrow: 1 }} />
                        <div style={{ marginRight: 8 }}>
                            {squadron.id in versions[version].pointDeltas ? versions[version].pointDeltas[squadron.id] + squadronPoints : squadronPoints}
                        </div>
                    </div>
                )}
                hoverActions={(
                    <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', position: 'relative', backgroundColor: 'rgba(0, 0, 0, .12)' }}>
                        <div
                            style={{
                                overflow: 'hidden',
                                width: 80,
                                height: 40,
                                borderRadius: 5,
                                marginRight: 6
                            }}
                            onClick={() => handleSetZoomOnCard(squadronCard.id)}
                        >
                            <Search
                                style={{ zIndex: 1, marginLeft: 30, marginTop: 10, position: 'absolute', cursor: 'pointer' }}
                            />
                            <Image
                                src={cards.getCardImageUrl(squadronCard.imageName ? squadronCard.imageName : squadronCard.cardName, 'squadron')}
                                width={256}
                                height={357}
                                alt={squadronCard.cardName}
                                style={{ margin: '-105px 0 0 -85px', transform: 'scale(0.45)', opacity: '0.5', cursor: 'pointer' }}
                            />
                        </div>
                        <div style={{ fontWeight: 300 }}>
                        {squadron.count > 1 ? `${squadron.count} × ` : ''}{squadronCard.displayName ? squadronCard.displayName : squadronCard.cardName}
                        </div>
                        <span style={{ flexGrow: 1 }} />
                        <div style={{ marginRight: 2, display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
                            <KeyboardArrowUp
                                style={{ marginRight: 4, cursor: 'pointer' }}
                                onClick={() => shiftSquadronInList(index, -1)}
                            />
                            <KeyboardArrowDown
                                style={{ marginRight: 4, cursor: 'pointer' }}
                                onClick={() => shiftSquadronInList(index, 1)}
                            />
                            {squadronCard.isUnique ? (
                                undefined
                            ) : (
                                <React.Fragment>
                                    <Remove
                                        style={{ marginRight: 4, cursor: 'pointer' }}
                                        onClick={() => decrementSquadron(index)}
                                    />
                                    <Add
                                        style={{ marginRight: 4, cursor: 'pointer' }}
                                        onClick={() => incrementSquadron(index)}
                                    />
                                </React.Fragment>
                            )}
                            <SwapHoriz
                                style={{ marginRight: 4, cursor: 'pointer' }}
                                onClick={() => setEligibleSquadronsToSwap(index)}
                            />
                            <Clear
                                onClick={() => removeSquadron(index)}
                                style={{ marginRight: 2, cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                )}
            />
            <div style={{ marginTop: 8 }} />
        </div>
    );
}

export default SquadronRow;