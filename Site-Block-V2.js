// ==UserScript==
// @name         Site Block
// @namespace    com.conwayjw97.siteblocker
// @version      0.2
// @description  Block distracting websites
// @author       James Conway
// @match        *://www.youtube.com/*
// @match        *://www.facebook.com/*
// @match        *://www.reddit.com/*
// @match        *://www.youtube.com/*
// @match        *://twitter.com/*
// @match        *://www.linkedin.com/*
// @match        *://bandcamp.com/*
// @match        *://discord.com/*
// @match        *://www.youtube.com/*
// @match        *://tiktok.com/*
// @match        *://www.instagram.com/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

console.log('Site Block is running');

let bodyAppeared = false;
let scriptStarted = false;
let intervalId = null;

intervalId = setInterval(function(){
    if(document.body != null){
        bodyAppeared = true;
    }

    if(bodyAppeared == true && scriptStarted == false){
        scriptStarted = true;
        script();
    }
}, 1000);

// Use this if you only want the script to run at given days and times
function isScriptTime(){
    let date = new Date();
    let day = date.getDay();
    let hour = date.getHours();

    // If the current time is a weekday between 9 and 5
    return (day > 0 && day <6) && (hour > 8 && hour < 17);
}

function script(){
    // Clear page
    document.body.innerHTML = '';

    // Add styling
    let css = `
                    body { background-color: #1a1a1b; }
                    div { text-align: center; color: white; font-size: 99px; position: absolute; left: 50%; top: 50%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%); }
                `;
    GM_addStyle(css);

    // Add contents
    let div = document.createElement('div');
    div.innerHTML = window.location + ' is Blocked';
    document.body.appendChild(div);

    if(intervalId != null){
        clearInterval(intervalId);
        console.log('Site blocked, clearing check interval');
    }
}

