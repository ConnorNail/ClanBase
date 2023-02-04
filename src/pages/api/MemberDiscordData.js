import clientPromise from "./lib/mongodb";

export default async function handler(req, res) {
    // try {
        const client = await clientPromise;
        const db = client.db("test");

        if (req.method === "POST") {
            if (typeof req?.body?.discordId === 'string' && typeof req?.body?.discordName === 'string' && typeof req?.body?.voiceTime === 'number' && typeof req?.body?.messageCount === 'number') {

                const bodyObject = req.body;
                let group = await db.collection("timeData").updateOne(
                    { discordId: bodyObject.discordId },
                    { $set: { discordName: bodyObject.discordName.toString(), voiceTime: bodyObject.voiceTime, messageCount: bodyObject.messageCount } },
                    { upsert: true }
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
    // } catch (err) {
    //     res.json({ error: "Error" })
    // }
}
