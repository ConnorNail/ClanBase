import DefaultTemplate from '../../components/DefaultLayout';
import InfoBox from '../../components/InfoBox';
import SearchBar from '../../components/SearchBar';
import getClanMemberProfileInfo from '../../functions/getClanMemberProfileInfo';
import getClanMemberStatsInfo from '../../functions/getClanMemberStatsInfo';
import setupRosterTable from "../../functions/setupRosterTable";
import setupMemberTime from "../../functions/setupMemberTime";
import formatTotalTime from '../../functions/formatTotalTime';
import Table from "../../components/Table";
import getHeaders from '../../functions/getHeaders';
import { useRouter } from 'next/router';
import { Row, Col, Div, Text, Image, Container, Anchor, Icon } from "atomize";
import Link from 'next/link';
import getClanInfo from '../../functions/getClanInfo';
import getClanMemberInfo from '../../functions/getClanMemberProfileInfo/getClanMemberInfo';
import getClanMembersAllTimeStats from '../../functions/getClanMembersAllTimeStats';
import getAllMembersProfile from '../../functions/getClanMemberProfileInfo/getAllMembersProfile';
import ClanBannerSimple from '../../components/clanBannerSimple';

export default function ClanIconBox({clanInfo}) {

    const date = new Date(new Date(clanInfo?.Response?.detail?.creationDate))
    const creationDate = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()

    const membershipOption = (stat) => {
        switch (stat) {
            case 0:
                return (
                    <Div d="flex">
                        <Icon name="Edit" size="20px" color="cbWhite" transform='translateY(5%)' m={{ r: "0.25rem" }} />
                        <Text textSize="paragraph" textColor="cbWhite">
                            Approval Required
                        </Text>
                    </Div>
                )
                break;
            case 1:
                return (
                    <Div d="flex">
                        <Icon name="Success" size="20px" color="cbWhite" transform='translateY(5%)' m={{ r: "0.25rem" }} />
                        <Text textSize="paragraph" textColor="cbWhite">
                            Open
                        </Text>
                    </Div>
                )
                break;
            case 2:
                return (
                    <Div d="flex">
                        <Icon name="Lock" size="20px" color="cbWhite" transform='translateY(5%)' m={{ r: "0.25rem" }} />
                        <Text textSize="paragraph" textColor="cbWhite">
                            Invite Only
                        </Text>
                    </Div>
                )
                break;
        }
    }

    const loadingValue = (value, color) => {
        if (value || value == 0) {
            return (
                <>
                    {value}
                </>
            )
        } else {
            return (
                <Icon name="Loading3" size="20px" color={color} transform='translateY(15%)' />
            )
        }
    }

    return (
        <>
            <Row m="0">
                <Div d="flex">
                    <Icon name="User" size="20px" color="cbWhite" transform='translateY(5%)' m={{ r: "0.25rem" }} />
                    <Text textSize="paragraph" textColor="cbWhite">
                        {loadingValue(clanInfo?.Response?.detail?.memberCount, "cbWhite")} {clanInfo?.Response?.detail?.memberCount == 1 ? "Member" : "Members"}
                    </Text>
                </Div>
            </Row>
            <Row m="0">
                {loadingValue(membershipOption(clanInfo?.Response?.detail?.membershipOption), "cbWhite")}
            </Row>
            <Row m="0">
                <Div d="flex">
                    <Icon name="Timestamp" size="20px" color="cbWhite" transform='translateY(5%)' m={{ r: "0.25rem" }} />
                    <Text textSize="paragraph" textColor="cbWhite">
                        Created {loadingValue(clanInfo?.Response?.detail?.creationDate ? creationDate : null, "cbWhite")}
                    </Text>
                </Div>
            </Row>
        </>
    )
}