export function processInput(numbersArray) {
    if (!numbersArray || numbersArray.length === 0) return 0;

    // Join the array into a single string separated by newlines
    let numbers = numbersArray.join('\n');

    // Normalize newlines and handle custom delimiters
    let delimiter = /[,\n]/; // Default delimiters: comma and newline
    let numberString = numbers;

    // Check if the first line specifies a custom delimiter
    if (numberString.startsWith('//')) {
        const newlineIndex = numberString.indexOf('\n');
        if (newlineIndex !== -1) {
            const delimiterLine = numberString.slice(2, newlineIndex).trim();
            numberString = numberString.slice(newlineIndex + 1).trim();

            // Handle custom delimiter
            if (delimiterLine.startsWith('[') && delimiterLine.endsWith(']')) {
                // Support multiple delimiters enclosed in square brackets
                const delimiters = delimiterLine.slice(1, -1).split('][').map(d => escapeRegExp(d)).join('|');
                delimiter = new RegExp(delimiters);
            } else {
                delimiter = new RegExp(escapeRegExp(delimiterLine));
            }
        }
    }

    // Splitting numbers based on the delimiter
    const numberArray = numberString.split(delimiter).map(num => {
        const trimmed = num.trim();
        const parsed = parseInt(trimmed, 10);
        // Debugging
        console.log(`Processing: "${trimmed}" -> Parsed: ${parsed}`);
        return isNaN(parsed) ? 0 : parsed;
    });

    // Debugging
    console.log('Number Array:', numberArray);

    // Check for negative numbers
    const negativeNumbers = numberArray.filter(num => num < 0);
    if (negativeNumbers.length) {
        throw new Error(`Negative numbers not allowed: ${negativeNumbers.join(', ')}`);
    }

    // Calculate the response
    return numberArray.reduce((sum, num) => sum + num, 0);
}

// Utility function to escape special characters in a string for use in a RegExp
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
