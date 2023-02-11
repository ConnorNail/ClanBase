import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
    try {
        const { database } = await connectToDatabase();

        if (req.method == "GET") {
            const destinyMembershipId = req.query?.destinyMembershipId
            const destinyMembershipType = req.query?.destinyMembershipType
            if (destinyMembershipId && destinyMembershipType) {
                const member = await database.collection("members").findOne({ $and: [{ destinyMembershipId: destinyMembershipId }, { destinyMembershipType: destinyMembershipType }]}, { projection: { _id: false } })

                if (member) {
                    res.status(200).json({ registered: true, member });
                } else {
                    res.status(200).json({ registered: false, error: "There are no members associated with this id" })
                }
            } else {
                res.status(500).json({ error: "Please provide a destinyMembershipId in the request" })
            }
        } else {
            res.status(500).json({ error: "This endpoint requires a GET request" })
        }
    } catch (err) {
        res.json({ error: "Error" })
    }
}
