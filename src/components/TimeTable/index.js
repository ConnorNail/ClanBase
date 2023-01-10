import Table from '../../components/Table';
import getClanMemberCharacterSeasonalTimeStats from '../../functions/getClanMemberCharacterSeasonalTimeStats';
import setupMemberTimeTable from '../../functions/setupMemberTimeTable';

export default function TimeTable({ memberInfo, memberProfiles }) {

    const memberSeasonalTime = getClanMemberCharacterSeasonalTimeStats(memberInfo, memberProfiles)

    const [timeColumns, timeData] = setupMemberTimeTable(memberSeasonalTime)

    return timeData ? <Table columns={timeColumns} data={timeData} /> : null
}