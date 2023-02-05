import clientPromise from "./lib/mongodb";

export default async function handler(req, res) {
    // try {
        const client = await clientPromise;
        const db = client.db("test");

        if (req.method == "GET") {
            const destinyMembershipId = req.query?.destinyMembershipId
            if (destinyMembershipId) {
                const member = await db.collection("members").findOne({ destinyMembershipId: destinyMembershipId }, { projection: { _id: false } })

                if (member) {
                    res.status(200).json(member);
                } else {
                    res.json({ state: 0, error: "There are no members associated with this id" })
                }
            } else {
                res.json({ error: "Please provide a destinyMembershipId in the request" })
            }
        } else {
            res.json({ error: "This endpoint requires a GET request" })
        }
    // } catch (err) {
    //     res.json({ error: "Error" })
    // }
}
