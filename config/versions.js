const versions = [
    {
        id: 0,
        label: "Official Game",
        description: "Current official points for organized play.",
        pointDeltas: {},
        omittedCards: []
    },
    {
        id: 1,
        label: "Retcon Open",
        description: "Removed all cards ONLY from wave 8.",
        pointDeltas: {},
        omittedCards: [
            'ie',
            'ip',
            'cf',
            'ci',
            'bg',
            'bh',
            'ka',
            'ki',
            'rg',
            'rs',
            'll',
            'ky',
            'lt',
            'lc',
            'nm'
        ]
    }
];

export default versions