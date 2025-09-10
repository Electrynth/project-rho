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
        label: "ARC01",
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
            "tp",
            "tr",
            "ts",
            "tt",
            "tg"
        ],
        disabledCards: [],
        textChanges: {}
    },
    {
        id: 2,
        label: "ARC Playtesting",
        description: "Playtesting package for ARC playtesters.",
        roles: ["core", "playtester"],
        pointDeltas: {
            "no": -2,
            "nb": -1,
            "nc": -1,
            "nh": -1,
            "ad": -5,
            "it": 4,
            "hi": -3,
            "hk": -3,
            "ha": -2
        },
        footnoteChanges: {
            "nj": ["Lose Mod"],
            "ge": ["Adept 2->1"],
            "he": ["-Dodge 1"]
        },
        enabledCards: [
            "tp",
            "tr",
            "ts",
            "tt",
            "tg"
        ],
        disabledCards: [],
        textChanges: {
        }
    }
];

export default versions
