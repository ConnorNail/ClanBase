import useSWR from 'swr'

export default function useIndividualMembersIds(destinyMembershipId) {

    const fetcher = (url) => fetch(url).then((res) => res.json())

    const { data, error } = useSWR(destinyMembershipId ? window.location.origin + '/api/IndividualMemberIds?destinyMembershipId=' + destinyMembershipId : null, fetcher)

    return data
}