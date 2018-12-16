// ==UserScript==
// @name         Kuvera Dashboard Absolute Returns
// @namespace    https://kuvera.in/dashboard
// @version      0.1
// @description  Absolute Returns
// @author       vharekal
// @match        https://kuvera.in/dashboard?ar=1
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function calculateReturns() {
        var $ = window.jQuery;
        var parsedString = $('.dashboard-portfolio .item').first().text().split(" ");
        var currentValue = parseFloat(parsedString[3].replace(/,/g , ''));
        var totalInvested = parseFloat(parsedString[6].replace(/,/g , ''));
        var absoluteReturns = ((currentValue/totalInvested-1)*100).toFixed(2);
        var element;
        if (absoluteReturns >= 0) {
            element = '<span data-v-45c6a998="" class=gains style="font-size:30px">  ' + absoluteReturns + '% </span>';
        } else {
            element = '<span data-v-45c6a998="" class=loss style="font-size:30px">  ' + absoluteReturns + '% </span>';
        }
        $('.dashboard-portfolio .item:nth-child(5) span').html(element);
    }

    waitForKeyElements (".dashboard-portfolio", calculateReturns);
})();
