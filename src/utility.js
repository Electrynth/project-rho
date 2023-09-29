const checkIsMatch = (object, source) => {
    let matchingProperties = 0;

    for (const [key, value] of Object.entries(object)) {
        if (key in source && source[key].includes(value)) matchingProperties += 1;
    }
    if (matchingProperties === Object.keys(object).length) return true;
    else return false;
}

const isUpgradeRequirementsMet = (requirements, shipCard) => {
    if (requirements instanceof Array) {
        const operator = requirements[0];
        if (operator instanceof Object) {
            // requirements: [{cardName: 'Whatever'}]
            return checkIsMatch(operator, shipCard);
        } else if (operator === 'NOT') {
            let operand = requirements[1];
            if (operand instanceof Array) {
                // requirements: ['NOT', [...]]
                operand = isUpgradeRequirementsMet(operand, shipCard);
            } else {
                // requirements: ['NOT', {cardName: 'Whatever'}]
                return !checkIsMatch(operand, shipCard);
            }
        } else if (operator === 'AND' || operator === 'OR') {
            let leftOperand = requirements[1];
            let rightOperand = requirements[2];
            if (leftOperand instanceof Array) {
                leftOperand = isUpgradeRequirementsMet(leftOperand, shipCard);
            } else if (leftOperand instanceof Object) {
                leftOperand = checkIsMatch(leftOperand, shipCard);
            }
            if (rightOperand instanceof Array) {
                rightOperand = isUpgradeRequirementsMet(rightOperand, shipCard);
            } else if (rightOperand instanceof Object) {
                rightOperand = checkIsMatch(rightOperand, shipCard);
            }
            if (operator === 'OR') {
                // requirements: ['OR', {cardName: 'Whatever'}, {cardType: 'Whatever'}]
                return leftOperand || rightOperand
            } else { // operator === 'AND'
                // requirements: ['AND', {cardName: 'Whatever'}, {cardType: 'Whatever'}]
                return leftOperand && rightOperand;
            }
        } else {
            // Empty array of requirements
            return true;
        }
    } else {
        // requirements: {cardName: 'Whatever'}
        return checkIsMatch(requirements, shipCard);
    }
}

export {
    isUpgradeRequirementsMet
}