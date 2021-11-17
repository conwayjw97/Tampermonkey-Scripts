// ==UserScript==
// @name         Reddit Block
// @namespace    com.conwayjw97.redditblock
// @version      0.1
// @author       James Conway
// @match        https://www.reddit.com/*
// @run-at       document-start
// @grant        GM_addStyle
// ==/UserScript==

console.log('Reddit Block is running');

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

function script(){
    // Clear page
    document.body.innerHTML = '';

    // Add styling
    let css = `
       body { background-color: #1a1a1b; }
       div { color: white; font-size: 99px; position: absolute; left: 50%; top: 50%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%); }
    `;
    GM_addStyle(css);

    // Add contents
    let div = document.createElement('div');
    div.innerHTML = 'Reddit is Blocked';
    document.body.appendChild(div);
}
