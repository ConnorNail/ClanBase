import { Input, Icon, Dropdown, Div, Textarea, Col, Text, Inpu, Button } from "atomize";
import React, { useState, useEffect } from 'react';
import editGroupCultureSettings from "../../functions/useEditGroupCultureSettings";
import WarningNotification from "../WarningNotification";
import SuccessNotification from "../SuccessNotification";

function checkStored(dataName) {
    const data = window.localStorage.getItem(dataName);
    if (data !== null) {
        return JSON.parse(data)
    } else {
        return null
    }
}

export default function CultureSettings({ groupInfo, clanId }) {
    const [pendingSave, setPendingSave] = useState(false)

    const [clanName, setClanName] = useState(checkStored('CLAN_NAME') !== null ? checkStored('CLAN_NAME') : groupInfo?.Response?.results[0]?.group?.name)
    const [callsign, setCallsign] = useState(checkStored('CALLSIGN') !== null ? checkStored('CALLSIGN') : groupInfo?.Response?.results[0]?.group?.clanInfo?.clanCallsign)
    const [motto, setMotto] = useState(checkStored('MOTTO') !== null ? checkStored('MOTTO') : groupInfo?.Response?.results[0]?.group?.motto)
    const [about, setAbout] = useState(checkStored('ABOUT_US') !== null ? checkStored('ABOUT_US') : groupInfo?.Response?.results[0]?.group?.about)

    const [success, setSuccess] = useState(false);
    const [warning, setWarning] = useState(false);
    const [throttle, setThrottle] = useState(false);

    // Persist clan name in local storage
    useEffect(() => {
        window.localStorage.setItem('CLAN_NAME', JSON.stringify(clanName));
    }, [clanName]);

    // Persist callsign in local storage
    useEffect(() => {
        window.localStorage.setItem('CALLSIGN', JSON.stringify(callsign));
    }, [callsign]);

    // Persist motto in local storage
    useEffect(() => {
        window.localStorage.setItem('MOTTO', JSON.stringify(motto));
    }, [motto]);

    // Persist about us in local storage
    useEffect(() => {
        window.localStorage.setItem('ABOUT_US', JSON.stringify(about));
    }, [about]);

    const groupCultureSettings = editGroupCultureSettings(clanName, callsign, motto, about, clanId, pendingSave, setPendingSave)

    useEffect(() => {
        if (groupCultureSettings) {
            if (groupCultureSettings?.ErrorCode == 1) {
                // Successful
                setSuccess(true)
            } else if (groupCultureSettings?.MessageData?.ThrottleSecondsRemaining != 0) {
                // Time remaining before next request can be made
                setThrottle(true)
            } else {
                // Unable to complete action
                setWarning(true)
            }
        }
    }, [groupCultureSettings])

    // Blur the text field
    const onKeyDown = (event) => {
        if (event.key === "Enter" || event.key === "Escape") {
            event.target.blur();
        }
    }

    return (
        <>
            <Div p={{ x: "1rem", y: "0.5rem" }} d="flex" flexDir="column" flexWrap="wrap">
                <Div m={{ b: "0.5rem" }}>
                    <Text textColor="cbWhite" textSize="heading">
                        Culture Settings
                    </Text>
                </Div>
                <Div m={{ x: "1rem" }}>
                    <Div d={{ xs: "block", md: "flex"}} align="center" m={{ y: "0.5rem" }}>
                        <Text textColor="cbWhite" textSize="subheader" minW="6rem">
                            Clan Name
                        </Text>
                        <Div flexGrow="1">
                            <Input
                                placeholder={'Clan Name'}
                                m={{ x: "0.5rem" }}
                                h="2rem"
                                bg='cbGrey1'
                                border="0px solid"
                                textColor="cbWhite"
                                textSize="paragraph"
                                fontFamily="Primary"
                                value={clanName}
                                onChange={e => setClanName((e.target.value).slice(0, 25))}
                                onKeyDown={onKeyDown}
                            />
                        </Div>
                    </Div>

                    <Div d={{ xs: "block", md: "flex"}} align="center" m={{ y: "0.5rem" }}>
                        <Text textColor="cbWhite" textSize="subheader" minW="6rem">
                            Callsign
                        </Text>
                        <Div flexGrow="1">
                            <Input
                                placeholder={'Callsign'}
                                m={{ x: "0.5rem" }}
                                h="2rem"
                                bg='cbGrey1'
                                border="0px solid"
                                textColor="cbWhite"
                                textSize="paragraph"
                                fontFamily="Primary"
                                value={callsign}
                                onChange={e => setCallsign((e.target.value).slice(0, 4))}
                                onKeyDown={onKeyDown}
                            />
                        </Div>
                    </Div>

                    <Div d={{ xs: "block", md: "flex"}} align="center" m={{ y: "0.5rem" }}>
                        <Text textColor="cbWhite" textSize="subheader" minW="6rem">
                            Clan Motto
                        </Text>
                        <Div flexGrow="1">
                            <Input
                                placeholder={'Clan Motto'}
                                m={{ x: "0.5rem" }}
                                h="2rem"
                                bg='cbGrey1'
                                border="0px solid"
                                textColor="cbWhite"
                                textSize="paragraph"
                                fontFamily="Primary"
                                value={motto}
                                onChange={e => setMotto((e.target.value).slice(0, 100))}
                                onKeyDown={onKeyDown}
                            />
                        </Div>
                    </Div>

                    <Div m={{ y: "1rem" }}>
                        <Text textColor="cbWhite" textSize="subheader" m={{ b: "0.5rem" }}>
                            About Us
                        </Text>
                        <Textarea
                            placeholder={'About Us'}
                            m={{ x: "0.5rem" }}
                            bg='cbGrey1'
                            border="0px solid"
                            textColor="cbWhite"
                            textSize="paragraph"
                            maxW="5rem"
                            fontFamily="Primary"
                            value={about}
                            onChange={e => setAbout((e.target.value).slice(0, 1000))}
                        />
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
                Please wait {groupCultureSettings?.MessageData?.ThrottleSecondsRemaining} minutes before trying again.
            </WarningNotification>
        </>
    )
}