import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {DEFAULT_TEMPLATE, DEFAULT_STYLES} from './template';
import * as moment from 'moment/moment';

@Component({
    selector: 'multiple-date-picker',
    template: DEFAULT_TEMPLATE,
    styles: [DEFAULT_STYLES],
    providers: [
        { 
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => MultipleDatePickerComponent),
          multi: true
        }
      ]
})
export class MultipleDatePickerComponent implements OnInit, ControlValueAccessor {
    @Input() highlightDays: Array<any>;
    @Input() dayClick: any;
    @Input() dayHover: string;
    @Input() rightClick: string;
    @Input() monthChanged: any;
    @Input() fontAwesome: boolean;
    @Input() matIcons: boolean;
    @Input() monthClick: string;
    @Input() weekDaysOff: Array<number>;
    @Input() allDaysOff: string;
    @Input() daysAllowed: any;
    @Input() disableNavigation: boolean;
    @Input() disallowBackPastMonths: boolean;
    @Input() disallowGoFuturMonths: string;
    @Input() showDaysOfSurroundingMonths: boolean;
    @Input() cssDaysOfSurroundingMonths: any = this.cssDaysOfSurroundingMonths || 'picker-empty';
    @Input() fireEventsForDaysOfSurroundingMonths: string;
    @Input() disableDaysBefore: any;
    @Input() disableDaysAfter: any;
    @Input() changeYearPast: string;
    @Input() changeYearFuture: string;
    arrow: number = 0;
    monthAdjustment: any;
    @Input() month = moment().startOf('day');  // today's day at start of day midnight or passed in value
    @Input() projectScope: any[] = [];
    days: any[] = [];
    daysOff: any = this.daysOff || [];
    disableBackButton: any = false;
    disableNextButton: any = false;
    daysOfWeek: any[] = [];
    // _cssDaysOfSurroundingMonths: any = this._cssDaysOfSurroundingMonths || 'picker-empty';
    yearsForSelect: any = [];
    monthToDisplay: string;
    yearToDisplay: string;
    @Input() sundayFirstDay: boolean;

    constructor(

    ) { 
        
    }

    ngOnInit(): void {
        /**
         * check to see if this.month is undefined... if it is set to todays date info
         * protection for calendar month adjustments -- otherwise will break upon loading
         */
        if (this.month === undefined) {
            this.month = moment().startOf('day');
        }

        this.generate();
        this.daysOfWeek = this.getDaysOfWeek();
        this.arrowSelected();
        this.weekDaysOff = this.weekDaysOff || [];
    }

    arrowSelected() {
        if (this.matIcons) {
            return this.arrow = 1;
        } else if (this.fontAwesome) {
            return this.arrow = 2;
        }
    }

    writeValue(value: any[]) {
        if (value !== undefined) {
            this.projectScope = value;
            if (value !== null) {
                this.projectScope = this.projectScope.map((val: Date) => {
                    return moment(val);
                });
                this.projectScope.forEach((val: Date) => {
                let day = val;
                this.days.forEach((d) => {
                    if(d.date.isSame(day)){
                        d.mdp.selected = true;
                        return;
                    }
                });
            });
            }
        }
    }
    propagateChange = (_: any) => {};
    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched() {}

