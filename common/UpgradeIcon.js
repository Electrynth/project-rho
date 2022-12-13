import commander from '../public/images/upgrades/commander.svg';
import defensiveRetrofit from '../public/images/upgrades/defensive retrofit.svg';
import experimentalRetrofit from '../public/images/upgrades/experimental retrofit.svg';
import fleetCommand from '../public/images/upgrades/fleet command.svg';
import ionCannons from '../public/images/upgrades/ion cannons.svg';
import offensiveRetrofit from '../public/images/upgrades/offensive retrofit.svg';
import officer from '../public/images/upgrades/officer.svg';
import ordnance from '../public/images/upgrades/ordnance.svg';
import superWeapon from '../public/images/upgrades/super weapon.svg';
import supportTeam from '../public/images/upgrades/support team.svg';
import title from '../public/images/upgrades/title.svg';
import turbolasers from '../public/images/upgrades/turbolasers.svg';

function UpgradeIcon({ upgradeType, style, ...props }) {
    const upgradeTypeToSrc = {
        commander,
        'defensive retrofit': defensiveRetrofit,
        'experiemental retrofit': experimentalRetrofit,
        'fleet command': fleetCommand,
        'ion cannons': ionCannons,
        'offensive retrofit': offensiveRetrofit,
        officer,
        ordnance,
        'super weapon': superWeapon,
        'support team': supportTeam,
        title,
        turbolasers
    };
    return (
        <img
            title={upgradeType}
            alt={upgradeType}
            src={upgradeTypeToSrc[upgradeType]}
            style={{ borderRadius: '50%', backgroundColor: 'white', ...style }}
            {...props}
        />
    );
}

export default UpgradeIcon;