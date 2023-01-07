import { Button } from "atomize";
import { useSession, signIn, signOut } from "next-auth/react"

const LoginButton = () => {
    const { data: session } = useSession()
    console.log(session)
    if (session) {
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
                onClick={() => signOut()}
            >
                Signed in as {session.user.name}
            </Button>
        )
    } else {
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
                onClick={() => signIn()}
            >
                Login
            </Button>
        )
    }
}

export default LoginButton