// ==UserScript==
// @name         Work Focus Site Blocker
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
    "https://twitter.com/",
    "https://www.linkedin.com/",
    "https://www.music.youtube.com/",
    "https://bandcamp.com/",
    "https://discord.com/",
    "https://tiktok.com/",
    "https://www.instagram.com/",
    ];

let url = window.location.href;

let date = new Date();
let day = date.getDay();
let hour = date.getHours();

// If the current time is a weekday between 9 and 5
if((day > 0 && day <6) && (hour > 8 && hour < 17)){
    for(let blockedUrl of blockList){
        if(url.startsWith(blockedUrl)){
            window.stop();
            alert("GET BACK TO WORK!!!");
        };
    }
}
