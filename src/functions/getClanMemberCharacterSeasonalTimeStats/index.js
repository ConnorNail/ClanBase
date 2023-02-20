import getCurrentSeasonHash from './useGetCurrentSeasonHash';
import getSeasonInfo from './useGetSeasonInfo';
import createSubDateArray from './createSubDateArray';
import getAllCharacterStats from './useGetAllCharacterStats';
import calcMemberSeasonalTime from '../calcMemberSeasonalTime';
import calcMemberSeasonalActivityTime from '../calcMemberSeasonalActivityTime';

export default function getClanMemberCharacterSeasonalTimeStats(memberInfo, memberProfiles) {
  const currentSeasonHash = getCurrentSeasonHash();
  const currentSeasonInfo = getSeasonInfo(currentSeasonHash);
  const dateArray = createSubDateArray(currentSeasonInfo?.Response?.startDate, currentSeasonInfo?.Response?.endDate);

  const allCharacterStats = getAllCharacterStats(memberProfiles, dateArray)

  const memberSeasonalTime = calcMemberSeasonalActivityTime(allCharacterStats, memberProfiles, memberInfo)

  return memberSeasonalTime
}