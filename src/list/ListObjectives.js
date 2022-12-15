import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Circle } from '@mui/icons-material';
import robotoCondensed from 'config/font';

function ObjectiveButton({ children, style, ...props }) {
    return (
        <Button
            startIcon={<Circle />}
            disableRipple
            disableElevation
            size="small"
            variant="text"
            color="secondary"
            style={{ marginBottom: 8, ...style }}
            {...props}
        >
            <div className={robotoCondensed.className}>
                {children}
            </div>
        </Button>
    );
}

function ListObjectives() {

    return (
        <div style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'flex-start' }}>
            <ObjectiveButton>
                Add Assault Objective
            </ObjectiveButton>
            <ObjectiveButton>
                Add Defense Objective
            </ObjectiveButton>
            <ObjectiveButton>
                Add Navigation Objective
            </ObjectiveButton>
        </div>
    );
}

export default ListObjectives;