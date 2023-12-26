import { TextField } from '@mui/material';

export default function TextValueInput({
    elementId,
    value,
    handleChange,
    label = '',
    numberRange = [],
    isDisabled = false,
    ...props
}) {
    return (
        <TextField
            size="small"
            id={elementId}
            disabled={isDisabled}
            label={label}
            value={value}
            onChange={e => {
                const { value } = e.target;
                if (numberRange.length === 2) {
                    if (value >= numberRange[0] && e.target.value <= numberRange[1]) {
                        handleChange(e);
                    }
                } else {
                    handleChange(e);
                }
            }}
            {...props}
        />
    );
}