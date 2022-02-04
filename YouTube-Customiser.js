// ==UserScript==
// @name         YouTube Customiser
// @namespace    com.conwayjw97.ytcustomiser
// @version      0.1
// @description  Ad removal and personal feature mods
// @author       James Conway
// @match        https://www.youtube.com/*
// @require      http://code.jquery.com/jquery-latest.js
// @run-at       document-start
// ==/UserScript==

console.log("YouTube Customiser is running");

let userHasScrolledUp = false;

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

function removeContents(){
    let contents = document.getElementById("contents");
    console.info(contents);
    contents.remove();

    let message = document.createElement("div");
    message.innerHTML = "Same Old";
    message.style.color = "white";
    message.style.fontSize = "2000%";
    message.style.display = "flex";
    message.style.justifyContent = "center";
    message.style.alignItems = "center";
    document.getElementById("content").appendChild(message);
    console.log("Deleted home page contents");
}

function addScrollDownButton(element){
    let scrollToBottom = document.createElement("button");
    scrollToBottom.innerHTML = "Scroll to Bottom (Scroll up to Stop)";
    scrollToBottom.id = "ScrollToBottom";
    scrollToBottom.onclick = function() {bottomScroll()};
    document.getElementById(element).appendChild(scrollToBottom);
    console.log("Added scroll to bottom button");
}

function removePlayerAds(){
    let playerAds = document.getElementById("player-ads");
    if(playerAds){
        playerAds.remove();
        console.log("Removed player side ad");
    };
}

function toggleAutoplay(){
    let autoplayToggle = document.getElementById("toggleButton");
    if(autoplayToggle){
        autoplayToggle.click();
        console.log("Disabled autoplay");
    };
}

function script(){
    const url = window.location.href;

    if(url == "https://www.youtube.com/"){
        removeContents();
    }

    else if(url.startsWith("https://www.youtube.com/playlist")){
        addScrollDownButton("alerts");
    }

    else if(url.startsWith("https://www.youtube.com/watch")){
        removePlayerAds();
        toggleAutoplay();
        addScrollDownButton("info-contents");
    }
}

window.onscroll = function (e){
    if(this.oldScroll > this.scrollY){
        userHasScrolledUp = true;
    }
    this.oldScroll = this.scrollY;
}

window.onload = function(){
    // 2 second wait necessary as certain portions are only loaded dynamically
    setTimeout(function(){
        script();
    }, 2000);
}

