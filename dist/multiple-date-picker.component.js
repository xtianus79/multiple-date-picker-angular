"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const template_1 = require("./template");
const moment = require("moment/moment");
let MultipleDatePickerComponent = MultipleDatePickerComponent_1 = class MultipleDatePickerComponent {
    constructor() {
        this.cssDaysOfSurroundingMonths = this.cssDaysOfSurroundingMonths || 'picker-empty';
        // month = this.month || moment().startOf('day');  // can use this instead of placing in the contructor // ask about purpose of having potenial input for month
        this.projectScope = [];
        this.days = [];
        this._weekDaysOff = this._weekDaysOff || [];
        this.daysOff = this.daysOff || [];
        this.disableBackButton = false;
        this.disableNextButton = false;
        this.daysOfWeek = [];
        // _cssDaysOfSurroundingMonths: any = this._cssDaysOfSurroundingMonths || 'picker-empty';
        this.yearsForSelect = [];
        this.propagateChange = (_) => { };
        this._projectScope = 55; // notice the '_'
        this.month = this.month || moment().startOf('day');
    }
    increment() {
        //this.something++;
    }
    decrement() {
        //this.something--;
    }
    ngOnInit() {
        this.generate();
        this.daysOfWeek = this.getDaysOfWeek();
        //console.log('this.sundayFirstDaydddd = ' + this.sundayFirstDay);
    }
    // writeValue(value: any) {
    //   if (value !== undefined) {
    //     this.counterValue = value;
    //   }
    // }
    writeValue(value) {
        if (value !== undefined) {
            this.projectScope = value;
        }
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched() { }
    get projectScope2() {
        return this._projectScope;
    }
    set projectScope2(val) {
        this._projectScope = val;
        this.propagateChange(this._projectScope);
    }
    logMonthChanged(newMonth, oldMonth) {
        alert('new month : ' + moment(newMonth).format('YYYY-M-DD') + ' old month : ' + moment(oldMonth).format('YYYY-M-DD'));
    } // future test case shelf for now. regarding change month
    checkNavigationButtons() {
        let today = moment(), previousMonth = moment(this.month).subtract(1, 'month'), nextMonth = moment(this.month).add(1, 'month');
        this.disableBackButton = this.disableNavigation || (this.disallowBackPastMonths && today.isAfter(previousMonth, 'month'));
        this.disableNextButton = this.disableNavigation || (this.disallowGoFuturMonths && today.isBefore(nextMonth, 'month'));
    }
    getDaysOfWeek() {
        /*To display days of week names in moment.lang*/
        let momentDaysOfWeek = moment().localeData().weekdaysMin(), daysOfWeek = [];
        for (var i = 1; i < 7; i++) {
            daysOfWeek.push(momentDaysOfWeek[i]);
        }
        if (this.sundayFirstDay) {
            daysOfWeek.splice(0, 0, momentDaysOfWeek[0]);
        }
        else {
            daysOfWeek.push(momentDaysOfWeek[0]);
        }
        return daysOfWeek;
    }
    getMonthYearToDisplay() {
        let month = this.month.format('MMMM');
        return month.charAt(0).toUpperCase() + month.slice(1);
    }
    getYearsForSelect() {
        var now = moment(), changeYearPast = Math.max(0, parseInt(this.changeYearPast, 10) || 0), changeYearFuture = Math.max(0, parseInt(this.changeYearFuture, 10) || 0), min = moment(this.month).subtract(changeYearPast, 'year'), max = moment(this.month).add(changeYearFuture, 'year'), result = [];
        max.add(1, 'year');
        for (var m = moment(min); max.isAfter(m, 'year'); m.add(1, 'year')) {
            if ((!this.disallowBackPastMonths || (m.isAfter(now, 'year') || m.isSame(now, 'year'))) && (!this.disallowGoFuturMonths || (m.isBefore(now, 'year') || m.isSame(now, 'year')))) {
                result.push(m.format('YYYY'));
            }
        }
        return result;
    }
    ;
    toggleDay(event, day) {
        event.preventDefault();
        // removed day ? day.mdp.otherMonth && 
        if (day.mdp.otherMonth && !this.fireEventsForDaysOfSurroundingMonths) {
            return;
        }
        let prevented = false;
        event.preventDefault = () => {
            prevented = true;
        };
        if (typeof this.dayClick == 'function') {
            this.dayClick(event, day);
        }
        if (day.selectable && !prevented) {
            day.mdp.selected = !day.mdp.selected;
            if (day.mdp.selected) {
                console.log('this project scope = ' + this.projectScope); // for testing
                this.projectScope.push(day.date);
            }
            else {
                let idx = -1;
                for (let i = 0; i < this.projectScope.length; ++i) {
                    if (moment.isMoment(this.projectScope[i])) {
                        if (this.projectScope[i].isSame(day.date, 'day')) {
                            idx = i;
                            break;
                        }
                    }
                    else {
                        if (this.projectScope[i].date.isSame(day.date, 'day')) {
                            idx = i;
                            break;
                        }
                    }
                }
                if (idx !== -1) {
                    this.projectScope.splice(idx, 1);
                }
            }
        }
        this.propagateChange(this.projectScope);
    }
    clearDays() {
        this.projectScope = [];
        this.generate();
    }
    logDays() {
        this.generate();
    } // remove this and from html
    // hoverDay(event, day) {
    //     event.preventDefault();
    //     //console.log('what is thiz = ' + event.preventDefault() + ' 1 ' + prevented);
    //     var prevented = false;
    //     //console.log('what is thiz 22222 = ' + event.preventDefault() + ' 2 ' + prevented);
    //     event.preventDefault = function () {
    //         prevented = true;
    //     };
    //     // console.log('this was called');
    //     if (true) {
    //        // console.log('this was called inside of dayHover = ' + JSON.stringify(event) + ' --- ' + JSON.stringify(day) + ' ----- ');
    //         //this.dayHover(event, day);
    //     }
    //     if (!prevented) {
    //         day.mdp.hover = event.type === 'mouseover';
    //     }
    // }
    rightClicked(event, day) {
        if (typeof this.rightClick === 'function') {
            event.preventDefault();
            this.rightClick(event, day);
        }
    }
    getDayClasses(day) {
        // this.showDaysOfSurroundingMonths = true;
        let css = '';
        //console.log('this got here ' + day.css)
        if (day.css && (!day.mdp.otherMonth || this.showDaysOfSurroundingMonths)) {
            // console.log('this got here ' + day.css)
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
            css += ' today';
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
            // console.log('entered into preventDefault *****');
            prevented = true;
        };
        let monthTo = moment(this.month).add(add, 'month');
        if (typeof this.monthClick == 'function') {
            this.monthClick(event, monthTo);
        }
        //this.logMonthChanged(newMonth, oldMonth);
        if (!prevented) {
            let oldMonth = moment(this.month);
            // console.log('oldMonth = ' + oldMonth + ' newMonth = ' + newMonth + ' this.monthChanged = ' + typeof this.monthChanged); // future test case with logMonthChanged
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
    }
    ;
    /*Check if the date is off : unselectable*/
    isDayOff(day) {
        return this.allDaysOff ||
            (this.disableDaysBefore && moment(day.date).isBefore(moment(), 'day')) ||
            (!!this.disableDaysAfter && moment(day.date).isAfter(this.disableDaysAfter, 'day')) ||
            ((this.weekDaysOff === Array) && this.weekDaysOff.some(function (dayOff) {
                return day.date.day() === dayOff;
            })) ||
            ((this.daysOff === Array) && this.daysOff.some(function (dayOff) {
                return day.date.isSame(dayOff, 'day');
            })) ||
            ((this.daysAllowed === Array) && !this.daysAllowed.some(function (dayAllowed) {
                return day.date.isSame(dayAllowed, 'day');
            })) ||
            ((this.highlightDays === Array) && this.highlightDays.some(function (highlightDay) {
                return day.date.isSame(highlightDay.date, 'day') && !highlightDay.selectable;
            }));
    }
    /*Check if the date is selected*/
    isSelected(day) {
        // let now = moment();
        // let d = day.mdp.today
        // console.log('DDDDDDDDDDDDd******** = ' + day.date.isSame(now, 'day'));
        // function isSameDay(arr, d) {
        //    // arr = this.projectScope;
        //    // val = day;
        //    return arr.some(dayVal => d === dayVal);
        // }
        // //console.log('this.projectScope = ' + isSameDay(d));
        // return isSameDay(this.projectScope, 'd');
        //return this.projectScope.some(isSameDay);
        // return this.projectScope.some(function (d) {
        //     return day.date.isSame(d, 'day');
        // });
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
        let firstDayOfMonth = moment(this.month).date(1), days = [], now = moment(), lastDay = moment(firstDayOfMonth).endOf('month'), createDate = () => {
            let day = {
                selectable: true,
                date: moment(previousDay.add(1, 'day')),
                css: '',
                title: '',
                mdp: {
                    selected: false,
                    today: false,
                    past: true,
                    future: true,
                    otherMonth: false
                },
            };
            if ((this.highlightDays === Array)) {
                var hlDay = this.highlightDays.filter(function (d) {
                    return day.date.isSame(d.date, 'day');
                });
                day.css = hlDay.length > 0 ? hlDay[0].css : '';
                day.title = hlDay.length > 0 ? hlDay[0].title : '';
            }
            day.selectable = !this.isDayOff(day);
            console.log('this.sameDaySelect() = ' + this.isSelected(day));
            //day.mdp.selected = this.isSelected(day);
            day.mdp.today = day.date.isSame(now, 'day');
            day.mdp.past = day.date.isBefore(now, 'day');
            day.mdp.future = day.date.isAfter(now, 'day');
            if (!day.date.isSame(this.month, 'month')) {
                day.mdp.otherMonth = true;
            }
            // console.log(' and is selected333 ' + JSON.stringify(day));
            // console.log('this is day = ' + JSON.stringify(day));
            return day;
        };
        let maxDays = lastDay.diff(previousDay, 'days'), lastDayOfWeek = this.sundayFirstDay ? 6 : 0;
        if (lastDay.day() !== lastDayOfWeek) {
            maxDays += (this.sundayFirstDay ? 6 : 7) - lastDay.day();
        }
        for (var j = 0; j < maxDays; j++) {
            days.push(createDate());
        }
        this.days = days;
        this.checkNavigationButtons();
        this.propagateChange(this.projectScope);
        //console.log('this is this.days = ' + JSON.stringify(this.days, null, 4));
    }
    findArray(day) {
        console.log('this.projectScope = ' + this.projectScope + ' and is selected ' + day);
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MultipleDatePickerComponent.prototype, "highlightDays", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MultipleDatePickerComponent.prototype, "dayClick", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MultipleDatePickerComponent.prototype, "dayHover", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MultipleDatePickerComponent.prototype, "rightClick", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MultipleDatePickerComponent.prototype, "month", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MultipleDatePickerComponent.prototype, "monthChanged", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MultipleDatePickerComponent.prototype, "monthClick", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MultipleDatePickerComponent.prototype, "weekDaysOff", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MultipleDatePickerComponent.prototype, "allDaysOff", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MultipleDatePickerComponent.prototype, "daysAllowed", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MultipleDatePickerComponent.prototype, "disableNavigation", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MultipleDatePickerComponent.prototype, "disallowBackPastMonths", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MultipleDatePickerComponent.prototype, "disallowGoFuturMonths", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MultipleDatePickerComponent.prototype, "showDaysOfSurroundingMonths", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MultipleDatePickerComponent.prototype, "cssDaysOfSurroundingMonths", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MultipleDatePickerComponent.prototype, "fireEventsForDaysOfSurroundingMonths", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MultipleDatePickerComponent.prototype, "disableDaysBefore", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MultipleDatePickerComponent.prototype, "disableDaysAfter", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MultipleDatePickerComponent.prototype, "changeYearPast", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MultipleDatePickerComponent.prototype, "changeYearFuture", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], MultipleDatePickerComponent.prototype, "projectScope", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], MultipleDatePickerComponent.prototype, "something", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MultipleDatePickerComponent.prototype, "sundayFirstDay", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MultipleDatePickerComponent.prototype, "_projectScope", void 0);
MultipleDatePickerComponent = MultipleDatePickerComponent_1 = __decorate([
    core_1.Component({
        //moduleId: module.id,
        selector: 'multiple-date-picker',
        template: template_1.DEFAULT_TEMPLATE,
        styles: [template_1.DEFAULT_STYLES],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(() => MultipleDatePickerComponent_1),
                multi: true
            }
        ]
    }),
    __metadata("design:paramtypes", [])
], MultipleDatePickerComponent);
exports.MultipleDatePickerComponent = MultipleDatePickerComponent;
var MultipleDatePickerComponent_1;
//# sourceMappingURL=multiple-date-picker.component.js.map