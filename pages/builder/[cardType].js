import { useState } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import NextHead from 'src/common/NextHead';
import BuilderContainer from 'src/builder/BuilderContainer';

export default function Builder() {
    const theme = useTheme();
    const breakpoints = {
        sm: useMediaQuery(theme.breakpoints.up('sm')),
        md: useMediaQuery(theme.breakpoints.up('md')),
        lg: useMediaQuery(theme.breakpoints.up('lg'))
    };

    return (
        <div>
            <NextHead />
            <BuilderContainer breakpoints={breakpoints} />
        </div>
    );
}