import { styled, useStyletron } from 'styletron-react'
import DefaultTemplate from '../components/DefaultLayout'
import Table from "../components/Table";
import React, { useState, useEffect, useMemo } from "react";
import { Div, Text } from "atomize";

const apikey = '3a85f7e1a4444ec1865efb39ef019313';
const headers = { 'X-API-Key' : apikey }

export default function TestTable() {
    // an alternative hook based API
    const [css] = useStyletron()

    const [data, setData] = useState([]);

    const columns = useMemo(
        () => [
            {
                Header: "Info",
                columns: [
                    {
                        Header: "Name",
                        accessor: "destinyUserInfo.displayName"
                    },
                    {
                        Header: "Join Date",
                        accessor: "joinDate"
                    }
                ]
            }
        ],
        []
    );

    useEffect(() => {
        (async () => {
            const result = await fetch("https://www.bungie.net/Platform/GroupV2/2084197/Members/", { headers });
            const json = await result.json()
            setData(json.Response.results);
            console.log(json.Response.results);
        })();
    }, []);

    return (
        <DefaultTemplate>
            <Div>
                <Text textSize="display1" textColor="brand900" m={{ l: "1rem" }}>
                    Table Test with React Table
                </Text>
            </Div>
            <Table columns={columns} data={data} />
        </DefaultTemplate>
    )
}