"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * DateClickedDirective is used for adding a host binding class to a date that has been clicked by the end user.
 * gives the affect of the button style changing while being clicked
 * future updates pending
 */
var DateClickedDirective = (function () {
    function DateClickedDirective() {
    }
    DateClickedDirective.prototype.onMouseOver = function () {
        //experimental for later use
        // if (document.getElementsByClassName('picker-selected')[0] !== undefined) {
        //     let part = document.getElementsByClassName('picker-selected')[0];
        //     this.renderer.setElementStyle(part, 'background-color', 'interhit');
        // }
        this.isClicked = true;
    };
    DateClickedDirective.prototype.onMouseOut = function () {
        this.isClicked = false;
    };
    DateClickedDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[dateClicked]'
                },] },
    ];
    /** @nocollapse */
    DateClickedDirective.ctorParameters = function () { return []; };
    DateClickedDirective.propDecorators = {
        'isClicked': [{ type: core_1.HostBinding, args: ['class.click-selection-active',] },],
        'onMouseOver': [{ type: core_1.HostListener, args: ['mouseover',] },],
        'onMouseOut': [{ type: core_1.HostListener, args: ['mouseleave',] },],
    };
    return DateClickedDirective;
}());
exports.DateClickedDirective = DateClickedDirective;
var DateClickedHelper = (function () {
    // experimental for later use
    function DateClickedHelper() {
    }
    DateClickedHelper.prototype.tester = function () {
    };
    DateClickedHelper.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    DateClickedHelper.ctorParameters = function () { return []; };
    return DateClickedHelper;
}());
exports.DateClickedHelper = DateClickedHelper;
