import { styled, useStyletron } from 'styletron-react';
import DefaultTemplate from '../components/DefaultLayout';
import { Row, Col, Div, Text } from "atomize";
import getClanMemberInfo from '../functions/getClanMemberInfo';
import setupRosterTable from "../functions/setupRosterTable";
import setupRecentMemberTable from "../functions/setupRecentMemberTable";
import setupMemberTime from "../functions/setupMemberTime";
import getAllMembersProfile from '../functions/getAllMembersProfile';
import getCurrentSeasonHash from '../functions/getCurrentSeasonHash';
import getSeasonInfo from '../functions/getSeasonInfo';
import createSubDateArray from '../functions/createSubDateArray';
import getAllCharacterStats from '../functions/getAllCharacterStats';
import formatTotalTime from '../functions/formatTotalTime';
import Table from "../components/Table";
import SmallTable from "../components/SmallTable";
import getAuthInfo from '../functions/getAuthInfo';
import { useRouter } from 'next/router';
import Image from 'next/image'

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
  const clanMemberTimeInfo = formatTotalTime(clanMemberStatsInfo)

  const [rosterColumns, rosterData] = setupRosterTable(clanMemberProfileInfo);
  const [recentColumns, recentData] = setupRecentMemberTable(clanMemberProfileInfo);
  const [timeColumns, timeData] = setupMemberTime(clanMemberTimeInfo)
  console.log(clanMemberTimeInfo)

  return (
    <DefaultTemplate>
      <Image
        src="/loading.gif"
        width={250}
        height={250}
      />
      <Row>
        <Col>
          <SmallTable columns={recentColumns} data={recentData} />
        </Col>
        <Col>
          <Table columns={timeColumns} data={timeData} />
        </Col>
      </Row>
      <Row>
        <Table columns={rosterColumns} data={rosterData} />
      </Row>
    </DefaultTemplate>
  )
}