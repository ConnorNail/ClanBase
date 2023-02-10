import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    try {
        const client = await clientPromise;
        const db = client.db("test");

        if (req.method === 'POST') {
            if (typeof req?.body?.clanId === 'string' && typeof req?.body?.playtimePvE === 'string' && typeof req?.body?.activitiesCompletedPvE === 'number' && typeof req?.body?.averageStrikeDuration === 'number' && typeof req?.body?.KDPvE === 'number' && typeof req?.body?.raidsCompleted === 'number' && typeof req?.body?.playtimePvP === 'string' && typeof req?.body?.activitiesCompletedPvP === 'number' && typeof req?.body?.combatRating === 'number' && typeof req?.body?.winPercentage === 'number' && typeof req?.body?.flawlessCards === 'number' && typeof req?.body?.clanScorePvE === 'number' && typeof req?.body?.clanScorePvP === 'number') {
                const bodyObject = req.body;
                let group = await db.collection("clanScores").updateOne(
                    { clanId: bodyObject.clanId },
                    {
                        $set: { PvE: { playtime: bodyObject.playtimePvE, activitiesCompleted: bodyObject.activitiesCompletedPvE, averageStrikeDuration: bodyObject.averageStrikeDuration, KD: bodyObject.KDPvE, raidsCompleted: bodyObject.raidsCompleted }, PvP: { playtime: bodyObject.playtimePvP, activitiesCompleted: bodyObject.activitiesCompletedPvP, combatRating: bodyObject.combatRating, winPercentage: bodyObject.winPercentage, flawlessCards: bodyObject.flawlessCards }, clanScorePvE: bodyObject.clanScorePvE, clanScorePvP: bodyObject.clanScorePvP }
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
