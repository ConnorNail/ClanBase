export default function handler(req, res) {
    res.status(200).json({ id: process.env.REACT_APP_BUNGIE_CLIENT_ID })
}