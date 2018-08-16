import { ErrorHandler } from "@angular/core";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Injector } from "@angular/core";

@Injectable(
{ providedIn: 'root'})
export class RecipeTwistErrorHandler implements ErrorHandler {
    constructor(private injector: Injector) { }

    get router(): Router {
            return this.injector.get(Router);
    };
          
  handleError(error) {
    // do something with the exception
      console.log("HERE IN ERROR HANDLER")
      console.log(error)
      this.router.navigate(['/error'],{queryParams:{message:error}});
  }
}