// ==UserScript==
// @name         Social Media Block
// @namespace    com.conwayjw97.siteblocker
// @version      0.1
// @description  Block distracting websites
// @author       James Conway
// @match        *://*/*
// @grant        GM_log
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

console.log('Social Media Block is running');

let blockList = [
    "https://www.facebook.com/",
    "https://www.reddit.com/",
    "https://twitter.com/",
    "https://www.linkedin.com/",
    "https://discord.com/",
    "https://tiktok.com/",
    "https://www.instagram.com/",
];

if(isBlockedSite()){
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

function isBlockedSite(){
    let url = window.location.href;
    for(let blockedUrl of blockList){
        if(url.startsWith(blockedUrl)){
            return true;
        }
    }
    return false;
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
    div.innerHTML = window.location.host + ' is Blocked';
    document.body.appendChild(div);
}

