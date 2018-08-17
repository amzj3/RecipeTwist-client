import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { RecipeService } from "src/app/shared/recipe/recipe.service";
import { Subscription } from "rxjs";
import { UserRecipeService } from "src/app/shared/user-recipe/user-recipe.service";
import { ViewChild } from "@angular/core";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  userRecipe = {
    title:"Name your twist!",
    original_recipe:null,
    ingredients_edits:{},
    steps_edits:{}
  };
  title_edit = false;
  input_ingredients = {};
  input_steps = {};
  
  
  sub:Subscription;
  recipe:any = {}
  constructor(private route: ActivatedRoute,
          private router: Router,
          private recipeService: RecipeService,
          private userRecipeService: UserRecipeService) { }

  ngOnInit() {
      var queryText;
      this.sub = this.route.queryParams.subscribe(params => {
        // Defaults to 0 if no query param provided.
        queryText = params['original_recipe'];
      });
      this.sub = this.route.params.subscribe(params => {
          var id;
          var original_recipe;
          if(queryText){
             id = queryText;
             original_recipe = params['id'];
             this.fetchUserRecipe(original_recipe);
          }else{
              id = params['id'];
          }
          if (id) {
            this.recipeService.get(id).subscribe((recipe: any) => {
              if (recipe) {
                this.recipe = recipe;
                this.recipe.href = recipe._links.self.href;
               
                if(this.userRecipe.original_recipe == null){
                    this.userRecipe.original_recipe = recipe.id;
                }

                for(let i in this.recipe.ingredients){
                    this.recipe.ingredients[i] = {edit:false,details:this.recipe.ingredients[i]};
                    if(this.userRecipe.ingredients_edits[i]){
                        this.input_ingredients[i] = this.userRecipe.ingredients_edits[i];
                    }else{
                        this.input_ingredients[i] = this.recipe.ingredients[i].details;
                    }
                }
              
                for(let i in this.recipe.steps){
                    this.recipe.steps[i] = {edit:false,details:this.recipe.steps[i]};
                    if(this.userRecipe.steps_edits[i]){
                        this.input_steps[i] = this.userRecipe.steps_edits[i];
                    }else{
                        this.input_steps[i] = this.recipe.steps[i].details;
                    }
                }
                
              } else {
                  console.log("Recipe not found")
              }
            },error => this.router.navigate(['/error'],{queryParams:{message:"Recipe "+id+" not found!"}}));
          }
        });
  }
  
  fetchUserRecipe(original_recipe_id){
      this.userRecipeService.get(original_recipe_id).subscribe((recipe: any) => {
          if(recipe){
              this.userRecipe = recipe;
             
          }
      })
  }
  
  
  ingredientEdit(id:number,newIngredient:string){   
      this.recipe.ingredients[id].edit = !this.recipe.ingredients[id].edit;
      if(this.recipe.ingredients[id].details != newIngredient){
        
          this.userRecipe.ingredients_edits[id] = newIngredient + " ";
          
      }else{
          
          delete this.userRecipe.ingredients_edits[id];
      }
     
  }
  stepEdit(id:number,newStep:string){
      this.recipe.steps[id].edit = !this.recipe.steps[id].edit;
      if(this.recipe.steps[id].details != newStep){

          this.userRecipe.steps_edits[id] = newStep + " ";
          
      }else{
          delete this.userRecipe.steps_edits[id];
      }
      
  }
  doneEditing(){
      this.userRecipeService.save(this.userRecipe).subscribe(result => {
          this.gotoUserRecipes(); 
        }, error => console.error(error))
      
  }
  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }
  
  gotoUserRecipes() {
      this.router.navigate(['/user-recipes-list']);
    }

}
