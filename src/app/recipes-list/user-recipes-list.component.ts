import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../shared/recipe/recipe.service';
import { Subscription } from 'rxjs';
import { Input } from "@angular/core";
import { UserRecipeService } from "src/app/shared/user-recipe/user-recipe.service";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class UserRecipesListComponent implements OnInit {
  link="/recipe-edit"
  
  recipes:any={};
  
  sub:Subscription;
  constructor(private route: ActivatedRoute,
          private recipeService: UserRecipeService) { }

  ngOnInit() {
      
      //var queryText:String;
      
      
      this.recipes = [];
      
     
      this.getAll(); 
         
      
  }
  
 
 
  getAll(){
      this.sub = this.route.params.subscribe(params => {
          this.recipeService.getAll().subscribe((recipes:any) =>{
              if(recipes){
              console.log(recipes)
              this.recipes = recipes._embedded.userRecipes;
              }else{
                  console.log("Problem getting recipes")
              }
          });
     
      });
  }
  
  
}