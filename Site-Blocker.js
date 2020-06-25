// ==UserScript==
// @name         Site Blocker
// @namespace    com.conwayjw97.siteblocker
// @version      0.1
// @description  Block distracting websites
// @author       James Conway
// @match        *://*/*
// @grant        GM_log
// @run-at       document-start
// ==/UserScript==

GM_log("Site Blocker is running");

let blockList = [
    "https://www.youtube.com/",
    "https://www.facebook.com/",
    "https://www.soundcloud.com/",
    "https://www.reddit.com/",
    "https://www.twitter.com/",
    "https://www.linkedin.com/",
    "https://www.music.youtube.com/",
    "https://discord.com/",
    "https://en.wikipedia.org",
    ];

let url = window.location.href;

for(let blockedUrl of blockList){
    if(url.startsWith(blockedUrl)){
        window.stop();
        alert("This is a blocked website.");
    };
}
