import useSWR from 'swr'
import getHeaders from '../useGetHeaders'

export default function useGetClanBanner( clanInfo ) {
    
    const headers = getHeaders(false)

    const clanBannerData = clanInfo?.Response?.detail?.clanInfo?.clanBannerData

    const fetcher = ([url, header]) => fetch(url, {headers: header}).then((res) => res.json())

    const { data, error } = useSWR(clanInfo ? ['https://www.bungie.net/Platform/Destiny2/Clan/ClanBannerDictionary/', headers] : null, fetcher )

    const clanBannerDetails = {
        clanDecalForegroundURL: data?.Response?.clanBannerDecals[clanBannerData?.decalId]?.foregroundPath,
        clanDecalBackgroundURL: data?.Response?.clanBannerDecals[clanBannerData?.decalId]?.backgroundPath,
        clanDecalColors: data?.Response?.clanBannerDecalPrimaryColors[clanBannerData?.decalColorId],
        clanDecalBackgroundColors: data?.Response?.clanBannerDecalSecondaryColors[clanBannerData?.decalBackgroundColorId],
        clanGonfalonURL: data?.Response?.clanBannerGonfalons[clanBannerData?.gonfalonId],
        clanGonfalonColors: data?.Response?.clanBannerGonfalonColors[clanBannerData?.gonfalonColorId],
        clanGonfalonDetailsURL: data?.Response?.clanBannerGonfalonDetails[clanBannerData?.gonfalonDetailId],
        clanGonfalonDetailsColors: data?.Response?.clanBannerGonfalonDetailColors[clanBannerData?.gonfalonDetailColorId],
      }

    return clanBannerDetails
}