import { useState, useEffect } from 'react';
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
import { NoEncryptionRounded } from '@mui/icons-material';

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
    const [shipPoints, setShipPoints] = useState(0);
    const [squadronPoints, setSquadronPoints] = useState(0);
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
    const [isCardPropsUniqueDelimited, setIsCardPropsUniqueDelimited] = useState(false);

    const handleSetTitleFromEvent = (event) => setTitle(event.target.value);
    const handleSetVersionFromEvent = (event) => setVersion(event.target.value);


    const addShip = (id) => {
        const newShip = { id };
        const card = cards.cardsById[id];
        newShip.upgradesEquipped = card.upgradeSlots.map(upgradeType => ({ upgradeType, id: undefined }));

        if (card.isUnique) setUniques([...uniques, id]);
        setShips([...ships, newShip]);
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
        setSquadrons([...newSquadrons]);
        handleSetRightPaneFocus(false);
        setCardComponentProps([]);
        setRightPaneText('');
        setIsCardPropsUniqueDelimited(false);
    }

    const removeShip = (index) => {
        const ship = ships[index];
        const { id } = ship;
        const newUniques = [...uniques];
        const uniqueIdIndex = newUniques.indexOf(id);
        if (uniqueIdIndex) newUniques.splice(uniqueIdIndex, 1);
        for (let i = 0; i < ship.upgradesEquipped.length; i++) {
            const upgrade = ship.upgradesEquipped[i];
            const upgradeId = upgrade.id;
            if (upgradeId && newUniques.indexOf(upgradeId)) newUniques.splice(uniqueIdIndex, 1);
        }
        const newShips = [...ships];
        newShips.splice(index, 1);
        setShips(newShips);
    }

    const removeSquadron = (index) => {
        const newSquadrons = [...squadrons];
        const newUniques = [...uniques];
        const squadron = newSquadrons[index];
        const uniqueIdIndex = uniques.indexOf(squadron.id);
        if (uniqueIdIndex) newUniques.splice(uniqueIdIndex, 1);
        newSquadrons.splice(index, 1);
        setSquadrons([...newSquadrons]);
    }
    
    const setEligibleShipsToAdd = () => {
        const newCardComponentProps = [];
        for (let i = 0; i < cards.idList.length; i++) {
            const id = cards.idList[i];
            const card = cards.cardsById[id];
            if (card.cardType !== 'ship') continue;
            if (card.faction !== faction) continue;
            newCardComponentProps.push({
                id,
                key: id,
                isDisabled: uniques.includes(id),
                onClick: () => addShip(id)
            });
        }
        setRightPaneText('Add Ship');
        setCardComponentProps(newCardComponentProps);
        handleSetRightPaneFocus(true);
        setIsCardPropsUniqueDelimited(false)
    }

    const setEligibleSquadronsToAdd = () => {
        const newCardComponentProps = [];
        for (let i = 0; i < cards.idList.length; i++) {
            const id = cards.idList[i];
            const card = cards.cardsById[id];
            if (card.cardType !== 'squadron') continue;
            if (card.faction !== faction) continue;
            newCardComponentProps.push({
                id,
                key: id,
                isDisabled: uniques.includes(id),
                onClick: () => addSquadron(id)
            });
        }
        setRightPaneText('Add Squadron');
        setCardComponentProps(newCardComponentProps);
        handleSetRightPaneFocus(true);
        setIsCardPropsUniqueDelimited(true);
    }

    useEffect(() => {
        let shipPoints = 0;
        let squadronPoints = 0;
        ships.forEach(ship => {
            const shipCard = cards.cardsById[ship.id];
            const { points } = shipCard;
            shipPoints += points;
        });
        squadrons.forEach(squadron => {
            const squadronCard = cards.cardsById[squadron.id];
            const { points } = squadronCard
            if (points) squadronPoints += points
            else return 0;
        });
        setShipPoints(shipPoints);
        setSquadronPoints(squadronPoints);
    }, [ships, squadrons]);


    cardComponentProps.sort((a, b) => {
        const cardA = cards.cardsById[a.id];
        const cardB = cards.cardsById[b.id];
        if (cardA.cardName > cardB.cardName) return 1;
        else if (cardA.cardName < cardB.cardName) return -1;
        else return 0;
    });
    const uniqueCardRowProps = [];
    const nonUniqueCardRowProps = [];
    if (isCardPropsUniqueDelimited) {
        for (let i = 0; i < cardComponentProps.length; i++) {
            const { id } = cardComponentProps[i];
            if (cards.cardsById[id].isUnique) uniqueCardRowProps.push(cardComponentProps[i]);
            else nonUniqueCardRowProps.push(cardComponentProps[i]);
        }
    }

    return (
        <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
            <div style={{ ...primaryPaneStyles }}>
                <ListHeader
                    title={title}
                    faction={faction}
                    version={version}
                    versions={versions}
                    points={shipPoints + squadronPoints}
                    handleSetTitle={handleSetTitleFromEvent}
                    handleSetVersion={handleSetVersionFromEvent}
                />
                <Divider variant="middle" style={{ margin: '20px 0px', color: '#eee' }} />
                <ListShips
                    ships={ships}
                    shipPoints={shipPoints}
                    removeShip={removeShip}
                    setEligibleShipsToAdd={setEligibleShipsToAdd}
                />
                <Divider variant="middle" style={{ margin: '20px 0px', color: '#eee' }} />
                <ListSquadrons
                    squadrons={squadrons}
                    squadronPoints={squadronPoints}
                    removeSquadron={removeSquadron}
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
                        <div style={{ display: isCardPropsUniqueDelimited ? 'none' : 'block' }}>
                            <CardSelector
                                cardComponents={cardComponentProps.map(cardProps => (<CardButton {...cardProps}/>))}
                            />
                        </div>
                        <div style={{ display: isCardPropsUniqueDelimited ? 'block' : 'none' }}>
                            <CardSelector
                                cardComponents={uniqueCardRowProps.map(cardProps => (<CardButton {...cardProps}/>))}
                            />
                            <Divider variant="middle" style={{ margin: '10px 0px', color: '#eee' }} />
                            <CardSelector
                                cardComponents={nonUniqueCardRowProps.map(cardProps => (<CardButton {...cardProps}/>))}
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