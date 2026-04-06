/*
    roles are the groups that have access to the version
    pointDeltas are cards that get a point change { "<card id>: <point delta>" }
    enabledCards overrides the "hidden" attribute on cards
    disabledCards hides cards
    footnoteChanges adds text chips at the bottom of cards { "<card id>": ["Text1", "Text2", etc...] }
    textChanges adds a chip button that brings up a popup with the new text { "<card id": ["New Text1", "New Text2", etc...] }
*/

const versions = [
    {
        id: 0,
        label: "ARC02",
        description: "Current official ruleset for organized play.",
        roles: ["everyone"],
        pointDeltas: {},
        footnoteChanges: {},
        enabledCards: [],
        disabledCards: [],
        textChanges: {
            
        }
    },
    {
        id: 1,
        label: "ARC Core Playtesting",
        description: "Playtesting package for Core Executive members",
        roles: ["core"],
        pointDeltas: {
        },
        footnoteChanges: {
        },
        enabledCards: [
        ],
        disabledCards: [],
        textChanges: {
        }
    },
    {
        id: 2,
        label: "ARC Playtesting",
        description: "Playtesting package for ARC playtesters.",
        roles: ["core", "playtester"],
        pointDeltas: {
            "am": -2,
            "an": -2,
            "ao": -5,
            "ts": -5,
            "al": -2,
            "tr": -2,
            "sy": -1,
            "hh": -2,
            "iu": -4,
            "iz": -2,
            "kl": -3,
            "kn": -2,
            "ji": 1,
        },
        footnoteChanges: {
            
        },
        enabledCards: [
        ],
        disabledCards: [],
        textChanges: {
        }
    }
];

export default versions
