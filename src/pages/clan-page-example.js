import DefaultTemplate from '../components/DefaultLayout';
import { Row, Col } from "atomize";
import getClanMemberProfileInfo from '../functions/getClanMemberProfileInfo';
import setupRosterTable from "../functions/setupRosterTable";
import setupRecentMemberTable from "../functions/setupRecentMemberTable";
// import setupMemberTime from "../functions/setupMemberTime";
import getClanMemberStatsInfo from '../functions/getClanMemberCharacterSeasonalTimeStats';
import formatTotalTime from '../functions/formatTotalTime';
import Table from "../components/Table";
import SmallTable from "../components/SmallTable";
import Image from 'next/image'

export default function ClanPage() {
  
  const clanMemberProfileInfo = getClanMemberProfileInfo();
  const clanMemberStatsInfo = getClanMemberStatsInfo(clanMemberProfileInfo);
  const clanMemberTimeInfo = formatTotalTime(clanMemberStatsInfo)

  const [rosterColumns, rosterData] = setupRosterTable(clanMemberProfileInfo);
  // const [recentColumns, recentData] = setupRecentMemberTable(clanMemberProfileInfo);
  // const [timeColumns, timeData] = setupMemberTime(clanMemberTimeInfo)

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