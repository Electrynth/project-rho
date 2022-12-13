import InputBase from '@mui/material/InputBase';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import FactionIcon from 'src/common/FactionIcon';
import robotoCondensed from 'config/font';

function ListHeader({
    points,
    title,
    faction,
    version,
    handleSetTitle
}) {
    return (
        <div style={{ display: 'flex', flexFlow: 'column' }}>
            <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginRight: 16 }}>
                    <FactionIcon faction={faction} style={{ width: 30, height: 30 }} />
                </div>
                <InputBase
                    fullWidth
                    size="small"
                    placeholder="Untitled Fleet"
                    variant="standard"
                    value={title}
                    onChange={handleSetTitle}
                    className={robotoCondensed.className}
                    style={{ fontSize: 20 }}
                />
                <div style={{ display: 'flex', justifyContent: 'center', marginLeft: 16 }}>
                    {points}
                </div>
            </div>
            <Chip
                clickable
                variant="outlined"
                label={
                    <Typography
                        variant="body1"
                        className={robotoCondensed.className}
                    >
                        Version: Community Patch
                    </Typography>
                }
                className={robotoCondensed.className}
            />
        </div>
    );
}

export default ListHeader;