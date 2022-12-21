import DefaultTemplate from '../components/DefaultLayout';
import getAuthInfo from '../functions/getAuthInfo';
import { useRouter } from 'next/router';
import getClanInfo from "../functions/getClanInfo";
import useSWR from 'swr'

export default function Test() {
    console.log(getClanInfo(2084197))

    // if (error) return (
    //     <DefaultTemplate>
    //         <div>ERROR</div>
    //     </DefaultTemplate>
    // )

    // if (!data) return (
    //     <DefaultTemplate>
    //         <div>Loading...</div>
    //     </DefaultTemplate>
    // )

    return (
        <DefaultTemplate>
            <div>API TEST SUCCESSFUL</div>
        </DefaultTemplate>
    )
}