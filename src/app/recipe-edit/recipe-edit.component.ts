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
  input_new_ingredient = {edit:false,details:''};
  
  sub:Subscription;
  recipe:any = {ingredients:[]}
  constructor(private route: ActivatedRoute,
          private router: Router,
          private recipeService: RecipeService,
          private userRecipeService: UserRecipeService) { }

  ngOnInit() {
      let queryText:string;
      this.sub = this.route.queryParams.subscribe(params => {
        // Defaults to 0 if no query param provided.
        queryText = params['original_recipe'];
      });
      this.sub = this.route.params.subscribe(params => {
          let id;
          let original_recipe;
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
                this.userRecipe.title = this.recipe.title + ", with a twist!";
                if(this.userRecipe.original_recipe == null){
                    this.userRecipe.original_recipe = recipe.id;
                }

                for(let i in this.recipe.ingredients){
                        this.input_ingredients[i] = {edit:false,details:this.recipe.ingredients[i]};
                }
                for(let i in this.userRecipe.ingredients_edits){
                    this.input_ingredients[i] = {edit:false,details:this.userRecipe.ingredients_edits[i]};
                }
               
                for(let i in this.recipe.steps){                        
                    this.input_steps[i] = {edit:false,details:this.recipe.steps[i]};
                }
                for(let i in this.userRecipe.steps_edits){
                    this.input_steps[i] = {edit:false,details:this.userRecipe.steps_edits[i]};
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
      this.input_ingredients[id].edit = ! this.input_ingredients[id].edit;
      if(this.recipe.ingredients[id] != newIngredient){
          this.userRecipe.ingredients_edits[id] = newIngredient + " ";   
          console.log(this.userRecipe.ingredients_edits)
      }else{
          delete this.userRecipe.ingredients_edits[id];
      }
      
      if(!this.recipe.ingredients[id] && newIngredient == ""){
          delete this.userRecipe.ingredients_edits[id];
          delete this.input_ingredients[id];
      }
     
  }
  
  addNewIngredient(){
      console.log(this.input_new_ingredient);
      let i = Object.keys(this.input_ingredients).length;
      this.userRecipe.ingredients_edits[i] = this.input_new_ingredient.details + " ";
      this.input_ingredients[i] = {edit:false,details:this.input_new_ingredient.details};
      this.input_new_ingredient = {edit:false,details:''}   
  }
  
  keys(dict){
      console.log("ie ",this.userRecipe.ingredients_edits);
      console.log("keys ",Object.keys(dict));
      console.log(this.input_ingredients);
      return Object.keys(dict);
  }
  stepEdit(id:number,newStep:string){
      this.input_steps[id].edit = !this.input_steps[id].edit;
      if(this.recipe.steps[id] != newStep){
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
