import baseGeneric from 'public/images/templates/upgrade/base/generic base.png';
import rebelsCommander from 'public/images/templates/upgrade/base/commander rebels.png';
import empireCommander from 'public/images/templates/upgrade/base/commander empire.png';
import republicCommander from 'public/images/templates/upgrade/base/commander republic.png';
import separatistsCommander from 'public/images/templates/upgrade/base/commander separatists.png';

import rebelsUpgrade from 'public/images/templates/upgrade/template parts/rebels.png';
import empireUpgrade from 'public/images/templates/upgrade/template parts/empire.png';
import republicUpgrade from 'public/images/templates/upgrade/template parts/republic.png';
import separatistsUpgrade from 'public/images/templates/upgrade/template parts/separatists.png';
import exhaust from 'public/images/templates/upgrade/template parts/exhaust.png';
import red from 'public/images/templates/upgrade/template parts/red.png';
import blue from 'public/images/templates/upgrade/template parts/blue.png';
import blueCommander from 'public/images/templates/upgrade/template parts/blue commander.png';
import doubleSlot from 'public/images/templates/upgrade/template parts/double upgrade slot.png';
import titleSlot from 'public/images/templates/upgrade/template parts/title.png';

import commander from 'public/images/templates/upgrade/type icons/commander.png';
import title from 'public/images/templates/upgrade/type icons/title.png';
import officer from 'public/images/templates/upgrade/type icons/officer.png';
import weaponsTeam from 'public/images/templates/upgrade/type icons/weapons team.png';
import supportTeam from 'public/images/templates/upgrade/type icons/support team.png';
import offensiveRetrofit from 'public/images/templates/upgrade/type icons/offensive retrofit.png';
import defensiveRetrofit from 'public/images/templates/upgrade/type icons/defensive retrofit.png';
import ordnance from 'public/images/templates/upgrade/type icons/ordnance.png';
import ionCannons from 'public/images/templates/upgrade/type icons/ion cannon.png';
import turbolasers from 'public/images/templates/upgrade/type icons/turbolasers.png';
import fleetSupport from 'public/images/templates/upgrade/type icons/fleet support.png';
import fleetCommand from 'public/images/templates/upgrade/type icons/fleet command.png';
import experimentalRetrofit from 'public/images/templates/upgrade/type icons/experimental retrofit.png';
import superWeapon from 'public/images/templates/upgrade/type icons/super weapon.png';

import any from 'public/images/templates/command icons/any.png';
import anyDial from 'public/images/templates/command icons/any dial.png';
import conFire from 'public/images/templates/command icons/con fire.png';
import navigation from 'public/images/templates/command icons/navigation.png';
import squadron from 'public/images/templates/command icons/squadron.png';
import repair from 'public/images/templates/command icons/engineering.png';

import red1 from 'public/images/templates/upgrade/bar numbers/red1.png';
import red2 from 'public/images/templates/upgrade/bar numbers/red2.png';
import red3 from 'public/images/templates/upgrade/bar numbers/red3.png';
import red4 from 'public/images/templates/upgrade/bar numbers/red4.png';
import red5 from 'public/images/templates/upgrade/bar numbers/red5.png';
import red6 from 'public/images/templates/upgrade/bar numbers/red6.png';

import blue1 from 'public/images/templates/upgrade/bar numbers/blue1.png';
import blue2 from 'public/images/templates/upgrade/bar numbers/blue2.png';
import blue3 from 'public/images/templates/upgrade/bar numbers/blue3.png';
import blue4 from 'public/images/templates/upgrade/bar numbers/blue4.png';
import blue5 from 'public/images/templates/upgrade/bar numbers/blue5.png';
import blue6 from 'public/images/templates/upgrade/bar numbers/blue6.png';

import empireGenericSquad from 'public/images/templates/squadron/empire generic.png';
import empireAce0 from 'public/images/templates/squadron/empire ace0.png';
import empireAce1 from 'public/images/templates/squadron/rebels ace1.png';
import empireAce2 from 'public/images/templates/squadron/empire ace2.png';
import rebelsGenericSquad from 'public/images/templates/squadron/rebels generic.png';
import rebelsAce0 from 'public/images/templates/squadron/rebels ace0.png';
import rebelsAce1 from 'public/images/templates/squadron/rebels ace1.png';
import rebelsAce2 from 'public/images/templates/squadron/rebels ace2.png';
import republicGenericSquad from 'public/images/templates/squadron/republic generic.png';
import republicAce0 from 'public/images/templates/squadron/republic ace0.png';
import republicAce1 from 'public/images/templates/squadron/rebels ace1.png';
import republicAce2 from 'public/images/templates/squadron/republic ace2.png';
import separatistsGenericSquad from 'public/images/templates/squadron/separatists generic.png';
import separatistsAce0 from 'public/images/templates/squadron/separatists ace0.png';
import separatistsAce1 from 'public/images/templates/squadron/rebels ace1.png';
import separatistsAce2 from 'public/images/templates/squadron/separatists ace2.png';


