import { useState } from 'react';
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

function ListExport({
    listText,
    copySuccess,
    isDialogOpen,
    setCopySuccess,
    setIsDialogOpen
}) {
    const theme = useTheme();
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const [textFieldValue, setTextFieldValue] = useState(listText);

    const isFullScreen = useMediaQuery(theme.breakpoints.down('md'));


    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            fullScreen={isFullScreen}
            onClose={() => setIsDialogOpen(false)} open={isDialogOpen}
            PaperProps={{ classes: { '& .MuiPaper-root': { backgroundColor: 'red' } } }}
        >
            <DialogTitle style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between'}}>
                <Tabs value={currentTabIndex} onChange={(_, v) => setCurrentTabIndex(v)}>
                    <Tab label="Text Export" id="tab-0" />
                    <Tab label="Image Export" id="tab-1" />
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
                        fullWidth
                        multiline
                        value={textFieldValue}
                        onChange={e => setTextFieldValue(e.target.value)}
                    />
                </CustomTabPanel>
                <CustomTabPanel
                    tabIndex={1}
                    value={currentTabIndex}
                >
                    Image Export Panel
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