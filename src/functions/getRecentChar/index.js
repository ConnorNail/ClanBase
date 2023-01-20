export default function getRecentChar(charInfo) {
    // When passed an object of characters will find the characterId of the most recently played character
    let char = 0;
    let date = '';

    for (const character in charInfo?.data) {
        const newDate = new Date(charInfo?.data[character]?.dateLastPlayed);

        // If the new date is more recent
        if (date == '' || date < newDate) {
            // Save the character date
            date = newDate;

            // Save characterId
            char = character;
        }
    }
    return char
}