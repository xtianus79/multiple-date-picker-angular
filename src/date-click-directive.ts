import { Injectable, Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[dateClicked]'
})

/**
 * DateClickedDirective is used for adding a host binding class to a date that has been clicked by the end user.
 * gives the affect of the button style changing while being clicked
 * future updates pending 
 */
export class DateClickedDirective {

    @HostBinding('class.click-selection-active') private isClicked: boolean;

    constructor (

    ) { 

    }

    @HostListener('mouseover')
    onMouseOver() {
        //experimental for later use
        // if (document.getElementsByClassName('picker-selected')[0] !== undefined) {
        //     let part = document.getElementsByClassName('picker-selected')[0];
        //     this.renderer.setElementStyle(part, 'background-color', 'interhit');
        // }

        this.isClicked = true;
    }

    @HostListener('mouseleave')
    onMouseOut() {
        this.isClicked = false;
    }

}

@Injectable() 
export class DateClickedHelper {
    // experimental for later use

    constructor( ) {

     }

    tester() {

    }

}