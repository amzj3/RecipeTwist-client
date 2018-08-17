import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { NavigationEnd } from "@angular/router";

@Component( {
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
} )
export class MainComponent implements OnInit {
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    ingredients: string[] = [];
    sub: Subscription;

    add( event: MatChipInputEvent ): void {
        const input = event.input;
        const value = event.value;

        if ( ( value || '' ).trim() ) {
            this.ingredients.push( value.trim() );
        }
        // Reset the input value
        if ( input ) {
            input.value = '';
        }
    }
    remove( ingredient: string ): void {
        const index = this.ingredients.indexOf( ingredient );

        if ( index >= 0 ) {
            this.ingredients.splice( index, 1 );
        }
    }
    constructor( private route: ActivatedRoute,
        private router: Router ) {
    }
    searchEvent() {
        this.router.navigate( ['/recipes-list'], { queryParams: { ingredients: this.ingredients } } );

    }
    ngOnInit() {
    }

}
