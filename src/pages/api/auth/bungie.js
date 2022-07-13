import { useRouter } from 'next/router'

export default function handler(req, res) {
    const { code } = req.query

    // const search = async () => {
    //     await fetch('https://www.bungie.net/Platform/App/OAuth/Token/', { method: 'post', headers, body: JSON.stringify({
    //         'Authorization': Basic {base64encoded(client-id:client-secret)},
    //         'groupType': 1,
    //     })})
    //     .then((res) => res.json())
    //     .then((data) => {
    //         console.log(data)
    //         router.push('/'+data.Response.detail.groupId)
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })
    // }
    const encodedString = Buffer.from(/*process.env.BUNGIE_CLIENT_ID*/ '37316' + ':' + 'FlLSqv37Ry3Hi4x4DirTk3gisQWAcTFihfiJHT6SPt8' /*process.env.BUNGIE_SECRET*/).toString('base64');


    const data = fetch('https://www.bungie.net/Platform/App/OAuth/Token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + encodedString
        },
        body: new URLSearchParams({
            'client_id': /*process.env.BUNGIE_CLIENT_ID*/ "37316",
            'grant_type': "authorization_code",
            'code': code
        }).toString()
    }).then(function (response) {
        console.log(response);
        return response.json();
    });

    res.status(200).json({ id: data /*process.env.BUNGIE_CLIENT_ID*/ })
}