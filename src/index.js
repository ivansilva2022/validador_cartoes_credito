function getCardBrand(cardNumber) {
    const cardNumberStr = cardNumber.toString();

    // Verifica se o número do cartão tem 16 ou 12 dígitos
    if (cardNumberStr.length !== 16 && cardNumberStr.length !== 12) {
        return 'Invalid card number: must have 16 or 12 digits';
    }

    // Visa: Starts with 4
    if (cardNumberStr.startsWith('4')) {
        if (cardNumberStr.length === 16) {
            return 'Visa';
        } else if (cardNumberStr.length === 12) {
            return 'Visa (12 digits)';
        }
    }

    // MasterCard: Starts with 51-55 or 2221-2720
    const firstTwoDigits = parseInt(cardNumberStr.slice(0, 2));
    const firstFourDigits = parseInt(cardNumberStr.slice(0, 4));
    if ((firstTwoDigits >= 51 && firstTwoDigits <= 55) || (firstFourDigits >= 2221 && firstFourDigits <= 2720)) {
        return 'MasterCard';
    }

    // Elo: Specific ranges
    const eloPrefixes = ['4011', '4312', '4389', '4514', '4576', '5041', '5067', '5090', '6277', '6362'];
    if (eloPrefixes.some(prefix => cardNumberStr.startsWith(prefix))) {
        return 'Elo';
    }

    // American Express: Starts with 34 or 37
    if (cardNumberStr.startsWith('34') || cardNumberStr.startsWith('37')) {
        return 'American Express';
    }

    // Discover: Starts with 6011, 65, or 644-649
    if (cardNumberStr.startsWith('6011') || cardNumberStr.startsWith('65') || 
        (parseInt(cardNumberStr.slice(0, 3)) >= 644 && parseInt(cardNumberStr.slice(0, 3)) <= 649)) {
        return 'Discover';
    }

    // Hipercard: Starts with 6062
    if (cardNumberStr.startsWith('6062')) {
        return 'Hipercard';
    }

    // Unknown brand
    return 'Unknown';
}

// Example usage:
const cardNumber = 4123456789015674; // Substitua pelo número do cartão para testar
console.log(getCardBrand(cardNumber)); // Output: Visa (16 digits) (para este exemplo)