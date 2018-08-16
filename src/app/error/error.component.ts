import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  sub:Subscription;
  message  = "Not sure what happedned :(";
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
      
      this.sub = this.route
      .queryParams
      .subscribe(params => {
          console.log("Are you here?")
        // Defaults to 0 if no query param provided.
        const queryText = params['message'];
        if(queryText){
         this.message = queryText;   
        }
      });
  }

}