const commandIcons = {
    'any token': any,
    'any dial': anyDial,
    'con fire': conFire,
    'repair': repair,
    'squadron': squadron,
    'navigation': navigation
};

const barNumbers = {
    red: [red1, red2, red3, red4, red5, red6],
    blue: [blue1, blue2, blue3, blue4, blue5, blue6]
};

const upgradeTypeItems = [
    { label: 'Commander', value: 'commander', icon: commander },
    { label: 'Title', value: 'title', icon: title },
    { label: 'Officer', value: 'officer', icon: officer },
    { label: 'Weapons Team', value: 'weapons team', icon: weaponsTeam },
    { label: 'Support Team', value: 'support team', icon: supportTeam },
    { label: 'Offensive Retrofit', value: 'offensive retrofit', icon: offensiveRetrofit },
    { label: 'Defensive Retrofit', value: 'defensive retrofit', icon: defensiveRetrofit },
    { label: 'Ordnance', value: 'ordnance', icon: ordnance },
    { label: 'Ion Cannons', value: 'ion cannons', icon: ionCannons },
    { label: 'Turbolasers', value: 'turbolasers', icon: turbolasers },
    { label: 'Fleet Support', value: 'fleet support', icon: fleetSupport },
    { label: 'Fleet Command', value: 'fleet command', icon: fleetCommand },
    { label: 'Experimental Retrofit', value: 'experimental retrofit', icon: experimentalRetrofit },
    { label: 'Super Weapon', value: 'super weapon', icon: superWeapon }
];

const upgradeTypeIcons = {
    'commander': commander,
    'title': title,
    'officer': officer,
    'weapons team': weaponsTeam,
    'support team': supportTeam,
    'offensive retrofit': offensiveRetrofit,
    'defensive retrofit': defensiveRetrofit,
    'ordnance': ordnance,
    'ion cannons': ionCannons,
    'turbolasers': turbolasers,
    'fleet support': fleetSupport,
    'fleet command': fleetCommand,
    'experimental retrofit': experimentalRetrofit,
    'super weapon': superWeapon
};

const squadronTemplateImages = {
    rebels: {
        generic: rebelsGenericSquad,
        ace0: rebelsAce0,
        ace1: rebelsAce1,
        ace2: rebelsAce2
    },
    empire: {
        generic: empireGenericSquad,
        ace0: empireAce0,
        ace1: empireAce1,
        ace2: empireAce2
    },
    republic: {
        generic: republicGenericSquad,
        ace0: republicAce0,
        ace1: republicAce1,
        ace2: republicAce2
    },
    separatists: {
        generic: separatistsGenericSquad,
        ace0: separatistsAce0,
        ace1: separatistsAce1,
        ace2: separatistsAce2
    }
};

const upgradeTemplateImages = {
    baseGeneric,
    rebelsUpgrade,
    rebelsCommander,
    empireUpgrade,
    empireCommander,
    republicUpgrade,
    republicCommander,
    separatistsUpgrade,
    separatistsCommander,
    exhaust,
    red,
    blue,
    blueCommander,
    doubleSlot,
    titleSlot
};

