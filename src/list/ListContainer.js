import { useState, useEffect } from 'react';
import _ from 'lodash';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Image from 'next/image';
import styles from 'styles/ListContainer.module.css';
import robotoCondensed from 'config/font';
import { useRouter } from 'next/router';
import {
    Divider,
    Paper,
    Button,
    IconButton,
    Typography,
    cardMediaClasses,
    useMediaQuery,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
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
import urls from 'config/urls';

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
            <Typography>
                <span className={robotoCondensed.className}>
                    {rightPaneText ? rightPaneText : undefined}
                </span>
            </Typography>
            <IconButton onClick={() => handleSetRightPaneFocus(false)}>
                <Clear />
            </IconButton>
        </Paper>
    );
}

function calculateSquadronPoints(squadrons, version) {
    let squadronPoints = 0;

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

    return squadronPoints;
}

function calculateShipPoints(ships, version) {
    let shipPoints = 0;

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

    return shipPoints;
}

function ListContainer({
    primaryPaneStyles,
    secondaryPaneStyles,
    isRightPaneFocused,
    handleSetRightPaneFocus
}) {

    const router = useRouter();
    const { user } = useAuth0();
    const query = router.query;

    const [listId, setListId] = useState();
    const [listEmail, setListEmail] = useState('');
    const [version, setVersion] = useState(0);
    const [title, setTitle] = useState('');
    const [faction, setFaction] = useState('');
    const [commander, setCommander] = useState('');
    const [redObjId, setRedObjId] = useState('');
    const [blueObjId, setBlueObjId] = useState('');
    const [yellowObjId, setYellowObjId] = useState('');
    const [uniques, setUniques] = useState([]);
    const [squadronTitles, setSquadronTitles] = useState([]);
    const [ships, setShips] = useState([]);
    const [squadrons, setSquadrons] = useState([]);
    const [cardComponentProps, setCardComponentProps] = useState([]);
    const [rightPaneText, setRightPaneText] = useState('');
    const [isCardPropsDelimited, setIsCardPropsDelimited] = useState(false);

    const [zoomDialogCard, setZoomDialogCard] = useState();


    const theme = useTheme();
    const breakpoints = {
        sm: useMediaQuery(theme.breakpoints.up('sm')),
        md: useMediaQuery(theme.breakpoints.up('md')),
        lg: useMediaQuery(theme.breakpoints.up('lg'))
    };

    const shipPoints = calculateShipPoints(ships, version);
    const squadronPoints = calculateSquadronPoints(squadrons, version);


    useEffect(() => {
        if (['rebels', 'empire', 'republic', 'separatists'].includes(query.faction)) {
            setFaction(query.faction);
        } else {
            axios.get(`${urls.api}/lists/${query.faction}`).then(foundList => {
                if (foundList.data) {
                    const {
                        listId,
                        version,
                        title,
                        faction,
                        commander,
                        uniques,
                        ships,
                        squadrons,
                        redObjId,
                        yellowObjId,
                        blueObjId,
                        email
                    } = foundList.data;
                    setListEmail(email);
                    setListId(listId);
                    setVersion(version);
                    setTitle(title);
                    setFaction(faction);
                    setCommander(commander);
                    setUniques(uniques);
                    setShips(ships);
                    setSquadrons(squadrons);
                    setRedObjId(redObjId);
                    setYellowObjId(yellowObjId);
                    setBlueObjId(blueObjId);
                } else {
                    router.push('/');
                }
            });
        }
    }, [query]);

    const deleteList = () => {
        if (listId) {
            axios.delete(`${urls.api}/lists/${listId}`).then(deletedList => {
                router.push('/');
            })
        }
    }

    const saveList = () => {
        const list = {
            version,
            title,
            faction,
            commander,
            uniques,
            ships,
            squadrons,
            redObjId,
            yellowObjId,
            blueObjId
        };
        
        const shipPoints = calculateShipPoints(ships, version);
        const squadronPoints = calculateSquadronPoints(squadrons, version);
        const points = shipPoints + squadronPoints;

        if (listId && user.email && listEmail === user.email) {
            axios.put(`${urls.api}/lists/${listId}`, { ...list, points, listId, email: user.email }).then(modifiedList => {
                const {
                    listId,
                    version,
                    title,
                    faction,
                    commander,
                    uniques,
                    ships,
                    squadrons,
                    redObjId,
                    yellowObjId,
                    blueObjId,
                    email
                } = modifiedList.data;
                setListId(listId);
                setListEmail(email);
                setVersion(version);
                setTitle(title);
                setFaction(faction);
                setCommander(commander);
                setUniques(uniques);
                setShips(ships);
                setSquadrons(squadrons);
                setRedObjId(redObjId);
                setYellowObjId(yellowObjId);
                setBlueObjId(blueObjId);
            }).catch(e => {
                console.error(e.message);
            });
        } else if (user.email) {
            axios.post(`${urls.api}/lists`, { ...list, points, email: user.email }).then(createdList => {
                setListId(createdList.data.listId);
                setListEmail(createdList.data.email);
            }).catch(e => {
                console.error(e.message);
            });
        }
    }

    const handleSetTitleFromEvent = (event) => {
        if (title.length < 100) setTitle(event.target.value);
    }
    const handleSetVersionFromEvent = (event) => {
        clearList();
        handleSetRightPaneFocus(false);
        setCardComponentProps([]);
        setRightPaneText('');
        setVersion(event.target.value);
    }

    const generateExportedListText = () => {
        let totalListPoints = 0;
        const lines = [];
        const commanderCard = commander ? cards.cardsById[commander] : undefined;

        lines.push(`Name: ${title}`);
        lines.push(`Faction: ${faction}`);
        lines.push(`Commander: ${commanderCard ? (commanderCard.displayName ? commanderCard.displayName : commanderCard.cardName) : ''}`);
        lines.push(`Version: ${versions[version].label}`)
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
            const shipPointDelta = versions[version].pointDeltas[ship.id] ? versions[version].pointDeltas[ship.id] : 0;
            lines.push(`${shipCard.displayName ? shipCard.displayName : shipCard.cardName} (${shipCard.points + shipPointDelta})`);
            ship.upgradesEquipped.forEach(upgrade => {
                if (upgrade.id && cards.cardsById[upgrade.id]) {
                    const upgradeCard = cards.cardsById[upgrade.id];
                    const upgradePointDelta = versions[version].pointDeltas[upgrade.id] ? versions[version].pointDeltas[upgrade.id] : 0;
                    shipTotalPoints += upgradeCard.points + upgradePointDelta;
                    lines.push(`• ${upgradeCard.displayName ? upgradeCard.displayName : upgradeCard.cardName} (${upgradeCard.points + upgradePointDelta})`);
                }
            });
            lines.push(`= ${shipTotalPoints} Points`);
            lines.push('');
            totalListPoints += shipTotalPoints;
        });
        lines.push('');

        lines.push('Squadrons:');

        let totalSquadronPoints = 0;
        squadrons.forEach(squadron => {
            if (squadron.id) {
                const squadronCard = cards.cardsById[squadron.id];
                let delta = 0;
                if (squadron.id in versions[version].pointDeltas) {
                    delta = versions[version].pointDeltas[squadron.id];
                }

                if (squadron.count === 1) {
                    totalSquadronPoints += squadronCard.points + delta;
                    lines.push(`• ${squadronCard.displayName ? squadronCard.displayName : squadronCard.cardName} (${squadronCard.points + delta})`);
                } else {
                    totalSquadronPoints += (squadronCard.points + delta) * squadron.count;
                    lines.push(`• ${squadron.count} x ${squadronCard.displayName ? squadronCard.displayName : squadronCard.cardName} (${(squadronCard.points + delta) * squadron.count})`);
                }
            }
        });

        lines.push(`= ${totalSquadronPoints} Points`)
        lines.push('');

        totalListPoints += totalSquadronPoints;
        lines.push(`Total Points: ${totalListPoints}`);
        return lines.join('\n');
    }

    const copyShip = (index) => {
        const ship = ships[index];
        const newShip = { id: ship.id, hasModification: false };
        newShip.upgradesEquipped = ship.upgradesEquipped.map(upgrade => {
            const upgradeCard = cards.cardsById[upgrade.id];
            if (upgradeCard && upgradeCard.isModification) newShip.hasModification = true;
            return {
                id: (upgradeCard && !upgradeCard.isUnique) ? upgrade.id : undefined,
                upgradeType: upgrade.upgradeType
            };
        });
        let newShips = [...ships];
        newShips.splice(index + 1, 0, newShip);
        setShips([...newShips]);
    }

    const addShip = (id) => {
        const newShip = { id };
        const card = cards.cardsById[id];
        newShip.upgradesEquipped = card.upgradeSlots.map(upgradeType => ({ upgradeType, id: undefined }));
        newShip.hasModification = false;
        if (card.isUnique) setUniques([...uniques, card.cardName]);
        setShips([...ships, newShip]);
        handleSetRightPaneFocus(false);
        setCardComponentProps([]);
        setRightPaneText('');
    }

    const shiftShipInList = (index, shiftValue) => {
        const newShips = [...ships];
        if (shiftValue > 0 && index + 1 < ships.length) {
            [newShips[index], newShips[index + 1]] = [newShips[index + 1], newShips[index]];
        } else if (shiftValue < 0 && index - 1 > -1) {
            [newShips[index - 1], newShips[index]] = [newShips[index], newShips[index - 1]];
        }

        setShips([...newShips]);
    }

    const clearList = () => {
        setCommander('');
        setShips([]);
        setSquadrons([]);
        setSquadronTitles([]);
        setUniques([]);
        setRedObjId('');
        setYellowObjId('');
        setBlueObjId('');
    }

    const addUpgrade = (shipIndex, upgradeIndex, id) => {
        const newShips = [...ships];
        const newShip = newShips[shipIndex];
        const upgradeCard = cards.cardsById[id];

        if (upgradeCard.isUnique) setUniques([...uniques, upgradeCard.cardName]);
        if (upgradeCard.upgradeSlots.includes('commander')) {
            setCommander(id);
            newShip.flagship = true;
        }
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
            if (upgradeCard.id === 'rr') { // only card that conditionally adds a slot
                let hasDefensiveRetro = false;
                newShip.upgradesEquipped.forEach(upgradeSlot => {
                    if (upgradeSlot.upgradeType === 'defensive retrofit') hasDefensiveRetro = true;
                })
                if (!hasDefensiveRetro) {
                    newShip.upgradesEquipped.push({ parentCardId: id, upgradeType: upgradeCard.addsUpgradeSlot, id: undefined });
                }
            } else {
                newShip.upgradesEquipped.push({ parentCardId: id, upgradeType: upgradeCard.addsUpgradeSlot, id: undefined });
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
            if (cardsById[id].isUnique) setUniques([...uniques, card.cardName]);
            if (cardsById[id].title) setSquadronTitles([...squadronTitles, card.title]);
            newSquadrons.push({ id, count: 1 });
        }
        setSquadrons(newSquadrons);
        handleSetRightPaneFocus(false);
        setCardComponentProps([]);
        setRightPaneText('');
        setIsCardPropsDelimited(false);
    }


    const shiftSquadronInList = (index, shiftValue) => {
        const newSquadrons = [...squadrons];
        if (shiftValue > 0 && index + 1 < squadrons.length) {
            [newSquadrons[index], newSquadrons[index + 1]] = [newSquadrons[index + 1], newSquadrons[index]];
        } else if (shiftValue < 0 && index - 1 > -1) {
            [newSquadrons[index - 1], newSquadrons[index]] = [newSquadrons[index], newSquadrons[index - 1]];
        }

        setSquadrons([...newSquadrons]);
    }

    const swapSquadron = (index, id) => {
        const newSquadrons = [...squadrons];
        const newSquadronTitles = [...squadronTitles];
        const squadron = newSquadrons[index];
        const newSquadron = { id, count: 1 };
        const newSquadronCard = cards.cardsById[id];
        const newUniques = [...uniques];
        const oldSquadronCard = cardsById[squadron.id];
        if (oldSquadronCard.title) {
            const squadronTitleIndex = squadronTitles.indexOf(oldSquadronCard.title);
            newSquadronTitles.splice(squadronTitleIndex, 1);
        }
        const uniqueIdIndex = uniques.indexOf(oldSquadronCard.cardName);
        if (uniqueIdIndex > -1) newUniques.splice(uniqueIdIndex, 1);
        if (newSquadronCard.isUnique) newUniques.push(newSquadronCard.cardName);
        newSquadrons[index] = newSquadron;
        setSquadrons(newSquadrons);
        setUniques(newUniques);
        setSquadronTitles(newSquadronTitles);
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
        if (objectiveType === 'assault') setRedObjId('');
        if (objectiveType === 'defense') setYellowObjId('');
        if (objectiveType === 'navigation') setBlueObjId('');
    }

    const removeShip = (index) => {
        const ship = ships[index];
        const { id } = ship;
        const card = cardsById[id];
        //const newUniques = [...uniques];
        const uniquesToRemove = [];
        if (card.isUnique) uniquesToRemove.push(card.cardName);
        // if (uniqueIdIndex > -1) newUniques.splice(uniqueIdIndex, 1);
        for (let i = ship.upgradesEquipped.length - 1; i > -1; i--) {
            const upgrade = ship.upgradesEquipped[i];
            const upgradeId = upgrade.id;
            const upgradeCard = cards.cardsById[upgradeId];
            if (upgradeId && upgradeId !== true && upgradeCard.upgradeSlots.includes('commander')) setCommander('');
            if (upgradeId && upgradeId !== true && upgradeCard.isUnique) uniquesToRemove.push(upgradeCard.cardName);
            //if (upgradeId && upgradeId !== true && newUniques.indexOf(upgradeCard.cardName) > -1) newUniques.splice(uniqueIdIndex, 1);
        }

        const newUniques = uniques.filter(uniqueCardName => (!uniquesToRemove.includes(uniqueCardName)));
        const newShips = [...ships];
        newShips.splice(index, 1);
        setShips(newShips);
        setUniques(newUniques);
    }

    const swapUpgrade = (shipIndex, upgradeIndex, id) => {
        const newShips = [...ships];
        const newUniques = [...uniques];
        const newShip = newShips[shipIndex];
        const newUpgradeCard = cardsById[id];
        const oldUpgradeCard = cardsById[newShip.upgradesEquipped[upgradeIndex].id];

        if (oldUpgradeCard.isUnique) {
            const uniqueIdIndex = uniques.indexOf(oldUpgradeCard.cardName);
            newUniques.splice(uniqueIdIndex, 1);
        }

        if (newUpgradeCard.isUnique) {
            newUniques.push(newUpgradeCard.cardName);
        }

        setUniques([...newUniques]);

        if (oldUpgradeCard.upgradeSlots.includes('commander')) {
            setCommander(id); // set to new id
        }

        if (oldUpgradeCard.isModification && !newUpgradeCard.isModification) {
            newShip.hasModification = false;
        } else if (!newShip.hasModification && newUpgradeCard.isModification) {
            newShip.hasModification = true;
        }

        newShip.upgradesEquipped[upgradeIndex].id = id;

        setShips(newShips);
        handleSetRightPaneFocus(false);
        setCardComponentProps([]);
        setRightPaneText('');
    }

    const removeUpgrade = (shipIndex, upgradeIndex) => {
        const newShips = [...ships];
        const newUniques = [...uniques];
        const newShip = newShips[shipIndex];
        const upgrade = newShip.upgradesEquipped[upgradeIndex];
        const upgradeCard = cards.cardsById[upgrade.id];
        const uniqueIdIndex = uniques.indexOf(upgradeCard.cardName);

        if (upgradeCard.isModification) newShip.hasModification = false;
        if (uniqueIdIndex > -1) newUniques.splice(uniqueIdIndex, 1);
        if (upgradeCard.upgradeSlots.includes('commander')) {
            setCommander('');
            newShip.flagship = false;
        }
        if (upgradeCard.upgradeSlots.length > 1) {
            for (let i = 0; i < Object.keys(upgrade.upgradeSlotDict).length; i++) {
                const key = Object.keys(upgrade.upgradeSlotDict)[i];
                newShip.upgradesEquipped[upgrade.upgradeSlotDict[key]].id = undefined;
            }
          
        }

        if (upgradeCard.addsUpgradeSlot) {
            let secondUpgradeCardIndex;
            for (let i = 0; i < newShip.upgradesEquipped.length; i++) {
                console.log('\t', newShip.upgradesEquipped[i]);
                if (newShip.upgradesEquipped[i].parentCardId && newShip.upgradesEquipped[i].parentCardId === upgradeCard.id) {
                    secondUpgradeCardIndex = i;
                    if (newShip.upgradesEquipped[i].id) {
                        // TODO: rework this
                        // have to start the whole new upgrade removal process... 
                        const secondUpgradeCard = cards.cardsById[newShip.upgradesEquipped[i].id];
                        if (secondUpgradeCard.isUnique) {
                            newUniques.splice(newUniques.indexOf(secondUpgradeCard.id), 1);
                        }
                        if (secondUpgradeCard.isModification) newShip.hasModification = false;
                    }
                }
            }
            newShip.upgradesEquipped.splice(secondUpgradeCardIndex, 1);
        }

        if (upgrade.parentCardId) {
            newShip.upgradesEquipped[upgradeIndex] = { parentCardId: upgrade.parentCardId, upgradeType: upgrade.upgradeType, id: undefined };
        } else {
            newShip.upgradesEquipped[upgradeIndex] = { upgradeType: upgrade.upgradeType, id: undefined };
        }

        setUniques(newUniques);
        setShips(newShips);
    }

    const removeSquadron = (index) => {
        const newSquadrons = [...squadrons];
        const newUniques = [...uniques];
        const newSquadronTitles = [...squadronTitles];
        const squadron = newSquadrons[index];
        const card = cardsById[squadron.id];
        const uniqueIdIndex = uniques.indexOf(card.cardName);
        if (uniqueIdIndex > -1) newUniques.splice(uniqueIdIndex, 1);
        if (card.title) {
            const squadronTitleIndex = squadronTitles.indexOf(card.title);
            newSquadronTitles.splice(squadronTitleIndex, 1);
        }
        newSquadrons.splice(index, 1);
        setSquadronTitles(newSquadronTitles);
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
                isDisabled: uniques.includes(card.cardName),
                onClick: () => addShip(id)
            });
        }
        setRightPaneText('Add Ship');
        setCardComponentProps([...newCardComponentProps, ...appendedCardComponentProps]);
        handleSetRightPaneFocus(true);
        setIsCardPropsDelimited(true)
    }

    const setEligibleObjectiveToSwap = (objectiveType) => {
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
        setRightPaneText('Swap Objective');
        setCardComponentProps(newCardComponentProps);
        handleSetRightPaneFocus(true);
        setIsCardPropsDelimited(false)
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

        // count how many of each upgrade type are available for the purposes
        // of showing eligible-to-equip multi-slot upgrades
        const openUpgradeSlots = {};
        for (let i = 0; i < ships[shipIndex].upgradesEquipped.length; i++) {
            const upgrade = ships[shipIndex].upgradesEquipped[i];
            if (upgrade.id === undefined) {
                if (openUpgradeSlots[upgrade.upgradeType]) openUpgradeSlots[upgrade.upgradeType] += 1;
                else openUpgradeSlots[upgrade.upgradeType] = 1;
            }
        }

        // Go through each card to see if its eligible to equip
        for (let i = 0; i < cards.upgradeIdList.length; i++) {
            const id = cards.upgradeIdList[i];
            const card = cards.cardsById[id];

            // Check if faction is restricted
            if (card.faction !== '' && card.faction !== faction) continue;

            // Check if its a matching upgrade type to the slot
            if (!card.upgradeSlots.includes(upgradeType)) continue;

            // Check if there are other requirements for this upgrade card to be met
            if (!isUpgradeRequirementsMet(card.requirements, { ...shipCard, faction, flagship: ships[shipIndex].flagship ? ships[shipIndex].flagship : false })) continue;

            // Check if boarding teams type upgrade can be equipped
            if (card.upgradeSlots.length > 1 && !(openUpgradeSlots['weapons team'] > 0 && openUpgradeSlots['offensive retrofit'] > 0)) continue;

            // Check if the card is omitted per the version of the list
            if (versions[version].omittedCards.length > 0 && versions[version].omittedCards.includes(id)) continue;

            // Check if ship already has a modification upgrade or fails uniqueness check
            let isDisabled = ship.hasModification && card.isModification || uniques.includes(card.cardName);
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

    const setEligibleUpgradesToSwap = (shipIndex, upgradeIndex) => {
        const ship = ships[shipIndex];
        const shipCard = cardsById[ships[shipIndex].id];
        const upgradeType = ship.upgradesEquipped[upgradeIndex].upgradeType;
        const upgradeCard = ship.upgradesEquipped[upgradeIndex].id;
        const newCardComponentProps = [];

        for (let i = 0; i < cards.upgradeIdList.length; i++) {
            const id = cards.upgradeIdList[i];
            const card = cardsById[id];

            if (card.faction !== '' && card.faction !== faction) continue;
            if (!card.upgradeSlots.includes(upgradeType)) continue;
            if (!isUpgradeRequirementsMet(card.requirements, { ...shipCard, faction, flagship: ships[shipIndex].flagship ? ships[shipIndex].flagship : false })) continue;
            if (card.upgradeSlots.length > 1) continue; // no swapping multi-slot upgrades
            if (card.addsUpgradeSlot) continue; // no cards that add upgrade slots
            if (versions[version].omittedCards.length > 0 && versions[version].omittedCards.includes(id)) continue;
            let isDisabled = ship.hasModification && card.isModification || uniques.includes(card.cardName) || upgradeCard.id === id;

            newCardComponentProps.push({
                id,
                key: id,
                version,
                isDisabled,
                onClick: () => swapUpgrade(shipIndex, upgradeIndex, id)
            });
        }
        setRightPaneText('Swap Upgrade');
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
                isDisabled: uniques.includes(card.cardName) || squadronTitles.includes(card.title),
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
                version,
                isDisabled: card.title ? squadronTitles.includes(card.title) : false,
                onClick: () => swapSquadron(index, id)
            });
        }
        setRightPaneText('Swap Squadron');
        setCardComponentProps(newCardComponentProps);
        handleSetRightPaneFocus(true);
        setIsCardPropsDelimited(true);
    }

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
            <div id="list-primary-pane" style={{ ...primaryPaneStyles }}>
                <div
                    style={{
                        position: 'fixed',
                        zIndex: 1,
                        width: primaryPaneStyles.width === '100%' ? 'calc(100% - 40px)' : primaryPaneStyles.width - 40,
                        background: '#121212'
                    }}
                >
                    <ListHeader
                        title={title}
                        faction={faction}
                        version={version}
                        points={shipPoints + squadronPoints}
                        handleSetTitle={handleSetTitleFromEvent}
                        handleSetVersion={handleSetVersionFromEvent}
                        email={user ? user.email : undefined}
                    />
                    <Divider variant="middle" style={{ marginTop: 20, color: '#eee' }} />
                </div>
                <div id="list-ships" style={{ paddingTop: 110, zIndex: 0 }}>
                    <ListShips
                        version={version}
                        commander={commander}
                        ships={ships}
                        shipPoints={shipPoints}
                        removeShip={removeShip}
                        copyShip={copyShip}
                        removeUpgrade={removeUpgrade}
                        setEligibleShipsToAdd={setEligibleShipsToAdd}
                        setEligibleUpgradesToAdd={setEligibleUpgradesToAdd}
                        setEligibleUpgradesToSwap={setEligibleUpgradesToSwap}
                        handleSetZoomOnCard={(id) => setZoomDialogCard(id)}
                        shiftShipInList={shiftShipInList}
                    />
                </div>
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
                    handleSetZoomOnCard={(id) => setZoomDialogCard(id)}
                    shiftSquadronInList={shiftSquadronInList}
                />
                <Divider variant="middle" style={{ margin: '20px 0px', color: '#eee' }} />
                <ListObjectives
                    redObjId={redObjId}
                    yellowObjId={yellowObjId}
                    blueObjId={blueObjId}
                    addObjective={addObjective}
                    removeObjective={removeObjective}
                    setEligibleObjectiveToAdd={setEligibleObjectiveToAdd}
                    setEligibleObjectiveToSwap={setEligibleObjectiveToSwap}
                    handleSetZoomOnCard={(id) => setZoomDialogCard(id)}
                />
                <Divider variant="middle" style={{ margin: '20px 0px', color: '#eee' }} />
                <ListFooter
                    listEmail={listEmail}
                    listId={listId}
                    saveList={saveList}
                    deleteList={deleteList}
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
                        handleSetZoomOnCard={(id) => setZoomDialogCard(id)}
                    />
                )}
            </div>
            <Dialog
                fullScreen={!breakpoints.md}
                open={Boolean(zoomDialogCard)}
                onClose={() => setZoomDialogCard()}
            >
                <DialogTitle>
                    <span className={robotoCondensed.className}>
                        {zoomDialogCard && (cards.cardsById[zoomDialogCard].displayName ? cards.cardsById[zoomDialogCard].displayName : cards.cardsById[zoomDialogCard].cardName)}
                    </span>
                </DialogTitle>
                <DialogContent style={{ position: 'relative', minHeight: breakpoints.md ? 500 : 0, minWidth: breakpoints.md ? 400 : 0 }}>
                    {zoomDialogCard ? (
                        <Image
                            fill
                            src={cards.getCardImageUrl(cards.cardsById[zoomDialogCard].imageName ? cards.cardsById[zoomDialogCard].imageName : cards.cardsById[zoomDialogCard].cardName, cards.cardsById[zoomDialogCard].cardType)}
                            alt={cards.cardsById[zoomDialogCard].cardName}
                            style={{ objectFit: 'contain' }}
                        />
                    ) : undefined}
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" size="large" onClick={() => setZoomDialogCard()}>
                        <span className={robotoCondensed.className}>Back</span>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ListContainer;