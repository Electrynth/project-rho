import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput
} from '@mui/material';

export default function SelectorInput({
    elementId,
    label,
    items,
    value,
    handleChange,
    isMultiSelect = false,
    ...props
}) {
    return (
        <FormControl size="small" {...props}>
            <InputLabel id={`${elementId}-label`}>{label}</InputLabel>
            <Select
                multiple={isMultiSelect}
                label={label}
                labelId={`${elementId}-label`}
                id={elementId}
                value={value}
                input={<OutlinedInput label={label} />}
                onChange={handleChange}
            >
                {items.map(item => (
                    <MenuItem key={item.key ? item.key : item.label} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}