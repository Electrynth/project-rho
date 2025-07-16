import { useState, useMemo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';
import { Box, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Print, OpenInNew, FileCopy, CopyAll, Delete } from '@mui/icons-material';
import robotoCondensed from 'config/font';
import ListExport from './ListExport';

function ListFooter({
    listId,
    listEmail,
    saveList,
    copyList,
    deleteList,
    generateExportedListText
}) {
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
        <div id="list-footer" style={{ display: 'flex', flexFlow: 'row nowrap' }}>
            <div style={{ ...centerAlignedRowStyles }}>
                <Button
                    disabled={saveSuccess || !(user && user.email)}
                    disableRipple
                    disableElevation
                    variant="contained"
                    color="customGrey"
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
                <IconButton style={{ marginRight: 2, cursor: 'pointer' }} onClick={() => setIsDialogOpen(true)}>
                    <OpenInNew fontSize="inherit" />
                </IconButton>
                {listId ? (
                    <IconButton
                        disabled={!(user && user.email === listEmail)}
                        style={{ marginRight: 2, cursor: 'pointer' }}
                        onClick={copyList}
                    >
                        <CopyAll fontSize="inherit" />
                    </IconButton>
                ) : (
                    undefined
                )}
                {listId ? (
                    <IconButton
                        disabled={!(user && user.email === listEmail)}
                        style={{ marginRight: 2, cursor: 'pointer' }}
                        onClick={deleteList}
                    >
                        <Delete fontSize="inherit" />
                    </IconButton>
                ) : (
                    undefined
                )}
            </div>
            <ListExport
                listText={listText}
                copySuccess={copySuccess}
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                setCopySuccess={setCopySuccess}
            />
        </div>
    );
}

/*
<IconButton disabled size="small" style={{ marginRight: 2 }}>
    <Print fontSize="inherit" />
</IconButton>
{listId ? (
    <IconButton disabled size="small" style={{ marginRight: 2, cursor: 'pointer' }} onClick={() => {}}>
        <FileCopy fontSize="inherit" />
    </IconButton>
) : (
    undefined
)}
*/

export default ListFooter;