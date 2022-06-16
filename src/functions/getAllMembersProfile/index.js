import React, { useState, useEffect } from "react";

const apikey = '3a85f7e1a4444ec1865efb39ef019313';
const headers = { 'X-API-Key': apikey }

export default function getAllMemberProfile(inputData) {

    const [data, setData] = useState([]);

    useEffect(() => {

        async function getData() {
            await Promise.all(inputData.map((member, i, array) => {
                const membershipId = member.destinyUserInfo.membershipId
                const membershipType = member.destinyUserInfo.membershipType

                return fetch('https://www.bungie.net/Platform/Destiny2/' + membershipType + '/Profile/' + membershipId + '/?components=100,200', { headers })
                    .then((res) => res.json())
                    .then((data) => { return { playerProfile: data.Response } })
                    .then((data) => {
                        array[i] = { ...member, ...data }
                        console.log("update profiles")
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    })
            }))
            setData(inputData)
        }
        getData()
        
    }, [inputData])

    return data
}