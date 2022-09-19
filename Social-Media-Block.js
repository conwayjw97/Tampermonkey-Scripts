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
    console.log('Social Media Block is running');

    clearPage();

    // Styling
    const css = `
                    body { background-color: #1a1a1b; }
                    div {
                        text-align: center;
                        font-family: Consolas,monaco,monospace;
                        color: white;
                        font-size: 64px;
                        position: absolute;
                        width: 100%;
                        left: 50%; top: 50%;
                        -webkit-transform: translate(-50%, -50%);
                        transform: translate(-50%, -50%);
                    }
                    img { margin: 0px 50px 10px 50px; }
                `;
    GM_addStyle(css);

    // Contents
    const div = document.createElement('div');

    div.appendChild(createIcon());
    div.appendChild(createMessage());
    div.appendChild(createIcon());

    document.body.appendChild(div);
    document.createElement('div');
}

function clearPage(){
    window.stop();
    document.documentElement.innerHTML = '';
    document.body.innerHTML = '';
    document.title = "!!! BLOCKED !!!";
}

function createIcon(){
    const img = document.createElement('img');
    img.onerror = function () {
        this.src = undefined;
    };
    img.src = `http://www.google.com/s2/favicons?domain=` + window.location.host;
    img.width = `24`;
    return img;
}

function createMessage(){
    const span = document.createElement('span');
    let site = window.location.host.replace("www.", "").replace(".com", "");
    site = site.charAt(0).toUpperCase() + site.slice(1);
    span.innerHTML = site + ' is Blocked';
    return span;
}
