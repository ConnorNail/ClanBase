import useSWR from 'swr'

export default function useLinkBungieAndDiscord(discordId, discordName, discordDiscriminator, membershipId, membershipType, clanId, send) {

    const fetcher = (url) => fetch(url, {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            'discordId': discordId,
            'discordName': discordName,
            'discordDiscriminator': discordDiscriminator,
            'destinyMembershipId': membershipId,
            'destinyMembershipType': membershipType,
            'clanId': clanId,
        })
    }).then((res) => res.json())

    const { data, error } = useSWR(send ? window.location.origin + '/api/LinkBungieAndDiscord' : null, fetcher)

    return data
}