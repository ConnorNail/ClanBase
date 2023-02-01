import { Button, Image, Text, Div, Icon, Dropdown } from "atomize";
import { useSession, signIn, signOut } from "next-auth/react"
import React, { useState } from 'react';

const LoginButtonStyled = () => {
    const { data: session, status } = useSession()

    if (session) {
        return (
            <Button
                h="3.5rem"
                p="0.5rem"
                bg="cbTransparent"
                onClick={() => signIn('bungie')}
            >
                <Div d="flex" align="center">
                    <Text textSize="subheader" textColor="cbWhite" hoverTextColor="cbBlue" style={{ whiteSpace: "nowrap" }}>
                        Sign in With Bungie
                    </Text>
                </Div>
            </Button>
        )
    } else {
        return (
            <Button
                h="3.5rem"
                p="0.5rem"
                bg="cbTransparent"
                onClick={() => signIn('bungie')}
            >
                <Div d="flex" align="center">
                    <Text textSize="subheader" textColor="cbWhite" hoverTextColor="cbBlue" style={{ whiteSpace: "nowrap" }}>
                        Sign in With Bungie
                    </Text>
                </Div>
            </Button>
        )
    }
}

export default LoginButtonStyled