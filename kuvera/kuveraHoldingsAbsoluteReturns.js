// ==UserScript==
// @name         Kuvera Holdings Absolute Returns
// @namespace    https://kuvera.in/holdings
// @version      0.1
// @description  Absolute Returns
// @author       vharekal
// @match        https://kuvera.in/holdings?ar=1
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function calculateReturns() {
        var $ = window.jQuery;
        var investmentValues = $('.holding-list div:not(.holdings-headers):not(.entries) .amounts').text().split("\n          ")
        var trimmmedInvestments = [];
        var count = 0;
        var investment;
        $.each(investmentValues, function(index, investmentValue) {
            investmentValue = investmentValue.trim();
            if (investmentValue.length > 0) {
                if (count%2 == 0) {
                    investment = parseFloat(investmentValue.split("₹")[1].replace(/,/g , ''));
                } else {
                    var value = parseFloat(investmentValue.split("₹")[1].replace(/,/g , ''));
                    var returns = ((parseFloat(value)-parseFloat(investment))/parseFloat(investment)*100).toFixed(2);
                    trimmmedInvestments.push(returns);
                }
            }
            ++count;
        });
        console.log(trimmmedInvestments);
        $.each($('.holding-list div:not(.holdings-headers):not(.entries) .entries'), function(index, row) {
            if (index % 2) return;
            var element;
            var returns = trimmmedInvestments[index/2];
            if (returns >= 0) {
                element = '<span data-v-22e30262="" class="gains green" style="margin-right: 15px; font-size: 12px;"> +' + returns + '%</span>';
            } else {
                element = '<span data-v-22e30262="" class="gains red" style="margin-right: 15px; font-size: 12px;"> ' + returns + '%</span>';
            }
            // $(row).children("div:nth-child(5)").append(element);
            $(row).children("div:nth-child(5)").html(element);
        });
        var totalStr = $('.holding-list > .entries > .amounts');
        var totalInvestment = $(totalStr[0]).text().split(" ")[1].replace(/,/g , '');
        var totalValue = $(totalStr[2]).text().split("₹")[1].replace(/,/g , '');
        var totalReturns = ((totalValue/totalInvestment-1)*100).toFixed(2);
        var element;
        if (totalReturns >= 0) {
            element = '\n<div data-v-22e30262="" class="gains green" style="margin-right: 15px; font-size: 14px;"> +' + totalReturns + '%</div>';
        } else {
            element = '\n<div data-v-22e30262="" class="gains red" style="margin-right: 15px; font-size: 14px;"> ' + totalReturns + '%</div>';
        }
        $('.holding-list > .entries div:nth-child(3)').html(element);
    }

    waitForKeyElements (".holding-list", calculateReturns);
})();
