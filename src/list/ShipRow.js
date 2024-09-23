import Image from 'next/image';
import { Button, Divider } from '@mui/material';
import {
    Add,
    ContentCopy,
    Search,
    Clear,
    SwapHoriz,
    KeyboardArrowUp,
    KeyboardArrowDown
} from '@mui/icons-material';
import DualHoverButton from 'src/common/DualHoverButton';
import cards from 'config/cards';
import robotoCondensed from 'config/font';
import versions from 'config/versions';
import UpgradeIcon from 'src/common/UpgradeIcon';

function ShipRow({
    index,
    version = 1,
    ship,
    ships,
    commander,
    removeShip,
    copyShip,
    removeUpgrade,
    setEligibleUpgradesToAdd,
    handleSetZoomOnCard,
    shiftShipInList
}) {
    const shipCard = cards.cardsById[ship.id];
    let upgradePoints = 0;

    for (let i = 0; i < ship.upgradesEquipped.length; i++) {
        const upgrade = ship.upgradesEquipped[i];
        if (upgrade.id && upgrade.id !== true) upgradePoints += cards.cardsById[upgrade.id].points;
    }

    return (
        <div style={{ display: 'flex', flexFlow: 'column nowrap', position: 'relative' }}>
            <DualHoverButton
                buttonActions={(
                    <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
                        <div
                            style={{
                                overflow: 'hidden',
                                width: 80,
                                height: 40,
                                borderRadius: 5,
                                marginRight: 6
                            }}
                        >
                            <Image
                                src={cards.getCardImageUrl(shipCard.imageName ? shipCard.imageName : shipCard.cardName, 'ship')}
                                width={240}
                                height={412}
                                alt={shipCard.cardName}
                                style={{ margin: '-113px 0px 0px -80px', transform: 'scale(0.45)' }}
                            />
                        </div>
                        <div style={{ fontWeight: 300 }}>{shipCard.displayName ? shipCard.displayName : shipCard.cardName}</div>
                        <span style={{ flexGrow: 1 }} />
                        <div style={{ marginRight: 8 }}>
                            {shipCard.id in versions[version].pointDeltas ? shipCard.points + versions[version].pointDeltas[shipCard.id] : shipCard.points}
                        </div>
                    </div>
                )}
                hoverActions={(
                    <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, .12)' }}>
                        <div
                            style={{
                                overflow: 'hidden',
                                width: 80,
                                height: 40,
                                borderRadius: 5,
                                marginRight: 6
                            }}
                            onClick={() => handleSetZoomOnCard(shipCard.id)}
                        >
                            <Search
                                style={{ zIndex: 1, marginLeft: 30, marginTop: 10, position: 'absolute', cursor: 'pointer' }}
                            />
                            <Image
                                src={cards.getCardImageUrl(shipCard.imageName ? shipCard.imageName : shipCard.cardName, 'ship')}
                                width={240}
                                height={412}
                                alt={shipCard.cardName}
                                style={{ margin: '-113px 0px 0px -80px', transform: 'scale(0.45)', opacity: '0.5', cursor: 'pointer' }}
                            />
                        </div>
                        <div style={{ fontWeight: 300 }}>{shipCard.displayName ? shipCard.displayName : shipCard.cardName}</div>
                        <span style={{ flexGrow: 1 }} />
                        <div style={{ marginRight: 2, display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
                            {index > 0 && (
                                <KeyboardArrowUp
                                    fontSize="small"
                                    style={{ marginRight: 2, cursor: 'pointer' }}
                                    onClick={() => shiftShipInList(index, -1)}
                                />
                            )}
                            {index < ships.length && (
                                <KeyboardArrowDown
                                    fontSize="small"
                                    style={{ marginRight: 2, cursor: 'pointer' }}
                                    onClick={() => shiftShipInList(index, 1)}
                                />
                            )}
                            <ContentCopy
                                fontSize="small"
                                style={{ marginRight: 4, cursor: 'pointer' }}
                                onClick={() => copyShip(index)}
                            />
                            <Clear
                                onClick={() => removeShip(index)}
                                style={{ marginRight: 2, cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                )}
            />
            <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
                {ship.upgradesEquipped.map((upgrade, i) => {
                    if (!upgrade.id || upgrade.id === true) return undefined;
                    const upgradeCard = cards.cardsById[upgrade.id];
                    const canBeSwapped = !(upgradeCard.upgradeSlots.length > 1 || upgradeCard.addsUpgradeSlot);
                    return (
                        <div key={`${upgrade.id}_${i}`} style={{ display: 'flex', position: 'relative', flexFlow: 'row nowrap', marginTop: 4 }}>
                            <span style={{ minWidth: 15 }} />
                            <UpgradeIcon
                                key={`${upgrade.upgradeType}_${i}`}
                                upgradeType={upgrade.upgradeType}
                                style={{
                                    height: 22.5,
                                    width: 22.5,
                                    zIndex: 1,
                                    marginTop: 9,
                                    marginLeft: 0,
                                    position: 'absolute'
                                }}
                            />
                            <DualHoverButton
                                buttonActions={(
                                    <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
                                        <div
                                            style={{
                                                overflow: 'hidden',
                                                width: 65,
                                                height: 40,
                                                borderRadius: 5,
                                                marginRight: 6
                                            }}
                                        >
                                            <Image
                                                src={cards.getCardImageUrl(upgradeCard.imageName ? upgradeCard.imageName : upgradeCard.cardName, 'upgrade')}
                                                width={180}
                                                height={259}
                                                alt={upgradeCard.cardName}
                                                style={{ margin: '-75px 0px 0px -60px', transform: 'scale(0.45)' }}
                                            />
                                        </div>
                                        <div style={{ fontWeight: 300 }}>{upgradeCard.displayName ? upgradeCard.displayName : upgradeCard.cardName}</div>
                                        <span style={{ flexGrow: 1 }} />
                                        <div style={{ marginRight: 8 }}>
                                            {upgradeCard.id in versions[version].pointDeltas ? upgradeCard.points + versions[version].pointDeltas[upgradeCard.id] : upgradeCard.points}
                                        </div>
                                    </div>
                                )}
                                hoverActions={(
                                    <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, .12)' }}>
                                        <div
                                            style={{
                                                overflow: 'hidden',
                                                width: 65,
                                                height: 40,
                                                borderRadius: 5,
                                                marginRight: 6
                                            }}
                                            onClick={() => handleSetZoomOnCard(upgradeCard.id)}
                                        >
                                            <Search
                                                style={{ zIndex: 1, marginLeft: 22.5, marginTop: 10, position: 'absolute', cursor: 'pointer' }}
                                            />
                                            <Image
                                                src={cards.getCardImageUrl(upgradeCard.imageName ? upgradeCard.imageName : upgradeCard.cardName, 'upgrade')}
                                                width={180}
                                                height={259}
                                                alt={upgradeCard.cardName}
                                                style={{ margin: '-75px 0px 0px -60px', transform: 'scale(0.45)', opacity: '0.5', cursor: 'pointer' }}
                                            />
                                        </div>
                                        <div style={{ fontWeight: 300 }}>{upgradeCard.cardName}</div>
                                        <span style={{ flexGrow: 1 }} />
                                        <div style={{ marginRight: 2, display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
                                            {false ? (
                                                <SwapHoriz
                                                    style={{ marginRight: 4, cursor: 'pointer' }}
                                                />
                                            ) : undefined}
                                            <Clear
                                                onClick={() => removeUpgrade(index, i)}
                                                style={{ marginRight: 2, cursor: 'pointer' }}
                                            />
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                    );
                })}
            </div>
            <div style={{ display: 'flex', flexFlow: 'row nowrap', marginTop: 4 }}>
                <span style={{ minWidth: 15 }} />
                <DualHoverButton
                    buttonActions={(
                        <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
                            <Button
                                disableRipple
                                disableElevation
                                variant="contained"
                                style={{ height: 40 }}
                            >
                                <Add />
                                <div
                                    className={robotoCondensed.className}
                                    style={{ width: 110, marginLeft: 0, position: 'absolute', left: 60 }}
                                >
                                    Add Upgrade
                                </div>
                            </Button>
                            <div style={{ flexGrow: 1 }} />
                            {upgradePoints > 0 ? (
                                <div
                                    style={{ marginRight: 4, border: '1px solid', borderRadius: 5, borderColor: 'rgba(238, 238, 238, 0.5)', padding: 1 }}
                                >
                                    <div className={robotoCondensed.className} style={{ paddingLeft: 2, paddingRight: 2 }}>
                                        {shipCard.points + upgradePoints}
                                    </div>
                                </div>
                            ) : undefined}
                        </div>
                    )}
                    hoverActions={(
                        <div style={{ display: 'flex', flexFlow: 'row nowrap', height: 40, alignItems: 'center', padding: 5, borderRadius: 5, backgroundColor: 'rgba(0, 0, 0, .12)' }}>
                            {ship.upgradesEquipped.map((upgrade, i) => {

                                if (upgrade.id === true || upgrade.upgradeType === 'commander' && commander !== '') {
                                    return (
                                        <UpgradeIcon
                                            key={`${upgrade.upgradeType}_${i}`}
                                            upgradeType={upgrade.upgradeType}
                                            style={{
                                                height: 25,
                                                width: 25,
                                                margin: '0px 2px',
                                                marginTop: 2,
                                                opacity: 0.1
                                            }}
                                        />
                                    );
                                } else {
                                    return (
                                        <UpgradeIcon
                                            key={`${upgrade.upgradeType}_${i}`}
                                            upgradeType={upgrade.upgradeType}
                                            style={{
                                                height: 25,
                                                width: 25,
                                                margin: '0px 2px',
                                                marginTop: 2,
                                                cursor: upgrade.id ? 'auto' : 'pointer',
                                                opacity: upgrade.id ? 0.1 : 1
                                            }}
                                            onClick={upgrade.id ? undefined : () => setEligibleUpgradesToAdd(index, i)}
                                        />
                                    );
                                }
                            })}
                        </div>
                    )}
                />
            </div>
            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
        </div>
    );
}

export default ShipRow;