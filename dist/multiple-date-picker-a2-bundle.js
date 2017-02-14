var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * The default multiple date picker was orginated from here... styles and structure can be associated
 * from arca-computing https://arca-computing.github.io/MultipleDatePicker/
 */
System.register("template", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var DEFAULT_TEMPLATE, DEFAULT_STYLES;
    return {
        setters:[],
        execute: function() {
            exports_1("DEFAULT_TEMPLATE", DEFAULT_TEMPLATE = "\n    <div class=\"multiple-date-picker\">\n        <div class=\"picker-top-row\">\n            <div class=\"text-center picker-navigate picker-navigate-left-arrow\" [ngClass]=\"{'disabled':disableBackButton}\" (click)=\"changeMonth($event, disableBackButton, -1)\">&lt;</div>\n            <div class=\"text-center picker-month\">\n                {{monthToDisplay}}\n                <span *ngIf=\"yearsForSelect.length < 2\">{{yearToDisplay}}</span>\n            </div>\n            <div class=\"text-center picker-navigate picker-navigate-right-arrow\" [ngClass]=\"{'disabled':disableNextButton}\" (click)=\"changeMonth($event, disableNextButton, 1)\">&gt;</div>\n            <button (click)=\"clearDays()\">Clear Days</button>\n            <button (click)=\"logDays()\">Log Days</button>\n            <button (click)=\"findArray()\">Find Array</button>\n            <button (click)=\"decrement()\">\n            Decrement\n            </button>\n            <button (click)=\"increment()\">\n            Increment\n            </button>\n        </div>\n        <div class=\"picker-days-week-row\">\n            <div class=\"text-center\" *ngFor=\"let weekDays of daysOfWeek\">{{weekDays}}</div>\n        </div>\n        <div class=\"picker-days-row\">\n            <div class=\"text-center picker-day {{getDayClasses(day)}}\" title=\"{{day.title}}\" *ngFor=\"let day of days\" (click)=\"toggleDay($event, day)\" >\n                {{day ? day.mdp.otherMonth && !showDaysOfSurroundingMonths ? '&nbsp;' : day.date.format('D') : ''}}\n            </div>\n        </div>\n    </div>\n    ");
            exports_1("DEFAULT_STYLES", DEFAULT_STYLES = "\n        .text-center {\n            text-align: center\n        }\n        \n        .multiple-date-picker {\n            -webkit-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none\n        }\n        \n        .multiple-date-picker,.picker-days-row,.picker-days-week-row,.picker-top-row {\n            width: 100%\n        }\n        \n        .picker-top-row>div {\n            display: inline-block\n        }\n        \n        .picker-navigate {\n            width: 16.66%\n        }\n        \n        .picker-navigate:hover {\n            cursor: pointer\n        }\n        \n        .picker-navigate.disabled,.picker-navigate.disabled:hover {\n            color: #ddd;\n            cursor: default\n        }\n        \n        .picker-month {\n            width: 66%\n        }\n        \n        .picker-days-row>div,.picker-days-week-row>div {\n            width: 14.28%;\n            display: inline-block\n        }\n        \n        .picker-day,.picker-top-row {\n            padding: 10px 0\n        }\n        \n        .picker-day {\n            background-color: #fff;\n            border: 1px solid #eee;\n            box-sizing: border-box;\n            color: #000\n        }\n        \n        .picker-day.today,.picker-day.today.picker-off,.picker-day.today.picker-off:hover,.picker-day.today.picker-selected,.picker-day.today:hover {\n            color: #00a3ff\n        }\n        \n        .picker-day:not(.picker-off):not(.picker-empty):hover {\n            background-color: #C6000B;\n            color: #fff;\n            cursor: pointer\n        }\n        \n        .picker-day.picker-selected {\n            background-color: #C6000B;\n            color: #fff\n        }\n        \n        .picker-day.picker-off,.picker-day.picker-off:hover {\n            background-color: #eee;\n            color: #bbb;\n            cursor: default\n        }\n        \n        .picker-day.picker-empty,.picker-day.picker-empty:hover {\n            background-color: #fafafa;\n            cursor: default\n        }\n        \n        input {\n              border: 0;\n              border-radius: 3px;\n              height: 30px;\n              max-width: 100px;\n              text-align: center;\n            }\n            ");
        }
    }
});
System.register("multiple-date-picker.component", ['@angular/core', '@angular/forms', "template", 'moment/moment'], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var core_1, forms_1, template_1, moment;
    var MultipleDatePickerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (template_1_1) {
                template_1 = template_1_1;
            },
            function (moment_1) {
                moment = moment_1;
            }],
        execute: function() {
            MultipleDatePickerComponent = (function () {
                function MultipleDatePickerComponent() {
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
                    this.propagateChange = function (_) { };
                    this._projectScope = 55; // notice the '_'
                    this.month = this.month || moment().startOf('day');
                }
                MultipleDatePickerComponent.prototype.increment = function () {
                    //this.something++;
                };
                MultipleDatePickerComponent.prototype.decrement = function () {
                    //this.something--;
                };
                MultipleDatePickerComponent.prototype.ngOnInit = function () {
                    this.generate();
                    this.daysOfWeek = this.getDaysOfWeek();
                    //console.log('this.sundayFirstDaydddd = ' + this.sundayFirstDay);
                };
                // writeValue(value: any) {
                //   if (value !== undefined) {
                //     this.counterValue = value;
                //   }
                // }
                MultipleDatePickerComponent.prototype.writeValue = function (value) {
                    if (value !== undefined) {
                        this.projectScope = value;
                    }
                };
                MultipleDatePickerComponent.prototype.registerOnChange = function (fn) {
                    this.propagateChange = fn;
                };
                MultipleDatePickerComponent.prototype.registerOnTouched = function () { };
                Object.defineProperty(MultipleDatePickerComponent.prototype, "projectScope2", {
                    get: function () {
                        return this._projectScope;
                    },
                    set: function (val) {
                        this._projectScope = val;
                        this.propagateChange(this._projectScope);
                    },
                    enumerable: true,
                    configurable: true
                });
                MultipleDatePickerComponent.prototype.logMonthChanged = function (newMonth, oldMonth) {
                    alert('new month : ' + moment(newMonth).format('YYYY-M-DD') + ' old month : ' + moment(oldMonth).format('YYYY-M-DD'));
                }; // future test case shelf for now. regarding change month
                MultipleDatePickerComponent.prototype.checkNavigationButtons = function () {
                    var today = moment(), previousMonth = moment(this.month).subtract(1, 'month'), nextMonth = moment(this.month).add(1, 'month');
                    this.disableBackButton = this.disableNavigation || (this.disallowBackPastMonths && today.isAfter(previousMonth, 'month'));
                    this.disableNextButton = this.disableNavigation || (this.disallowGoFuturMonths && today.isBefore(nextMonth, 'month'));
                };
                MultipleDatePickerComponent.prototype.getDaysOfWeek = function () {
                    /*To display days of week names in moment.lang*/
                    var momentDaysOfWeek = moment().localeData().weekdaysMin(), daysOfWeek = [];
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
                };
                MultipleDatePickerComponent.prototype.getMonthYearToDisplay = function () {
                    var month = this.month.format('MMMM');
                    return month.charAt(0).toUpperCase() + month.slice(1);
                };
                MultipleDatePickerComponent.prototype.getYearsForSelect = function () {
                    var now = moment(), changeYearPast = Math.max(0, parseInt(this.changeYearPast, 10) || 0), changeYearFuture = Math.max(0, parseInt(this.changeYearFuture, 10) || 0), min = moment(this.month).subtract(changeYearPast, 'year'), max = moment(this.month).add(changeYearFuture, 'year'), result = [];
                    max.add(1, 'year');
                    for (var m = moment(min); max.isAfter(m, 'year'); m.add(1, 'year')) {
                        if ((!this.disallowBackPastMonths || (m.isAfter(now, 'year') || m.isSame(now, 'year'))) && (!this.disallowGoFuturMonths || (m.isBefore(now, 'year') || m.isSame(now, 'year')))) {
                            result.push(m.format('YYYY'));
                        }
                    }
                    return result;
                };
                ;
                MultipleDatePickerComponent.prototype.toggleDay = function (event, day) {
                    event.preventDefault();
                    // removed day ? day.mdp.otherMonth && 
                    if (day.mdp.otherMonth && !this.fireEventsForDaysOfSurroundingMonths) {
                        return;
                    }
                    var prevented = false;
                    event.preventDefault = function () {
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
                            var idx = -1;
                            for (var i = 0; i < this.projectScope.length; ++i) {
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
                };
                MultipleDatePickerComponent.prototype.clearDays = function () {
                    this.projectScope = [];
                    this.generate();
                };
                MultipleDatePickerComponent.prototype.logDays = function () {
                    this.generate();
                }; // remove this and from html
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
                MultipleDatePickerComponent.prototype.rightClicked = function (event, day) {
                    if (typeof this.rightClick === 'function') {
                        event.preventDefault();
                        this.rightClick(event, day);
                    }
                };
                MultipleDatePickerComponent.prototype.getDayClasses = function (day) {
                    // this.showDaysOfSurroundingMonths = true;
                    var css = '';
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
                };
                /*Navigate to another month*/
                MultipleDatePickerComponent.prototype.changeMonth = function (event, disable, add) {
                    if (disable) {
                        return;
                    }
                    event.preventDefault();
                    var prevented = false;
                    event.preventDefault = function () {
                        // console.log('entered into preventDefault *****');
                        prevented = true;
                    };
                    var monthTo = moment(this.month).add(add, 'month');
                    if (typeof this.monthClick == 'function') {
                        this.monthClick(event, monthTo);
                    }
                    //this.logMonthChanged(newMonth, oldMonth);
                    if (!prevented) {
                        var oldMonth = moment(this.month);
                        // console.log('oldMonth = ' + oldMonth + ' newMonth = ' + newMonth + ' this.monthChanged = ' + typeof this.monthChanged); // future test case with logMonthChanged
                        this.month = monthTo;
                        if (typeof this.monthChanged == 'function') {
                            this.monthChanged(this.month, oldMonth);
                        }
                        this.generate();
                    }
                };
                /*Change year*/
                MultipleDatePickerComponent.prototype.changeYear = function (year) {
                    this.month = this.month.year(parseInt(year, 10));
                };
                ;
                /*Check if the date is off : unselectable*/
                MultipleDatePickerComponent.prototype.isDayOff = function (day) {
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
                };
                /*Check if the date is selected*/
                MultipleDatePickerComponent.prototype.isSelected = function (day) {
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
                };
                /*Generate the calendar*/
                MultipleDatePickerComponent.prototype.generate = function () {
                    var _this = this;
                    var year = this.month.year().toString();
                    this.yearsForSelect = this.getYearsForSelect();
                    this.monthToDisplay = this.getMonthYearToDisplay();
                    this.yearToDisplay = this.month.format('YYYY');
                    var previousDay = moment(this.month).date(0).day(this.sundayFirstDay ? 0 : 1).subtract(1, 'day');
                    if (moment(this.month).date(0).diff(previousDay, 'day') > 6) {
                        previousDay = previousDay.add(1, 'week');
                    }
                    var firstDayOfMonth = moment(this.month).date(1), days = [], now = moment(), lastDay = moment(firstDayOfMonth).endOf('month'), createDate = function () {
                        var day = {
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
                        if ((_this.highlightDays === Array)) {
                            var hlDay = _this.highlightDays.filter(function (d) {
                                return day.date.isSame(d.date, 'day');
                            });
                            day.css = hlDay.length > 0 ? hlDay[0].css : '';
                            day.title = hlDay.length > 0 ? hlDay[0].title : '';
                        }
                        day.selectable = !_this.isDayOff(day);
                        console.log('this.sameDaySelect() = ' + _this.isSelected(day));
                        //day.mdp.selected = this.isSelected(day);
                        day.mdp.today = day.date.isSame(now, 'day');
                        day.mdp.past = day.date.isBefore(now, 'day');
                        day.mdp.future = day.date.isAfter(now, 'day');
                        if (!day.date.isSame(_this.month, 'month')) {
                            day.mdp.otherMonth = true;
                        }
                        // console.log(' and is selected333 ' + JSON.stringify(day));
                        // console.log('this is day = ' + JSON.stringify(day));
                        return day;
                    };
                    var maxDays = lastDay.diff(previousDay, 'days'), lastDayOfWeek = this.sundayFirstDay ? 6 : 0;
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
                };
                MultipleDatePickerComponent.prototype.findArray = function (day) {
                    console.log('this.projectScope = ' + this.projectScope + ' and is selected ' + day);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], MultipleDatePickerComponent.prototype, "highlightDays", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], MultipleDatePickerComponent.prototype, "dayClick", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], MultipleDatePickerComponent.prototype, "dayHover", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], MultipleDatePickerComponent.prototype, "rightClick", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], MultipleDatePickerComponent.prototype, "month", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], MultipleDatePickerComponent.prototype, "monthChanged", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], MultipleDatePickerComponent.prototype, "monthClick", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], MultipleDatePickerComponent.prototype, "weekDaysOff", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], MultipleDatePickerComponent.prototype, "allDaysOff", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], MultipleDatePickerComponent.prototype, "daysAllowed", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], MultipleDatePickerComponent.prototype, "disableNavigation", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], MultipleDatePickerComponent.prototype, "disallowBackPastMonths", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], MultipleDatePickerComponent.prototype, "disallowGoFuturMonths", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], MultipleDatePickerComponent.prototype, "showDaysOfSurroundingMonths", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], MultipleDatePickerComponent.prototype, "cssDaysOfSurroundingMonths", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], MultipleDatePickerComponent.prototype, "fireEventsForDaysOfSurroundingMonths", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], MultipleDatePickerComponent.prototype, "disableDaysBefore", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], MultipleDatePickerComponent.prototype, "disableDaysAfter", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], MultipleDatePickerComponent.prototype, "changeYearPast", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], MultipleDatePickerComponent.prototype, "changeYearFuture", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], MultipleDatePickerComponent.prototype, "projectScope", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], MultipleDatePickerComponent.prototype, "something", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], MultipleDatePickerComponent.prototype, "sundayFirstDay", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], MultipleDatePickerComponent.prototype, "_projectScope", void 0);
                MultipleDatePickerComponent = __decorate([
                    core_1.Component({
                        //moduleId: module.id,
                        selector: 'multiple-date-picker',
                        template: template_1.DEFAULT_TEMPLATE,
                        styles: [template_1.DEFAULT_STYLES],
                        providers: [
                            {
                                provide: forms_1.NG_VALUE_ACCESSOR,
                                useExisting: core_1.forwardRef(function () { return MultipleDatePickerComponent; }),
                                multi: true
                            }
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], MultipleDatePickerComponent);
                return MultipleDatePickerComponent;
            }());
            exports_2("MultipleDatePickerComponent", MultipleDatePickerComponent);
        }
    }
});
System.register("multiple-date-picker.module", ['@angular/core', '@angular/common', "multiple-date-picker.component"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_2, common_1, multiple_date_picker_component_1;
    var MultipleDatePickerModule;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (multiple_date_picker_component_1_1) {
                multiple_date_picker_component_1 = multiple_date_picker_component_1_1;
            }],
        execute: function() {
            MultipleDatePickerModule = (function () {
                function MultipleDatePickerModule() {
                }
                MultipleDatePickerModule = __decorate([
                    core_2.NgModule({
                        imports: [
                            common_1.CommonModule
                        ],
                        declarations: [
                            multiple_date_picker_component_1.MultipleDatePickerComponent,
                        ],
                        providers: [multiple_date_picker_component_1.MultipleDatePickerComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], MultipleDatePickerModule);
                return MultipleDatePickerModule;
            }());
            exports_3("MultipleDatePickerModule", MultipleDatePickerModule);
        }
    }
});
