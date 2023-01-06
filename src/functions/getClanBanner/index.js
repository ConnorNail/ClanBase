import useSWR from 'swr'

export default function getClanBanner( clanInfo ) {
    
    const headers = {'X-API-Key': process.env.NEXT_PUBLIC_BUNGIE_API_KEY}

    const clanBannerData = clanInfo?.Response?.detail?.clanInfo?.clanBannerData

    const fetcher = ([url, header]) => fetch(url, {headers: header}).then((res) => res.json())

    const { data, error } = useSWR( ['https://www.bungie.net/Platform/Destiny2/Clan/ClanBannerDictionary/', headers], fetcher )

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