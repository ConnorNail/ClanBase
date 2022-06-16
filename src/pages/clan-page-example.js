import { styled, useStyletron } from 'styletron-react'
import DefaultTemplate from '../components/DefaultLayout'
import { Row, Col, Div, Text } from "atomize";
import getClanMemberInfo from '../functions/getClanMemberInfo'
import setupRosterTable from "../functions/setupRosterTable";
import getAllMembersProfile from '../functions/getAllMembersProfile'
import Table from "../components/Table";

export default function ClanPage() {
  // an alternative hook based API
  const [css] = useStyletron()

  const clanMemberInfo = getClanMemberInfo(2084197)
  const clanMemberProfileInfo = getAllMembersProfile(clanMemberInfo)
  console.log(clanMemberProfileInfo)
  const [columns, data] = setupRosterTable(clanMemberProfileInfo)

  return (
    <DefaultTemplate>
      <Div>
        <Table columns={columns} data={data}/>
      </Div>
    </DefaultTemplate>
  )
}