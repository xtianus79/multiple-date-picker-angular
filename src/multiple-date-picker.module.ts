import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultipleDatePickerComponent } from './multiple-date-picker.component'

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        MultipleDatePickerComponent,
    ],
    providers: [MultipleDatePickerComponent]
})
export class MultipleDatePickerModule { }