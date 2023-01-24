import getClanMemberInfo from './useGetClanMemberInfo';
import getAllMembersProfile from './useGetAllMembersProfile';

export default function getClanMemberProfileInfo(clanid) {

  const clanMemberInfo = getClanMemberInfo(clanid)

  const clanMemberProfileInfo = getAllMembersProfile(clanMemberInfo)

  return clanMemberProfileInfo
}