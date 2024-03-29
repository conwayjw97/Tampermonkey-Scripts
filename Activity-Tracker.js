// ==UserScript==
// @name         Activity Tracker
// @namespace    com.conwayjw97.activitytracker
// @version      0.1
// @description  Track time spent on websites
// @author       James Conway
// @match        *://*/*
// @match        *//*/*
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-start
// ==/UserScript==

function minuteDifference(startDate, endDate){
    let diff = secondDifference(startDate, endDate);
    diff /= 60;
    return Math.abs(Math.ceil(diff));
}

function secondDifference(startDate, endDate){
    let diff = (endDate.getTime() - startDate.getTime()) / 1000;
    return Math.abs(Math.ceil(diff));
}

function secondsToMinutes(seconds){
    return Math.floor(seconds * 0.0166667);
}

function secondsToHours(seconds){
    return Math.floor(seconds * 0.000277778);
}

function secondsPrettyPrint(seconds){
    let hoursToPrint, minutesToPrint, secondsToPrint;
    hoursToPrint = minutesToPrint = secondsToPrint = 0;
    hoursToPrint = secondsToHours(seconds);
    minutesToPrint = secondsToMinutes(seconds) - (hoursToPrint * 60);
    secondsToPrint = seconds - (hoursToPrint * 3600) - (minutesToPrint * 60);

    let outputString = "";
    outputString = hoursToPrint !== 0 ? (outputString + (hoursToPrint + "hr ")) : outputString;
    outputString = minutesToPrint !== 0 ? (outputString + (minutesToPrint + "min ")) : outputString;
    outputString = secondsToPrint !== 0 ? (outputString + (secondsToPrint + "sec ")) : outputString;

    return outputString;
}

function todaysTrackingDataPrettyPrint(todaysTrackingData, headline="Today's Activity Tracking Report"){
    console.groupCollapsed(headline);

    let sortedBaseUrls = Object.keys(todaysTrackingData).sort(function(a,b){return todaysTrackingData[b]-todaysTrackingData[a]});

    let totalSecondsSpent = 0;
    for (let baseUrl of sortedBaseUrls){
        if(todaysTrackingData[baseUrl] > 0){
            console.log(baseUrl + ": " + secondsPrettyPrint(todaysTrackingData[baseUrl]) + "\n");
            totalSecondsSpent += todaysTrackingData[baseUrl];
        }
    }

    console.log("-----------------------------------\n");
    console.log("Total Screen Time on this Browser: " + secondsPrettyPrint(totalSecondsSpent) + "\n");
    console.groupEnd();
}

let url = window.location;
let baseUrl = url.protocol + "//" + url.host + "/";

let accessDate = new Date();
let todaysDate = accessDate.getDate() + "/" + (accessDate.getMonth()+1) + "/" + accessDate.getFullYear(); // Javascript months start from 0 so 1 added

window.onfocus = async function (e){
    accessDate = new Date();
}

window.onblur = async function (e){
    let leaveDate = new Date();
    let secondsSpent = secondDifference(accessDate, leaveDate);

    let todaysTrackingData = JSON.parse(await GM_getValue(todaysDate, "{}"));

    if(todaysTrackingData.hasOwnProperty(baseUrl)){
        todaysTrackingData[baseUrl] = todaysTrackingData[baseUrl] + secondsSpent;
    }
    else if(secondsSpent > 0){
        todaysTrackingData[baseUrl] = secondsSpent;
    }

    GM_setValue(todaysDate, JSON.stringify(todaysTrackingData));
}

window.onload = async function (e){
    if(!url.host.startsWith("localhost")){
        let todaysTrackingData = JSON.parse(await GM_getValue(todaysDate, "{}"));
        todaysTrackingDataPrettyPrint(todaysTrackingData, "Today's Activity Tracking Report: " + todaysDate);
    }
};
