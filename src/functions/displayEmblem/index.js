import { Div, Text, Image } from "atomize";

function getRecentChar(charInfo) {
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

function displayEmblem(charInfo) {
    // When passed character data will display an emblem
    const path = charInfo?.data[getRecentChar(charInfo)]?.emblemPath

    // If a valid path is found
    if (typeof path !== 'undefined') {
        return (
            <Div d="flex" flexDir="column" textAlign="center">
                <Image h="2rem" w="auto" src={'https://www.bungie.net/' + path} alt=""/>
            </Div>
        )
    } else {
        // Else display default emblem "Make Us Proud"
        return (
            <Div d="flex" flexDir="column" textAlign="center">
                <Image h="2rem" w="auto" src={'https://www.bungie.net/common/destiny2_content/icons/871fa953ea81308c71bc3b9eb3bcd509.jpg'} alt=""/>
            </Div>
        )
    }
}

function displayEmblemBackground(children, backup) {

    return (
        <Div bg="cbGrey2" h="2rem" m={{ l: '-2.2rem' }}>
            <Text textColor="cbWhite" textSize="caption" p={{ l: '2.75rem', r: '0.75rem', t: '0.4rem' }}>
                {children ? children : backup}
            </Text>
        </Div>
    )

}

export { displayEmblem, displayEmblemBackground };