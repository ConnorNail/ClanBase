import { styled, useStyletron } from 'styletron-react'
import { Button } from "atomize";

const LoginButton = ({ children }) => {
    const [css] = useStyletron()
    console.log(process.env.BUNGIE_CLIENT_ID)
    return (
        <Button
            h="3.5rem"
            p={{ x: "1.5rem" }}
            textSize="body"
            textColor="info700"
            hoverTextColor="info900"
            bg="white"
            hoverBg="info200"
            border="1px solid"
            borderColor="info700"
            hoverBorderColor="info900"
            m={{ r: "0.5rem" }}
            onClick={() => location.assign("https://www.bungie.net/en/OAuth/Authorize?client_id=37316&response_type=code")}
        >
            Login
        </Button>
    )
}

export default LoginButton