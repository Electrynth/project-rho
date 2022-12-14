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
            <div className={robotoCondensed.className} style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', marginBottom: 8 }}>
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
                    style={{ fontSize: 20, fontFamily: 'inherit' }}
                />
                <div style={{ display: 'flex', justifyContent: 'center', marginLeft: 16 }}>
                    {points}
                </div>
            </div>
            <Chip
                clickable
                variant="outlined"
                label={
                    <div className={robotoCondensed.className}>
                        <Typography
                            variant="body1"
                            style={{ fontFamily: 'inherit' }}
                        >
                            Version: Community Patch
                        </Typography>
                    </div>
                }
            />
        </div>
    );
}

export default ListHeader;