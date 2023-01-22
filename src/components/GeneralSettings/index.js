import { Input, Icon, Dropdown, Div, Textarea, Text, Inpu, Button } from "atomize";
import React, { useState, useEffect } from 'react';
import editGroupCultureSettings from "../../functions/editGroupCultureSettings";
import WarningNotification from "../WarningNotification";
import SuccessNotification from "../SuccessNotification";

export default function GeneralSettings({ groupInfo, clanId }) {
    const [pendingSave, setPendingSave] = useState(false)
    const [clanJoinOptionsOpen, setClanJoinOptionsOpen] = useState(false)
    const [clanJoinOptions, setClanJoinOptions] = useState(groupInfo?.Response?.results[0]?.group?.name)
    const [callsign, setCallsign] = useState(groupInfo?.Response?.results[0]?.group?.clanInfo?.clanCallsign)
    const [motto, setMotto] = useState(groupInfo?.Response?.results[0]?.group?.motto)
    const [about, setAbout] = useState(groupInfo?.Response?.results[0]?.group?.about)
    const [success, setSuccess] = useState(false);
    const [warning, setWarning] = useState(false);
    const [throttle, setThrottle] = useState(false);

    // Persist clan name in local storage
    useEffect(() => {
        const data = window.localStorage.getItem('JOIN_OPTIONS');
        if (data !== null) setClanJoinOptions(JSON.parse(data));
    }, []);
    useEffect(() => {
        window.localStorage.setItem('JOIN_OPTIONS', JSON.stringify(clanJoinOptions));
    }, [clanJoinOptions]);

    // Persist callsign in local storage
    useEffect(() => {
        const data = window.localStorage.getItem('CALLSIGN');
        if (data !== null) setCallsign(JSON.parse(data));
    }, []);
    useEffect(() => {
        window.localStorage.setItem('CALLSIGN', JSON.stringify(callsign));
    }, [callsign]);

    // Persist motto in local storage
    useEffect(() => {
        const data = window.localStorage.getItem('MOTTO');
        if (data !== null) setMotto(JSON.parse(data));
    }, []);
    useEffect(() => {
        window.localStorage.setItem('MOTTO', JSON.stringify(motto));
    }, [motto]);

    // Persist about us in local storage
    useEffect(() => {
        const data = window.localStorage.getItem('ABOUT_US');
        if (data !== null) setAbout(JSON.parse(data));
    }, []);
    useEffect(() => {
        window.localStorage.setItem('ABOUT_US', JSON.stringify(about));
    }, [about]);

    // const groupCultureSettings = editGroupCultureSettings(clanName, callsign, motto, about, clanId, pendingSave, setPendingSave)

    // useEffect(() => {
    //     if (groupCultureSettings) {
    //         if (groupCultureSettings?.ErrorCode == 1) {
    //             // Successful
    //             setSuccess(true)
    //         } else if (groupCultureSettings?.MessageData?.ThrottleSecondsRemaining != 0) {
    //             // Time remaining before next request can be made
    //             setThrottle(true)
    //         } else {
    //             // Unable to complete action
    //             setWarning(true)
    //         }
    //     }
    // }, [groupCultureSettings])

    // Blur the text field
    const onKeyDown = (event) => {
        if (event.key === "Enter" || event.key === "Escape") {
            event.target.blur();
        }
    }

    return (
        <>
            <Div p={{ x: "1rem", y: "0.5rem" }} d="flex" flexDir="column" flexWrap="wrap">
                <Text textColor="cbWhite" textSize="heading">
                    General Settings
                </Text>
                <Div m={{ x: "1rem" }}>
                    <Text textColor="cbWhite" textSize="title" m={{ y: "0.5rem" }}>
                        Clan Join Options
                    </Text>
                    <Dropdown
                        isOpen={clanJoinOptionsOpen}
                        onClick={() => setClanJoinOptionsOpen(!clanJoinOptionsOpen)}
                        menu={
                            <Div>
                                test
                            </Div>
                        }
                        m={{ x: "1rem", b: "1rem" }}
                        bg='cbGrey1'
                        focusBg="cbGrey1"
                        border="0px solid"
                        textColor="cbWhite"
                        textSize="subheader"
                        fontFamily="Primary"
                        openSuffix={<Icon name="Up" color="info700" size="16px" />}
                        closeSuffix={<Icon name="Down" color="info700" size="16px" />}
                    >
                        Customized Dropdown
                    </Dropdown>

                    <Text textColor="cbWhite" textSize="title" m={{ y: "0.5rem" }}>
                        New Member Level
                    </Text>
                    <Input
                        placeholder={'Callsign'}
                        m={{ x: "1rem", b: "1rem" }}
                        bg='cbGrey1'
                        border="0px solid"
                        textColor="cbWhite"
                        textSize="subheader"
                        fontFamily="Primary"
                        value={callsign}
                        onChange={e => setCallsign((e.target.value).slice(0, 4))}
                        onKeyDown={onKeyDown}
                    />

                    <Text textColor="cbWhite" textSize="title" m={{ y: "0.5rem" }}>
                        Clan Language
                    </Text>
                    <Input
                        placeholder={'Clan Motto'}
                        m={{ x: "1rem", b: "1rem" }}
                        bg='cbGrey1'
                        border="0px solid"
                        textColor="cbWhite"
                        textSize="subheader"
                        fontFamily="Primary"
                        value={motto}
                        onChange={e => setMotto((e.target.value).slice(0, 100))}
                        onKeyDown={onKeyDown}
                    />

                    <Text textColor="cbWhite" textSize="title" m={{ y: "0.5rem" }}>
                        Level Required for Guided Games
                    </Text>
                    <Textarea
                        placeholder={'About Us'}
                        m={{ x: "1rem", b: "1rem" }}
                        bg='cbGrey1'
                        border="0px solid"
                        textColor="cbWhite"
                        textSize="subheader"
                        maxW="5rem"
                        fontFamily="Primary"
                        value={about}
                        onChange={e => setAbout((e.target.value).slice(0, 1000))}
                        onKeyDown={onKeyDown}
                    />

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