const armadaFontIcons = {
    '1 resource': '\u00A1',
    '2 resource': '\u00A2',
    '3 resource': '\u00A3',
    '4 resource': '\u00A4',
    '5 resource': '\u00A5',
    '6 resource': '\u00A6',
    'attack die': '\u0077',
    'unique dot': '\u0078',
    'assault objective': '\u003D',
    'defense objective': '\u003E',
    'navigation objective': '\u003C',
    '1 yaw': '\u0074',
    '2 yaw': '\u0075',
    '0 yaw': '\u0076',
    'grit': '\u0062',
    'counter': '\u0067',
    'heavy': '\u0068',
    'bomber': '\u0065',
    'escort': '\u0064',
    'rogue': '\u0063',
    'swarm': '\u0066',
    'snipe': '\u006D',
    'adept': '\u006E',
    'dodge': '\u006F',
    'intel': '\u0061',
    'cloak': '\u006A',
    'relay': '\u006B',
    'assault': '\u0069',
    'scout': '\u0070',
    'ai': '\u0071',
    'screen': '\u0072',
    'strategic': '\u006C',
    'fringe': '\u007B',
    'rebels': '\u005B',
    'empire': '\u005C',
    'republic': '\u007C',
    'separatists': '\u007D',
    'any dial': '\u0051',
    'any command': '\u0052',
    'nav raid': '\u0026',
    'con fire raid': '\u0028',
    'squad raid': '\u002A',
    'repair raid': '\u0029',
    'nav': '\u0037',
    'con fire': '\u0039',
    'squad': '\u0038',
    'repair': '\u0030',
    'brace': '\u0033',
    'redirect': '\u0032',
    'evade': '\u0034',
    'contain': '\u0035',
    'scatter': '\u0031',
    'salvo': '\u0036',
    'hit': '\u0053',
    'crit': '\u0054',
    'acc': '\u0055',
    'title': '\u0041',
    'commander': '\u0042',
    'officer': '\u0043',
    'turbolasers': '\u0044',
    'ion cannons': '\u0045',
    'ordnance': '\u0046',
    'offensive retrofit': '\u0047',
    'defensive retrofit': '\u0048',
    'experimental retrofit': '\u004C',
    'weapons team': '\u0049',
    'support team': '\u004A',
    'fleet support': '\u004B',
    'fleet command': '\u004D',
    'super weapon': '\u004E'
};

const armadaShipFontSizeFactor = {
    'Acclamator-class Assault Ship': .8,
    'Arquitens-class Cruiser': .9,
    'Assault Frigate Mark II': .6,
    'CR90 Corvette': .75,
    'Consular Cruiser': .65,
    'GR75 Transports': .9,
    'Gladiator-class Star Destroyer': .75,
    'Gozanti-class Cruisers': 0.9,
    'Hammerhead-class Corvette': 0.6,
    'Hardcell-class Transport': 0.8,
    'Imperial-class Star Destroyer': 1,
    'Interdictor': 1,
    'MC30c Frigate': 1,
    'MC75 Cruiser': .75,
    'MC80 Home One type': 1,
    'MC80 Liberty type': 1,
    'Modified Pelta-class Ship': .8,
    'Munificent-class Frigate': .9,
    'Nebulon Frigate': .65,
    'Onager-class Ship': .75,
    'Pelta-class Frigate': .8,
    'Providence-class Carrier': .7,
    'Quasar Fire-class Cruiser-Carrier': .8,
    'Raider-class Corvette': 1,
    'Recusant-class Destroyer': 1,
    'Starhawk Battlecruiser': .75,
    'Venator-class Star Destroyer': 1,
    'Victory-class Star Destroyer': .8
};

const armadaShipFontIcons = {
    'rebels': {
        'CR90 Corvette': '\u004E',
        'Nebulon Frigate': '\u004F',
        'Assault Frigate Mark II': '\u0050',
        'MC30c Frigate': '\u0051',
        'MC80 Home One type': '\u0052',
        'MC80 Liberty type': '\u0054',
        'GR75 Transports': '\u0053',
        'Modified Pelta-class Ship': '\u0055',
        'Hammerhead-class Corvette': '\u0056',
        'MC75 Cruiser': '\u0057',
        'Starhawk Battlecruiser': '\u0058'
    },
    'empire': {
        'Victory-class Star Destroyer': '\u0041',
        'Gladiator-class Star Destroyer': '\u0042',
        'Imperial-class Star Destroyer': '\u0043',
        'Raider-class Corvette': '\u0044',
        'Gozanti-class Cruisers': '\u0045',
        'Interdictor': '\u0046',
        'Arquitens-class Cruiser': '\u0047',
        'Quasar Fire-class Cruiser-Carrier': '\u0048',
        'Onager-class Ship': '\u004A'
    },
    'republic': {
        'Consular Cruiser': '\u0061',
        'Acclamator-class Assault Ship': '\u0062',
        'Venator-class Star Destroyer': '\u0063',
        'Pelta-class Frigate': '\u0064'
    },
    'separatists': {
        'Munificent-class Frigate': '\u006E',
        'Hardcell-class Transport': '\u006F',
        'Providence-class Carrier': '\u0070',
        'Recusant-class Destroyer': '\u0071'
    }
};

