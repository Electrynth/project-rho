import urls from 'config/urls';
import cards from './cards.js';
import versions from 'config/versions.js';
import cardsById from './cardsById.json';
import {
    createShipObjFromCard
} from './utility.js';

class ArmadaList {
    constructor() {
        this.version = 0;
        this.points = 0;
        this.faction = '';
        this.title = 'Untitled';
        this.commanderName = '';
        this.ships = [];
        this.squadrons = [];
        this.objectives = [];
        this.uniques = [];
        this.listId = 0;
        this.listOwnerEmail = '';
    }

    static addShip(id, index = -1) {
        const card = cardsById[id];
        if (card.isUnique) this.uniques = ([...this.uniques, card.displayName ? card.displayName : card.cardName]);
        const shipObj = createShipObjFromCard(card);
        if (index > -1) this.ships.splice(index, 0, shipObj);
        else this.ships.push(shipObj);
    }

    static removeShip(index) {
        const ship = this.ships[index];
        const card = cardsById[ship.id];
        const uniquesToRemove = [];
        if (card.isUnique) uniquesToRemove.push(card.displayName ? card.displayName : card.cardName);
        for (let i = ship.upgradesEquipped.length - 1; i > -1; i--) {
            
        }
    }

    static shiftShipIndex(index, shiftValue) {
        if (shiftValue > 0 && index + 1 < ships.length) {
            [this.ships[index], this.ships[index + 1]] = [this.ships[index + 1], this.ships[index]];
        } else if (shiftValue < -1 && index - 1 > -1) {
            [this.ships[index - 1], this.ships[index]] = [this.ships[index], this.ships[index - 1]];
        }
    }
}

export default {
    ArmadaList
};