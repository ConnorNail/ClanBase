import { Text, Anchor, Div } from "atomize";
import { useSession } from "next-auth/react"
import Link from 'next/link'

const LoginButtonDiscord = () => {
    const { data: session } = useSession()

    return (
        <Link href="/api/discord/login">
            <Anchor>
                <Div d="flex" align="center" p="0.5rem">
                    <Text textSize="subheader" textColor="cbWhite" hoverTextColor="cbBlue" style={{ whiteSpace: "nowrap" }}>
                        Sign in With Discord
                    </Text>
                </Div>
            </Anchor>
        </Link>
    )
}

export default LoginButtonDiscord