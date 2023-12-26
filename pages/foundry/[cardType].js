import { useState } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import NextHead from 'src/common/NextHead';
import FoundryContainer from 'src/foundry/FoundryContainer';

export default function Foundry() {
    const theme = useTheme();
    const breakpoints = {
        sm: useMediaQuery(theme.breakpoints.up('sm')),
        md: useMediaQuery(theme.breakpoints.up('md')),
        lg: useMediaQuery(theme.breakpoints.up('lg'))
    };

    return (
        <div>
            <NextHead />
            <FoundryContainer
                breakpoints={breakpoints}
            />
        </div>
    );
}