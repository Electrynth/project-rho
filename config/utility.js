function createShipObjFromCard(card) {
    return {
        objType: 'ship',
        id: card.id,
        hasModification: false,
        upgradesEquipped: card.upgradeSlots.map(upgradeType => ({ upgradeType, id: undefined }))
    };
}


export default {
    createShipObjFromCard
}