import { useState, useMemo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';
import { Box, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Print, OpenInNew, FileCopy, Clear } from '@mui/icons-material';
import robotoCondensed from 'config/font';

function ListFooter({ listId, listEmail, saveList, deleteList, generateExportedListText }) {
    const { user } = useAuth0();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const centerAlignedRowStyles = {
        display: 'flex', flexFlow: 'nowrap', alignItems: 'center'
    };
    const router = useRouter();

    const listText = useMemo(() => generateExportedListText(), [generateExportedListText]);

    return (
        <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
            <div style={{ ...centerAlignedRowStyles }}>
                <Button
                    disabled={saveSuccess || !(user && user.email)}
                    disableRipple
                    disableElevation
                    variant="contained"
                    onClick={() => {
                        setSaveSuccess(true);
                        setTimeout(() => setSaveSuccess(false), 500);
                        saveList();
                    }}
                >
                    <span className={robotoCondensed.className}>
                        {saveSuccess ? 'Saved!' : 'Save'}
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
                {listId ? (
                    <IconButton disabled size="small" style={{ marginRight: 2, cursor: 'pointer' }} onClick={() => {}}>
                        <FileCopy fontSize="inherit" />
                    </IconButton>
                ) : (
                    undefined
                )}
                {listId ? (
                    <IconButton
                        disabled={!(user && user.email === listEmail)}
                        size="small"
                        style={{ marginRight: 2, cursor: 'pointer' }}
                        onClick={deleteList}
                    >
                        <Clear fontSize="inherit" />
                    </IconButton>
                ) : (
                    undefined
                )}
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
                                setTimeout(() => setCopySuccess(false), 500);
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