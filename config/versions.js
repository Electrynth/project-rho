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
        label: "Official Game",
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
        description: "Playtesting package for CORE members",
        roles: ["core"],
        pointDeltas: {},
        footnoteChanges: {
            
        },
        enabledCards: [
            "tp",
            "tq",
            "tr",
            "ts"
        ],
        disabledCards: [],
        textChanges: {
            
        }
    },
    {
        id: 2,
        label: "ARC Playtesting",
        description: "ARC Playtesting package",
        roles: ["core", "playtester"],
        pointDeltas: {

        },
        footnoteChanges: {
            
        },
        enabledCards: [
            "tp",
            "tr",
            "ts",
            "tt"
        ],
        disabledCards: [

        ],
        textChanges: {
            
        }
    },
    {
        id: 3,
        label: "ARC Open Beta Tournament",
        description: "The primary goal for this tournament is to give the community a fun way to pass the time while we wall wait for the last AMG update. This tournament also will help ARC perform a few fact-finding missions on complicated topics.",
        roles: ["everyone"],
        enabledCards: ["tn"],
        disabledCards: ["no"],
        footnoteChanges: {},
        textChanges: {
            "il": ["Admiral Screed should now read: Once per activation, when a friendly ship is attacking, it may spend 1 die to change a die to a face with a [crit] icon. That die cannot be rerolled."],
            "tn": ["Change faction to: Galactic Republic or Separatists only."],
            "ld": ["Ordnance Experts should now read: While attacking, you may reroll any number of your black dice."],
            "dg": ["A player may only score a maximum of 6 tokens more than their opponent (90pts)."],
            "cp": ["A player may only score a maximum of 9 tokens more than their opponent (90pts)."],
            "du": ["A player may only score a maximum of 6 tokens more than their opponent (90pts)."],
            "dx": ["A player may only score a maximum of 6 tokens more than their opponent (90pts)."],
            "dq": ["Each player may only choose a non-flotilla ship to be an objective ship."],
            "cv": ["The second player may only choose non-flotilla ships to be an objective ship."],
            "co": ["The first player may only choose one of their non-flotilla ships to be an objective ship. The second player may only choose one of their non-flotilla ships to be an objective ship."]
        },
        pointDeltas: {
            "qf": 4,
            "gc": 4,
            "mt": -4,
            "mx": -2,
            "sw": 2,
            "ng": 2,
            "lq": 2
        }
    }
];

export default versions