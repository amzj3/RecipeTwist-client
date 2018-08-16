import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from './main/main.component';
import {RecipeViewComponent} from './recipe-view/recipe-view.component';
import {RecipesListComponent} from './recipes-list/recipes-list.component';
import {UserRecipesListComponent} from './recipes-list/user-recipes-list.component';
import { AboutComponent } from "src/app/about/about.component";
import { RecipeEditComponent } from "src/app/recipe-edit/recipe-edit.component";
import { RecipeTwistErrorHandler } from "src/app/error/error-handler";
import { ErrorComponent } from "src/app/error/error.component";

const routes:Routes = [
   {path:'', redirectTo:'/main', pathMatch:'full'},
   {path:'main',component:MainComponent},
   {path:'recipe-view/:id',component:RecipeViewComponent},
   {path:'recipes-list',component:RecipesListComponent},
   {path:'recipe-edit/:id',component: RecipeEditComponent},
   {path:'about',component: AboutComponent},
   {path:'user-recipes-list',component:UserRecipesListComponent},
   {path:'error',component:ErrorComponent}
   ];
@NgModule({
  imports: [ RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}