import { styled, useStyletron } from 'styletron-react'
import DefaultTemplate from '../../components/DefaultLayout'
import LoginButton from '../../components/LoginButton'
import { Row, Col, Div, Text, Image, Container, Anchor, Icon } from "atomize";

export default function Login( code, token) {
    // an alternative hook based API
    const [css] = useStyletron()

    console.log(token)

    return (
        <DefaultTemplate>
            <Div h="100vh" bgImg="../destinybackground.png" bgPos="top" bgSize="auto" bgRepeat="no-repeat" m={{ l: "-0.5rem", r: "-0.5rem" }}>
                <LoginButton/>
            </Div>
        </DefaultTemplate>
    )
}

export async function getServerSideProps(context) {
    const { code } = context.query

    const encodedString = Buffer.from(/*process.env.BUNGIE_CLIENT_ID*/ '37316' + ':' + 'FlLSqv37Ry3Hi4x4DirTk3gisQWAcTFihfiJHT6SPt8' /*process.env.BUNGIE_SECRET*/).toString('base64');

    const token = await fetch('https://www.bungie.net/Platform/App/OAuth/Token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + encodedString,
            'X-API-Key': '3a85f7e1a4444ec1865efb39ef019313'
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

    return {
        props: {
            code: code,
            token: token
        }
    }
}