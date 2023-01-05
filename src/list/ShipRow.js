import Image from 'next/image';
import { Button, Divider } from '@mui/material';
import { Add, ContentCopy, Search, Clear } from '@mui/icons-material';
import DualHoverButton from 'src/common/DualHoverButton';
import cards from 'config/cards';
import robotoCondensed from 'config/font';
import UpgradeIcon from 'src/common/UpgradeIcon';

function ShipRow({ index, ship, removeShip, setEligibleUpgradesToAdd }) {
    const shipCard = cards.cardsById[ship.id];
    const upgradePoints = ship.upgradesEquipped.reduce((a, b) => {
        let points = 0;
        if (a.id) points += cards.cardsById[a.id];
        if (b.id) points += cards.cardsById[b.id];
        return points
    })
    
    return (
        <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
            <DualHoverButton
                buttonActions={(
                    <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
                        <div
                            style={{
                                overflow: 'hidden',
                                width: 80,
                                height: 40,
                                borderRadius: 5,
                                marginRight: 8
                            }}
                        >
                            <Image
                                src={shipCard.imageUrl}
                                width={240}
                                height={412}
                                alt={shipCard.cardName}
                                style={{ margin: '-113px 0px 0px -80px', transform: 'scale(0.45)' }}
                            />
                        </div>
                        <div style={{ fontWeight: 300 }}>{shipCard.cardName}</div>
                        <span style={{ flexGrow: 1 }} />
                        <div style={{ marginRight: 8 }}>{shipCard.points}</div>
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
                                marginRight: 8
                            }}
                        >
                            <Search
                                style={{ zIndex: 1, marginLeft: 30, marginTop: 10, position: 'absolute', cursor: 'pointer' }}
                            />
                            <Image
                                src={shipCard.imageUrl}
                                width={240}
                                height={412}
                                alt={shipCard.cardName}
                                style={{ margin: '-113px 0px 0px -80px', transform: 'scale(0.45)', opacity: '0.5', cursor: 'pointer' }}
                            />
                        </div>
                        <div style={{ fontWeight: 300 }}>{shipCard.cardName}</div>
                        <span style={{ flexGrow: 1 }} />
                        <div style={{ marginRight: 2, display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
                            <ContentCopy
                                fontSize="small"
                                style={{ marginRight: 4, cursor: 'pointer' }}
                            />
                            <Clear
                                onClick={() => removeShip(index)}
                                style={{ marginRight: 2, cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                )}
            />
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
                                    style={{ width: 110, marginLeft: 4, position: 'absolute', left: 60 }}
                                >
                                    Add Upgrade
                                </div>
                            </Button>
                            <div style={{ flexGrow: 1 }} />
                            {upgradePoints > 0 ? (
                                <div className={robotoCondensed.className} style={{ marginRight: 2 }}>
                                    {shipCard.points + upgradePoints}
                                </div>
                            ) : undefined}
                        </div>
                    )}
                    hoverActions={(
                        <div style={{ display: 'flex', flexFlow: 'row nowrap', height: 40, alignItems: 'center', padding: 5 }}>
                            {ship.upgradesEquipped.map((upgrade, i) => {
                                return (
                                    <UpgradeIcon
                                        key={`${upgrade.upgradeType}_${i}`}
                                        upgradeType={upgrade.upgradeType}
                                        style={{ height: 25, width: 25, margin: '0px 2px', marginTop: 2, cursor: 'pointer' }}
                                        onClick={() => setEligibleUpgradesToAdd(index, i)}
                                    />
                                );
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