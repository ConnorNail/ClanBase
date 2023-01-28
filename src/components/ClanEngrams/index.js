import { Text, Div, Image, Icon, Row, Col } from "atomize";
import getClanWeeklyRewards from "../../functions/useGetClanWeeklyRewards";
import getClanEngramMilestone from "../../functions/useGetClanEngramMilestone";

export default function ClanEngrams({ clanId }) {

    const urlStart = "https://www.bungie.net"

    const clanWeeklyRewards = getClanWeeklyRewards(clanId)

    const milestoneHash = clanWeeklyRewards?.Response?.milestoneHash

    const clanEngramMilestone = getClanEngramMilestone(milestoneHash)

    let clanRewards = []

    if (clanEngramMilestone) {
        Object.values(clanEngramMilestone?.Response?.rewards[1064137897]?.rewardEntries).forEach(reward => {
            clanRewards.push(reward)
        });
    }

    let levelsCompletedStyle = {}

    if (clanWeeklyRewards) {
        const clanRewardResults = clanWeeklyRewards?.Response?.rewards[0].entries
        for (let i = 0; i < clanRewardResults.length; i++) {
            if (clanRewardResults[i].earned) {
                levelsCompletedStyle[clanRewardResults[i]?.rewardEntryHash] = "cbBlue"
            } else {
                levelsCompletedStyle[clanRewardResults[i]?.rewardEntryHash] = "cbGrey2"
            }
        }
    }

    return (
        <Div d="flex" justify="center" flexWrap="wrap">
            {clanWeeklyRewards && clanWeeklyRewards ?
                clanRewards.map((reward, index) => (
                    <Div key={index} m="1rem" w="4rem" d="flex" flexDir="column" align="center" rounded="md" border="3px solid" borderColor={levelsCompletedStyle[reward?.rewardEntryHash]}>
                        <Image h={{ xs: "2.5rem", md: "3rem" }} w="auto" src={urlStart + reward?.displayProperties?.icon} alt="clan engrams"/>
                        <Text textAlign="center" textColor="cbWhite" textSize="caption">
                            {reward?.displayProperties?.name}
                        </Text>
                    </Div>
                )) :
                <Icon name="Loading3" size="30px" color="cbWhite" transform='translateY(15%)' />}
        </Div>
    )
}