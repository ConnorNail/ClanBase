import { styled, useStyletron } from 'styletron-react'
import DefaultTemplate from '../../components/DefaultLayout'
import LoginButton from '../../components/LoginButton'
import userLoggedIn from '../../functions/userLoggedIn'
import getAccessToken from '../../functions/getAccessToken'
import { useRouter } from 'next/router'
import { Row, Col, Div, Text, Image, Container, Anchor, Icon } from "atomize";
import React, { useEffect } from "react";

export default function Login(code) {
    // an alternative hook based API
    const [css] = useStyletron();

    const router = useRouter();

    useEffect(() => {
        // If there is no valid access_token
        if (localStorage.getItem("access_token") == null || localStorage.getItem("access_token") == 'undefined' || typeof localStorage.getItem("access_token") == 'undefined') {
            // If there is a code get access_token
            if (code !== '') {
                getAccessToken(code.code.code, router);
            }
        } else {
            // If there is a valid access_token route to home page
            router.push('/')
        }
    }, [])

    return (
        <DefaultTemplate>
            <Div h="100vh" bgImg="../destinybackground.png" bgPos="top" bgSize="auto" bgRepeat="no-repeat" m={{ l: "-0.5rem", r: "-0.5rem" }}>
                <LoginButton />
            </Div>
        </DefaultTemplate>
    )
}

export async function getServerSideProps(context) {
    const code = context.query

    return {
        props: {
            code: code
        }
    }
}