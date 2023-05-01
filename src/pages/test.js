import DefaultTemplate from '../components/DefaultLayout'
import InfoBox from '../components/InfoBox'
import useGetClanInfoImut from "../functions/useGetClanInfoImut";
import { Button, Text, Row, Col, Div, Dropdown, Icon, Anchor } from "atomize";
import { useSession, signIn, signOut } from "next-auth/react"
import React, { useState, useEffect } from 'react';
import getClanMemberInfo from "../functions/getClanMemberProfileInfo/useGetClanMemberInfo";
import useGetAllMembersProfile from '../functions/getClanMemberProfileInfo/useGetAllMembersProfile';
import useGetAllMembersFullProfile from '../functions/useGetAllMembersFullProfile';
import QueryStatTable from '../components/QueryStatTable';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ScrollBox from '../components/ScrollBox';
import useGetManifest from '../functions/useGetManifest';
import useGetManifestComponents from '../functions/useGetManifestComponents';
import useGetEntityDefinition from '../functions/useGetEntityDefinition';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { node } from 'prop-types';

export default function Admin() {

    const router = useRouter();

    const [tab, setTab] = useState('General')
    const [showDropdown, setShowDropdown] = useState(false)
    const [pending, setPending] = useState(0)

    const { data, status } = useSession()

    const triumphNodes = useGetEntityDefinition('DestinyPresentationNodeDefinition', 1163735237)
    const triumphsHash = triumphNodes?.Response?.children?.presentationNodes[0]?.presentationNodeHash
    const triumphs = useGetEntityDefinition('DestinyPresentationNodeDefinition', triumphsHash)
    // console.log(triumphs)

    const TestList = ({ nodes, entityType }) => {

        const getHash = (entityType) => {
            let accessor

            switch (entityType) {
                case 'test':
                    accessor = 'presentationNodeHash'
                    break
                case 'test 2':
                    accessor = 'presentationNodeHash'
                    break
                case 'test 3':
                    accessor = 'presentationNodeHash'
                    break
                case 'DestinyPresentationNodeDefinition':
                    accessor = 'presentationNodeHash'
                    break
                case 'DestinyRecordDefinition':
                    accessor = 'recordHash'
                    break
            }

            return accessor
        }

        if (nodes) {
            return (
                <>
                    {nodes ? nodes.map((child, index) => (
                        <Div key={index} m={{ x: '1rem' }}>
                            <ListItem entityType={entityType} hashIdentifier={child[getHash(entityType)]} />
                        </Div>
                    ))
                        :
                        null
                    }
                </>
            )
        } else {
            return null
        }
    }

    const ListItem = ({ entityType, hashIdentifier }) => {
        // Get item information
        const itemDetails = useGetEntityDefinition(entityType, hashIdentifier)
        const children = itemDetails?.Response?.children
        let childNodes
        let childEntityType

        // Determine what type of children are attached to this object so as to pass them to the next list
        if (itemDetails) {
            if (children) {
                // Check what type the children are
                switch (true) {
                    case children.collectibles.length > 0:
                        childNodes = children.collectibles
                        break
                    case children.craftables.length > 0:
                        childNodes = children.craftables
                        break
                    case children.metrics.length > 0:
                        childNodes = children.metrics
                        console.log('METRICS')
                        break
                    case children.presentationNodes.length > 0:
                        childNodes = children.presentationNodes
                        childEntityType = 'DestinyPresentationNodeDefinition'
                        break
                    case children.records.length > 0:
                        childNodes = children.records
                        childEntityType = 'DestinyRecordDefinition'
                        break
                }
            }

            return (
                <>
                    {itemDetails ?
                        <Div>
                            {itemDetails?.Response?.displayProperties?.name}
                            {children ? <TestList nodes={childNodes} entityType={childEntityType} /> : null}
                        </Div>
                        :
                        null
                    }
                </>
            )
        } else {
            return null
        }
    }

    const { data: members, mutate: mutateMembers } = getClanMemberInfo(881267)
    const clanMemberProfiles = useGetAllMembersFullProfile(members)
    // console.log(clanMemberProfiles)

    const MyGrid = () => {
        const [columnDefs, setColumnDefs] = useState([
            { headerName: "Name", field: "Response.profile.data.userInfo.bungieGlobalDisplayName" },
            { headerName: "Test", feild: "Response.metrics.data.metrics[546319].objectiveProgress.progress" }
        ]);

        const [rowData, setRowData] = useState(clanMemberProfiles);

        return (
            <div className="ag-theme-alpine" style={{ height: '400px', width: '600px' }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}>
                </AgGridReact>
            </div>
        );
    }

    function Metrics({ profiles }) {

        if (profiles) {
            return (
                <>
                    {profiles.map((profile, index) => (
                        <Div key={index}>
                            {profile?.Response?.metrics?.data?.metrics['40546883']?.objectiveProgress?.progress + '/' + profile?.Response?.metrics?.data?.metrics['40546883']?.objectiveProgress?.completionValue}
                        </Div>
                    ))}
                </>
            )
        }
    }

    return (
        <DefaultTemplate>
            <Head>
                <title>
                    Clan Details | ClanBase
                </title>
                <meta
                    name="test"
                    content="Just using this to test things"
                    key="desc"
                />
            </Head>
            <Div d="flex" justify="center">
                <Col size={{ xs: "11", xl: "8" }}>
                    <InfoBox bg={'cbGrey1'} minH="40rem">
                        <ScrollBox h="50rem">
                            {/* <TestList nodes={triumphNodes?.Response?.children?.presentationNodes} entityType={'DestinyPresentationNodeDefinition'} /> */}
                            {/* <MyGrid/> */}
                            {/* <QueryStatTable profiles={clanMemberProfiles} /> */}
                            {/* <Metrics profiles={clanMemberProfiles}/> */}
                        </ScrollBox>
                    </InfoBox>
                </Col>
            </Div>
        </DefaultTemplate>
    )
}