"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var multiple_date_picker_component_1 = require('./multiple-date-picker.component');
var MultipleDatePickerModule = (function () {
    function MultipleDatePickerModule() {
    }
    MultipleDatePickerModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        platform_browser_1.BrowserModule,
                        forms_1.FormsModule
                    ],
                    declarations: [
                        multiple_date_picker_component_1.MultipleDatePickerComponent,
                    ],
                    exports: [multiple_date_picker_component_1.MultipleDatePickerComponent]
                },] },
    ];
    /** @nocollapse */
    MultipleDatePickerModule.ctorParameters = function () { return []; };
    return MultipleDatePickerModule;
}());
exports.MultipleDatePickerModule = MultipleDatePickerModule;
