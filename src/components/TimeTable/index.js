import Table from '../../components/Table';
import getClanMemberCharacterSeasonalTimeStats from '../../functions/getClanMemberCharacterSeasonalTimeStats';
import setupMemberTimeTable from '../../functions/setupMemberTimeTable';
import { Div, Icon } from "atomize";

export default function TimeTable({ memberInfo, memberProfiles }) {

    const memberSeasonalTime = getClanMemberCharacterSeasonalTimeStats(memberInfo, memberProfiles)

    const [timeColumns, timeData] = setupMemberTimeTable(memberSeasonalTime)

    return (
        <Div d="flex" justify="center" align="center">
            <Div maxW="55rem">
            {timeData && timeColumns ? <Table columns={timeColumns} data={timeData} /> : <Icon name="Loading3" size="75px" color="cbWhite" m={{t: "13rem"}}/>}
            </Div>
        </Div>
    )
}