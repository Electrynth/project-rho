import cardsById from './cardsById.json';

const cdn = 'https://d231hz44ub8jot.cloudfront.net';

const cards = {
    cardsById,
    shipIdList: [],
    upgradeIdList: [],
    squadronIdList: [],
    objectiveIdList: [],
    getCardImageUrl: (cardName, cardType) => (`${cdn}/${cardType}s/${cardName}.webp`)
};

Object.keys(cardsById).forEach(id => {
    const cardType = cardsById[id].cardType;
    if (cardType === 'ship') cards.shipIdList.push(id);
    else if (cardType === 'upgrade') cards.upgradeIdList.push(id);
    else if (cardType === 'squadron') cards.squadronIdList.push(id);
    else if (cardType === 'objective') cards.objectiveIdList.push(id);
});

export default cards;