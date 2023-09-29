import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Print, OpenInNew, FileCopy, Delete } from '@mui/icons-material';
import robotoCondensed from 'config/font';

function ListFooter({ generateExportedListText }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const centerAlignedRowStyles = {
        display: 'flex', flexFlow: 'nowrap', alignItems: 'center'
    };
    const router = useRouter();

    const listText = useMemo(() => generateExportedListText());

    return (
        <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
            <div style={{ ...centerAlignedRowStyles }}>
                <Button
                    disabled
                    disableRipple
                    disableElevation
                    variant="contained"
                >
                    <span className={robotoCondensed.className}>
                        Save
                    </span>
                </Button>
                <Button
                    disableRipple
                    disableElevation
                    variant="text"
                    color="secondary"
                    style={{ marginLeft: 4 }}
                    onClick={() => router.push('/')}
                >
                    <span className={robotoCondensed.className}>
                        Back
                    </span>
                </Button>
            </div>
            <div style={{ flexGrow: 1 }} />
            <div style={{ ...centerAlignedRowStyles }}>
                
                <IconButton size="small" style={{ marginRight: 2, cursor: 'pointer' }} onClick={() => setIsDialogOpen(true)}>
                    <OpenInNew fontSize="inherit" />
                </IconButton>
                
            </div>
            <Dialog fullWidth maxWidth="sm" onClose={() => setIsDialogOpen(false)} open={isDialogOpen}>
                <DialogTitle>
                    <span className={robotoCondensed.className}>
                        Text Export
                    </span>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        multiline
                        value={listText}
                    />
                </DialogContent>
                <DialogActions>
                    {(typeof window !== 'undefined') && window.isSecureContext ? (
                        <Button
                            size="large"
                            color="secondary"
                            variant="text"
                            disabled={copySuccess}
                            onClick={() => {
                                navigator.clipboard.writeText(listText);
                                setCopySuccess(true);
                                setTimeout(() => setCopySuccess(false, 500));
                            }}
                        >
                            <span className={robotoCondensed.className}>
                                {copySuccess ? 'Copied to Clipboard!' : 'Copy to Clipboard'}
                            </span>
                        </Button>
                    ) : undefined}
                </DialogActions>
            </Dialog>
        </div>
    );
}

/*
<IconButton size="small" style={{ marginRight: 2 }}>
                    <Print fontSize="inherit" />
                </IconButton>
<IconButton size="small" style={{ marginRight: 2 }}>
                    <FileCopy fontSize="inherit" />
                </IconButton>
                <IconButton size="small" style={{ marginRight: 2 }}>
                    <Delete fontSize="inherit" />
                </IconButton>
*/

export default ListFooter;