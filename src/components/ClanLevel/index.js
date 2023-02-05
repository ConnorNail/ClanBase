import { Text, Div, Icon, Row, Col } from "atomize";

export default function ClanLevel({ clanInfo }) {

    const clanCurentLevel = clanInfo?.Response?.detail?.clanInfo?.d2ClanProgressions[584850370]?.level
    const progressToNextLevel = clanInfo?.Response?.detail?.clanInfo?.d2ClanProgressions[584850370]?.progressToNextLevel
    const nextLevelAt = clanInfo?.Response?.detail?.clanInfo?.d2ClanProgressions[584850370]?.nextLevelAt
    const weeklyLimit = clanInfo?.Response?.detail?.clanInfo?.d2ClanProgressions[584850370]?.weeklyLimit
    const weeklyProgress = clanInfo?.Response?.detail?.clanInfo?.d2ClanProgressions[584850370]?.weeklyProgress

    let completed = 0

    if (nextLevelAt === 0) {
        completed = 100;
    } else if (nextLevelAt) {
        completed = (100 * progressToNextLevel) / nextLevelAt;
    } else {
        completed = 0;
    }

    return (
        <Div>
            <Div d="flex" align="center" m="1rem">
                <Div h="2.5rem" w="2.5rem" bg="cbGrey3" border="3px solid" borderColor="cbGrey2" shadow="2" rounded="xs" transform='rotate(45deg)' d="flex" justify="center" align="center">
                    <Div h="1.5rem" w="1.5rem" bg="cbGrey2" rounded="xs" d="flex" justify="center" align="center" p={{ r: "2px", b: "2px", t: "2px", l: "2px" }}>
                        <Text textSize="heading" textColor="cbWhite" textAlign="center" transform='rotate(-45deg)'>
                            {clanCurentLevel ?
                                clanCurentLevel :
                                <Icon name="Loading3" size="20px" color="cbWhite" transform='translateY(15%)' />}
                        </Text>
                    </Div>
                </Div>
                <Div bg="cbGrey2" h="1rem" w="100%" rounded="md" m={{ l: "-1rem" }}>
                    <Div bg="cbBlue" h="100%" rounded="md" w={completed + '%'} p={{ r: "0.5rem" }} transition>
                        <Text textAlign="right" textColor="cbGrey1">
                            {completed >= 7 ?
                                completed + '%' :
                                null}
                        </Text>
                    </Div>
                </Div>
            </Div>
            <Div d="flex">
                <Div d="flex" m={{ x: "1rem" }}>
                    {clanCurentLevel != 6 ?
                        <>
                            <Text textColor="cbGrey3" textSize="subheader" p={{ r: "0.5rem" }}>
                                Weekly Clan XP
                            </Text>
                            <Text textColor="cbBlue" textSize="subheader">
                                {clanInfo && weeklyProgress && weeklyLimit ?
                                    weeklyProgress.toLocaleString() + '/' + weeklyLimit.toLocaleString() :
                                    <Icon name="Loading3" size="20px" color="cbBlue" transform='translateY(15%)' />
                                }
                            </Text>
                        </>
                        :
                        null
                    }
                </Div>
            </Div>
        </Div>
    )
}