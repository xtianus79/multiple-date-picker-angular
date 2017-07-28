export const DEFAULT_TEMPLATE = `
<div class="multiple-date-picker">
    <div class="picker-top-row" [ngSwitch]="arrow">
        <div class="text-center picker-navigate picker-navigate-left-arrow" id="button" [ngClass]="{'disabled':disableBackButton}" (click)="changeMonth($event, disableBackButton, -1)">
            <p *ngSwitchDefault>&lt;</p>
            <p *ngSwitchCase="1"><i class="material-icons">keyboard_arrow_left</i></p>
            <p *ngSwitchCase="2"><i class="fa fa-angle-left" aria-hidden="true"></i></p>
        </div>
        <div class="text-center picker-month">
            {{monthToDisplay}}
            <span *ngIf="yearsForSelect.length < 2">{{yearToDisplay}}</span>
        </div>
        <div class="text-center picker-navigate picker-navigate-right-arrow" [ngClass]="{'disabled':disableNextButton}" (click)="changeMonth($event, disableNextButton, 1)">
            <p *ngSwitchDefault>&gt;</p>
            <p *ngSwitchCase="1"><i class="material-icons">keyboard_arrow_right</i></p>
            <p *ngSwitchCase="2"><i class="fa fa-angle-right" aria-hidden="true"></i></p>
        </div>
            
    </div>
    <div class="picker-days-week-row">
        <div class="text-center" *ngFor="let weekDays of daysOfWeek">{{weekDays}}</div>
    </div>
    <div class="picker-days-row">
        <div dateClicked class="text-center picker-day {{getDayClasses(day)}}" title="{{day.title}}" *ngFor="let day of days" (click)="toggleDay($event, day)" >
            {{day ? day.mdp.otherMonth && !showDaysOfSurroundingMonths ? '&nbsp;' : day.date.format('D') : ''}}
        </div>
    </div>
</div>
`;

export const DEFAULT_STYLES = `
    .text-center {
        text-align: center
    }
    
    .multiple-date-picker {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none
    }
    
    .multiple-date-picker,.picker-days-row,.picker-days-week-row,.picker-top-row {
        width: 100%
    }
    
    .picker-top-row>div {
        display: inline-block
    }
    
    .picker-navigate {
        width: 16.5%
    }
    
    .picker-navigate:hover {
        cursor: pointer
    }
    
    .picker-navigate.disabled,.picker-navigate.disabled:hover {
        color: #ddd;
        cursor: default
    }
    
    .picker-month {
        width: 65%
    }
    
    .picker-days-row>div,.picker-days-week-row>div {
        width: 14.28%;
        display: inline-block
    }
    
    .picker-day,.picker-top-row {
        padding: 10px 0
    }
    
    .picker-day {
        background-color: #fff;
        border: 1px solid #eee;
        box-sizing: border-box;
        color: #000
    }
    
    .picker-day.today.picker-off,.picker-day.today.picker-off:hover,.picker-day.today.picker-selected,.picker-day.today:hover {
        color: #00a3ff
    }

    .picker-day.today {
        background-color: #00a5ce;
        color: #f7fb65;
    }
    
    .picker-day:not(.picker-off):not(.picker-empty):hover {
        background-color: rgba(0, 165, 206, 0.5);
        color: #f7fb65;
    }
    
    .picker-day.picker-selected {
        background-color: #d0d425;
        color: #568eab;
    }
    
    .picker-day.picker-selected.click-selection-active:not(.picker-off) {
        background-color: #d0d425;
        color: #568eab;
    }
    
    .picker-day.picker-off,.picker-day.picker-off:hover {
        background-color: #eee;
        color: #bbb;
        cursor: default
    }
    
    .picker-day.picker-empty,.picker-day.picker-empty:hover {
        background-color: #fafafa;
        cursor: default
    }
    
    .picker-day.stay-dates {
        background-color: #78BC42;
        color: #fff;
    }
    
    .picker-day.stay-dates.picker-selected {
        background-color: #d0d425;
        color: #568eab;
    }
    
    .picker-day.today.stay-dates {
        background-color: #00a5ce;
        color: #f7fb65;
    }
    
    .picker-day.today.stay-dates.picker-selected {
        background-color: #d0d425;
        color: #568eab;
    }
    
    .picker-day.stay-dates.picker-off {
        background-color: rgba(91, 136, 56, 0.6);
        color: rgba(255, 255, 255, 0.6);
    }
    
    .picker-day.stay-dates:not(.picker-off):hover{
        background-color: rgba(0, 165, 206, 0.5);
        color: #f7fb65;
    }
    
    .picker-day.stay-dates.picker-selected.click-selection-active:not(.picker-off) {
        background-color: #d0d425;
        color: #568eab;
    }
    
    input {
        border: 0;
        border-radius: 3px;
        height: 30px;
        max-width: 100px;
        text-align: center;
    }
`;