import { Input, Icon, Dropdown, Div, Textarea, Text, Anchor, Button } from "atomize";
import React, { useState, useEffect } from 'react';
import WarningNotification from "../WarningNotification";
import SuccessNotification from "../SuccessNotification";
import getAvailableLocales from "../../functions/useGetAvailableLocales";
import DropdownSelect from "../DropdownSelect";
import CustomCheckbox from "../CustomCheckbox";
import editGroupGeneralSettings from "../../functions/useEditGroupGeneralSettings";

function checkStored(dataName) {
    const data = window.localStorage.getItem(dataName);
    if (data !== null) {
        return JSON.parse(data)
    } else {
        return null
    }
}

export default function GeneralSettings({ groupInfo, clanId }) {
    const [pendingSave, setPendingSave] = useState(false)

    const [clanJoinOptions, setClanJoinOptions] = useState(checkStored('JOIN_OPTIONS') !== null ? checkStored('JOIN_OPTIONS') : groupInfo?.Response?.results[0]?.group?.membershipOption)
    const [newMemberOptions, setNewMemberOptions] = useState(checkStored('NEW_MEMBER_OPTIONS') !== null ? checkStored('NEW_MEMBER_OPTIONS') : groupInfo?.Response?.results[0]?.group?.features?.joinLevel)
    const [language, setLanguage] = useState(checkStored('LANGUAGE') !== null ? checkStored('LANGUAGE') : groupInfo?.Response?.results[0]?.group?.locale)
    const [gg, setGG] = useState(checkStored('GG_OPTIONS') !== null ? checkStored('GG_OPTIONS') : groupInfo?.Response?.results[0]?.group?.features?.hostGuidedGamePermissionOverride)

    const [adminSendInvites, setAdminSendInvites] = useState(checkStored('ADMIN_INVITE_OPTIONS') !== null ? checkStored('ADMIN_INVITE_OPTIONS') : groupInfo?.Response?.results[0]?.group?.features?.invitePermissionOverride)
    const [adminEditCulture, setAdminEditCulture] = useState(checkStored('ADMIN_CULTURE_OPTIONS') !== null ? checkStored('ADMIN_CULTURE_OPTIONS') : groupInfo?.Response?.results[0]?.group?.features?.updateCulturePermissionOverride)
    const [adminsEditBanner, setAdminsEditBanner] = useState(checkStored('ADMIN_BANNER_OPTIONS') !== null ? checkStored('ADMIN_BANNER_OPTIONS') : groupInfo?.Response?.results[0]?.group?.features?.updateBannerPermissionOverride)

    console.log(groupInfo)

    const [success, setSuccess] = useState(false);
    const [warning, setWarning] = useState(false);
    const [throttle, setThrottle] = useState(false);

    // Get languages
    const allLanguages = getAvailableLocales()

    // Persist join options in local storage
    useEffect(() => {
        window.localStorage.setItem('JOIN_OPTIONS', JSON.stringify(clanJoinOptions));
    }, [clanJoinOptions]);

    // Persist new member options in local storage
    useEffect(() => {
        window.localStorage.setItem('NEW_MEMBER_OPTIONS', JSON.stringify(newMemberOptions));
    }, [newMemberOptions]);

    // Persist language in local storage
    useEffect(() => {
        window.localStorage.setItem('LANGUAGE', JSON.stringify(language));
    }, [language]);

    // Persist about us in local storage
    useEffect(() => {
        window.localStorage.setItem('GG_OPTIONS', JSON.stringify(gg));
    }, [gg]);

    // Persist admin invite options in local storage
    useEffect(() => {
        window.localStorage.setItem('ADMIN_INVITE_OPTIONS', JSON.stringify(adminSendInvites));
    }, [adminSendInvites]);

    // Persist admin edit culture options in local storage
    useEffect(() => {
        window.localStorage.setItem('ADMIN_CULTURE_OPTIONS', JSON.stringify(adminEditCulture));
    }, [adminEditCulture]);

    // Persist admin edit banner options in local storage
    useEffect(() => {
        window.localStorage.setItem('ADMIN_BANNER_OPTIONS', JSON.stringify(adminsEditBanner));
    }, [adminsEditBanner]);

    const { generalSettings, founderSettings } = editGroupGeneralSettings(clanJoinOptions, newMemberOptions, language, gg, adminSendInvites, adminEditCulture, adminsEditBanner, clanId, pendingSave, setPendingSave)

    useEffect(() => {
        if (generalSettings || founderSettings) {
            if (generalSettings?.ErrorCode == 1 && founderSettings?.ErrorCode == 1) {
                // Successful
                setSuccess(true)
            } else if (generalSettings?.MessageData?.ThrottleSecondsRemaining != 0 || founderSettings?.MessageData?.ThrottleSecondsRemaining != 0) {
                // Time remaining before next request can be made
                setThrottle(true)
            } else if (generalSettings?.ErrorCode != 1 || founderSettings?.ErrorCode != 1) {
                // Unable to complete action
                setWarning(true)
            }
        }
    }, [generalSettings, founderSettings])

    const displayJoinOptions = (value) => {
        switch (value) {
            case 0:
                return 'Approval Required'
            case 1:
                return 'Open Membership'
            case 2:
                return 'Invite Only'
        }
    }

    const displayMembershipLevel = (value) => {
        switch (value) {
            case 1:
                return 'Beginner'
            case 2:
                return 'Member'
        }
    }

    const displayLanguages = (value) => {
        switch (value) {
            case "de":
                return "Deutsch"
            case "en":
                return "English"
            case "es":
                return "Español"
            case "es-mx":
                return "Español (México)"
            case "fr":
                return "Français"
            case "it":
                return "Italiano"
            case "ja":
                return "日本語"
            case "ko":
                return "한국어"
            case "pl":
                return "Polski"
            case "pt-br":
                return "Português (Brasil)"
            case "ru":
                return "Русский"
            case "zh-chs":
                return "简体中文"
            case "zh-cht":
                return "繁體中文"
        }
    }

    const joinOptions = [0, 1, 2]

    const memberOptionsList = [1, 2]

    const languageList = (language) => {
        if (language) {
            let lans = []
            Object.keys(language).forEach(key => {
                lans.push(language[key])
            })
            return lans
        } else {
            return null
        }
    }

    const ggList = [1, 2]

    return (
        <>
            <Div p={{ x: "1rem", y: "0.5rem" }} d="flex" flexDir="column" flexWrap="wrap">
                <Div m={{ b: "0.5rem" }}>
                    <Text textColor="cbWhite" textSize="heading">
                        General Settings
                    </Text>
                </Div>
                <Div m={{ x: "1rem" }}>
                    <Div m={{ b: "1.5rem" }}>
                        <Div d="flex" align="center" m={{ y: "0.5rem" }} flexWrap="wrap">
                            <Text textColor="cbWhite" textSize="subheader" minW="15rem">
                                Clan Join Options
                            </Text>
                            <DropdownSelect value={clanJoinOptions} setValue={setClanJoinOptions} list={joinOptions} display={displayJoinOptions} />
                        </Div>

                        <Div d="flex" align="center" m={{ y: "0.5rem" }} flexWrap="wrap">
                            <Text textColor="cbWhite" textSize="subheader" minW="15rem">
                                New Member Level
                            </Text>
                            <DropdownSelect value={newMemberOptions} setValue={setNewMemberOptions} list={memberOptionsList} display={displayMembershipLevel} />
                        </Div>

                        <Div d="flex" align="center" m={{ y: "0.5rem" }} flexWrap="wrap">
                            <Text textColor="cbWhite" textSize="subheader" minW="15rem">
                                Clan Language
                            </Text>
                            <DropdownSelect value={language} setValue={setLanguage} list={languageList(allLanguages?.Response)} display={displayLanguages} />
                        </Div>

                        <Div d="flex" align="center" m={{ y: "0.5rem" }} flexWrap="wrap">
                            <Text textColor="cbWhite" textSize="subheader" minW="15rem">
                                Level Required for Guided Games
                            </Text>
                            <DropdownSelect value={gg} setValue={setGG} list={ggList} display={displayMembershipLevel} />
                        </Div>
                    </Div>

                    <Div>
                        <CustomCheckbox toggleState={adminSendInvites} setToggleState={setAdminSendInvites}>
                            Allow Admins to Send Clan Invites
                        </CustomCheckbox>
                        <CustomCheckbox toggleState={adminEditCulture} setToggleState={setAdminEditCulture}>
                            Allow Admins to Edit Clan Culture Settings
                        </CustomCheckbox>
                        <CustomCheckbox toggleState={adminsEditBanner} setToggleState={setAdminsEditBanner}>
                            Allow Admins to Edit the Clan Banner
                        </CustomCheckbox>
                    </Div>

                    <Div d="flex" justify="flex-end" m={{ t: "1.5rem" }}>
                        <Button bg="cbGrey1" textColor="cbWhite" hoverTextColor="cbBlue" textSize="subheader" onClick={() => setPendingSave(true)}>
                            Save
                        </Button>
                    </Div>
                </Div>
            </Div>
            <SuccessNotification success={success} setSuccess={setSuccess}>
                SUCCESS
                <br />
                <br />
                It may take some time for this change to take effect.
            </SuccessNotification>
            <WarningNotification warning={warning} setWarning={setWarning}>
                ERROR
                <br />
                <br />
                Please try again later
            </WarningNotification>
            <WarningNotification warning={throttle} setWarning={setThrottle}>
                ERROR
                <br />
                <br />
                Please wait wait a few minutes before trying again.
            </WarningNotification>
        </>
    )
}