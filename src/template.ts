/**
 * The default multiple date picker was orginated from here... styles and structure can be associated
 * from arca-computing https://arca-computing.github.io/MultipleDatePicker/
 */

export const DEFAULT_TEMPLATE = `
    <div class="multiple-date-picker">
        <div class="picker-top-row">
            <div class="text-center picker-navigate picker-navigate-left-arrow" [ngClass]="{'disabled':disableBackButton}" (click)="changeMonth($event, disableBackButton, -1)">&lt;</div>
            <div class="text-center picker-month">
                {{monthToDisplay}}
                <span *ngIf="yearsForSelect.length < 2">{{yearToDisplay}}</span>
            </div>
            <div class="text-center picker-navigate picker-navigate-right-arrow" [ngClass]="{'disabled':disableNextButton}" (click)="changeMonth($event, disableNextButton, 1)">&gt;</div>
            <button (click)="clearDays()">Clear Days</button>
            <button (click)="logDays()">Log Days</button>
            <button (click)="findArray()">Find Array</button>
            <button (click)="decrement()">
            Decrement
            </button>
            <button (click)="increment()">
            Increment
            </button>
        </div>
        <div class="picker-days-week-row">
            <div class="text-center" *ngFor="let weekDays of daysOfWeek">{{weekDays}}</div>
        </div>
        <div class="picker-days-row">
            <div class="text-center picker-day {{getDayClasses(day)}}" title="{{day.title}}" *ngFor="let day of days" (click)="toggleDay($event, day)" >
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
            width: 16.66%
        }
        
        .picker-navigate:hover {
            cursor: pointer
        }
        
        .picker-navigate.disabled,.picker-navigate.disabled:hover {
            color: #ddd;
            cursor: default
        }
        
        .picker-month {
            width: 66%
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
        
        .picker-day.today,.picker-day.today.picker-off,.picker-day.today.picker-off:hover,.picker-day.today.picker-selected,.picker-day.today:hover {
            color: #00a3ff
        }
        
        .picker-day:not(.picker-off):not(.picker-empty):hover {
            background-color: #C6000B;
            color: #fff;
            cursor: pointer
        }
        
        .picker-day.picker-selected {
            background-color: #C6000B;
            color: #fff
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
        
        input {
              border: 0;
              border-radius: 3px;
              height: 30px;
              max-width: 100px;
              text-align: center;
            }
            `;