import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Divider, Paper, IconButton, Typography } from '@mui/material';
import Clear from '@mui/icons-material/Clear';
import ListHeader from './ListHeader';
import ListShips from './ListShips';
import ListSquadrons from './ListSquadrons';
import ListObjectives from './ListObjectives';
import ListFooter from './ListFooter'
import CardDisplay from './CardDisplay';
import ListDisplay from './ListDisplay';
import CardSelector from './CardSelector';
import styles from 'styles/ListContainer.module.css';
import robotoCondensed from 'config/font';
import cards from 'config/cards';

function RightPaneHeader({ userPriorityAction, handleSetUserPrioAction }) {
    return (
        <Paper
            style={{
                zIndex: 1,
                top: 0,
                padding: 10,
                display: userPriorityAction === '' ? 'none' : 'flex',
                flexFlow: 'row nowrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: '-webkit-sticky',
                position: 'sticky',
            }}
        >
            <Typography className={robotoCondensed.className}>
                Do Stuff
            </Typography>
            <IconButton onClick={() => handleSetUserPrioAction('')}>
                <Clear />
            </IconButton>
        </Paper>
    );
}

function ListContainer({
    userPriorityAction,
    userPriorityActionList,
    primaryPaneStyles,
    secondaryPaneStyles,
    handleSetUserPrioAction
}) {
    const router = useRouter();
    const query = router.query;

    useEffect(() => {
        setFaction(query.faction);
    }, [query]);

    if ('ships' in query) {
        // 'squads' and 'objectives' are optional
        console.log('hashed list');
    } else if (query.id) {
        console.log('database list');
    } else {
        console.log('empty list');
    }

    const [version, setVersion] = useState(0);
    const [points, setPoints] = useState(0);
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

    const [filteredCardIds, setFilteredCardIds] = useState([]);

    const handleSetTitleFromEvent = (event) => setTitle(event.target.value);
    const handleSetVersionFromEvent = (event) => setVersion(event.target.value);
    const handleSetCardClick = (newCardClick) => setCardClick(newCardClick);
    const handleSetFilteredCardIds = (newFilteredCardIds) => setFilteredCardIds(newFilteredCardIds);
    const handleAddShip = (id) => {
        const newShip = { id };
        const card = cards.cardsById[id];
        newShip.upgradesEquipped = card.upgradeSlots.map(upgradeType => ({ upgradeType, id: undefined }));
        if (card.isUnique) setUniques([...uniques, id]);
        setShips([...ships, newShip]);
        handleSetUserPrioAction('');
    }


    let rightPaneContent = (
        <ListDisplay
            ships={ships}
            squadrons={squadrons}
            redObjId={redObjId}
            yellowObjId={yellowObjId}
            blueObjId={blueObjId}
            handleSetUserPrioAction={handleSetUserPrioAction}
        />
    );

    if (userPriorityAction === 'addShip') {
        rightPaneContent = (
            <CardSelector
                filteredCardIds={filteredCardIds}
                handleAddShip={handleAddShip}
                handleSetUserPrioAction={handleSetUserPrioAction}
            />
        );
    }

    return (
        <div className={styles.flexRow}>
            <div style={{ ...primaryPaneStyles }}>
                <ListHeader points={points} title={title} faction={faction} handleSetTitle={handleSetTitleFromEvent} />
                <Divider variant="middle" className={styles.divider} />
                <ListShips
                    ships={ships}
                    faction={faction}
                    uniques={uniques}
                    handleSetUserPrioAction={handleSetUserPrioAction}
                    handleSetFilteredCardIds={handleSetFilteredCardIds}
                    handleSetCardClick={handleSetCardClick}
                />
                <Divider variant="middle" className={styles.divider} />
                <ListSquadrons squadrons={squadrons} />
                <Divider variant="middle" className={styles.divider} />
                <ListObjectives
                    redObjId={redObjId}
                    yellowObjId={yellowObjId}
                    blueObjId={blueObjId}
                />
                <Divider variant="middle" className={styles.divider} />
                <ListFooter  />
            </div>
            <div className={styles.rightPane} style={{ ...secondaryPaneStyles }}>
                <RightPaneHeader
                    userPriorityAction={userPriorityAction}
                    handleSetUserPrioAction={handleSetUserPrioAction}
                />
                {rightPaneContent}
            </div>
        </div>
    );
}

export default ListContainer;