function ArmadaDie({ sizeMultiplier, color }) {
    const colors = {
        red: '#b53633',
        blue: '#04adf0',
        black: '#24292b'
    };

    const dieStyles = {
        width: 9 * sizeMultiplier,
        height: 9 * sizeMultiplier,
        transform: 'rotate(45deg)',
        backgroundColor: colors[color]
    };
    return <span style={dieStyles} />;
}

export default function ArmadaDiceGroup({ sizeMultiplier, diceCounts, maxDicePerRow = 2 }) {
    

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
        for (; i < maxDicePerRow; i++) firstRow.push(<ArmadaDie sizeMultiplier={sizeMultiplier} color={allDice[i]} />)
        for (; i < allDice.length; i++) secondRow.push(<ArmadaDie sizeMultiplier={sizeMultiplier} color={allDice[i]} />)
    } else {
        firstRow = [[allDice.map((color, i) => (<ArmadaDie sizeMultiplier={sizeMultiplier} key={`${color}-${i}`} color={color} />))]]
    }


    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexFlow: 'column nowrap', justifyContent: 'center', alignItems: 'center', marginLeft: secondRow.length > 1 ? -6 * sizeMultiplier : 0 * sizeMultiplier }}>
            <div style={{ display: 'flex', flexFlow: 'row nowrap', gap: 7 * sizeMultiplier }}>
                {allDice.length > 0 ? firstRow : <div style={{ color: 'black', fontSize: 48 * sizeMultiplier }}>-</div>}
            </div>
            {secondRow.length > 0 ? (
                <div style={{ marginTop: 2 * sizeMultiplier, marginLeft: secondRow.length > 1 ? 16 * sizeMultiplier : 0 * sizeMultiplier, display: 'flex', flexFlow: 'row nowrap', gap: 6 * sizeMultiplier }}>
                    {secondRow}
                </div>
            ) : undefined}
        </div>
    )
}