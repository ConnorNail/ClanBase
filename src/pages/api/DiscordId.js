import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    try {
        const client = await clientPromise;
        const db = client.db("test");

        if (req.method == "GET") {
            const clanId = req.query?.clanId
            if (clanId) {
                const group = await db.collection("groups").findOne({ clanId: clanId }, { projection: { _id: false } })

                if (group) {
                    res.status(200).json(group);
                } else {
                    res.status(500).json({ state: 0, error: "There are no groups associated with this id" })
                }
            } else {
                res.status(500).json({ error: "Please provide a clanId in the request" })
            }
        } else {
            res.status(500).json({ error: "This endpoint requires a GET request" })
        }
    } catch (err) {
        res.json({ error: "Error" })
    }
}
