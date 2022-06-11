import { styled, useStyletron } from 'styletron-react'
import DefaultTemplate from '../../../components/DefaultLayout'
import Table from "../../../components/Table";
import React, { useState, useEffect, useMemo } from "react";
import { Div, Text, Image } from "atomize";

const apikey = '3a85f7e1a4444ec1865efb39ef019313';
const headers = { 'X-API-Key': apikey }

export default function TestTable({ data, playerTime }) {
    // an alternative hook based API
    const [css] = useStyletron()

    console.log(playerTime)

    function getTimePlayed() {
        
    }
    
    const columns = useMemo(
        () => [
            {
                Header: "Info",
                columns: [
                    {
                        Header: "Emblem",
                        accessor: "bungieNetUserInfo.iconPath",
                        Cell: ({ cell: { value } }) => {
                            return (
                                <>
                                    <Image maxW="3rem" src={'https://www.bungie.net/' + value} />
                                </>
                            )
                        }
                    },
                    {
                        Header: "Name",
                        accessor: "destinyUserInfo.displayName"
                    },
                    {
                        Header: "User ID",
                        accessor: "destinyUserInfo.membershipId"
                    },
                    {
                        Header: "Join Date",
                        accessor: "joinDate"
                    },
                    {
                        Header: "Original Platform",
                        accessor: "destinyUserInfo.membershipType",
                        Cell: ({ cell: { value } }) => {
                            return (
                                <>
                                    {value == 1 ? 'Xbox' : value == 2 ? 'Playstation' : value == 3 ? 'Steam' : value == 4 ? 'Blizzard' : value == 5 ? 'Stadia' : 'error'}
                                </>
                            )
                        }
                    },
                    {
                        Header: "Online",
                        accessor: "isOnline",
                        Cell: ({ cell: { value } }) => {
                            return (
                                <Div bg={value ? "success600" : "danger600"} rounded="xl" >
                                    <Text textSize="body" m={{ l: "0.5rem", r: "0.5rem" }}>
                                        {value ? 'Online' : 'Offline'}
                                    </Text>
                                </Div>
                            )
                        }
                    },
                ]
            },
            {
                Header: "Stats",
                columns: [
                    {
                        Header: "KD",
                        accessor: "playerStats.allPvP.allTime.killsDeathsRatio.basic.displayValue",
                    },
                    {
                        Header: "Combat Rating",
                        accessor: "playerStats.allPvP.allTime.combatRating.basic.displayValue",
                    },
                ]
            }
        ],
        []
    );

    return (
        <DefaultTemplate>
            <Div>
                <Text textSize="display1" textColor="brand900" m={{ l: "1rem" }}>
                    CLAN MEMBERS
                </Text>
            </Div>
            <Div>
                <Table columns={columns} data={data} />
            </Div>
        </DefaultTemplate>
    )
}

export async function getServerSideProps(context) {
    const { clanid } = context.query
    const url1 = 'https://www.bungie.net/Platform/GroupV2/' + clanid + '/Members/' //House Fruit: 2084197 Fruit Snaccs: 4599535
    
    const current = new Date()
    const startDate = current.getFullYear() + '/' + ('0' + (current.getMonth()+1)).slice(-2) + '/' + ('0' + current.getDate()).slice(-2)
    const past = new Date()
    past.setDate(past.getDate() - 31)
    const endDate = past.getFullYear() + '/' + ('0' + (past.getMonth()+1)).slice(-2) + '/' + ('0' + past.getDate()).slice(-2)

    // Clan details
    const res1 = await fetch(url1, { headers })
    const json1 = await res1.json()

    const playerData = await Promise.all(
        json1.Response.results.map((res) =>
            fetch('https://www.bungie.net/Platform/Destiny2/' + res.destinyUserInfo.membershipType + '/Account/' + res.destinyUserInfo.membershipId + '/Stats/', { headers })
                .then((res) => res.json())
                .then((data) => {return{playerStats: data.Response.mergedAllCharacters.results}})
        )
    )

    const playerTime = await Promise.all(
        json1.Response.results.map((res, i) =>
            fetch('https://www.bungie.net/Platform/Destiny2/' + res.destinyUserInfo.membershipType + '/Profile/' + res.destinyUserInfo.membershipId + '/?components=100', { headers })
                .then((res) => res.json())
                .then(async (data) => /*{
                    await Promise.all(data.Response.profile.data.characterIds.map((characterId, i, array) => {
                        return fetch('https://www.bungie.net/Platform/Destiny2/' + res.destinyUserInfo.membershipType + '/Account/' + res.destinyUserInfo.membershipId + '/Character/' + characterId[i] + '/Stats/?dayend=' + startDate + '&daystart=' + endDate + '&periodType=Daily', { headers })
                        .then((res) => res.json())
                        .then((data) => {
                            array[i] = {...characterId, ...data}
                        })
                    }))
                }*/{
                    return fetch('https://www.bungie.net/Platform/Destiny2/' + res.destinyUserInfo.membershipType + '/Account/' + res.destinyUserInfo.membershipId + '/Character/' + data.Response.profile.data.characterIds[0] + '/Stats/?dayend=' + startDate + '&daystart=' + endDate + '&periodType=Daily', { headers })
                        .then((res) => res.json())
                        .then((data) => {return{playerTime: combineTime(data.Response)}})}
                )
        )
    )

    function combineTime(timeStats) {
        let time = {
            allPvE: 0,
            allPvECompetitive: 0,
            allPvP: 0,
            allStrikes: 0,
            patrol: 0,
            raid: 0,
            story: 0
        }
        //const activity = timeStats.allPvE
        Object.keys(timeStats).forEach((activity, i) => {
            const temp = timeStats[activity].daily
            const name = Object.keys(activity)

            if (typeof temp != 'undefined') {
                for (let i = 0; i < temp.length; i++) {
                    time[activity] = time[activity] + temp[i].values.totalActivityDurationSeconds.basic.value
                }
            } else {
                time[activity] = 0
            }
        })
        return time
    }

    function mergeArrayObjects(arr1, arr2, arr3) {
        return arr1.map((item, i) => {
            return Object.assign({}, item, arr2[i], arr3[i])
        })
    }

    const merged = mergeArrayObjects(json1.Response.results, playerData, playerTime)

    return {
        props: {
            data: merged,
            playerTime: playerTime
        },
    }
}