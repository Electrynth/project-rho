import { useState, useEffect } from 'react';
import _ from 'lodash';
import styles from 'styles/ListContainer.module.css';
import robotoCondensed from 'config/font';
import { useRouter } from 'next/router';
import { Divider, Paper, IconButton, Typography } from '@mui/material';
import Clear from '@mui/icons-material/Clear';
import ListHeader from './ListHeader';
import ListShips from './ListShips';
import ListSquadrons from './ListSquadrons';
import ListObjectives from './ListObjectives';
import ListFooter from './ListFooter'
import ListDisplay from './ListDisplay';
import CardSelector from './CardSelector';
import CardButton from 'src/common/CardButton';
import versions from 'config/versions';
import cards from 'config/cards';
import { isUpgradeRequirementsMet } from 'src/utility';

function RightPaneHeader({ rightPaneText, isRightPaneFocused, handleSetRightPaneFocus }) {
    return (
        <Paper
            style={{
                zIndex: 1,
                top: 0,
                padding: 10,
                display: isRightPaneFocused ? 'flex' : 'none',
                flexFlow: 'row nowrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: '-webkit-sticky',
                position: 'sticky',
            }}
        >
            <Typography className={robotoCondensed.className}>
                {rightPaneText ? rightPaneText : undefined}
            </Typography>
            <IconButton onClick={() => handleSetRightPaneFocus(false)}>
                <Clear />
            </IconButton>
        </Paper>
    );
}

