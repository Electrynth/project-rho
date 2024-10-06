import { useState } from 'react';
import domtoimage from 'dom-to-image-more';
import {
    Box,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Tabs,
    Tab,
    useMediaQuery
} from '@mui/material';
import { Clear } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import robotoCondensed from 'config/font';

function CustomTabPanel({ children, value, tabIndex, ...other }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== tabIndex}
            id={`tabpanel-${tabIndex}`}
            {...other}
        >
            {value === tabIndex && <Box>{children}</Box>}
        </div>
    );
}

function ImageExport({ breakpoints }) {
    const [listSrc, setListSrc] = useState();
    const options = {
        quality: .85,
        height: breakpoints.md ? 640 : 480,
        style: {
            width: '100%'
        }
    };
    
    if (!listSrc) {
        const listNode = document.getElementById('list-text-export');
        domtoimage.toJpeg(listNode, options).then(src => setListSrc(src));
        return <span className={robotoCondensed.className}>Loading...</span>;
    }
    return <img alt="list-image" src={listSrc} style={{ objectFit: 'contain' }} />;
}

function ListExport({
    listText,
    copySuccess,
    isDialogOpen,
    setCopySuccess,
    setIsDialogOpen
}) {
    const theme = useTheme();
    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const breakpoints = {
        sm: useMediaQuery(theme.breakpoints.up('sm')),
        md: useMediaQuery(theme.breakpoints.up('md')),
        lg: useMediaQuery(theme.breakpoints.up('lg'))
    };


    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            fullScreen={breakpoints.sm}
            onClose={() => setIsDialogOpen(false)} open={isDialogOpen}
        >
            <DialogTitle style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between'}}>
                <Tabs value={currentTabIndex} onChange={(_, v) => setCurrentTabIndex(v)}>
                    <Tab label="Text Export" id="tab-0" />
                    <Tab disabled label="Image Export" id="tab-1" />
                </Tabs>
                <IconButton
                    size="large"
                    onClick={() => setIsDialogOpen(false)}
                >
                    <Clear />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <CustomTabPanel
                    tabIndex={0}
                    value={currentTabIndex}
                >

                    <TextField
                        id="list-text-export"
                        fullWidth
                        multiline
                        value={listText}
                    />
                </CustomTabPanel>
                <CustomTabPanel
                    tabIndex={1}
                    value={currentTabIndex}
                    style={{ height: '100%' }}
                >
                    <div id="list-image-export" style={{ }}>
                        <ImageExport breakpoints={breakpoints} />
                    </div>
                </CustomTabPanel>
            </DialogContent>
            <DialogActions sx={{ paddingRight: 3 }}>
                {(typeof window !== 'undefined') && window.isSecureContext ? (
                    <Button
                        size="large"
                        color="secondary"
                        variant="outlined"
                        disabled={copySuccess}
                        onClick={() => {
                            navigator.clipboard.writeText(listText);
                            setCopySuccess(true);
                            setTimeout(() => setCopySuccess(false), 500);
                        }}
                    >
                        <span className={robotoCondensed.className}>
                            {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
                        </span>
                    </Button>
                ) : undefined}
            </DialogActions>
        </Dialog>
    );
}

export default ListExport;