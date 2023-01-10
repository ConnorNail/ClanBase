import getCurrentSeasonHash from './getCurrentSeasonHash';
import getSeasonInfo from './getSeasonInfo';
import createSubDateArray from './createSubDateArray';
import getAllCharacterStats from './getAllCharacterStats';
import getHeaders from '../getHeaders';
import calcMemberSeasonalTime from '../calcMemberSeasonalTime';

export default function getClanMemberStatsInfo(memberInfo, memberProfiles) {
  const headers = getHeaders(false)

  const currentSeasonHash = getCurrentSeasonHash();
  const currentSeasonInfo = getSeasonInfo(currentSeasonHash);
  const dateArray = createSubDateArray(currentSeasonInfo?.Response?.startDate, currentSeasonInfo?.Response?.endDate);

  const allCharacterStats = getAllCharacterStats(memberProfiles, dateArray)

  const memberSeasonalTime = calcMemberSeasonalTime(allCharacterStats, memberProfiles, memberInfo)

  return memberSeasonalTime
}