import clientPromise from "./lib/mongodb";

export default async function handler(req, res) {
    try {
        const client = await clientPromise;
        const db = client.db("test");

        if (req.method == "GET") {
            const guildId = req.query?.guildId
            if (guildId) {
                const group = await db.collection("groups").findOne({ guildId: guildId })
                if (group?.clanId) {
                    const membersCursor = await db.collection("members").find({ clanId: group.clanId }, { projection: { _id: false, discordId: true, destinyMembershipId: true, clanId: true, discordName: true } })
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
    } catch (err) {
        res.json({ error: "Error" })
    }
}
