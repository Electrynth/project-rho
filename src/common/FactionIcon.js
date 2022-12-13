import Image from 'next/image';
import rebelsSvgIcon from 'public/images/factions/rebelsIcon.svg';
import empireSvgIcon from 'public/images/factions/empireIcon.svg';
import republicSvgIcon from 'public/images/factions/republicIcon.svg';
import separatistsSvgIcon from 'public/images/factions/separatistsIcon.svg';

function FactionIcon({ faction, style, ...props }) {

    const factionToSrc = {
        rebels: rebelsSvgIcon,
        empire: empireSvgIcon,
        republic: republicSvgIcon,
        separatists: separatistsSvgIcon
    };
    if (!faction) return undefined;
    return (
        <Image
            title={faction}
            alt={faction}
            src={factionToSrc[faction]}
            style={{ ...style }}
            {...props}
        />
    );
}

export default FactionIcon;