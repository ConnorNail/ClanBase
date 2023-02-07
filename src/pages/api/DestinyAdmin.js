import clientPromise from "./lib/mongodb";

const BUNGIE_API_KEY = process.env.NEXT_PUBLIC_BUNGIE_API_KEY;

async function getBungieMemberships(membershipId, membershipType) {
    var myHeaders = new Headers();
    myHeaders.append("X-API-Key", BUNGIE_API_KEY);
    myHeaders.append("Cookie", "Q6dA7j3mn3WPBQVV6Vru5CbQXv0q+I9ddZfGro+PognXQwjWM8bM6VGC=v1tNlRgw__HGw; __cflb=0H28vP5GxS7vgVH4MZT6rB7QcDNQ8jpmSSZ6X2UN8oV; bungleanon=sv=BAAAAADJUQAAAAAAAObggwEAAAAAAAAAAAAAAAAAD34FiQbbCEAAAABqy4j8lDth2znGa7XEhoYhstd5QH7W+V2M3RsmQ3Pl+b2MtzxGrtA485VEzMfolCv9DCYiNw/67lYeEHJExUMk&cl=MC4yMDkzNy4yNTQyMDAwNg==; bungled=8513332249439281753; bungledid=B+Nmneouiz5LpCKmRqJmfeMAD34FiQbbCAAA");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const data = await fetch("https://www.bungie.net/Platform/GroupV2/User/" + membershipType + "/" + membershipId + "/0/1/", requestOptions)
        .then(response => response.json())
        .then(result => { return (result) })
        .catch(error => console.log('error', error));

    return data?.Response?.results
}

export default async function handler(req, res) {
    try {
        const client = await clientPromise;
        const db = client.db("test");

        if (req.method === "GET") {
            if (typeof req?.query?.discordId) {

                // Get users's destiny ids from discord id
                const membersCursor = await db.collection("members").find({ discordId: req.query.discordId }, { projection: { _id: false, destinyMembershipId: true, destinyMembershipType: true } })
                const bungieAccounts = await membersCursor.toArray()

                if (bungieAccounts.length > 0) {
                    const clanAdmin = []
                    for (const account of bungieAccounts) {
                        // Get bungie memberships
                        const userDestinyData = await getBungieMemberships(account.destinyMembershipId, account.destinyMembershipType)
                        const memberType = userDestinyData[0]?.member?.memberType
                        const clanId = userDestinyData[0]?.member?.groupId
                        const clanName = userDestinyData[0]?.group?.name

                        // Creat list of clans that this member is an admin for
                        if (clanId && memberType >= 3) {
                            clanAdmin.push({ clanId: clanId, clanName: clanName })
                        }
                    }

                    if (clanAdmin.length > 0) {
                        res.status(200).json({ message: "Success!", destinyClanInfo: clanAdmin });
                    } else {
                        res.status(500).json({ error: "This user is either not in a clan or is not an admin of a clan" })
                    }
                } else {
                    res.status(500).json({ error: "There are no members associated with this discord account. Please register at https://www.myclanbase.com/accounts" })
                }
            } else {
                res.status(500).json({ error: "Incorrect request body" })
            }
        } else {
            res.status(500).json({ error: "This endpoint requires a POST request" })
        }
    } catch (err) {
        res.status(500).json({ error: "Error" })
    }
}
