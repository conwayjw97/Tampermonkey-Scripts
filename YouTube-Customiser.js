// ==UserScript==
// @name         James's YouTube Customiser
// @namespace    com.conwayjw97.ytcustomiser
// @version      0.1
// @description  Remove the big ad banner from YouTube's homepage
// @author       James Conway
// @match        https://www.youtube.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function() {
    'use strict';

    console.log("YouTube Customiser is running");

    if(window.location.href == "https://www.youtube.com/"){
        document.getElementById("masthead-ad").remove();
        window.location.replace("https://www.youtube.com/feed/subscriptions");
    }
})();
