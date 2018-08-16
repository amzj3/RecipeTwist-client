import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../shared/recipe/recipe.service';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit, OnDestroy {
   recipe: any = {};
   sub: Subscription;
    
  constructor(private route: ActivatedRoute,
          private router: Router,
          private recipeService: RecipeService) { }

  ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
          const id = params['id'];
          console.log(params)
          if (id) {
            this.recipeService.get(id).subscribe((recipe: any) => {
              if (recipe) {
                this.recipe = recipe;
                
                this.recipe.href = recipe._links.self.href;
                
              } else {
                recipe.title = 'recipe not found';
                //this.gotoList();
              }
            },error => this.router.navigate(['/error'],{queryParams:{message:"Recipe "+id+" not found!"}}));
          }
        });
  }
  
  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }
  

}
