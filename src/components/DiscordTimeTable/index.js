import Table from '../../components/Table';
import useSetupDiscordTimeTable from '../../functions/useSetupDiscordTimeTable';
import { Div, Icon } from "atomize";

export default function DiscordTimeTable({ memberSeasonalTime }) {

    const [timeColumns, timeData] = useSetupDiscordTimeTable(memberSeasonalTime)

    return (
        <Div d="flex" justify="center" align="center">
            <Div maxW="55rem" bg="cbGrey1" p="0.5rem" rounded="md">
            {timeData && timeColumns ? <Table columns={timeColumns} data={timeData} /> : <Icon name="Loading3" size="75px" color="cbWhite"/>}
            </Div>
        </Div>
    )
}