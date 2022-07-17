import { styled, useStyletron } from 'styletron-react';
import DefaultTemplate from '../components/DefaultLayout';
import { Row, Col, Div, Text } from "atomize";
import getClanMemberInfo from '../functions/getClanMemberInfo';
import setupRosterTable from "../functions/setupRosterTable";
import setupRecentMemberTable from "../functions/setupRecentMemberTable";
import getAllMembersProfile from '../functions/getAllMembersProfile';
import getCurrentSeasonHash from '../functions/getCurrentSeasonHash';
import getSeasonInfo from '../functions/getSeasonInfo';
import createSubDateArray from '../functions/createSubDateArray';
import getAllCharacterStats from '../functions/getAllCharacterStats';
import Table from "../components/Table";
import getAuthInfo from '../functions/getAuthInfo';
import { useRouter } from 'next/router';

export default function ClanPage() {
  // an alternative hook based API
  const [css] = useStyletron()

  const router = useRouter();

  const headers = getAuthInfo(false, router);

  const currentSeasonHash = getCurrentSeasonHash(headers, router);
  const currentSeasonInfo = getSeasonInfo(currentSeasonHash, headers, router);
  const dateArray = createSubDateArray(currentSeasonInfo.startDate, currentSeasonInfo.endDate);

  const clanMemberInfo = getClanMemberInfo(2084197, headers, router);
  const clanMemberProfileInfo = getAllMembersProfile(clanMemberInfo, headers, router);
  const clanMemberStatsInfo = getAllCharacterStats(clanMemberProfileInfo, dateArray, headers, router);
  const [rosterColumns, rosterData] = setupRosterTable(clanMemberProfileInfo);
  const [recentColumns, recentData] = setupRecentMemberTable(clanMemberProfileInfo);

  console.log(clanMemberStatsInfo);

  return (
    <DefaultTemplate>
      <Row>
        <Col>
          <Table columns={recentColumns} data={recentData}/>
        </Col>
      </Row>
    </DefaultTemplate>
  )
}