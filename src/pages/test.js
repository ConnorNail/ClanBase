import DefaultTemplate from '../components/DefaultLayout';
import getClanInfo from "../functions/getClanInfo";

export default function Test() {

    console.log(getClanInfo([2084197, 4599535]))

    return (
        <DefaultTemplate>
            API TEST PAGE
        </DefaultTemplate>
    )
}