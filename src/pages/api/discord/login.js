const CLIENT_ID = process.env.NEXT_DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_DISCORD_CLIENT_SECRET;
const redirect = encodeURIComponent('https://localhost:3000/api/discord/callback');

export default function handler(req, res) {
    // Get Discord token
    res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`);
}
