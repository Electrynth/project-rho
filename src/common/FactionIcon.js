import Image from 'next/image';
import rebelsSvgIcon from 'public/images/factions/rebelsIcon.svg';
import empireSvgIcon from 'public/images/factions/empireIcon.svg';
import republicSvgIcon from 'public/images/factions/republicIcon.svg';
import separatistsSvgIcon from 'public/images/factions/separatistsIcon.svg';
const imageLoader = require('loader.js');


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
            loader={imageLoader}
            {...props}
        />
    );
}

export default FactionIcon;