const armadaShipIconOffset = {
    'CR90 Corvette': 0,
    'Nebulon Frigate': -2,
    'Assault Frigate Mark II': -1,
    'MC30c Frigate': -2,
    'MC80 Home One type': -1,
    'MC80 Liberty type': -2,
    'GR75 Transports': -2,
    'Modified Pelta-class Ship': 0,
    'Hammerhead-class Corvette': -1,
    'MC75 Cruiser': -1,
    'Starhawk Battlecruiser': -4,

    'Victory-class Star Destroyer': -1,
    'Gladiator-class Star Destroyer': -1,
    'Imperial-class Star Destroyer': -1,
    'Raider-class Corvette': -2,
    'Gozanti-class Cruisers': -3,
    'Interdictor': 2,
    'Arquitens-class Cruiser': 1,
    'Quasar Fire-class Cruiser-Carrier': -3,
    'Onager-class Ship': -3,

    'Consular Cruiser': -2,
    'Acclamator-class Assault Ship': 0,
    'Venator-class Star Destroyer': -2,
    'Pelta-class Frigate': -4,

    'Munificent-class Frigate': 0,
    'Hardcell-class Transport': -2,
    'Providence-class Carrier': -3,
    'Recusant-class Destroyer': -6
};

const armadaSquadronFontIcons = {
    'Vulture Squadron': '\u0021',
    'Belbullab-22 Squadron': '\u0023',
    'Tri-fighter Squadron': '\u0024',
    'V-19 Torrent Squadron': '\u0030',
    'Delta-7 Aethersprite Squadron': '\u0031',
    'BTL-B Y-Wing Squadron': '\u0032',
    'ARC-170 Squadron': '\u0033',
    'Hyena Squadron': '\u0040',
    'TIE Fighter Squadron': '\u0041',
    'TIE Advanced Squadron': '\u0042',
    'TIE Bomber Squadron': '\u0043',
    'TIE Interceptor Squadron': '\u0044',
    'Firespray-31': '\u0045',
    'Aggressor Assault Fighter': '\u0046',
    'JumpMaster 5000': '\u0047',
    'YV-666': '\u0048',
    'TIE Defender Squadron': '\u0049',
    'TIE Phantom Squadron': '\u004A',
    'Lambda Shuttle': '\u004B',
    'VT-49 Decimator': '\u004C',
    'Mandalorian Gauntlet Fighter': '\u004D',
    'X-Wing Squadron': '\u0061',
    'A-Wing Squadron': '\u0062',
    'B-Wing Squadron': '\u0063',
    'Y-Wing Squadron': '\u0064',
    'YT-1300': '\u0065',
    'YT-2400': '\u0066',
    'Scurrg H-6 Bomber': '\u0067',
    'HWK-290': '\u0068',
    'VCX-100 Freighter': '\u0069',
    'Lancer Pursuit Craft': '\u006A',
    'Z-95 Headhunter Squadron': '\u006B',
    'E-Wing Squadron': '\u006C'
};

const armadaSquadronFontSizeFactor = {
    'Vulture Squadron': 1.2,
    'Belbullab-22 Squadron': 1.1,
    'Tri-fighter Squadron': 1,
    'V-19 Torrent Squadron': 2,
    'Delta-7 Aethersprite Squadron': 1,
    'BTL-B Y-Wing Squadron': 1,
    'ARC-170 Squadron': 1.1,
    'Hyena Squadron': 1.2,
    'TIE Fighter Squadron': 1,
    'TIE Advanced Squadron': 1,
    'TIE Bomber Squadron': 1,
    'TIE Interceptor Squadron': 1,
    'Firespray-31': 1.1,
    'Aggressor Assault Fighter': 1.2,
    'JumpMaster 5000': 1.1,
    'YV-666': 1.1,
    'TIE Defender Squadron': 1,
    'TIE Phantom Squadron': 1,
    'Lambda Shuttle': 1,
    'VT-49 Decimator': 1.15,
    'Mandalorian Gauntlet Fighter': 1,
    'X-Wing Squadron': 1.1,
    'A-Wing Squadron': 1.1,
    'B-Wing Squadron': 1.25,
    'Y-Wing Squadron': 1.1,
    'YT-1300': 1.1,
    'YT-2400': 1.2,
    'Scurrg H-6 Bomber': 1,
    'HWK-290': 1.1,
    'VCX-100 Freighter': 1,
    'Lancer Pursuit Craft': 1,
    'Z-95 Headhunter Squadron': 1.1,
    'E-Wing Squadron': 1.1
};

