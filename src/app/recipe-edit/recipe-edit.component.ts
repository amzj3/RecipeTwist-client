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
  allLoaded = false;
  sub:Subscription;
  recipe:any = {ingredients:[],steps:[]}
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
          let user_recipe;
          if(queryText){
             id = queryText;
             user_recipe = params['id'];
             this.fetchUserRecipe(user_recipe);
          }else{
              id = params['id'];
          }
          
          if (id) {
            this.fetchRecipes(id,user_recipe);
          }
          
        });
  }
  delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }
  
  setVariables(){
      if(this.userRecipe.original_recipe == null){
          this.userRecipe.original_recipe = this.recipe.id;
          this.userRecipe.title = this.recipe.title + ", with a twist!";
      }
      console.log("input: ",this.input_ingredients);
      for(let i in this.recipe.ingredients){
              this.input_ingredients[i] = {edit:false,details:this.recipe.ingredients[i]};
      }
      for(let i in this.userRecipe.ingredients_edits){
          this.input_ingredients[i] = {edit:false,details:this.userRecipe.ingredients_edits[i]};
      }
     
      for(let i in this.recipe.steps){                        
          this.input_steps[i] = {edit:false,details:this.recipe.steps[i]};
      }
      console.log("input: ",this.userRecipe.steps_edits);
      console.log("input: ",this.input_steps);
      for(let i in this.userRecipe.steps_edits){
          console.log("adding step ",i)
          this.input_steps[i] = {edit:false,details:this.userRecipe.steps_edits[i]};
      }
      this.allLoaded = true;
  }
  
  fetchRecipes(id,user_recipe){
      this.recipeService.get(id).subscribe((recipe: any) => {
          if (recipe) {
            this.recipe = recipe;
            if(user_recipe){
               this.fetchUserRecipe(user_recipe); 
            }else{
                this.setVariables();
            }
          } else {
              console.log("Recipe not found")
          }
        },error => this.router.navigate(['/error'],{queryParams:{message:"Recipe "+id+" not found!"}}));
  }
  
  fetchUserRecipe(user_recipe_id){
      this.userRecipeService.get(user_recipe_id).subscribe((recipe: any) => {
          if(recipe){
             this.userRecipe = recipe;
             console.log("user_recipe " ,this.userRecipe);
             this.setVariables();
          }
      },error => this.router.navigate(['/error'],{queryParams:{message:"Recipe "+user_recipe_id+" not found!"}}));
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
      let i = Object.keys(this.input_ingredients).length;
      
      this.userRecipe.ingredients_edits[i] = this.input_new_ingredient.details + " ";
      this.input_ingredients[i] = {edit:false,details:this.input_new_ingredient.details};
      this.input_new_ingredient = {edit:false,details:''}   
  }
  
  keys(dict){
      let keys_array = Object.keys(dict);
      return keys_array.sort((a, b) => parseFloat(a) < parseFloat(b) ? -1 : parseFloat(a) > parseFloat(b) ? 1 : 0);
  }
  stepEdit(id:string,newStep:string){
      this.input_steps[id].edit = !this.input_steps[id].edit;
      if(this.recipe.steps[id] != newStep){
          console.log(this.recipe.steps[id]);
          this.userRecipe.steps_edits[id] = newStep + " ";        
      }else{
          delete this.userRecipe.steps_edits[id];
      }
      if(!this.recipe.steps[id] && newStep == ""){
          delete this.userRecipe.steps_edits[id]; 
          delete this.input_steps[id];
      }   
  }
  
  addNewStep(position, first = false){
      let new_pos; 
      if(first){
          let first_key = this.keys(this.input_steps)[0];
          new_pos = parseFloat(first_key) - 0.1;
      }else{
         new_pos = parseFloat(position)+0.1; 
      }
      this.input_steps[new_pos] = {edit:true,details:""};
      this.userRecipe[new_pos] = "";
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
