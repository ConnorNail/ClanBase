import Table from '../../components/Table';
import useSetupDiscordTimeTable from '../../functions/useSetupDiscordTimeTable';
import useSetupQueryStatTable from '../../functions/useSetupQueryStatTable';
import { Div, Icon } from "atomize";

export default function QueryStatTable({ profiles }) {

    const [timeColumns, timeData] = useSetupQueryStatTable(profiles, '4119834')

    return (
        <Div d="flex" justify="center" align="center">
            <Div maxW="55rem" bg="cbGrey1" p="0.5rem" rounded="md">
                {timeData && timeColumns ? <Table columns={timeColumns} data={timeData} /> : <Icon name="Loading3" size="75px" color="cbWhite" />}
            </Div>
        </Div>
    )
}