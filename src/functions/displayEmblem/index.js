import { Div, Text, Image } from "atomize";

function getRecentChar(charInfo) {
    // When passed an object of characters will find the characterId of the most recently played character
    let char = 0;
    let date = '';

    for (const character in charInfo.characters.data) {
        const newDate = new Date(charInfo.characters.data[character].dateLastPlayed);

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
    const path = charInfo?.characters.data[getRecentChar(charInfo)].emblemPath

    // If a valid path is found
    if (typeof path !== 'undefined') {
        return (
            <Div d="flex" flexDir="column" textAlign="center">
                <Image h="3rem" w="3rem" src={'https://www.bungie.net/' + path}/>
            </Div>
        )
    } else {
        // Else display default emblem "Make Us Proud"
        return (
            <Div d="flex" flexDir="column" textAlign="center">
                <Image h="3rem" w="3rem" src={'https://www.bungie.net/common/destiny2_content/icons/871fa953ea81308c71bc3b9eb3bcd509.jpg'}/>
            </Div>
        )
    }
}

function displayEmblemBackground(charInfo, children) {
    // When passed character data will display an emblem
    const colors = charInfo?.characters.data[getRecentChar(charInfo)].emblemColor

    // If a valid colors found
    if (typeof colors !== 'undefined') {
        return (
            <Div bg={'rgba(' + colors.red + ',' + colors.green + ',' + colors.blue + ',1)'} h="3rem" m={{l: '-4.24rem'}}>
                <Div m={{l: '3rem'}}>
                <Text textColor="white" p='1rem'>
                    {children}
                </Text>
                </Div>
            </Div>
        )
    } else {
        return (
            // Else display default emblem background "Make Us Proud"
            <Div bg={'rgba(11,55,147,1)'} h="3rem" m={{l: '-1.5rem'}}>
                <Text textColor="white" p='1rem'>
                    {children}
                </Text>
            </Div>
        )
    }
    
}

export {displayEmblem, displayEmblemBackground};