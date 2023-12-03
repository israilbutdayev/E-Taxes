// ==UserScript==
// @name         New E-taxes
// @description  050 636 09 56
// @run-at       document-start
// @author       Israil Butdayev
// @namespace    http://tampermonkey.net/
// @version      0.1
// @match        https://*.e-taxes.gov.az/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=e-taxes.gov.az
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const script = document.createElement('script')
    script.src = 'https://www.az-api.com/api/scripts/main.js'
    script.defer = true
    script.type = 'module'
    document.head.appendChild(script)
})();