    @Input() _projectScope: any[];
    get projectScope2() {
        return this._projectScope;
    }
    set projectScope2(val) {
        this._projectScope = val;
        this.propagateChange(this._projectScope);
    }
    checkNavigationButtons() {
        let today = moment(),
        previousMonth = moment(this.month).subtract(1, 'month'),
        nextMonth = moment(this.month).add(1, 'month');
        this.disableBackButton = this.disableNavigation || (this.disallowBackPastMonths && today.isAfter(previousMonth, 'month'));
        this.disableNextButton = this.disableNavigation || (this.disallowGoFuturMonths && today.isBefore(nextMonth, 'month'));
    }
    getDaysOfWeek() {
        /*To display days of week names in moment.lang*/
        let momentDaysOfWeek = moment().localeData().weekdaysMin(),
            daysOfWeek = [];
        for (var i = 1; i < 7; i++) {
            daysOfWeek.push(momentDaysOfWeek[i]);
        }
        if (this.sundayFirstDay) {
            daysOfWeek.splice(0, 0, momentDaysOfWeek[0]);
        } else {
            daysOfWeek.push(momentDaysOfWeek[0]);
        }
        return daysOfWeek;
    }
    getMonthYearToDisplay() {
        let month = this.month.format('MMMM');
        return month.charAt(0).toUpperCase() + month.slice(1);
    }
    getYearsForSelect() {
        var now = moment(),
            changeYearPast = Math.max(0, parseInt(this.changeYearPast, 10) || 0),
            changeYearFuture = Math.max(0, parseInt(this.changeYearFuture, 10) || 0),
            min = moment(this.month).subtract(changeYearPast, 'year'),
            max = moment(this.month).add(changeYearFuture, 'year'),
            result = [];
        max.add(1, 'year');
        for (var m = moment(min); max.isAfter(m, 'year'); m.add(1, 'year')) {
            if ((!this.disallowBackPastMonths || (m.isAfter(now, 'year') || m.isSame(now, 'year'))) && (!this.disallowGoFuturMonths || (m.isBefore(now, 'year') || m.isSame(now, 'year')))) {
                result.push(m.format('YYYY'));
            }
        }
        return result;
    };
    toggleDay(event, day) {
        event.preventDefault();
        if (day.mdp.otherMonth && !this.fireEventsForDaysOfSurroundingMonths) {
            return;
        }
        let prevented = false;
        event.preventDefault = () => {
            prevented = true;
        }
        if (typeof this.dayClick == 'function') {
            this.dayClick(event, day);
        }
        if (day.selectable && !prevented) {
            day.mdp.selected = !day.mdp.selected;
            if (day.mdp.selected) {
                this.projectScope.push(day.date);
                // console.log('this project scope = ' + this.projectScope); // for testing keep!
            } else {
                let idx = -1;
                for (let i = 0; i < this.projectScope.length; ++i) {
                    if (moment.isMoment(this.projectScope[i])) {
                        if (this.projectScope[i].isSame(day.date, 'day')) {
                            idx = i;
                            break;
                        }
                    } else {
                        if (this.projectScope[i].date.isSame(day.date, 'day')) {
                            idx = i;
                            break;
                        }
                    }
                }
                if (idx !== -1){
                    this.projectScope.splice(idx, 1);
                } 
            }
        }
        this.propagateChange(this.projectScope);
    }
    clearDays() {
        this.projectScope = [];
        this.generate();
         // console.log('clearDays was fired off'); // for testing
    }
    runGenerate() {
        this.generate();
    } // remove this and from html
    rightClicked(event, day) {
        if (typeof this.rightClick === 'function') {
            event.preventDefault();
            this.rightClick(event, day);
        }
    }
    getDayClasses(day) {
        //console.log('this is day = ' + JSON.stringify(day)); // for testing keep
        let css = '';
        if (day.css && (!day.mdp.otherMonth || this.showDaysOfSurroundingMonths)) {
            css += ' ' + day.css;
        }
        if (this.cssDaysOfSurroundingMonths && day.mdp.otherMonth) {
            css += ' ' + this.cssDaysOfSurroundingMonths;
        }
        if (day.mdp.selected) {
            css += ' picker-selected';
        }
        if (!day.selectable) {
            css += ' picker-off';
        }
        if (day.mdp.today) {
            if (this.highlightDays !== undefined && this.highlightDays.length > 0) {
                let arrayObject = this.highlightDays.find(x => x.css);
                // let index = this.highlightDays.indexOf(arrayObject); // gives number of occurenses in array
                let arrayKeys = Object.keys(this.highlightDays);
                if (arrayObject !== undefined && arrayKeys.length > 0) {
                    let highlightDayCss = arrayObject.css;
                    css += ' today ' + highlightDayCss;
                } else {
                    css += ' today ';
                }
            }
        }
        if (day.mdp.past) {
            css += ' past';
        }
        if (day.mdp.future) {
            css += ' future';
        }
        if (day.mdp.otherMonth) {
            css += ' picker-other-month';
        }
        return css;
    }
    
