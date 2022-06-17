import { styled, useStyletron } from 'styletron-react';
import DefaultTemplate from '../components/DefaultLayout';
import { Row, Col, Div, Text } from "atomize";
import getClanMemberInfo from '../functions/getClanMemberInfo';
import setupRosterTable from "../functions/setupRosterTable";
import setupRecentMemberTable from "../functions/setupRecentMemberTable";
import getAllMembersProfile from '../functions/getAllMembersProfile';
import Table from "../components/Table";

export default function ClanPage() {
  // an alternative hook based API
  const [css] = useStyletron()

  const clanMemberInfo = getClanMemberInfo(2084197)
  const clanMemberProfileInfo = getAllMembersProfile(clanMemberInfo)
  console.log(clanMemberProfileInfo)
  const [rosterColumns, rosterData] = setupRosterTable(clanMemberProfileInfo)
  const [recentColumns, recentData] = setupRecentMemberTable(clanMemberProfileInfo)

  return (
    <DefaultTemplate>
      <Row>
        <Col>
          <Table columns={rosterColumns} data={rosterData}/>
        </Col>
        <Col>
          <Table columns={recentColumns} data={recentData}/>
        </Col>
      </Row>
    </DefaultTemplate>
  )
}