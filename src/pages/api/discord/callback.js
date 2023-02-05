const CLIENT_ID = process.env.NEXT_DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_DISCORD_CLIENT_SECRET;
const creds = Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
const ORIGIN_PATH = process.env.ORIGIN_PATH;
const redirect = ORIGIN_PATH + '/api/discord/callback';

export default function handler(req, res) {
    const code = req.query.code

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic " + creds);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("client_id", CLIENT_ID);
    urlencoded.append("client_secret", CLIENT_SECRET);
    urlencoded.append("grant_type", "authorization_code");
    urlencoded.append("code", code);
    urlencoded.append("redirect_uri", redirect);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    const data = fetch("https://discord.com/api/oauth2/token", requestOptions)
        .then(response => response.json())
        .then(result => {
            res.redirect(ORIGIN_PATH + "/accounts/?token=" + result.access_token)
        })
        .catch(error => {
            console.log('error', error)
            res.json({ error: 'Failed to get token' })
        });
    
    
}
