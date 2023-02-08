import useSWR from 'swr'

export default function useIndividualMembersIds(destinyMembershipId, destinyMembershipType) {

    const fetcher = (url) => fetch(url).then((res) => res.json())

    const { data, error } = useSWR(destinyMembershipId && destinyMembershipType ? window.location.origin + '/api/IndividualMemberIds?destinyMembershipId=' + destinyMembershipId + '&destinyMembershipType=' + destinyMembershipType : null, fetcher)

    return data
}