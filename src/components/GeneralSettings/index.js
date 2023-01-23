import { Input, Icon, Dropdown, Div, Textarea, Text, Anchor, Button } from "atomize";
import React, { useState, useEffect } from 'react';
import editGroupCultureSettings from "../../functions/editGroupCultureSettings";
import WarningNotification from "../WarningNotification";
import SuccessNotification from "../SuccessNotification";
import getAvailableLocales from "../../functions/getAvailableLocales";
import DropdownSelect from "../DropdownSelect";
import CustomCheckbox from "../CustomCheckbox";
import editGroupGeneralSettings from "../../functions/editGroupGeneralSettings";

export default function GeneralSettings({ groupInfo, clanId }) {
    const [pendingSave, setPendingSave] = useState(false)

    const [clanJoinOptions, setClanJoinOptions] = useState(groupInfo?.Response?.results[0]?.group?.membershipOption)
    const [newMemberOptions, setNewMemberOptions] = useState(groupInfo?.Response?.results[0]?.group?.features?.joinLevel)
    const [language, setLanguage] = useState(groupInfo?.Response?.results[0]?.group?.locale)
    const [gg, setGG] = useState(groupInfo?.Response?.results[0]?.group?.features?.hostGuidedGamePermissionOverride)

    const [adminSendInvites, setAdminSendInvites] = useState(groupInfo?.Response?.results[0]?.group?.features?.invitePermissionOverride)
    const [adminEditCulture, setAdminEditCulture] = useState(groupInfo?.Response?.results[0]?.group?.features?.updateCulturePermissionOverride)
    const [adminsEditBanner, setAdminsEditBanner] = useState(groupInfo?.Response?.results[0]?.group?.features?.updateBannerPermissionOverride)

    const [success, setSuccess] = useState(false);
    const [warning, setWarning] = useState(false);
    const [throttle, setThrottle] = useState(false);

    // Get languages
    const allLanguages = getAvailableLocales()

    // Persist join options in local storage
    useEffect(() => {
        const data = window.localStorage.getItem('JOIN_OPTIONS');
        if (data !== null) setClanJoinOptions(JSON.parse(data));
    }, []);
    useEffect(() => {
        window.localStorage.setItem('JOIN_OPTIONS', JSON.stringify(clanJoinOptions));
    }, [clanJoinOptions]);

    // Persist new member options in local storage
    useEffect(() => {
        const data = window.localStorage.getItem('NEW_MEMBER_OPTIONS');
        if (data !== null) setNewMemberOptions(JSON.parse(data));
    }, []);
    useEffect(() => {
        window.localStorage.setItem('NEW_MEMBER_OPTIONS', JSON.stringify(newMemberOptions));
    }, [newMemberOptions]);

    // Persist language in local storage
    useEffect(() => {
        const data = window.localStorage.getItem('LANGUAGE');
        if (data !== null) setLanguage(JSON.parse(data));
    }, []);
    useEffect(() => {
        window.localStorage.setItem('LANGUAGE', JSON.stringify(language));
    }, [language]);

    // Persist about us in local storage
    useEffect(() => {
        const data = window.localStorage.getItem('GG_OPTIONS');
        if (data !== null) setGG(JSON.parse(data));
    }, []);
    useEffect(() => {
        window.localStorage.setItem('GG_OPTIONS', JSON.stringify(gg));
    }, [gg]);

    // Persist admin invite options in local storage
    useEffect(() => {
        const data = window.localStorage.getItem('ADMIN_INVITE_OPTIONS');
        if (data !== null) setAdminSendInvites(JSON.parse(data));
    }, []);
    useEffect(() => {
        window.localStorage.setItem('ADMIN_INVITE_OPTIONS', JSON.stringify(adminSendInvites));
    }, [adminSendInvites]);

    // Persist admin edit culture options in local storage
    useEffect(() => {
        const data = window.localStorage.getItem('ADMIN_CULTURE_OPTIONS');
        if (data !== null) setAdminEditCulture(JSON.parse(data));
    }, []);
    useEffect(() => {
        window.localStorage.setItem('ADMIN_CULTURE_OPTIONS', JSON.stringify(adminEditCulture));
    }, [adminEditCulture]);

    // Persist admin edit banner options in local storage
    useEffect(() => {
        const data = window.localStorage.getItem('ADMIN_BANNER_OPTIONS');
        if (data !== null) setAdminsEditBanner(JSON.parse(data));
    }, []);
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
            } else {
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
                <Text textColor="cbWhite" textSize="heading">
                    General Settings
                </Text>
                <Div m={{ x: "1rem" }}>
                    <Div m={{ b: "1.5rem" }}>
                        <Text textColor="cbWhite" textSize="title" m={{ y: "0.5rem" }}>
                            Clan Join Options
                        </Text>
                        {/* <DropdownSelect open={clanJoinOptionsOpen} setOpen={setClanJoinOptionsOpen} label={displayJoinOptions(clanJoinOptions)} items={joinOptionsMenu()} /> */}
                        <DropdownSelect value={clanJoinOptions} setValue={setClanJoinOptions} list={joinOptions} display={displayJoinOptions} />

                        <Text textColor="cbWhite" textSize="title" m={{ y: "0.5rem" }}>
                            New Member Level
                        </Text>
                        <DropdownSelect value={newMemberOptions} setValue={setNewMemberOptions} list={memberOptionsList} display={displayMembershipLevel} />

                        <Text textColor="cbWhite" textSize="title" m={{ y: "0.5rem" }}>
                            Clan Language
                        </Text>
                        <DropdownSelect value={language} setValue={setLanguage} list={languageList(allLanguages?.Response)} display={displayLanguages} />

                        <Text textColor="cbWhite" textSize="title" m={{ y: "0.5rem" }}>
                            Level Required for Guided Games
                        </Text>
                        <DropdownSelect value={gg} setValue={setGG} list={ggList} display={displayMembershipLevel} />
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

                    <Button bg="cbGrey1" textColor="cbWhite" hoverTextColor="cbBlue" textSize="subheader" m={{ t: "1.5rem" }} onClick={() => setPendingSave(true)}>
                        Save
                    </Button>
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
                {/* Please wait {groupCultureSettings?.MessageData?.ThrottleSecondsRemaining} minutes before trying again. */}
            </WarningNotification>
        </>
    )
}