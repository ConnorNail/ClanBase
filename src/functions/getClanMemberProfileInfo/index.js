import { styled, useStyletron } from 'styletron-react';
import getClanMemberInfo from './getClanMemberInfo';
import getAllMembersProfile from './getAllMembersProfile';
import getAuthInfo from '../../functions/getAuthInfo';
import { useRouter } from 'next/router';

export default function getClanMemberProfileInfo() {
  // an alternative hook based API
  const [css] = useStyletron()

  const router = useRouter();

  const headers = getAuthInfo(false, router);

  const clanMemberInfo = getClanMemberInfo(2084197, headers, router); // Replace clan id with variable ********************************************
  const clanMemberProfileInfo = getAllMembersProfile(clanMemberInfo, headers, router);

  console.log(clanMemberProfileInfo)

  return clanMemberProfileInfo
}