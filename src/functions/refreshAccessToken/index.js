import React, { useState, useEffect } from "react";

export default function refreshAccessToken() {
        async function getData() {
            const encodedString = Buffer.from(process.env.NEXT_PUBLIC_BUNGIE_CLIENT_ID + ':' + process.env.NEXT_PUBLIC_BUNGIE_SECRET).toString('base64');

            const token = await fetch('https://www.bungie.net/Platform/App/OAuth/Token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + encodedString,
                    'X-API-Key': process.env.NEXT_PUBLIC_BUNGIE_API_KEY
                },
                body: new URLSearchParams({
                    'client_id': process.env.NEXT_PUBLIC_BUNGIE_CLIENT_ID,
                    'grant_type': "refresh_token",
                    'refresh_token': localStorage.getItem("refresh_token")
                }).toString()
            }).then(function (response) {
                console.log("data", response);
                return response.json();
            });

            console.log("data", token)
            localStorage.setItem("access_token", await token.access_token);
        }
        getData()
}