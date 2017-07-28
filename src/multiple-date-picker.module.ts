import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// add DateClicked Helper to providers if used in future. remember to add to index.ts for export
import { MultipleDatePickerComponent, DateRangeHelper, DateClickedDirective } from './index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        MultipleDatePickerComponent,
        DateClickedDirective
    ],
    providers: [
        DateRangeHelper
    ],
    exports: [MultipleDatePickerComponent]
})
export class MultipleDatePickerModule { }