import clientPromise from "./lib/mongodb";

const BUNGIE_API_KEY = process.env.NEXT_PUBLIC_BUNGIE_API_KEY;

async function getClanMembers(clanId) {
    var myHeaders = new Headers();
    myHeaders.append("X-API-Key", BUNGIE_API_KEY);
    myHeaders.append("Cookie", "Q6dA7j3mn3WPBQVV6Vru5CbQXv0q+I9ddZfGro+PognXQwjWM8PS+VE_=v1tthRgw__61o; __cflb=04dToX7HjFoF4QAzoaHehFaMj5fkjPR3bx1f2DaiFd; bungleanon=sv=BAAAAADJUQAAAAAAAObggwEAAAAAAAAAAAAAAAAAD34FiQbbCEAAAABqy4j8lDth2znGa7XEhoYhstd5QH7W+V2M3RsmQ3Pl+b2MtzxGrtA485VEzMfolCv9DCYiNw/67lYeEHJExUMk&cl=MC4yMDkzNy4yNTQyMDAwNg==; bungled=8513332249439281753; bungledid=B+Nmneouiz5LpCKmRqJmfeMAD34FiQbbCAAA");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const data = await fetch("https://www.bungie.net/Platform/GroupV2/" + clanId + "/Members", requestOptions)
        .then(response => response.json())
        .then(result => { return (result) })
        .catch(error => console.log('error', error));

    return data
}

export default async function handler(req, res) {
    // try {
        const client = await clientPromise;
        const db = client.db("test");

        if (req.method == "GET") {
            const guildId = req.query?.guildId
            if (guildId) {
                const group = await db.collection("groups").findOne({ guildId: guildId })
                if (group?.clanId) {

                    const data = await getClanMembers(group.clanId)
                    let memberList = []
                    const membersData = data?.Response?.results
                    for (const member of membersData) {
                        const membershipId = member?.destinyUserInfo?.membershipId
                        if (membershipId) {
                            memberList.push({ destinyMembershipId: membershipId })
                        }
                    }

                    const membersCursor = await db.collection("members").find({ $or: memberList }, { projection: { _id: false, discordId: true, destinyMembershipId: true, clanId: true, discordName: true } })
                    const members = await membersCursor.toArray()

                    if (members) {
                        res.status(200).json(members);
                    } else {
                        res.json({ error: "There are no members associated with this guild" })
                    }
                } else {
                    res.json({ error: "There is no clan associated with this guild" })
                }
            } else {
                res.json({ error: "Please provide a guildId in the request" })
            }
        } else {
            res.json({ error: "This endpoint requires a GET request" })
        }
    // } catch (err) {
    //     res.json({ error: "Error" })
    // }
}
