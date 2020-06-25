// ==UserScript==
// @name         YouTube Customiser
// @namespace    com.conwayjw97.ytcustomiser
// @version      0.1
// @description  Ad removal and personal feature mods
// @author       James Conway
// @match        https://www.youtube.com/*
// @grant        GM_log
// @require      http://code.jquery.com/jquery-latest.js
// @run-at       document-start
// ==/UserScript==

GM_log("YouTube Customiser is running");

let userHasScrolledUp = false;

// Test when the user has scrolled up
window.onscroll = function (e){
    if(this.oldScroll > this.scrollY){
        userHasScrolledUp = true;
    }
    this.oldScroll = this.scrollY;
}

function bottomScroll() {
    GM_log("Scrolling to the bottom...");

    window.scrollTo(0, document.getElementById("primary").scrollHeight);
    userHasScrolledUp = false;

    // Try to scroll again every second, stop when the user scrolls up
    let intervalId = setInterval(function(){
        window.scrollTo(0, document.getElementById("primary").scrollHeight);
        if(userHasScrolledUp == true){
            clearInterval(intervalId);
        }
    }, 1000);
}

let url = window.location.href;

if(url == "https://www.youtube.com/"){
    window.location.replace("https://www.youtube.com/feed/subscriptions");
    GM_log("Redirected you to your subscriptions");
}

window.onload = function(){
    if(url.startsWith("https://www.youtube.com/playlist")){
        let scrollToBottom = document.createElement("button");
        scrollToBottom.innerHTML = "Scroll to Bottom (Scroll up to Stop)";
        scrollToBottom.id = "ScrollToBottom";
        scrollToBottom.onclick = function() {bottomScroll()};
        document.getElementById("items").appendChild(scrollToBottom);
        GM_log("Added scroll to bottom button");
    }

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
        }, 2000);
    }
}


