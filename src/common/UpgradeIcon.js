import Image from 'next/image';
import commander from 'public/images/upgrades/commander.jpg';
import defensiveRetrofit from 'public/images/upgrades/defensiveRetrofit.jpg';
import experimentalRetrofit from 'public/images/upgrades/experimentalRetrofit.jpg';
import fleetCommand from 'public/images/upgrades/fleetCommand.jpg';
import fleetSupport from 'public/images/upgrades/fleetSupport.jpg';
import ionCannons from 'public/images/upgrades/ionCannons.jpg';
import offensiveRetrofit from 'public/images/upgrades/offensiveRetrofit.jpg';
import officer from 'public/images/upgrades/officer.jpg';
import ordnance from 'public/images/upgrades/ordnance.jpg';
import superWeapon from 'public/images/upgrades/superWeapon.jpg';
import supportTeam from 'public/images/upgrades/supportTeam.jpg';
import title from 'public/images/upgrades/title.jpg';
import turbolasers from 'public/images/upgrades/turbolasers.jpg';
import weaponsTeam from 'public/images/upgrades/weaponsTeam.jpg';


function UpgradeIcon({ upgradeType, style, ...props }) {
    const upgradeTypeToSrc = {
        commander,
        'defensive retrofit': defensiveRetrofit,
        'experimental retrofit': experimentalRetrofit,
        'fleet command': fleetCommand,
        'fleet support': fleetSupport,
        'ion cannons': ionCannons,
        'offensive retrofit': offensiveRetrofit,
        officer,
        ordnance,
        'super weapon': superWeapon,
        'support team': supportTeam,
        title,
        turbolasers,
        'weapons team': weaponsTeam
    };
    return (
        <Image
            title={upgradeType}
            alt={upgradeType}
            src={upgradeTypeToSrc[upgradeType]}
            style={{ ...style, borderRadius: 50 }}
            {...props}
        />
    );
}

export default UpgradeIcon;