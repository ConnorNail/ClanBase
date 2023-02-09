import getCurrentSeasonHash from '../getClanMemberCharacterSeasonalTimeStats/useGetCurrentSeasonHash';
import getSeasonInfo from '../getClanMemberCharacterSeasonalTimeStats/useGetSeasonInfo';
import createSubDateArray from '../getClanMemberCharacterSeasonalTimeStats/createSubDateArray';
import getAllCharacterStats from '../getClanMemberCharacterSeasonalTimeStats/useGetAllCharacterStats';
import calcMemberSeasonalTime from '../calcMemberSeasonalTime';
import calcMemberSeasonalActivityTime from '../calcMemberSeasonalActivityTime';
import useCalcDiscordTimeData from '../useCalcDiscordTimeData';

export default function useGetClanMemberDiscordSeasonalTimeStats(memberInfo, memberProfiles) {
  const currentSeasonHash = getCurrentSeasonHash();
  const currentSeasonInfo = getSeasonInfo(currentSeasonHash);
  const dateArray = createSubDateArray(currentSeasonInfo?.Response?.startDate, currentSeasonInfo?.Response?.endDate);

  const allCharacterStats = getAllCharacterStats(memberProfiles, dateArray)

  const memberSeasonalTime = calcMemberSeasonalActivityTime(allCharacterStats, memberProfiles, memberInfo)

  const discordCombinedData= useCalcDiscordTimeData(memberSeasonalTime)

  return discordCombinedData
}