import { useState } from 'react';

function DualHoverButton({
    buttonActions,
    hoverActions
}) {
    const [isHovered, setIsHovered] = useState(false);
    const buttonStyles = { borderRadius: 5 };
    const hoverStyles = { backgroundColor: 'rgba(255, 255, 255, 0.12)' };
    return (
        <div
            style={{ width: '100%' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered ? (
                <div onMouseLeave={() => setIsHovered(false)} style={{ ...buttonStyles, ...hoverStyles }}>
                    {hoverActions}
                </div>
            ) : (
                <div onMouseLeave={() => setIsHovered(false)} style={{ ...buttonStyles }}>
                    {buttonActions}
                </div>
            )}
        </div>
    );
}

export default DualHoverButton;