import Head from 'next/head'
import { useState, useEffect } from 'react';
import ListContainer from 'src/list/ListContainer';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function List() {
    const theme = useTheme();
    const userPriorityActionList = [
        '',
        'viewCard',
        'addShip',
        'switchShip',
        'addUpgrade',
        'switchUpgrade',
        'addSquadron',
        'switchSquadron',
        'addObjective'
    ];
    const [userPriorityAction, setUserPriorityAction] = useState('');
    const handleSetUserPrioAction = (newUserAction) => {
        setUserPriorityAction(newUserAction);
    };

    const breakpoints = {
        sm: useMediaQuery(theme.breakpoints.up('sm')),
        md: useMediaQuery(theme.breakpoints.up('md')),
        lg: useMediaQuery(theme.breakpoints.up('lg'))
    };

    const primaryPaneStyles = {
        width: '100%',
        height: '100vh',
        overflowY: 'scroll',
        padding: 20,
        display: 'flex',
        flexFlow: 'column nowrap'
    };
    
    if (breakpoints.lg) { primaryPaneStyles.width = 440; primaryPaneStyles.minWidth = 440; }
    else if (breakpoints.md) { primaryPaneStyles.width = 380; primaryPaneStyles.minWidth = 380; }
    else if (userPriorityAction !== '') primaryPaneStyles.display = 'none';

    const secondaryPaneStyles = {
        flexGrow: 1,
        display: 'none',
        height: '100vh',
        overflowY: 'scroll',
        padding: 20,
        flexFlow: 'column nowrap'
    };

    if (breakpoints.lg || breakpoints.md) secondaryPaneStyles.display = 'flex';
    else if (userPriorityAction !== '') secondaryPaneStyles.display = 'flex';

    return (
        <div>
            <Head>
                <title>Project Rho</title>
                <meta name="description" content="Armada list builder" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ListContainer
                userPriorityAction={userPriorityAction}
                userPriorityActionList={userPriorityActionList}
                primaryPaneStyles={primaryPaneStyles}
                secondaryPaneStyles={secondaryPaneStyles}
                handleSetUserPrioAction={handleSetUserPrioAction}
            />
        </div>
    );
}

export default List;