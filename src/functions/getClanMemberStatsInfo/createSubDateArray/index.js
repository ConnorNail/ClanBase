export default function createSubDateArray(startDate, endData) {

    const data = [];

    const start = new Date(startDate);
    const end = new Date(endData);

    const current = new Date();

    // Find the difference between the current date and the start of the season
    let difference = Math.abs(current - start);
    difference = Math.ceil(difference / (1000 * 60 * 60 * 24));

    const extraDays = difference%31;

    // Add extra days to start date to get first pair
    const firstChunck = new Date(start);
    firstChunck.setDate(firstChunck.getDate() + extraDays);

    data.push([formatDate(start), formatDate(firstChunck)])

    // Push rest of day chuncks
    const numChunks = Math.trunc(difference/31);
    let startTempDate = new Date(firstChunck);
    let endTempDate = new Date(startTempDate);
    for (let i = 0; i < numChunks; i++) {
        startTempDate = new Date(endTempDate);
        startTempDate.setDate(startTempDate.getDate() + 1)
        endTempDate = new Date(startTempDate);
        endTempDate.setDate(endTempDate.getDate() + 30)
        data.push([formatDate(startTempDate), formatDate(endTempDate)])
    }

    return data
}

function formatDate(date) {
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
}