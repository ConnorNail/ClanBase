export default function handler(req, res) {
    const token = req.query
    console.log(token)
    res.status(200).json({ token: token })
}
