declare global  {
    interface Date {
        addDays(days: number): Date;
    }
}
export declare class DateRangeHelper {
    /**
     * getDates calculates the beginning dates and ending dates and transforms
     * those date ranges into a consumable array of dates... this will allow for a single
     * date array.  Pass in milliseconds
    */
    static getDates: (startDate: any, stopDate: any) => Date[];
    /**
     * dateRangeDaysCalculator takes the date ranges and figures out the number of days inbetween
     * this is then used for the getDates method which will take said date range and transform it into a
     * consumable array of dates inbetween those ranges
    */
    static dateRangeDaysCalculator: (stopDate: number, startDate: number) => number;
    /**
     * dateRangeMonthsCalculator takes the date ranges and figures out the number of days inbetween
     * this is used to determine the number of months the range should be visualized on the front end
     * so that the person is taken to the month that the date range is supposed to be visible
    */
    static dateRangeMonthsCalculator: (arrivalDate: number) => number;
    constructor();
}
export {};
