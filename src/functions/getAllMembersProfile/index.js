import React, { useState, useEffect } from "react";

export default function getAllMemberProfile(inputData, headers, router) {
    const [data, setData] = useState([]);

    // Clear states on route change
    const dynamicRoute = router.asPath;
    useEffect(() => setData([]), [dynamicRoute]);

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
        
    }, [inputData, headers, dynamicRoute])

    return data
}