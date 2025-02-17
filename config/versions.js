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
            "no": [
                "The entire text should read as the following:",
                "While attacking a squadron, you may reroll 1 red die in your attack pool.",
                "While attacking a ship, if you have the bombard tag, you may reroll 1 red die in your attack pool.",
                "During your activation, while attacking the first squadron during an attack, you may exhaust this card to add 2 dice of any color to your attack pool. If you do, you may cannot declare additional squadron targets for this attack."
            ],
            "sb": [
                "At the end of the game, if you are within the enemy deployment zone, increase your score by 40 points; if you were destroyed, increase your opponents score by 15 points."
            ],
            "kn": [
                "Remove the \"printed\" qualifier from the text in the 2nd bullet point."
            ],
            "st": [
                "The entire text should read as the following:",
                "After you execute a maneuver, you may exhaust this card to choose an enemy ship at distance 1-3. You may look at the top command dial assigned to that ship. Then, you may either choose a new command on its top command dial or assign 1 raid token of your choice (that does not match the ship's top command dial).",
                "If the chosen ship has no top command dial, it gains 1 raid token of your choice.",
                "Remove non-recur icon, add recur icon."
            ],
            "lj": [
                "When you reveal a command, you may discard a [squadron] dial or token, and this card to choose 1 enemy ship at close range. If you do, you may look at all command dials assigned to that ship, then you may choose a new command for each of its command dials to be set to."
            ],
            "ma": [
                "Before deploying fleets, you may set aside a number of friendly squadrons up to your squadron value next to your ship card.",
                "When you reveal a command, you may discard this card. If you do, for each squadron set aside with this card, you may place it within distance 1-2 of you. It canot move during your activation."
            ],
            "pi": [
                "When deploying fleets, if you are in the play area, when you would deploy a squadron with SWARM, you may set that squadron aside next to your ship card instead. You may set aside up to 5 squadrons in this way.",
                "[Squadron]: For each squadron set aside with this card, you may place it within distance 1-3. During your activation, it cannot move and if it has AI it may increase its AI value by 1 during your activation."
            ],
            "ic": [
                "While a friendly ship is executing the first maneuver during its activation, in the Determine Course step, it may increase 1 yaw value by 1."
            ],
            "kr": [
                "Starts with 3 [squadron] tokens on this card.",
                "When a friendly ship at distance 1-5 resolves a [squadron] command, you may discard 1 [squadron] token from this card. If you do, that friendly ship may activate 1 additional squadron during that command."
            ],
            "nx": [
                "While defending, during the Spend Defense Tokens Step, you may discard a defense token to cancel 1 attack die."
            ],
            "sw": [
                "Once per activation, while attacking a ship, you may spend 1 shield from the attacking hull zone to change 1 die to any face without an [accuracy] icon."
            ],
            "sz": [
                "Add recur symbol"
            ],
            "ll": [
                "Replace the 2nd [offensive retrofit] icon with an [ordnance] icon"
            ]
        }
    },
    {
        id: 1,
        label: "ARC Core Playtesting",
        description: "Playtesting package for CORE members",
        roles: ["core"],
        pointDeltas: {},
        footnoteChanges: {
            "ta": ["+Rogue"],
            "ht": ["+Rogue"],
            "hl": ["+Rogue"],
            "tg": ["Added to CIS"],
            "gp": ["Added to CIS"],
            "tl": ["Added to CIS"]
        },
        enabledCards: [
            "th",
            "ti",
            "tk",
            "tl"
        ],
        disabledCards: [],
        textChanges: {}
    },
    {
        id: 2,
        label: "ARC Playtesting",
        description: "ARC Playtesting package",
        roles: ["core", "playtester"],
        pointDeltas: {
            "tg": -1
        },
        footnoteChanges: {
            "tl": ["Added to CIS"],
            "tg": ["Added to CIS"]
        },
        enabledCards: [
            "th",
            "ti",
            "tk",
            "tl",
            "tg"
        ],
        textChanges: {}
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