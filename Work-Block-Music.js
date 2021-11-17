// ==UserScript==
// @name         Work Block (Music)
// @namespace    com.conwayjw97.siteblocker
// @version      0.1
// @description  Block distracting websites
// @author       James Conway
// @match        *://*/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

console.log('Work Block is running');

let blockList = [
    "https://www.youtube.com/",
    "https://www.facebook.com/",
    "https://www.reddit.com/",
    "https://twitter.com/",
    "https://www.linkedin.com/",
    "https://discord.com/",
    "https://tiktok.com/",
    "https://www.instagram.com/",
];

if(isScriptTime() && isBlockedSite()){
    let bodyAppeared = false;
    let scriptStarted = false;

    setInterval(function(){
        if(document.body != null){
            bodyAppeared = true;
        }

        if(bodyAppeared == true && scriptStarted == false){
            scriptStarted = true;
            script();
        }
    }, 1000);
}

function isScriptTime(){
    let date = new Date();
    let day = date.getDay();
    let hour = date.getHours();

    // If the current time is a weekday between 9 and 5
    return (day > 0 && day <6) && (hour > 8 && hour < 17);
}

function isBlockedSite(){
    let url = window.location.href;
    for(let blockedUrl of blockList){
        if(url.startsWith(blockedUrl)){
            return true;
        }
    }
    return false;
}

function script(blockedUrl){
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
}

