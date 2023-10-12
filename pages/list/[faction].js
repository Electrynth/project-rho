import Head from 'next/head'
import { useState } from 'react';
import ListContainer from 'src/list/ListContainer';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function List() {
    const theme = useTheme();
    const [isRightPaneFocused, setIsRightPaneFocused] = useState(false);
    const handleSetRightPaneFocus = (isFocused) => setIsRightPaneFocused(isFocused);

    const breakpoints = {
        sm: useMediaQuery(theme.breakpoints.up('sm')),
        md: useMediaQuery(theme.breakpoints.up('md')),
        lg: useMediaQuery(theme.breakpoints.up('lg'))
    };

    const primaryPaneStyles = {
        width: '100%',
        height: '100vh',
        overflowY: 'scroll',
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        display: 'flex',
        flexFlow: 'column nowrap'
    };
    
    if (breakpoints.lg) { primaryPaneStyles.width = 440; primaryPaneStyles.minWidth = 440; }
    else if (breakpoints.md) { primaryPaneStyles.width = 380; primaryPaneStyles.minWidth = 380; }
    else if (isRightPaneFocused) primaryPaneStyles.display = 'none';

    const secondaryPaneStyles = {
        flexGrow: 1,
        display: 'none',
        height: '100vh',
        overflowY: 'scroll',
        padding: 20,
        flexFlow: 'column nowrap'
    };

    if (breakpoints.lg || breakpoints.md) secondaryPaneStyles.display = 'flex';
    else if (isRightPaneFocused) secondaryPaneStyles.display = 'flex';

    return (
        <div>
            <Head>
                <title>Project Rho</title>
                <meta name="description" content="Armada list builder" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ListContainer
                primaryPaneStyles={primaryPaneStyles}
                secondaryPaneStyles={secondaryPaneStyles}
                isRightPaneFocused={isRightPaneFocused}
                handleSetRightPaneFocus={handleSetRightPaneFocus}
            />
        </div>
    );
}

export default List;