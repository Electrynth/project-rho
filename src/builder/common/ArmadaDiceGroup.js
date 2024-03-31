function ArmadaDie({ color }) {
    const colors = {
        red: '#b53633',
        blue: '#04adf0',
        black: '#24292b'
    };

    const dieStyles = {
        width: 9,
        height: 9,
        transform: 'rotate(45deg)',
        backgroundColor: colors[color]
    };
    return (
        <span
            style={dieStyles}
        />
    );
}

export default function ArmadaDiceGroup({ diceCounts, maxDicePerRow = 2 }) {
    

    let allDice = [];
    let numRedDice = diceCounts[0]
    let numBlueDice = diceCounts[1];
    let numBlackDice = diceCounts[2];
    for (let i = 0; i < numRedDice; i++) allDice.push('red');
    for (let i = 0; i < numBlueDice; i++) allDice.push('blue');
    for (let i = 0; i < numBlackDice; i++) allDice.push('black');


    let firstRow = [];
    let secondRow = [];
    if (allDice.length > maxDicePerRow) {
        let i = 0;
        for (; i < maxDicePerRow; i++) firstRow.push(<ArmadaDie color={allDice[i]} />)
        for (; i < allDice.length; i++) secondRow.push(<ArmadaDie color={allDice[i]} />)
    } else {
        firstRow = [[allDice.map((color, i) => (<ArmadaDie key={`${color}-${i}`} color={color} />))]]
    }


    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexFlow: 'column nowrap', justifyContent: 'center', alignItems: 'center', marginLeft: secondRow.length > 1 ? -6 : 0 }}>
            <div style={{ display: 'flex', flexFlow: 'row nowrap', gap: 7 }}>
                {allDice.length > 0 ? firstRow : <div style={{ color: 'black', fontSize: 48 }}>-</div>}
            </div>
            {secondRow.length > 0 ? (
                <div style={{ marginTop: 2, marginLeft: secondRow.length > 1 ? 16 : 0, display: 'flex', flexFlow: 'row nowrap', gap: 7 }}>
                    {secondRow}
                </div>
            ) : undefined}
        </div>
    )
}