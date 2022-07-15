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

    let loggedIn = false;

    if (userLoggedIn()) {
        loggedIn = true;
        console.log("Logged In!", loggedIn);
    }

    useEffect(() => {
        if (localStorage.getItem("access_token") == null || localStorage.getItem("access_token") == 'undefined') {
            getAccessToken(code.code);
        } else {
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
    // try {
    const { code } = context.query
    // } catch (error) {
    //     const code = ''
    //     console.error(error)
    // }

    return {
        props: {
            code: code
        }
    }
}