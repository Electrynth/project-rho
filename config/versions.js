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
        pointDeltas: {
            "in": -6,
            "hy": -2,
            "ii": -4,
            "il": 2,
            "io": -3
        },
        footnoteChanges: {

        },
        enabledCards: [
            "tp",
            "tr",
            "ts",
            "tt"
        ],
        disabledCards: [],
        textChanges: {
            "ii": [
                "The hull value of each friendly ship is increased according to its size class:",
                "Small ship: 1",
                "Medium ship: 2",
                "Large ship: 3",
                "Huge ship: 4"
            ],
            "il": ["Once per activation, while a friendly ship is attacking, it may spend 1 die to change a die to a face with a (crit) icon. That die cannot be rerolled."],
            "hz": ["After deploying fleets, place 2 round tokens on this card. At the start of the Ship Phase, during each round matching 1 of those tokens, each friendly ship may gain a number of command tokens equal to its command value."],
            "iq": ["After deploying fleets, place 2 round tokens on this card. At the start of the Ship Phase, during each round matching 1 of those tokens, each friendly ship may recover 1 of its discarded defense tokens."],
            "ig": [
                "When a friendly ship resolves the (evade) token effect, it can cancel 1 die at medium range or reroll 1 additional die at close range or distance 1.",
                "While a friendly ship is defending, it may spend (evade) tokens that the attacker targeted with an (accuracy) result."
            ],
            "kc": ["When a friendly ship resolves a command by spending a command dial, it may resolve that command as if it also spent a matching command token."],
            "hy": ["While a friendly ship is attacking a ship at distance 1 of a friendly squadron, the attacker may add 2 dice, each of any color. If it does, it must choose and cancel 2 attack dice."],
            "io": "After deploying fleets, place 1 defense token of each type on this card. At the start of each Ship Phase, you may discard 1 of those tokens. If you do, until the end of the round, if an enemy ship or squadron spends a matching token, discard that token."
        }
    },
    {
        id: 2,
        label: "ARC Playtesting",
        description: "ARC Playtesting package",
        roles: ["core", "playtester"],
        pointDeltas: {
            "in": -6,
            "hy": -2,
            "ii": -4,
            "il": 2,
            "io": -3
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
            "ii": [
                "The hull value of each friendly ship is increased according to its size class:",
                "Small ship: 1",
                "Medium ship: 2",
                "Large ship: 3",
                "Huge ship: 4"
            ],
            "il": ["Once per activation, while a friendly ship is attacking, it may spend 1 die to change a die to a face with a (crit) icon. That die cannot be rerolled."],
            "hz": ["After deploying fleets, place 2 round tokens on this card. At the start of the Ship Phase, during each round matching 1 of those tokens, each friendly ship may gain a number of command tokens equal to its command value."],
            "iq": ["After deploying fleets, place 2 round tokens on this card. At the start of the Ship Phase, during each round matching 1 of those tokens, each friendly ship may recover 1 of its discarded defense tokens."],
            "ig": [
                "When a friendly ship resolves the (evade) token effect, it can cancel 1 die at medium range or reroll 1 additional die at close range or distance 1.",
                "While a friendly ship is defending, it may spend (evade) tokens that the attacker targeted with an (accuracy) result."
            ],
            "kc": ["When a friendly ship resolves a command by spending a command dial, it may resolve that command as if it also spent a matching command token."],
            "hy": ["While a friendly ship is attacking a ship at distance 1 of a friendly squadron, the attacker may add 2 dice, each of any color. If it does, it must choose and cancel 2 attack dice."],
            "io": "After deploying fleets, place 1 defense token of each type on this card. At the start of each Ship Phase, you may discard 1 of those tokens. If you do, until the end of the round, if an enemy ship or squadron spends a matching token, discard that token."
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