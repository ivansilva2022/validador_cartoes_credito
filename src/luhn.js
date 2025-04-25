function validateCardNumber(cardNumber) {
    const cardNumberStr = cardNumber.toString();

    // Luhn Algorithm Implementation
    function isValidLuhn(cardNumber) {
        let sum = 0;
        let shouldDouble = false;

        // Iterate over the card number digits from right to left
        for (let i = cardNumberStr.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumberStr[i]);

            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
            shouldDouble = !shouldDouble;
        }

        return sum % 10 === 0;
    }

    // Step 1: Check the initial digit(s) and length
    if (!/^\d+$/.test(cardNumberStr)) {
        return 'Invalid card number: contains non-numeric characters';
    }

    const length = cardNumberStr.length;

    // MasterCard: Starts with 51-55 or 2221-2720, length 16
    const firstTwoDigits = parseInt(cardNumberStr.slice(0, 2));
    const firstFourDigits = parseInt(cardNumberStr.slice(0, 4));
    if (length === 16 && 
        ((firstTwoDigits >= 51 || firstTwoDigits <= 55) || (firstFourDigits >= 2221 || firstFourDigits <= 2720))) {
        if (!isValidLuhn(cardNumber)) {
            return 'Invalid card number: failed Luhn check';
        }
        return 'MasterCard';
    }

    // Elo: Specific prefixes, length 16
    const eloPrefixes = ['4011', '4312', '4389', '4514', '4576', '5041', '5067', '5090', '6277', '6362'];
    if (length === 16 && eloPrefixes.some(prefix => cardNumberStr.startsWith(prefix))) {
        if (!isValidLuhn(cardNumber)) {
            return 'Invalid card number: failed Luhn check';
        }
        return 'Elo';
    }

    // American Express: Starts with 34 or 37, length 15
    if (length === 15 && (cardNumberStr.startsWith('34') || cardNumberStr.startsWith('37'))) {
        if (!isValidLuhn(cardNumber)) {
            return 'Invalid card number: failed Luhn check';
        }
        return 'American Express';
    }

    // Discover: Starts with 6011, 65, or 644-649, length 16
    if (length === 16 && 
        (cardNumberStr.startsWith('6011') || cardNumberStr.startsWith('65') || 
        (parseInt(cardNumberStr.slice(0, 3)) >= 644 && parseInt(cardNumberStr.slice(0, 3)) <= 649))) {
        if (!isValidLuhn(cardNumber)) {
            return 'Invalid card number: failed Luhn check';
        }
        return 'Discover';
    }

    // Hipercard: Starts with 6062, length 16
    if (length === 16 && cardNumberStr.startsWith('6062')) {
        if (!isValidLuhn(cardNumber)) {
            return 'Invalid card number: failed Luhn check';
        }
        return 'Hipercard';
    }

    // Visa: Starts with 4, length 12 or 16
    if (cardNumberStr.startsWith('4') && (length === 12 || length === 16)) {
        if (!isValidLuhn(cardNumber)) {
            return 'Invalid card number: failed Luhn check';
        }
        return length === 12 ? 'Visa (12 digits)' : 'Visa';
    }
    // If no match, return unknown
    return 'Unknown';
}

// Example usage:
const cardNumber = 4011000000000009; // Replace with the card number to test
console.log(validateCardNumber(cardNumber)); // Output: MasterCard (for this example)