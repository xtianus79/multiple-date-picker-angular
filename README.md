[Badges Here]

This is a forked / rewrite of the multiple-date-picker that was used for AngularJS / Angular 1
The URL to that repo are in notations below


In this version it has aptly been title multiple-date-picker-angular which we/I will do everything I can to make these features and usage available for Angular 2 and beyond. 

If there is a feature change that breaks that mold i.e. renderer2 for example... I will cut off that repo re-title the repo multiple-date-picker-a2 or a4, so on. 

#What's new ?
* Complete Re-write for use with Angular 2+, Angualar 4+ and Angular 5+
* Date Range Calculator -- Allows a user/variable to enter a start and end date with will create an array of dates that span the start / end date ranges
* Date Click Helper file turns the color of square space to the clicked on color so that the end user knows a date has been selected upon clicking


Version 3.0.0
Fixed bugs and various updates

* New Feature: Date range picker

* New Enhancement: day click css feedback

Version 2.5.3

* Ported to Angular 2/4: working on Angular 2 and Angular 4 with Typescript AOT build process

This is a preliminary basic usage example... I will update this further and build a plunkr which will further exhibit features and functionality


In your main components HTML be sure to add this... you can use all or only the [(ngmodel)] properties.
```
<div>
    <multiple-date-picker 
        [showDaysOfSurroundingMonths]="false" 
        [matIcons]="true" 
        [disallowBackPastMonths]="true" 
        [sundayFirstDay]="true" 
        [disableDaysBefore]="true"
        [disableDaysAfter]="false" 
        [monthChanged]="logMonthChanged"
        [highlightDays]="highlightDays"
        [dayClick]="oneDaySelectionOnly"
        [weekDaysOff]="[0, 3]"
        [month]="myMonth" 
        [(ngModel)]="initialCount">
    </multiple-date-picker>
</div>
```

The folowing should be included in your components.ts file
Be sure to set the project [(ngModel)] to a blank array
i.e. ***Setting project scope.
this.initialCount = [];

```
import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { MultipleDatePicker, DateRangeHelper } from '../multiple-date-picker/index';
import * as moment from 'moment/moment';

@Component({
  ...
})

// this shows example usage
export class DashboardComponent implements OnInit, AfterViewInit { 

    highlightDays: any[];
    initialCount: Array<any>; // this is the [(ngModel)] property
    datesArray: Array<any>;
    myMonth: any;

    testItems: any[] = [
        {'item': 'array1', 'id': 1},
        {'item': 'array2', 'id': 2},
        {'item': 'array3', 'id': 3},
    ]  // potential use if person wanted to create a choosen item to associate with a list of arrays

    constructor(
        ...
    ) { }

    // * you don't have to use @ViewChild as itthis is used if you want to use some functions within the
    // multiple-date-picker that will help in testing and construction of your design.
    // For example: findArrayofDays() { console.log('this.projectScope = ' + this.projectScope); }
    // clearDays() { this.projectScope = []; this.generate(); // console.log('clearDays was fired off');}
    // and runGenerate() { this.generate(); } // remove this and from html
    @ViewChild(MultipleDatePicker) private multipleDatePicker: MultipleDatePicker;

    ngOnInit(): void {
        this.heroService.getHeroes()
            .then(heroes => this.heroes = heroes.slice(1, 5));
            // console.log('this is here = ' + matIcons);

        // set array to either [] or the following values like example below
         this.highlightDays = [
            {date: moment().date(22).valueOf(), css: 'holiday', selectable: false, title: 'Holiday time !'},
            {date: moment().date(25).valueOf(), css: 'off', selectable: false, title: 'We don\'t work today'},
            {date: moment().date(30).valueOf(), css: 'birthday', selectable: true, title: 'I\'m thir... i\'m 28, seriously, I mean ...'}
         ];

        // examples to work with
        console.log('date: moment().date(19).valueOf() ', moment().date(19).valueOf());
        console.log('date: moment().date(20).valueOf() ', moment().date(20).valueOf());
        console.log('date: moment().date(21).valueOf() ', moment().date(21).valueOf());

        // ***Setting project scope.
        this.initialCount = [];

        // enter variables for startDates and End dates
        let startDate = 1509768000000; // enter variable or ms value
        let endDate = 1510722000000; // enter variable or ms value // 1502510400000

        // console.log('calucator values ' + this.dateRangeHelper.dateRangeDaysCalculator(endDate, startDate))

        if (DateRangeHelper.dateRangeDaysCalculator(endDate, startDate) >= 0) {
            let days = DateRangeHelper.dateRangeDaysCalculator(endDate, startDate);
            this.datesArray = DateRangeHelper.getDates(new Date(startDate), (new Date(startDate)).addDays(days)); // date object used not moment in this case
            console.log('this.datesArray ', this.datesArray);
        }

        // takes array dates from daterangehelper and adds them to highlighted days for date picker day highlights
        if (this.datesArray !== undefined && this.datesArray.length > 0) {
            let daysArray = this.datesArray;
            let arrayObject = daysArray.find(x => x);
            let arrayKeys = Object.keys(daysArray);
            if (arrayObject !== undefined && arrayKeys.length > 0) {
                this.highlightDays = this.datesArray;
                let stayNames = 'Christian Smith' // should be set to variable 
                for (let i in daysArray) {
                    if (true) {
                        this.highlightDays.push({date: daysArray[i], css: 'stay-dates', selectable: true, title: `days off for ${stayNames}`});  // set strings
                    }
                }
            }
        }

        // calculate addional months to add onto the month object... if this is corrupt in anyway it will default to todays month info
        let monthsFromToday = DateRangeHelper.dateRangeMonthsCalculator(startDate);
        if (monthsFromToday > 0) {
            // this.myMonth = moment().add(monthsFromToday, 'months');
        } else {
            this.myMonth = moment().startOf('day');
        }

    }
```

Again, I will update the documenation more specifically with functionality and usage but this should get you started.

More to come!

previous repo information
<https://github.com/arca-computing/MultipleDatePicker>