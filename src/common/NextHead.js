import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import robotoCondensed from 'config/font';
import {
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Drawer,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Divider
} from '@mui/material';
import {
    Home as HomeIcon,
    Menu as MenuIcon,
    Newspaper as BlogIcon,
    DashboardCustomize as CardsIcon
} from '@mui/icons-material'
import logo from 'public/images/logo.png';

export default function NextHead() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const router = useRouter();
    return (
        <>
            <Head>
                <title>HoloFoundry.net</title>
                <meta name="description" content="Star Wars: Armada Content Platform" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton
                    edge="start"
                    color="inherit"
                    sx={{ mr: 2 }}
                    onClick={() => setIsDrawerOpen(true)}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Image alt="logo" src={logo} style={{ width: 36, height: 36, marginRight: 16 }} />
                    <span style={{ flexGrow: 1, fontSize: 28, fontFamily: 'Aero Matics Display Bold', fontStyle: 'italic' }}>
                    HoloFoundry.net
                    </span>
                    
                </Toolbar>
                </AppBar>
            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            >
                <Box sx={{ width: 240 }}>
                <List>
                    <ListItem disablePadding>
                    <ListItemButton onClick={() => { router.push('/'); setIsDrawerOpen(false); }}>
                        <ListItemText primary={<span className={robotoCondensed.className}>Home</span>} />
                    </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => { router.push('/builder/upgrade/'); setIsDrawerOpen(false); }}>
                            <ListItemText primary={<span className={robotoCondensed.className}>Upgrade Card Builder</span>} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => { router.push('/builder/squadron'); setIsDrawerOpen(false); }}>
                            <ListItemText primary={<span className={robotoCondensed.className}>Squadron Card Builder</span>} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => { router.push('/builder/ship'); setIsDrawerOpen(false); }}>
                            <ListItemText primary={<span className={robotoCondensed.className}>Ship Card builder</span>} />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => { router.push('/privacy'); setIsDrawerOpen(false); }}>
                            <ListItemText primary={<span className={robotoCondensed.className}>Privacy Policy</span>} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => { router.push('/deletion'); setIsDrawerOpen(false); }}>
                            <ListItemText primary={<span className={robotoCondensed.className}>Data Deletion</span>} />
                        </ListItemButton>
                    </ListItem>
                </List>
                </Box>
            </Drawer>
        </>
    );
}