// ==UserScript==
// @name         Remove FB Notifications
// @namespace    http://tampermonkey.net/
// @version      2025-06-26
// @description  try to take over the world!
// @author       You
// @match        *://www.facebook.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Remove notifications
    console.log("Script");
    const element = document.querySelector('[aria-label="Account controls and settings"]');
    element.remove();
})();
