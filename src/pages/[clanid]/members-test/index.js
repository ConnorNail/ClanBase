import { styled, useStyletron } from 'styletron-react'
import DefaultTemplate from '../../../components/DefaultLayout'
import Table from "../../../components/Table";
import React, { useState, useEffect, useMemo } from "react";
import { Div, Text, Image } from "atomize";

const apikey = '3a85f7e1a4444ec1865efb39ef019313';
const headers = { 'X-API-Key': apikey }

export default function TestTable({ clanid }) {
    // an alternative hook based API
    const [css] = useStyletron()

    useEffect(() => {
        const url = 'https://www.bungie.net/Platform/GroupV2/' + clanid + '/Members/';

        const current = new Date()
        const startDate = current.getFullYear() + '/' + ('0' + (current.getMonth()+1)).slice(-2) + '/' + ('0' + current.getDate()).slice(-2)
        const past = new Date()
        past.setDate(past.getDate() - 31)
        const endDate = past.getFullYear() + '/' + ('0' + (past.getMonth()+1)).slice(-2) + '/' + ('0' + past.getDate()).slice(-2)

        async function getData() {
            const out = fetch(url, { headers })
                .then((res) => res.json())
                .then((data) => {
                    console.log("old", data.Response.results)
                    return data.Response.results
                })
                .then(async (data) => {
                    await Promise.all([
                        data.map((res, i, array) => {
                            return fetch('https://www.bungie.net/Platform/Destiny2/' + res.destinyUserInfo.membershipType + '/Account/' + res.destinyUserInfo.membershipId + '/Stats/', { headers })
                                .then((res) => res.json())
                                .then((data) => { return { playerStats: data.Response.mergedAllCharacters.results } })
                                .then(async (data) => {
                                    const playerTime = await fetch('https://www.bungie.net/Platform/Destiny2/' + res.destinyUserInfo.membershipType + '/Profile/' + res.destinyUserInfo.membershipId + '/?components=100', { headers })
                                        .then((res) => res.json())
                                        .then(async (data) => {
                                            const char1 = await fetch('https://www.bungie.net/Platform/Destiny2/' + res.destinyUserInfo.membershipType + '/Account/' + res.destinyUserInfo.membershipId + '/Character/' + data.Response.profile.data.characterIds[0] + '/Stats/?dayend=' + startDate + '&daystart=' + endDate + '&periodType=Daily', { headers })
                                                .then((res) => res.json())
                                                .then((data) => {return{playerTimeChar1: data.Response}})
                                            if (data.Response.profile.data.characterIds.length > 1) {
                                                const char2 = await fetch('https://www.bungie.net/Platform/Destiny2/' + res.destinyUserInfo.membershipType + '/Account/' + res.destinyUserInfo.membershipId + '/Character/' + data.Response.profile.data.characterIds[1] + '/Stats/?dayend=' + startDate + '&daystart=' + endDate + '&periodType=Daily', { headers })
                                                    .then((res) => res.json())
                                                    .then((data) => {return{playerTimeChar2: data.Response}})
                                                if (data.Response.profile.data.characterIds.length > 2) {
                                                    const char3 = await fetch('https://www.bungie.net/Platform/Destiny2/' + res.destinyUserInfo.membershipType + '/Account/' + res.destinyUserInfo.membershipId + '/Character/' + data.Response.profile.data.characterIds[2] + '/Stats/?dayend=' + startDate + '&daystart=' + endDate + '&periodType=Daily', { headers })
                                                        .then((res) => res.json())
                                                        .then((data) => {return{playerTimeChar3: data.Response}})
                                                        return {...char1, ...char2, ...char3}
                                                }
                                                return {...char1, ...char2}
                                            } else {
                                                return char1
                                            }
                                        })

                                    array[i] = { ...res, ...data, ...playerTime }
                                    console.log("update stats")
                                })
                        })
                    ])
                    .then((res) => console.log(res))
                    console.log("new", data)
                })

            console.log(await out)
        }
        getData()

        function combineTime(char1TimeStats) {
            let time = {
                allPvE: 0,
                allPvECompetitive: 0,
                allPvP: 0,
                allStrikes: 0,
                patrol: 0,
                raid: 0,
                story: 0
            }
            
            Object.keys(char1TimeStats).forEach((activity, i) => {
                const temp = char1TimeStats[activity].daily
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

    }, [])

    return (
        <DefaultTemplate>
            <Div>
                <Text textSize="display1" textColor="brand900" m={{ l: "1rem" }}>
                    CLAN MEMBERS
                </Text>
            </Div>
            <Div>

            </Div>
        </DefaultTemplate>
    )
}

export async function getServerSideProps(context) {
    const { clanid } = context.query

    return {
        props: {
            clanid: clanid
        },
    }
}