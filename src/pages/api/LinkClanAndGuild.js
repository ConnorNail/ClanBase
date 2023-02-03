import clientPromise from "./lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("test");

    if (req.method === "POST") {
        if (req?.body?.clanId && req?.body?.guildId) {
            
            const bodyObject = req.body;
            let group = await db.collection("groups").update(
                { clanId: bodyObject.clanId },
                { $set: { guildId: bodyObject.guildId } },
                { upsert: true }
            )

            if (group.acknowledged) {
                res.json({ message: "Success!" });
            } else {
                res.json({ error: "Database error" })
            }
        } else {
            res.json({ error: "Incorrect request body" })
        }
    } else {
        res.json({ error: "This endpoint requires a POST request" })
    }
}
