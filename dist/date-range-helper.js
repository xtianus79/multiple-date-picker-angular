"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
Date.prototype.addDays = function (days) {
    if (!days) {
        return this.valueOf();
    }
    var dayDate = new Date(this.valueOf());
    dayDate.setDate(dayDate.getDate() + days);
    return dayDate;
};
var DateRangeHelper = (function () {
    function DateRangeHelper() {
    }
    /**
     * getDates calculates the beginning dates and ending dates and transforms
     * those date ranges into a consumable array of dates... this will allow for a single
     * date array.  Pass in milliseconds
    */
    DateRangeHelper.getDates = function (startDate, stopDate) {
        var dateArray = new Array();
        var currentDate = startDate;
        // protection from dates that may be inversed... protection should exist on main component too
        if (stopDate - startDate >= 0) {
            while (currentDate <= stopDate) {
                dateArray.push(currentDate);
                currentDate = currentDate.addDays(1);
            }
            return dateArray;
        }
        else {
            console.log('*** stopDate - startDate is not > 0 meaning dates are possibly inversed'); // keep as error message
            return;
        }
    };
    /**
     * dateRangeDaysCalculator takes the date ranges and figures out the number of days inbetween
     * this is then used for the getDates method which will take said date range and transform it into a
     * consumable array of dates inbetween those ranges
    */
    DateRangeHelper.dateRangeDaysCalculator = function (stopDate, startDate) {
        var msMinute = 60 * 1000, msDay = 60 * 60 * 24 * 1000;
        var dateRangeDays = Math.floor((stopDate - startDate) / msDay);
        return dateRangeDays;
    };
    /**
     * dateRangeMonthsCalculator takes the date ranges and figures out the number of days inbetween
     * this is used to determine the number of months the range should be visualized on the front end
     * so that the person is taken to the month that the date range is supposed to be visible
    */
    DateRangeHelper.dateRangeMonthsCalculator = function (arrivalDate) {
        var dateRangeMonths = (new Date(arrivalDate).getMonth() - (new Date().getMonth()));
        return dateRangeMonths;
    };
    DateRangeHelper.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    DateRangeHelper.ctorParameters = function () { return []; };
    return DateRangeHelper;
}());
exports.DateRangeHelper = DateRangeHelper;
