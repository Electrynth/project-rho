function ArmadaDie({ sizeMultiplier, color }) {
    const colors = {
        red: '#b21d22',
        blue: '#00b0ef',
        black: '#000'
    };

    const dieStyles = {
        width: 9 * sizeMultiplier,
        height: 9 * sizeMultiplier,
        margin: 1,
        transform: 'rotate(45deg)',
        backgroundColor: colors[color]
    };
    return <span style={dieStyles} />;
}

export default function ArmadaDiceGroup({ sizeMultiplier, diceCounts }) {
    

    let allDice = [];
    let numRedDice = diceCounts[0]
    let numBlueDice = diceCounts[1];
    let numBlackDice = diceCounts[2];
    for (let i = 0; i < numBlackDice; i++) allDice.push('black');
    for (let i = 0; i < numBlueDice; i++) allDice.push('blue');
    for (let i = 0; i < numRedDice; i++) allDice.push('red');

    const numDiceInFirstRow = allDice.length > 2 ? allDice.length / 2 : 2;

    let firstRow = [];
    let secondRow = [];
    if (allDice.length > numDiceInFirstRow) {
        let i = 0;
        for (; i < numDiceInFirstRow; i++) {
            firstRow.push(
                <ArmadaDie color={allDice[i]} sizeMultiplier={sizeMultiplier} />
            );
        }
        for (; i < allDice.length; i++) {
            secondRow.push(
                <ArmadaDie color={allDice[i]} sizeMultiplier={sizeMultiplier} />
            );
        }
    } else {
        firstRow = [[
            allDice.map((color, i) => (
                <ArmadaDie key={`${color}-${i}`} color={color} sizeMultiplier={sizeMultiplier} />
            ))
        ]]
    }


    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexFlow: 'column nowrap', justifyContent: 'center', alignItems: 'center', marginLeft: secondRow.length > 1 ? -5.5 * sizeMultiplier : 0}}>
            <div style={{ display: 'flex', flexFlow: 'row nowrap', gap: 5 * sizeMultiplier }}>
                {allDice.length > 0 ? (
                    firstRow
                ) : (
                    <div style={{ color: 'black', marginBottom: 4 * sizeMultiplier, fontSize: 48 * sizeMultiplier }}>
                        -
                    </div>
                )}
            </div>
            {secondRow.length > 0 ? (
                <div style={{ marginTop: 0.75 * sizeMultiplier, marginLeft: firstRow.length === secondRow.length ? 16 * sizeMultiplier : 0.25 * sizeMultiplier, display: 'flex', flexFlow: 'row nowrap', gap: 5 * sizeMultiplier }}>
                    {secondRow}
                </div>
            ) : undefined}
        </div>
    )
}