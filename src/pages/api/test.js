const CLIENT_ID = process.env.NEXT_DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_DISCORD_CLIENT_SECRET;
const creds = Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
const ORIGIN_PATH = process.env.ORIGIN_PATH;
const redirect = ORIGIN_PATH + '/api/discord/callback';

async function test() {
    var myHeaders = new Headers();
    myHeaders.append("X-API-Key", "3a85f7e1a4444ec1865efb39ef019313");
    myHeaders.append("Cookie", "Q6dA7j3mn3WPBQVV6Vru5CbQXv0q+I9ddZfGro+PognXQwjWM8PS+VE_=v1tthRgw__61o; __cflb=04dToX7HjFoF4QAzoaHehFaMj5fkjPR3bx1f2DaiFd; bungleanon=sv=BAAAAADJUQAAAAAAAObggwEAAAAAAAAAAAAAAAAAD34FiQbbCEAAAABqy4j8lDth2znGa7XEhoYhstd5QH7W+V2M3RsmQ3Pl+b2MtzxGrtA485VEzMfolCv9DCYiNw/67lYeEHJExUMk&cl=MC4yMDkzNy4yNTQyMDAwNg==; bungled=8513332249439281753; bungledid=B+Nmneouiz5LpCKmRqJmfeMAD34FiQbbCAAA");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const data = await fetch("https://www.bungie.net/Platform/GroupV2/2084197/Members", requestOptions)
        .then(response => response.text())
        .then(result => {return(result)})
        .catch(error => console.log('error', error));

    return data
}

export default async function handler(req, res) {
    const code = req.query.code

    const data = await test()

    console.log(data)


}
