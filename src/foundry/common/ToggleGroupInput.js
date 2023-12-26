import { ToggleButton, ToggleButtonGroup } from '@mui/material';

export default function ToggleGroupInput({
    elementId,
    value,
    items,
    handleChange,
    orientation = 'horizontal',
    isExclusive = false,
    ...props
}) {
    return (
        <ToggleButtonGroup
            size="small"
            id={elementId}
            orientation={orientation}
            value={value}
            exclusive={isExclusive}
            onChange={handleChange}
            {...props}
        >
            {items.map(item => (
                <ToggleButton key={item.key ? item.key : item.label} value={item.value}>
                    {item.label}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
}