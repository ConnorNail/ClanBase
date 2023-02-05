import { Text, Anchor, Button, Image } from "atomize";
import Link from 'next/link'

export default function LoginButtonDiscord() {

    return (
        <Link href={"/api/discord/login"}>
            <Anchor>
                <Button p="0.5rem" h="3rem" shadow="2" hoverShadow="4" bg="#5865F2" rounded="md" transition>
                    <Text textSize="subheader" textColor="cbWhite" style={{ whiteSpace: "nowrap" }} p={{ r: "0.5rem" }}>
                        Sign in With Discord
                    </Text>
                    <Image src="discord.svg" alt="discord" h="1.5rem" w="auto"/>
                </Button>
            </Anchor>
        </Link>
    )
}