export default function handler(req, res) {
    res.status(200).json({ id: process.env.BUNGIE_CLIENT_ID })
}