const armadaSquadronIconOffset = {
    'Vulture Squadron': -5,
    'Belbullab-22 Squadron': 0,
    'Tri-fighter Squadron': 0,
    'V-19 Torrent Squadron': 1,
    'Delta-7 Aethersprite Squadron': 0,
    'BTL-B Y-Wing Squadron': 0,
    'ARC-170 Squadron': -4,
    'Hyena Squadron': -6,
    'TIE Fighter Squadron': 0,
    'TIE Advanced Squadron': 0,
    'TIE Bomber Squadron': 0,
    'TIE Interceptor Squadron': 0,
    'Firespray-31': -1,
    'Aggressor Assault Fighter': -2,
    'JumpMaster 5000': -2,
    'YV-666': 0,
    'TIE Defender Squadron': 0,
    'TIE Phantom Squadron': 0,
    'Lambda Shuttle': -3,
    'VT-49 Decimator': -1,
    'Mandalorian Gauntlet Fighter': 0,
    'X-Wing Squadron': 2,
    'A-Wing Squadron': -2,
    'B-Wing Squadron': 0,
    'Y-Wing Squadron': 0,
    'YT-1300': 0,
    'YT-2400': 0,
    'Scurrg H-6 Bomber': 0,
    'HWK-290': -1,
    'VCX-100 Freighter': 0,
    'Lancer Pursuit Craft': 0,
    'Z-95 Headhunter Squadron': 0,
    'E-Wing Squadron': -1
};

const checkIsMatch = (object, source) => {
    let matchingProperties = 0;

    for (const [key, value] of Object.entries(object)) {
        try {
            if (key in source && source[key].includes(value)) matchingProperties += 1;
        } catch (e) {
            if (key in source && source[key] === value) matchingProperties += 1;
        }
    }
    if (matchingProperties === Object.keys(object).length) return true;
    else return false;
}

const isUpgradeRequirementsMet = (requirements, shipCard) => {
    if (requirements instanceof Array) {
        const operator = requirements[0];
        if (operator instanceof Object) {
            // requirements: [{cardName: 'Whatever'}]
            return checkIsMatch(operator, shipCard);
        } else if (operator === 'NOT') {
            let operand = requirements[1];
            if (operand instanceof Array) {
                // requirements: ['NOT', [...]]
                operand = isUpgradeRequirementsMet(operand, shipCard);
            } else {
                // requirements: ['NOT', {cardName: 'Whatever'}]
                return !checkIsMatch(operand, shipCard);
            }
        } else if (operator === 'AND' || operator === 'OR') {
            let leftOperand = requirements[1];
            let rightOperand = requirements[2];
            if (leftOperand instanceof Array) {
                leftOperand = isUpgradeRequirementsMet(leftOperand, shipCard);
            } else if (leftOperand instanceof Object) {
                leftOperand = checkIsMatch(leftOperand, shipCard);
            }
            if (rightOperand instanceof Array) {
                rightOperand = isUpgradeRequirementsMet(rightOperand, shipCard);
            } else if (rightOperand instanceof Object) {
                rightOperand = checkIsMatch(rightOperand, shipCard);
            }
            if (operator === 'OR') {
                // requirements: ['OR', {cardName: 'Whatever'}, {cardType: 'Whatever'}]
                return leftOperand || rightOperand
            } else { // operator === 'AND'
                // requirements: ['AND', {cardName: 'Whatever'}, {cardType: 'Whatever'}]
                return leftOperand && rightOperand;
            }
        } else {
            // Empty array of requirements
            return true;
        }
    } else {
        // requirements: {cardName: 'Whatever'}
        return checkIsMatch(requirements, shipCard);
    }
}

export {
    isUpgradeRequirementsMet,
    armadaShipFontSizeFactor,
    armadaSquadronFontSizeFactor,
    armadaSquadronIconOffset,
    armadaShipFontIcons,
    armadaShipIconOffset,
    armadaSquadronFontIcons,
    commandIcons,
    barNumbers,
    upgradeTypeIcons,
    upgradeTypeItems,
    armadaFontIcons,
    upgradeTemplateImages,
    squadronTemplateImages
}