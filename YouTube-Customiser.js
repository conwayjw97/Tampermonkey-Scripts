// ==UserScript==
// @name         James's YouTube Customiser
// @namespace    com.conwayjw97.ytcustomiser
// @version      0.1
// @description  Remove the big ad banner from YouTube's homepage
// @author       James Conway
// @match        https://www.youtube.com/*
// @grant        GM_log
// @require      http://code.jquery.com/jquery-latest.js
// @run-at       document-start
// ==/UserScript==

GM_log("YouTube Customiser is running");

if(window.location.href == "https://www.youtube.com/"){
    window.location.replace("https://www.youtube.com/feed/subscriptions");
}
