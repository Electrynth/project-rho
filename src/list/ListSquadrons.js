import { Button, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import robotoCondensed from 'config/font';

function ListSquadrons({ points = 0 }) {
    return (
        <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
                <Button
                    disableRipple
                    disableElevation
                    variant="contained"
                >
                    <Add />
                    <div
                        className={robotoCondensed.className}
                        style={{ width: 110, fontSize: 12, marginLeft: 4, position: 'absolute', left: 60 }}
                    >
                        Add Squadron
                    </div>
                </Button>
                
            </div>
            <div style={{ flexGrow: 1 }} />
            <Typography
                className={robotoCondensed.className}
                style={{ border: '1px solid #999', paddingLeft: 5, paddingRight: 5, paddingTop: 2, borderRadius: 5 }}
            >
                {points}
            </Typography>
        </div>
    );
}

export default ListSquadrons;