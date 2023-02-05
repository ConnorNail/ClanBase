import clientPromise from "./lib/mongodb";

export default async function handler(req, res) {
    try {
        const client = await clientPromise;
        const db = client.db("test");

        if (req.method === 'POST') {
            if (typeof req?.body?.discordId === 'string' && typeof req?.body?.voiceTimeIncr === 'number' && typeof req?.body?.messageCountIncr === 'number') {
                const bodyObject = req.body;
                let group = await db.collection("members").update(
                    { discordId: bodyObject.discordId },
                    {
                        $inc: { voiceTime: bodyObject.voiceTimeIncr, messageCount: bodyObject.messageCountIncr, seasonalVoiceTime: bodyObject.voiceTimeIncr, seasonalMessageCount: bodyObject.messageCountIncr }
                    },
                    { upsert: true, multi: true }
                )

                if (group.acknowledged) {
                    res.status(200).json({ message: "Success!" });
                } else {
                    res.json({ error: "Database error" })
                }
            } else {
                res.json({ error: "Incorrect request body" })
            }
        } else {
            res.json({ error: "This endpoint requires a POST request" })
        }
    } catch (err) {
        res.json({ error: "Error" })
    }
}
