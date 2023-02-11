import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
    try {
        const { database } = await connectToDatabase();

        if (req.method === 'POST') {
            if (typeof req?.body?.discordId === 'string' && typeof req?.body?.discordName === 'string' && typeof req?.body?.discordDiscriminator === 'string' && typeof req?.body?.destinyMembershipId === 'string' && typeof req?.body?.destinyMembershipType === 'string') {
                const bodyObject = req.body;
                let group = await database.collection("members").updateOne(
                    { discordId: bodyObject.discordId, destinyMembershipId: bodyObject.destinyMembershipId },
                    {
                        $set: { discordName: bodyObject.discordName, discordDiscriminator: bodyObject.discordDiscriminator, destinyMembershipType: bodyObject.destinyMembershipType, clanId: bodyObject?.clanId ? bodyObject.clanId : null },
                    },
                    { upsert: true }
                )

                if (group.acknowledged) {
                    res.status(200).json({ message: "Success!" });
                } else {
                    res.status(500).json({ error: "Database error" })
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
