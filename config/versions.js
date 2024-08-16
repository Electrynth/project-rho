const versions = [
    {
        id: 0,
        label: "Official Game",
        description: "Current official points for organized play.",
        roles: ["everyone"],
        pointDeltas: {},
        omittedCards: [],
        enabledCards: []
    },
    {
        id: 1,
        label: "ARC Core Playtesting",
        description: "Playtesting package for Core members",
        roles: ["core"],
        pointDeltas: {},
        omittedCards: [],
        enabledCards: []
    },
    {
        id: 2,
        label: "ARC Playtesting",
        description: "Playtesting package v0.1",
        roles: ["core", "inner rim", "mid rim", "outer rim"],
        pointDeltas: {},
        omittedCards: [],
        enabledCards: []
    }
];

export default versions