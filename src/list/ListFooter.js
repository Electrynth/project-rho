import { useRouter } from 'next/router';
import { Button, IconButton, Dialog, DialogTitle } from '@mui/material';
import { Print, OpenInNew, FileCopy, Delete } from '@mui/icons-material';
import robotoCondensed from 'config/font';

function ListFooter() {
    const centerAlignedRowStyles = {
        display: 'flex', flexFlow: 'nowrap', alignItems: 'center'
    };
    const router = useRouter();

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
                
                <IconButton size="small" style={{ marginRight: 2 }}>
                    <OpenInNew fontSize="inherit" />
                </IconButton>
                
            </div>
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