function ListContainer({
    primaryPaneStyles,
    secondaryPaneStyles,
    isRightPaneFocused,
    handleSetRightPaneFocus
}) {
    const router = useRouter();
    const query = router.query;

    useEffect(() => {
        setFaction(query.faction);
    }, [query]);

    const [version, setVersion] = useState(1);
    const [title, setTitle] = useState('');
    const [faction, setFaction] = useState('');
    const [commander, setCommander] = useState('');
    const [hash, setHash] = useState('');
    const [redObjId, setRedObjId] = useState('');
    const [blueObjId, setBlueObjId] = useState('');
    const [yellowObjId, setYellowObjId] = useState('');
    const [uniques, setUniques] = useState([]);
    const [ships, setShips] = useState([]);
    const [squadrons, setSquadrons] = useState([]);
    const [cardComponentProps, setCardComponentProps] = useState([]);
    const [rightPaneText, setRightPaneText] = useState('');
    const [isCardPropsDelimited, setIsCardPropsDelimited] = useState(false);

    const handleSetTitleFromEvent = (event) => setTitle(event.target.value);
    const handleSetVersionFromEvent = (event) => setVersion(event.target.value);


    const addShip = (id) => {
        const newShip = { id };
        const card = cards.cardsById[id];
        newShip.upgradesEquipped = card.upgradeSlots.map(upgradeType => ({ upgradeType, id: undefined }));
        newShip.hasModification = false;
        if (card.isUnique) setUniques([...uniques, id]);
        setShips([...ships, newShip]);
        handleSetRightPaneFocus(false);
        setCardComponentProps([]);
        setRightPaneText('');
    }

    const addUpgrade = (shipIndex, upgradeIndex, id) => {
        const newShips = [...ships];
        const newShip = newShips[shipIndex];
        const upgradeCard = cards.cardsById[id];

        if (upgradeCard.isUnique) setUniques([...uniques, id]);
        if (upgradeCard.upgradeSlots.includes('commander')) setCommander(id);
        if (upgradeCard.isModification) newShip.hasModification = true;
        if (upgradeCard.upgradeSlots.length > 1) {
            const upgradeSlotDict = {};
            for (let i = 0; i < upgradeCard.upgradeSlots.length; i++) {
                upgradeSlotDict[upgradeCard.upgradeSlots[i]] = true;
            }
            for (let i = 0; i < newShip.upgradesEquipped.length; i++) {
                const equippedUpgrade = newShip.upgradesEquipped[i];
                if (equippedUpgrade.upgradeType in upgradeSlotDict && upgradeSlotDict[equippedUpgrade.upgradeType] === true) {
                    if (upgradeIndex === i) equippedUpgrade.id = id;
                    else equippedUpgrade.id = true;
                    upgradeSlotDict[equippedUpgrade.upgradeType] = i;
                }
            }
            newShip.upgradesEquipped[upgradeIndex].upgradeSlotDict = upgradeSlotDict;
        } else {
            newShip.upgradesEquipped[upgradeIndex].id = id;
        }
        setShips(newShips);
        handleSetRightPaneFocus(false);
        setCardComponentProps([]);
        setRightPaneText('');
    }

    const addSquadron = (id) => {
        const newSquadrons = [...squadrons];
        let isSquadronAlreadyInList = false;
        for (let i = 0; i < newSquadrons.length; i++) {
            if (newSquadrons[i].id === id) {
                newSquadrons[i].count += 1;
                isSquadronAlreadyInList = true;
            }
        }
        if (!isSquadronAlreadyInList) {
            if (cards.cardsById[id].isUnique) setUniques([...uniques, id]);
            newSquadrons.push({ id, count: 1 });
        }
        setSquadrons(newSquadrons);
        handleSetRightPaneFocus(false);
        setCardComponentProps([]);
        setRightPaneText('');
        setIsCardPropsDelimited(false);
    }

    const swapSquadron = (index, id) => {
        const newSquadrons = [...squadrons];
        const squadron = newSquadrons[index];
        const newSquadron = { id, count: 1 };
        const newSquadronCard = cards.cardsById[id];
        const newUniques = [...uniques];
        const uniqueIdIndex = uniques.indexOf(squadron.id);
        if (uniqueIdIndex > -1) newUniques.splice(uniqueIdIndex, 1);
        if (newSquadronCard.isUnique) newUniques.push(id);
        newSquadrons[index] = newSquadron;
        setSquadrons(newSquadrons);
        setUniques(newUniques);
        handleSetRightPaneFocus(false);
        setCardComponentProps([]);
        setRightPaneText('');
        setIsCardPropsDelimited(false);
    }

    const incrementSquadron = (index) => {
        const newSquadrons = [...squadrons];
        newSquadrons[index].count += 1;
        setSquadrons(newSquadrons);
    }

    const decrementSquadron = (index) => {
        const newSquadrons = [...squadrons];
        newSquadrons[index].count -= 1;
        if (newSquadrons[index].count === 0) {
            removeSquadron(index);
        } else {
            setSquadrons(newSquadrons);
        }
    }

    const removeShip = (index) => {
        const ship = ships[index];
        const { id } = ship;
        const newUniques = [...uniques];
        const uniqueIdIndex = newUniques.indexOf(id);
        if (uniqueIdIndex > -1) newUniques.splice(uniqueIdIndex, 1);
        for (let i = 0; i < ship.upgradesEquipped.length; i++) {
            const upgrade = ship.upgradesEquipped[i];
            const upgradeId = upgrade.id;
            const upgradeCard = cards.cardsById[upgradeId];
            if (upgradeId && upgradeCard.upgradeSlots.includes('commander')) setCommander('');
            if (upgradeId && newUniques.indexOf(upgradeId) > -1) newUniques.splice(uniqueIdIndex, 1);
        }
        const newShips = [...ships];
        newShips.splice(index, 1);
        setShips(newShips);
        setUniques(newUniques);
    }

    const removeUpgrade = (shipIndex, upgradeIndex) => {
        const newShips = [...ships];
        const newUniques = [...uniques];
        const newShip = newShips[shipIndex];
        const upgrade = newShip.upgradesEquipped[upgradeIndex];
        const upgradeCard = cards.cardsById[upgrade.id];
        const uniqueIdIndex = uniques.indexOf(upgrade.id);
        if (upgradeCard.isModification) newShip.hasModification = false;
        if (uniqueIdIndex > -1) newUniques.splice(uniqueIdIndex, 1);
        if (upgradeCard.upgradeSlots.includes('commander')) setCommander('');
        if (upgradeCard.upgradeSlots.length > 1) {
            for (let i = 0; i < Object.keys(upgrade.upgradeSlotDict).length; i++) {
                const key = Object.keys(upgrade.upgradeSlotDict)[i];
                newShip.upgradesEquipped[upgrade.upgradeSlotDict[key]].id = undefined;
            }
          
        } 
        newShip.upgradesEquipped[upgradeIndex] = { upgradeType: upgrade.upgradeType, id: undefined };
        setUniques(newUniques);
        setShips(newShips);
    }

    const removeSquadron = (index) => {
        const newSquadrons = [...squadrons];
        const newUniques = [...uniques];
        const squadron = newSquadrons[index];
        const uniqueIdIndex = uniques.indexOf(squadron.id);
        if (uniqueIdIndex > -1) newUniques.splice(uniqueIdIndex, 1);
        newSquadrons.splice(index, 1);
        setSquadrons(newSquadrons);
        setUniques(newUniques);
    }
    
    const setEligibleShipsToAdd = () => {
        const newCardComponentProps = [];
        for (let i = 0; i < cards.shipIdList.length; i++) {
            const id = cards.shipIdList[i];
            const card = cards.cardsById[id];
            if (card.cardType !== 'ship') continue;
            if (card.faction !== faction) continue;
            newCardComponentProps.push({
                id,
                key: id,
                version,
                isDisabled: uniques.includes(id),
                onClick: () => addShip(id)
            });
        }
        setRightPaneText('Add Ship');
        setCardComponentProps(newCardComponentProps);
        handleSetRightPaneFocus(true);
        setIsCardPropsDelimited(false)
    }

    const setEligibleUpgradesToAdd = (shipIndex, upgradeIndex) => {
        const ship = ships[shipIndex];
        const shipCard = cards.cardsById[ships[shipIndex].id];
        const upgradeType = ships[shipIndex].upgradesEquipped[upgradeIndex].upgradeType;
        const newCardComponentProps = [];

        const openUpgradeSlots = {};
        for (let i = 0; i < ships[shipIndex].upgradesEquipped.length; i++) {
            const upgrade = ships[shipIndex].upgradesEquipped[i];
            if (upgrade.id === undefined) {
                if (openUpgradeSlots[upgrade.upgradeType]) openUpgradeSlots[upgrade.upgradeType] += 1;
                else openUpgradeSlots[upgrade.upgradeType] = 1;
            }
        }
        for (let i = 0; i < cards.upgradeIdList.length; i++) {
            const id = cards.upgradeIdList[i];
            const card = cards.cardsById[id];
            if (card.faction !== '' && card.faction !== faction) continue;
            if (!card.upgradeSlots.includes(upgradeType)) continue;
            if (!isUpgradeRequirementsMet(card.requirements, { ...shipCard, faction })) continue;
            if (card.upgradeSlots.length > 1 && !(openUpgradeSlots['weapons team'] > 0 && openUpgradeSlots['offensive retrofit'] > 0)) continue;
            let isDisabled = ship.hasModification && card.isModification || uniques.includes(id);
            newCardComponentProps.push({
                id,
                key: id,
                version,
                isDisabled,
                onClick: () => addUpgrade(shipIndex, upgradeIndex, id)
            });
        }
        setRightPaneText('Add Upgrade');
        setCardComponentProps(newCardComponentProps);
        handleSetRightPaneFocus(true);
        setIsCardPropsDelimited(true);
    }


    const setEligibleSquadronsToAdd = () => {
        const newCardComponentProps = [];
        for (let i = 0; i < cards.squadronIdList.length; i++) {
            const id = cards.squadronIdList[i];
            const card = cards.cardsById[id];
            if (card.cardType !== 'squadron') continue;
            if (card.faction !== faction) continue;
            newCardComponentProps.push({
                id,
                key: id,
                version,
                isDisabled: uniques.includes(id),
                onClick: () => addSquadron(id)
            });
        }
        setRightPaneText('Add Squadron');
        setCardComponentProps(newCardComponentProps);
        handleSetRightPaneFocus(true);
        setIsCardPropsDelimited(true);
    }

    const setEligibleSquadronsToSwap = (index) => {
        const newCardComponentProps = [];
        for (let i = 0; i < cards.squadronIdList.length; i++) {
            const id = cards.squadronIdList[i];
            const card = cards.cardsById[id];
            if (card.cardType !== 'squadron') continue;
            if (card.faction !== faction) continue;
            newCardComponentProps.push({
                id,
                key: id,
                isDisabled: uniques.includes(id),
                onClick: () => swapSquadron(index, id)
            });
        }
        setRightPaneText('Swap Squadron');
        setCardComponentProps(newCardComponentProps);
        handleSetRightPaneFocus(true);
        setIsCardPropsDelimited(true);
    }

    let shipPoints = 0;
    let squadronPoints = 0;
    ships.forEach(ship => {
        const shipCard = cards.cardsById[ship.id];
        const { points } = shipCard;
        shipPoints += points;
        if (ship.id in versions[version].pointDeltas) {
            shipPoints += versions[version].pointDeltas[ship.id];
        }
        for (let i = 0; i < ship.upgradesEquipped.length; i++) {
            const upgrade = ship.upgradesEquipped[i];
            if (upgrade.id && upgrade.id !== true) {
                const upgradeCard = cards.cardsById[upgrade.id];
                const { points } = upgradeCard;
                shipPoints += points;
                if (upgrade.id in versions[version].pointDeltas) {
                    shipPoints += versions[version].pointDeltas[upgrade.id];
                }
            }
        }
    });
    squadrons.forEach(squadron => {
        const squadronCard = cards.cardsById[squadron.id];
        const { points } = squadronCard

        let delta = 0;
        if (squadron.id in versions[version].pointDeltas) {
            delta = versions[version].pointDeltas[squadron.id];
        }

        if (points) squadronPoints += (points + delta) * squadron.count;
        else return 0;
    });

    cardComponentProps.sort((a, b) => {
        const cardA = cards.cardsById[a.id];
        const cardB = cards.cardsById[b.id];
        if (cardA.cardName > cardB.cardName) return 1;
        else if (cardA.cardName < cardB.cardName) return -1;
        else return 0;
    });
    const uniqueCardRowProps = [];
    const nonUniqueCardRowProps = [];
    if (isCardPropsDelimited) {
        for (let i = 0; i < cardComponentProps.length; i++) {
            const { id } = cardComponentProps[i];
            const card = cards.cardsById[id];
            if (card.cardType === 'squadron' && card.isUnique) {
                uniqueCardRowProps.push(cardComponentProps[i]);
            } else if (card.cardType === 'upgrade' && card.upgradeSlots.length === 1) {
                uniqueCardRowProps.push(cardComponentProps[i]);
            } else if (card.cardType === 'upgrade' && card.upgradeSlots.length > 1) {
                nonUniqueCardRowProps.push(cardComponentProps[i]);
            } else {
                nonUniqueCardRowProps.push(cardComponentProps[i]);
            }
        }
    }

    return (
        <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
            <div style={{ ...primaryPaneStyles }}>
                <ListHeader
                    title={title}
                    faction={faction}
                    version={version}
                    points={shipPoints + squadronPoints}
                    handleSetTitle={handleSetTitleFromEvent}
                    handleSetVersion={handleSetVersionFromEvent}
                />
                <Divider variant="middle" style={{ margin: '20px 0px', color: '#eee' }} />
                <ListShips
                    version={version}
                    commander={commander}
                    ships={ships}
                    shipPoints={shipPoints}
                    removeShip={removeShip}
                    removeUpgrade={removeUpgrade}
                    setEligibleShipsToAdd={setEligibleShipsToAdd}
                    setEligibleUpgradesToAdd={setEligibleUpgradesToAdd}
                />
                <Divider variant="middle" style={{ margin: '20px 0px', color: '#eee' }} />
                <ListSquadrons
                    version={version}
                    squadrons={squadrons}
                    squadronPoints={squadronPoints}
                    swapSquadron={swapSquadron}
                    incrementSquadron={incrementSquadron}
                    decrementSquadron={decrementSquadron}
                    removeSquadron={removeSquadron}
                    setEligibleSquadronsToSwap={setEligibleSquadronsToSwap}
                    setEligibleSquadronsToAdd={setEligibleSquadronsToAdd}
                />
                <Divider variant="middle" style={{ margin: '20px 0px', color: '#eee' }} />
                <ListObjectives
                    redObjId={redObjId}
                    yellowObjId={yellowObjId}
                    blueObjId={blueObjId}
                />
                <Divider variant="middle" style={{ margin: '20px 0px', color: '#eee' }} />
                <ListFooter />
            </div>
            <div className={styles.rightPane} style={{ ...secondaryPaneStyles }}>
                <RightPaneHeader
                    rightPaneText={rightPaneText}
                    isRightPaneFocused={isRightPaneFocused}
                    handleSetRightPaneFocus={handleSetRightPaneFocus}
                />
                {isRightPaneFocused ? (
                    <div>
                        <div style={{ display: isCardPropsDelimited ? 'none' : 'block' }}>
                            <CardSelector
                                cardComponents={cardComponentProps.map(cardProps => (<CardButton key={cardProps.id} {...cardProps}/>))}
                            />
                        </div>
                        <div style={{ display: isCardPropsDelimited ? 'block' : 'none' }}>
                            <CardSelector
                                cardComponents={uniqueCardRowProps.map(cardProps => (<CardButton key={cardProps.id} {...cardProps}/>))}
                            />
                            <Divider variant="middle" style={{ margin: '10px 0px', color: '#eee' }} />
                            <CardSelector
                                cardComponents={nonUniqueCardRowProps.map(cardProps => (<CardButton key={cardProps.id} {...cardProps}/>))}
                            />
                        </div>
                    </div>
                ) : (
                    <ListDisplay
                        ships={ships}
                        squadrons={squadrons}
                        redObjId={redObjId}
                        yellowObjId={yellowObjId}
                        blueObjId={blueObjId}
                    />
                )}
            </div>
        </div>
    );
}

export default ListContainer;