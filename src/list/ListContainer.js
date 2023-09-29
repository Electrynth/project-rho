import { useState, useEffect } from 'react';
import _ from 'lodash';
import styles from 'styles/ListContainer.module.css';
import robotoCondensed from 'config/font';
import { useRouter } from 'next/router';
import { Divider, Paper, IconButton, Typography, cardMediaClasses } from '@mui/material';
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
import cards from 'config/cards.js';
import { isUpgradeRequirementsMet } from 'src/utility';
import { RefreshOutlined } from '@mui/icons-material';

const { cardsById } = cards;

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

    const [version, setVersion] = useState(0);
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

    const generateExportedListText = () => {
        let totalListPoints = 0;
        const lines = [];
        const commanderCard = commander ? cards.cardsById[commander] : undefined;

        lines.push(`Name: ${title}`);
        lines.push(`Faction: ${faction}`);
        lines.push(`Commander: ${commanderCard ? (commanderCard.displayName ? commanderCard.displayName : commanderCard.cardName) : ''}`);
        lines.push('');

        const assaultObjectiveName = redObjId ? cards.cardsById[redObjId].cardName : '';
        const defenseObjectiveName = yellowObjId ? cards.cardsById[yellowObjId].cardName : '';
        const navigationObjectiveName = blueObjId ? cards.cardsById[blueObjId].cardName : '';
        lines.push(`Assault: ${assaultObjectiveName}`);
        lines.push(`Defense: ${defenseObjectiveName}`);
        lines.push(`Navigation: ${navigationObjectiveName}`);
        lines.push('');

        ships.forEach(ship => {
            const shipCard = cards.cardsById[ship.id];
            let shipTotalPoints = shipCard.points;
            lines.push(`${shipCard.displayName ? shipCard.displayName : shipCard.cardName} (${shipCard.points})`);
            ship.upgradesEquipped.forEach(upgrade => {
                if (upgrade.id && cards.cardsById[upgrade.id]) {
                    const upgradeCard = cards.cardsById[upgrade.id];
                    shipTotalPoints += upgradeCard.points;
                    lines.push(`• ${upgradeCard.displayName ? upgradeCard.displayName : upgradeCard.cardName} (${upgradeCard.points})`);
                }
            });
            lines.push(`= ${shipTotalPoints} Points`);
            totalListPoints += shipTotalPoints;
        });
        lines.push('');

        lines.push('Squadrons:');
        console.log(squadrons);
        let totalSquadronPoints = 0;
        squadrons.forEach(squadron => {
            if (squadron.id) {
                const squadronCard = cards.cardsById[squadron.id];
                if (squadron.count === 1) {
                    totalSquadronPoints += squadronCard.points;
                    lines.push(`• ${squadronCard.displayName ? squadronCard.displayName : squadronCard.cardName} (${squadronCard.points})`);
                } else {
                    totalSquadronPoints += squadronCard.points * squadron.count;
                    lines.push(`• ${squadron.count} x ${squadronCard.displayName ? squadronCard.displayName : squadronCard.cardName} (${squadronCard.points * squadron.count})`);
                }
            }
        });
        lines.push(`= ${totalSquadronPoints} Points`)
        lines.push('');

        totalListPoints += totalSquadronPoints;
        lines.push(`Total Points: ${totalListPoints}`);
        return lines.join('\n');
    }

    const addShip = (id) => {
        const newShip = { id };
        const card = cards.cardsById[id];
        newShip.upgradesEquipped = card.upgradeSlots.map(upgradeType => ({ upgradeType, id: undefined }));
        newShip.hasModification = false;
        if (card.isUnique) setUniques([...uniques, card.displayName ? card.displayName : card.cardName]);
        setShips([...ships, newShip]);
        handleSetRightPaneFocus(false);
        setCardComponentProps([]);
        setRightPaneText('');
    }
    const addUpgrade = (shipIndex, upgradeIndex, id) => {
        const newShips = [...ships];
        const newShip = newShips[shipIndex];
        const upgradeCard = cards.cardsById[id];

        if (upgradeCard.isUnique) setUniques([...uniques, upgradeCard.displayName ? upgradeCard.displayName : upgradeCard.cardName]);
        if (upgradeCard.upgradeSlots.includes('commander')) setCommander(id);
        if (upgradeCard.isModification) newShip.hasModification = true;
        if (upgradeCard.upgradeSlots.length > 1) {
            const upgradeSlotDict = {};
            for (let i = 0; i < upgradeCard.upgradeSlots.length; i++) {
                upgradeSlotDict[upgradeCard.upgradeSlots[i]] = true;
            }
            for (let i = 0; i < newShip.upgradesEquipped.length; i++) {
                const equippedUpgrade = newShip.upgradesEquipped[i];
                if (equippedUpgrade.id === true || cards.cardsById[equippedUpgrade.id]) continue; // don't overwrite equipped upgrades
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
        if (upgradeCard.addsUpgradeSlot) {
            if (upgradeCard.id === 'rr') {
                let hasDefensiveRetro = false;
                newShip.upgradesEquipped.forEach(upgradeSlot => {
                    if (upgradeSlot.upgradeType === 'defensive retrofit') hasDefensiveRetro = true;
                })
                if (!hasDefensiveRetro) {
                    newShip.upgradesEquipped.push({ rootCardId: id, upgradeType: upgradeCard.addsUpgradeSlot, id: undefined });
                }
            } else {
                newShip.upgradesEquipped.push({ rootCardId: id, upgradeType: upgradeCard.addsUpgradeSlot, id: undefined });
            }
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
            const card = cardsById[id];
            if (cards.cardsById[id].isUnique) setUniques([...uniques, card.displayName ? card.displayName : card.cardName]);
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
        const oldSquadronCard = cardsById[squadron.id];
        const uniqueIdIndex = uniques.indexOf(oldSquadronCard.displayName ? oldSquadronCard.displayName : oldSquadronCard.cardName);
        if (uniqueIdIndex > -1) newUniques.splice(uniqueIdIndex, 1);
        if (newSquadronCard.isUnique) newUniques.push(newSquadronCard.displayName ? newSquadronCard.displayName : newSquadronCard.cardName);
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

    const addObjective = (id, objectiveType) => {
        if (objectiveType === 'assault') setRedObjId(id);
        if (objectiveType === 'defense') setYellowObjId(id);
        if (objectiveType === 'navigation') setBlueObjId(id);

        handleSetRightPaneFocus(false);
        setCardComponentProps([]);
        setRightPaneText('');
    }

    const removeObjective = (objectiveType) => {
        if (objectiveType === 'assault') setRedObjId();
        if (objectiveType === 'defense') setYellowObjId();
        if (objectiveType === 'navigation') setBlueObjId();
    }

    const removeShip = (index) => {
        const ship = ships[index];
        const { id } = ship;
        const card = cardsById[id];
        const newUniques = [...uniques];
        const uniqueIdIndex = newUniques.indexOf(card.displayName ? card.displayName : card.cardName);
        if (uniqueIdIndex > -1) newUniques.splice(uniqueIdIndex, 1);
        for (let i = 0; i < ship.upgradesEquipped.length; i++) {
            const upgrade = ship.upgradesEquipped[i];
            const upgradeId = upgrade.id;
            const upgradeCard = cards.cardsById[upgradeId];
            if (upgradeId && upgradeId !== true && upgradeCard.upgradeSlots.includes('commander')) setCommander('');
            if (upgradeId && upgradeId !== true && newUniques.indexOf(upgradeCard.displayName ? upgradeCard.displayName : upgradeCard.cardName) > -1) newUniques.splice(uniqueIdIndex, 1);
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
        const uniqueIdIndex = uniques.indexOf(upgradeCard.displayName ? upgradeCard.displayName : upgradeCard.cardName);
        if (upgradeCard.isModification) newShip.hasModification = false;
        if (uniqueIdIndex > -1) newUniques.splice(uniqueIdIndex, 1);
        if (upgradeCard.upgradeSlots.includes('commander')) setCommander('');
        if (upgradeCard.upgradeSlots.length > 1) {
            for (let i = 0; i < Object.keys(upgrade.upgradeSlotDict).length; i++) {
                const key = Object.keys(upgrade.upgradeSlotDict)[i];
                newShip.upgradesEquipped[upgrade.upgradeSlotDict[key]].id = undefined;
            }
          
        }
        if (upgradeCard.addsUpgradeSlot) {
            let secondUpgradeCardIndex;
            for (let i = 0; i < newShip.upgradesEquipped.length; i++) {
                if (newShip.upgradesEquipped[i].rootCardId && newShip.upgradesEquipped[i].rootCardId === upgradeCard.id) {
                    secondUpgradeCardIndex = i;
                    if (newShip.upgradesEquipped[i].id) {
                        // TODO: rework this
                        // have to start the whole new upgrade removal process... 
                        const secondUpgradeCard = cards.cardsById[newShip.upgradesEquipped[i].id];

                        if (secondUpgradeCard.isModification) newShip.hasModification = false;
                    }
                }
            }
            newShip.upgradesEquipped.splice(secondUpgradeCardIndex, 1);
        }
        newShip.upgradesEquipped[upgradeIndex] = { upgradeType: upgrade.upgradeType, id: undefined };
        setUniques(newUniques);
        setShips(newShips);
    }

    const removeSquadron = (index) => {
        const newSquadrons = [...squadrons];
        const newUniques = [...uniques];
        const squadron = newSquadrons[index];
        const card = cardsById[squadron.id];
        const uniqueIdIndex = uniques.indexOf(card.displayName ? card.displayName : card.cardName);
        if (uniqueIdIndex > -1) newUniques.splice(uniqueIdIndex, 1);
        newSquadrons.splice(index, 1);
        setSquadrons(newSquadrons);
        setUniques(newUniques);
    }
    
    const setEligibleShipsToAdd = () => {
        const newCardComponentProps = [];
        const appendedCardComponentProps = [];
        for (let i = 0; i < cards.shipIdList.length; i++) {
            const id = cards.shipIdList[i];
            const card = cards.cardsById[id];
            if (card.cardType !== 'ship') continue;
            if (card.faction !== faction) continue;
            if (versions[version].omittedCards.length > 0 && versions[version].omittedCards.includes(id)) continue;
            newCardComponentProps.push({
                id,
                key: id,
                version,
                isDisabled: uniques.includes(card.displayName ? card.displayName : card.cardName),
                onClick: () => addShip(id)
            });
        }
        setRightPaneText('Add Ship');
        setCardComponentProps([...newCardComponentProps, ...appendedCardComponentProps]);
        handleSetRightPaneFocus(true);
        setIsCardPropsDelimited(true)
    }

    const setEligibleObjectiveToAdd = (objectiveType) => {
        const newCardComponentProps = [];
        for (let i = 0; i < cards.objectiveIdList.length; i++) {
            const id = cards.objectiveIdList[i];
            const card = cards.cardsById[id];
            
            if (card.cardType !== 'objective') continue;
            if (card.objectiveType !== objectiveType) continue;
            if (versions[version].omittedCards.length > 0 && versions[version].omittedCards.includes(id)) continue;

            let isDisabled = false;
            if (objectiveType === 'assault' && redObjId === id) isDisabled = true;
            if (objectiveType === 'defense' && yellowObjId === id) isDisabled = true;
            if (objectiveType === 'navigation' && blueObjId === id) isDisabled = true;
            newCardComponentProps.push({
                id,
                key: id,
                version,
                isDisabled,
                onClick: () => addObjective(id, objectiveType)
            });
        }
        setRightPaneText('Add Objective');
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
            if (versions[version].omittedCards.length > 0 && versions[version].omittedCards.includes(id)) continue;
            let isDisabled = ship.hasModification && card.isModification || uniques.includes(card.displayName ? card.displayName : card.cardName);
            ship.upgradesEquipped.forEach(upgrade => {
                if (upgrade.id !== true && upgrade.id === id) isDisabled = true;
            })
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
            if (versions[version].omittedCards.length > 0 && versions[version].omittedCards.includes(id)) continue;
            newCardComponentProps.push({
                id,
                key: id,
                version,
                isDisabled: uniques.includes(card.displayName ? card.displayName : card.cardName),
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
                isDisabled: uniques.includes(card.displayName ? card.displayName : card.cardName),
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
        if (cardA.cardName.replace(/"/g, '') > cardB.cardName.replace(/"/g, '')) return 1;
        else if (cardA.cardName.replace(/"/g, '') < cardB.cardName.replace(/"/g, '')) return -1;
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
            } else if (card.cardType === 'ship' && card.shipSize === 'huge') {
                nonUniqueCardRowProps.push(cardComponentProps[i]);
            } else if (card.cardType === 'ship' && card.shipSize !== 'huge') {
                uniqueCardRowProps.push(cardComponentProps[i]);
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
                    addObjective={addObjective}
                    removeObjective={removeObjective}
                    setEligibleObjectiveToAdd={setEligibleObjectiveToAdd}
                />
                <Divider variant="middle" style={{ margin: '20px 0px', color: '#eee' }} />
                <ListFooter
                    generateExportedListText={generateExportedListText}
                />
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
                        version={version}
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