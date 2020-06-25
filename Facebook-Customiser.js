// ==UserScript==
// @name         Facebook Customiser
// @namespace    com.conwayjw97.fbcustomiser
// @version      0.1
// @author       James Conway
// @match        https://www.facebook.com/*
// @grant        GM_log
// @run-at       document-start
// ==/UserScript==

GM_log("Facebook Customiser is running");

if(window.location.href == "https://www.facebook.com/"){
    window.location.replace("https://www.facebook.com/messages");
    GM_log("Redirected you to your messages");
};
