import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
    try {
        const { database } = await connectToDatabase();

        if (req.method === 'POST') {
            if (typeof req?.body?.discordId === 'string' && typeof req?.body?.voiceTimeIncr === 'number' && typeof req?.body?.messageCountIncr === 'number') {
                const bodyObject = req.body;
                let group = await database.collection("members").updateMany(
                    { discordId: bodyObject.discordId },
                    {
                        $inc: { voiceTime: bodyObject.voiceTimeIncr, messageCount: bodyObject.messageCountIncr, seasonalVoiceTime: bodyObject.voiceTimeIncr, seasonalMessageCount: bodyObject.messageCountIncr }
                    },
                    { upsert: true, multi: true }
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
