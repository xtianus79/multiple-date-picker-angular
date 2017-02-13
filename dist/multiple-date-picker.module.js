"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var multiple_date_picker_component_1 = require('./multiple-date-picker.component');
var MultipleDatePickerModule = (function () {
    function MultipleDatePickerModule() {
    }
    MultipleDatePickerModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule
                    ],
                    declarations: [
                        multiple_date_picker_component_1.MultipleDatePickerComponent,
                    ],
                    providers: [multiple_date_picker_component_1.MultipleDatePickerComponent]
                },] },
    ];
    /** @nocollapse */
    MultipleDatePickerModule.ctorParameters = function () { return []; };
    return MultipleDatePickerModule;
}());
exports.MultipleDatePickerModule = MultipleDatePickerModule;
