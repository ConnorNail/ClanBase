import getCurrentSeasonHash from './getCurrentSeasonHash';
import getSeasonInfo from './getSeasonInfo';
import createSubDateArray from './createSubDateArray';
import getAllCharacterStats from './getAllCharacterStats';
import getAuthInfo from '../../functions/getAuthInfo';
import { useRouter } from 'next/router';
import getHeaders from '../getHeaders';

export default function getClanMemberStatsInfo(clanMemberProfileInfo) {
  const router = useRouter();

  const headers = getHeaders(false)

  const currentSeasonHash = getCurrentSeasonHash(headers, router);
  const currentSeasonInfo = getSeasonInfo(currentSeasonHash, headers, router);
  const dateArray = createSubDateArray(currentSeasonInfo.startDate, currentSeasonInfo.endDate);

  const clanMemberStatsInfo = getAllCharacterStats(clanMemberProfileInfo, dateArray, headers, router);

  return clanMemberStatsInfo
}