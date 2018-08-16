import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {RecipeService} from './shared/recipe/recipe.service';
import {UserRecipeService} from './shared/user-recipe/user-recipe.service';


import { MatChipInputEvent,MatIconModule,MatChipsModule,MatGridListModule,MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from './/app-routing.module';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { UserRecipesListComponent } from './recipes-list/user-recipes-list.component';

import { AboutComponent } from './about/about.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { FormsModule } from "@angular/forms";
import { ErrorComponent } from './error/error.component';
import { RecipeTwistErrorHandler } from "src/app/error/error-handler";
import { ErrorHandler } from "@angular/core";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RecipeViewComponent,
    RecipesListComponent,
    UserRecipesListComponent,
    AboutComponent,
    RecipeEditComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatGridListModule,
    MatChipsModule,
    MatIconModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [RecipeService, UserRecipeService,{provide: ErrorHandler, useClass: RecipeTwistErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }
