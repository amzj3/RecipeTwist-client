import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../shared/recipe/recipe.service';
import { Subscription } from 'rxjs';
import { Input } from "@angular/core";

@Component( {
    selector: 'app-recipes-list',
    templateUrl: './recipes-list.component.html',
    styleUrls: ['./recipes-list.component.css']
} )

export class RecipesListComponent implements OnInit {
    link = '/recipe-view';
    ingredients: String[];
    recipes: any = [];

    sub: Subscription;
    constructor( private route: ActivatedRoute,
        private recipeService: RecipeService,
        private router:Router) { }

    ngOnInit() {
        this.sub = this.route.queryParams.subscribe( params => {
                // Defaults to 0 if no query param provided.
                var queryText = params['ingredients'];
                console.log( 'Query param page: ', queryText );
                if ( queryText ) {
                    this.ingredients = queryText;
                }
            } );

        this.recipes = [];
        
        if ( this.ingredients == undefined || this.ingredients.length < 1 ) {
            this.getAll();
        } else {
            this.getByIngredient();
        }
    }

    getAll() {
        this.sub = this.route.params.subscribe( params => {
            this.recipeService.getAll().subscribe(( recipes: any ) => {
                if ( recipes ) {
                    this.recipes = recipes._embedded.recipes;
                } else {
                    console.log( "Problem getting recipes" )
                }
            } );

        } );
    }

    getByIngredient() {
        this.sub = this.route.params.subscribe( params => {
            for ( let ing of this.ingredients ) {
                var ids = [];
                this.recipeService.getWithIngredient( ing ).subscribe(( recipes: any ) => {
                    if ( recipes ) {
                        for ( let r of recipes._embedded.recipes ) {
                            if ( !( ids.includes( r.id ) ) ) {
                                this.recipes.push( r );
                                ids.push( r.id );
                            }
                        }
                    } else {
                        console.log( "Problem getting recipes" )
                    }
                });
            }
        });
    }
    
    viewRecipe(recipe){
        this.router.navigate([this.link,recipe.id]);
    }

}
