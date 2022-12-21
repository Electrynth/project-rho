import { Button } from '@mui/material';
import { Circle } from '@mui/icons-material';
import robotoCondensed from 'config/font';

function ObjectiveButton({ children, style, iconStyle, ...props }) {
    return (
        <Button
            startIcon={<Circle style={iconStyle} />}
            disableRipple
            disableElevation
            variant="text"
            color="secondary"
            style={{ marginBottom: 8, ...style }}
            {...props}
        >
            <div className={robotoCondensed.className} style={{ paddingTop: 2 }}>
                {children}
            </div>
        </Button>
    );
}

function ListObjectives() {

    return (
        <div style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'flex-start' }}>
            <ObjectiveButton iconStyle={{ color: '#cc2b29' }}>
                Add Assault Objective
            </ObjectiveButton>
            <ObjectiveButton iconStyle={{ color: '#ffee00' }}>
                Add Defense Objective
            </ObjectiveButton>
            <ObjectiveButton iconStyle={{ color: '#00b7ca' }}>
                Add Navigation Objective
            </ObjectiveButton>
        </div>
    );
}

export default ListObjectives;