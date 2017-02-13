import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MultipleDatePickerComponent } from './multiple-date-picker.component'

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        MultipleDatePickerComponent,
    ],
    providers: [MultipleDatePickerComponent]
})
export class MultipleDatePickerModule { }