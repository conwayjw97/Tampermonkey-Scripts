// ==UserScript==
// @name         James's YouTube Customiser
// @namespace    com.conwayjw97.ytcustomiser
// @version      0.1
// @description  Ad removal and personal feature mods
// @author       James Conway
// @match        https://www.youtube.com/*
// @grant        GM_log
// @require      http://code.jquery.com/jquery-latest.js
// @run-at       document-start
// ==/UserScript==

// https://savemp3.cc/

GM_log("YouTube Customiser is running");

let start = new Date();
let url = window.location.href;

if(url == "https://www.youtube.com/"){
    window.location.replace("https://www.youtube.com/feed/subscriptions");
    GM_log("Redirected you to your subscriptions");
};

window.onload = function(){
    if(url.startsWith("https://www.youtube.com/watch")){
        // 2 second wait necessary as certain portions are only loaded dynamically
        setTimeout(function(){
            let playerAds = document.getElementById("player-ads");
            if(playerAds){
                playerAds.remove();
                GM_log("Removed player side ad");
            };

            let autoplayToggle = document.getElementById("toggleButton");
            if(autoplayToggle){
                autoplayToggle.click();
                GM_log("Disabled autoplay");
            };

            // Add a download to mp3 button
//             let infoPane = document.getElementById("info-contents");
//             GM_log(infoPane);
//             let downloadToMp3 = document.createElement("button");
//             downloadToMp3.innerHTML = "Load Comments";
//             downloadToMp3.baseUri = "https://savemp3.cc/";
//             infoPane.appendChild(downloadToMp3);
        }, 2000);
    }
};
