import useSWR from 'swr'
import getHeaders from '../useGetHeaders'
import React, { useState, useEffect } from 'react';

export default function useEditGroupGeneralSettings(membershipOption, newMembersOption, language, ggOption, adminSendInvites, adminEditCulture, adminsEditBanner, clanId, send, setSend) {
    const headers = getHeaders(false)

    const generalSettingsFetcher = (url) => fetch(url, {
        method: 'post',
        headers: headers,
        body: JSON.stringify({
            'membershipOption': membershipOption,
            'locale': language
        })
    }).then((res) => res.json())

    const { data: generalSettings } = useSWR(send ? 'https://www.bungie.net/Platform/GroupV2/' + clanId + '/Edit/' : null, generalSettingsFetcher)

    const founderSettingsFetcher = (url) => fetch(url, {
        method: 'post',
        headers: headers,
        body: JSON.stringify({
            'InvitePermissionOverride': adminSendInvites,
            'UpdateCulturePermissionOverride': adminEditCulture,
            'HostGuidedGamePermissionOverride': ggOption,
            'UpdateBannerPermissionOverride': adminsEditBanner,
            'JoinLevel': newMembersOption,

        })
    }).then((res) => res.json())

    const { data: founderSettings } = useSWR(send ? 'https://www.bungie.net/Platform/GroupV2/' + clanId + '/EditFounderOptions/' : null, founderSettingsFetcher)

    const data = { generalSettings, founderSettings }

    useEffect(() => {
        setSend(false)
    }, [generalSettings, founderSettings]);

    return data
}