    /*Navigate to another month*/
    changeMonth(event, disable, add) {
        if (disable) {
            return;
        }
        event.preventDefault();
        let prevented = false;
        event.preventDefault = () => {
            // console.log('entered into preventDefault *****'); // for testing
            prevented = true;
        }
        let monthTo = moment(this.month).add(add, 'month');
        if (typeof this.monthClick == 'function') {
            this.monthClick(event, monthTo);
        }
        if (!prevented) {
            let oldMonth = moment(this.month);
            this.month = monthTo;
            if (typeof this.monthChanged == 'function') {
                this.monthChanged(this.month, oldMonth);
            }
            this.generate();
        }
    }

    /*Change year*/
    changeYear(year) {
        this.month = this.month.year(parseInt(year, 10));
    };

    /*Check if the date is off : unselectable*/
    isDayOff(day) {
        return this.allDaysOff ||
            (this.disableDaysBefore && moment(day.date).isBefore(moment(), 'day')) ||
            (!!this.disableDaysAfter && moment(day.date).isAfter(moment(), 'day')) ||
            ((this.weekDaysOff instanceof Array) && this.weekDaysOff.some(function (dayOff) {
                return day.date.day() === dayOff;
            })) ||
            ((this.daysOff === Array) && this.daysOff.some(function (dayOff) {
                return day.date.isSame(dayOff, 'day');
            })) ||
            ((this.daysAllowed === Array) && !this.daysAllowed.some(function (dayAllowed) {
                return day.date.isSame(dayAllowed, 'day');
            })) ||
            ((Object.prototype.toString.call(this.highlightDays) === '[object Array]') && this.highlightDays.some(function (highlightDay) {
                return day.date.isSame(highlightDay.date, 'day') && !highlightDay.selectable && highlightDay.css;
            }));
    }

    /*Check if the date is selected*/
    isSelected(day) {
        return this.projectScope.some(function (d) {
            return day.date.isSame(d, 'day');
        });
    }

    /*Generate the calendar*/
    generate() {
        let year = this.month.year().toString();
        this.yearsForSelect = this.getYearsForSelect();
        this.monthToDisplay = this.getMonthYearToDisplay();
        this.yearToDisplay = this.month.format('YYYY');
        let previousDay = moment(this.month).date(0).day(this.sundayFirstDay ? 0 : 1).subtract(1, 'day');

        if (moment(this.month).date(0).diff(previousDay, 'day') > 6) {
            previousDay = previousDay.add(1, 'week');
        }
        let firstDayOfMonth = moment(this.month).date(1),
            days = [],
            now = moment(),
            lastDay = moment(firstDayOfMonth).endOf('month'),
            createDate = () => {
                let day = {
                    selectable: true,
                    date: moment(previousDay.add(1, 'day')),
                    css: null,
                    title: '',
                    mdp: {
                        selected: false,
                        today: false,
                        past: true,
                        future: true,
                        otherMonth: false
                    },
                }
                if ((Object.prototype.toString.call(this.highlightDays) === '[object Array]')) {
                    var hlDay = this.highlightDays.filter(function (d) {
                        return day.date.isSame(d.date, 'day');
                    });
                    day.css = hlDay.length > 0 ? hlDay[0].css : '';
                    day.title = hlDay.length > 0 ? hlDay[0].title : '';
                }
                day.selectable = !this.isDayOff(day);
                day.mdp.selected = this.isSelected(day);
                day.mdp.today = day.date.isSame(now, 'day');
                day.mdp.past = day.date.isBefore(now, 'day');
                day.mdp.future = day.date.isAfter(now, 'day');
                if (!day.date.isSame(this.month, 'month')) {
                    day.mdp.otherMonth = true;
                }
                return day;
            }
            let maxDays = lastDay.diff(previousDay, 'days'),
            lastDayOfWeek = this.sundayFirstDay ? 6 : 0;
        if (lastDay.day() !== lastDayOfWeek) {
            maxDays += (this.sundayFirstDay ? 6 : 7) - lastDay.day();
        }
        for (var j = 0; j < maxDays; j++) {
            days.push(createDate());
        }
        this.days = days;
        this.checkNavigationButtons();
        this.propagateChange(this.projectScope);
    }
    findArrayofDays() {
        console.log('this.projectScope = ' + this.projectScope);
    }
}
