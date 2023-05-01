import getRecentChar from "../../../functions/getRecentChar";

function formatData(clanMemberProfile, statId) {
  const characters = clanMemberProfile?.Response?.characters;
  const userInfo = clanMemberProfile?.Response?.profile?.data?.userInfo;
  const metricsData = clanMemberProfile?.Response?.metrics?.data?.metrics[statId]?.objectiveProgress;

  const data = {
    playerName: userInfo?.bungieGlobalDisplayName
      ? `${userInfo.bungieGlobalDisplayName}#${userInfo.bungieGlobalDisplayNameCode}`
      : userInfo?.displayName,
    profilePicture: `https://www.bungie.net${clanMemberProfile?.Response?.characters?.data[getRecentChar(characters)]?.emblemPath}`,
    stat: metricsData === undefined ? 'Unavailable' : metricsData,
  };

  return data;
}

export default function prepareMetricTable(clanMemberProfiles, statId) {
  if (clanMemberProfiles) {
    const propertyHash = clanMemberProfiles[0]?.Response?.metrics?.data?.metrics[statId]?.objectiveProgress?.objectiveHash;

    const convertedDataArray = clanMemberProfiles.map((clanMemberProfile) => {
      return formatData(clanMemberProfile, statId);
    });

    return convertedDataArray;
  } else {
    return null;
  }
}
