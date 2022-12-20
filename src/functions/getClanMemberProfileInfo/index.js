import getClanMemberInfo from './getClanMemberInfo';
import getAllMembersProfile from './getAllMembersProfile';
import getAuthInfo from '../../functions/getAuthInfo';
import { useRouter } from 'next/router';

export default function getClanMemberProfileInfo() {

  const router = useRouter();

  const headers = getAuthInfo(false, router);

  const clanMemberInfo = getClanMemberInfo(2084197, headers, router); // Replace clan id with variable ********************************************
  const clanMemberProfileInfo = getAllMembersProfile(clanMemberInfo, headers, router);

  console.log(clanMemberProfileInfo)

  return clanMemberProfileInfo
}