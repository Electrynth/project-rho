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
            "in": -6,
            "hy": -2,
            "ii": -4,
            "il": 2,
            "io": -3,
            "sv": 2,
            "eu": -2,
            "fw": -2,
            "tg": -2,
            "br": -8,
            "bu": -3,
            "bm": -4,
            "cn": -5
        },
        footnoteChanges: {
            "fb": ["-Escort", "+Rogue"],
            "gd": ["-Escort", "+Screen"]
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
            "ii": [
                "The hull value of each friendly ship is increased according to its size class:",
                "Small ship: 1",
                "Medium ship: 2",
                "Large ship: 3"
            ],
            "il": ["Once per activation, while a friendly ship is attacking, it may spend 1 die to change a die to a face with a (crit) icon. That die cannot be rerolled."],
            "hz": ["After deploying fleets, place 2 round tokens on this card. At the start of the Ship Phase, during each round matching 1 of those tokens, each friendly ship may gain a number of command tokens equal to its command value."],
            "iq": ["After deploying fleets, place 2 round tokens on this card. At the start of the Ship Phase, during each round matching 1 of those tokens, each friendly ship may recover 1 of its discarded defense tokens."],
            "ig": [
                "When a friendly ship resolves the (evade) token effect, it can cancel 1 die at medium range or reroll 1 additional die at close range or distance 1.",
                "While a friendly ship is defending at close-medium range, it may spend (evade) tokens that the attacker targeted with an (accuracy) result."
            ],
            "if": ["When a friendly ship resolves a command by spending a command dial, it may resolve that command as if it also spent a matching command token."],
            "hy": ["While a friendly ship is attacking a ship at distance 1 of a friendly squadron, the attacker may add 2 dice, each of any color. If it does, it must choose and cancel 2 attack dice."],
            "io": ["After deploying fleets, place 1 defense token of each type on this card. At the start of each Ship Phase, you may discard 1 of those tokens. If you do, until the end of the round, if an enemy ship or squadron spends a matching token, discard that token."],
            "sv": [
                "You must choose 2 types of command tokens for this card (6).",
                "After an enemy ship resolves a command, you may discard a matching command token from this card. If you do, that enemy ship gains 1 matching raid token.",
                "While a friendly squadron is attacking, if it is at distance 1-2 of an enemy ship with at least 1 raid token, it may reroll 1 die."
            ]
        }
    },
    {
        id: 2,
        label: "ARC Playtesting",
        description: "Playtesting package for ARC playtesters.",
        roles: ["core", "playtester"],
        pointDeltas: {
            "in": -6,
            "hy": -2,
            "ii": -4,
            "il": 2,
            "io": -3,
            "sv": 2,
            "eu": -2,
            "fw": -2,
            "tg": -2,
            "br": -8,
            "bu": -3,
            "bm": -4,
            "cn": -5
        },
        footnoteChanges: {
            "fb": ["-Escort", "+Rogue"],
            "gd": ["-Escort", "+Screen"]
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
            "ii": [
                "The hull value of each friendly ship is increased according to its size class:",
                "Small ship: 1",
                "Medium ship: 2",
                "Large ship: 3"
            ],
            "il": ["Once per activation, while a friendly ship is attacking, it may spend 1 die to change a die to a face with a (crit) icon. That die cannot be rerolled."],
            "hz": ["After deploying fleets, place 2 round tokens on this card. At the start of the Ship Phase, during each round matching 1 of those tokens, each friendly ship may gain a number of command tokens equal to its command value."],
            "iq": ["After deploying fleets, place 2 round tokens on this card. At the start of the Ship Phase, during each round matching 1 of those tokens, each friendly ship may recover 1 of its discarded defense tokens."],
            "ig": [
                "When a friendly ship resolves the (evade) token effect, it can cancel 1 die at medium range or reroll 1 additional die at close range or distance 1.",
                "While a friendly ship is defending at close-medium range, it may spend (evade) tokens that the attacker targeted with an (accuracy) result."
            ],
            "if": ["When a friendly ship resolves a command by spending a command dial, it may resolve that command as if it also spent a matching command token."],
            "hy": ["While a friendly ship is attacking a ship at distance 1 of a friendly squadron, the attacker may add 2 dice, each of any color. If it does, it must choose and cancel 2 attack dice."],
            "io": ["After deploying fleets, place 1 defense token of each type on this card. At the start of each Ship Phase, you may discard 1 of those tokens. If you do, until the end of the round, if an enemy ship or squadron spends a matching token, discard that token."],
            "sv": [
                "You must choose 2 types of command tokens for this card (6).",
                "After an enemy ship resolves a command, you may discard a matching command token from this card. If you do, that enemy ship gains 1 matching raid token.",
                "While a friendly squadron is attacking, if it is at distance 1-2 of an enemy ship with at least 1 raid token, it may reroll 1 die."
            ]
        }
    }
];

export default versions