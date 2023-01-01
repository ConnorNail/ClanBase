import getClanMemberInfo from './getClanMemberInfo';
import getAllMembersProfile from './getAllMembersProfile';

export default function getClanMemberProfileInfo(clanid) {

  const clanMemberInfo = getClanMemberInfo(clanid)

  const clanMemberProfileInfo = getAllMembersProfile(clanMemberInfo)

  return clanMemberProfileInfo
}