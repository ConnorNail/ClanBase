import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    try {
        const client = await clientPromise;
        const db = client.db("test");

        if (req.method == "GET") {
            const clansPvECursor = await db.collection("clanScores").find({}, { projection: { _id: false, clanId: true, clanScorePvE: true } }).sort({ clanScorePvE: -1 }).limit(25)
            const clansPvELeaderboard = await clansPvECursor.toArray()

            const clansPvPCursor = await db.collection("clanScores").find({}, { projection: { _id: false, clanId: true, clanScorePvP: true } }).sort({ clanScorePvP: -1 }).limit(25)
            const clansPvPLeaderboard = await clansPvPCursor.toArray()

            if (clansPvELeaderboard && clansPvPLeaderboard) {
                res.status(200).json({ clansPvELeaderboard, clansPvPLeaderboard });
            } else {
                res.status(200).json({ error: "There are no clans in the database" })
            }
        } else {
            res.status(500).json({ error: "This endpoint requires a GET request" })
        }
    } catch (err) {
        res.json({ error: "Error" })
    }
}
