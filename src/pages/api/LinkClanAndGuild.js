import { connectToDatabase } from "../../../lib/mongodb";

const BUNGIE_API_KEY = process.env.NEXT_PUBLIC_BUNGIE_API_KEY;

async function checkClan(clanId) {
    var myHeaders = new Headers();
    myHeaders.append("X-API-Key", BUNGIE_API_KEY);
    myHeaders.append("Cookie", "Q6dA7j3mn3WPBQVV6Vru5CbQXv0q+I9ddZfGro+PognXQwjWM8PS+VE_=v1tthRgw__61o; __cflb=04dToX7HjFoF4QAzoaHehFaMj5fkjPR3bx1f2DaiFd; bungleanon=sv=BAAAAADJUQAAAAAAAObggwEAAAAAAAAAAAAAAAAAD34FiQbbCEAAAABqy4j8lDth2znGa7XEhoYhstd5QH7W+V2M3RsmQ3Pl+b2MtzxGrtA485VEzMfolCv9DCYiNw/67lYeEHJExUMk&cl=MC4yMDkzNy4yNTQyMDAwNg==; bungled=8513332249439281753; bungledid=B+Nmneouiz5LpCKmRqJmfeMAD34FiQbbCAAA");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const data = await fetch("https://www.bungie.net/Platform/GroupV2/" + clanId + "/", requestOptions)
        .then(response => response.json())
        .then(result => { return (result) })
        .catch(error => console.log('error', error));

    return data?.Response?.detail?.groupId ? true : false
}

export default async function handler(req, res) {
    try {
        const { database } = await connectToDatabase();

        if (req.method === "POST") {
            if (typeof req?.body?.clanId === 'string' && typeof req?.body?.guildId === 'string') {

                // const isClan = await checkClan(req.body.clanId)

                // if (isClan) {
                const bodyObject = req.body;
                let group = await database.collection("groups").updateOne(
                    { clanId: bodyObject.clanId.toString() },
                    { $set: { guildId: bodyObject.guildId.toString() } },
                    { upsert: true }
                )

                if (group.acknowledged) {
                    res.status(200).json({ message: "Success!", clanExists: true });
                } else {
                    res.status(500).json({ error: "Database error" })
                }
                // } else {
                //     res.json({ error: "The clan id " + req.body.clanId + " does not exist", clanExists: false })
                // }
            } else {
                res.status(500).json({ error: "Incorrect request body" })
            }
        } else if (req.method === "GET") {
            const discordGuildId = req.query?.guildId
            if (discordGuildId) {
                const group = await database.collection("groups").findOne({ guildId: discordGuildId }, { projection: { _id: false } })
                console.log(group)

                if (group) {
                    res.status(200).json({ registered: true, group: group });
                } else {
                    res.status(200).json({ registered: false, error: "There are no groups associated with this id" })
                }
            } else {
                res.status(500).json({ error: "Please provide a Discord guild id in the request" })
            }
        } else {
            res.status(500).json({ error: "This endpoint requires a POST request" })
        }
    } catch (err) {
        res.status(500).json({ error: "Error" })
    }
}
