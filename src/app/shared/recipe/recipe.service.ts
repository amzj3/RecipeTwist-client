import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable( {
    providedIn: 'root'
} )

export class RecipeService {
    public API = '//localhost:8080/recipes';

    constructor( private http: HttpClient ) { }
    getWithIngredient( ingredient: String ): Observable<any> {
        return this.http.get( this.API + "/search/findThisIngredient?ingredient=" + ingredient );
    }
    getAll(): Observable<any> {
        return this.http.get( this.API );
    }

    get( id: string ) {
        return this.http.get( this.API + '/' + id );
    }

    save( recipe: any ): Observable<any> {
        let result: Observable<Object>;
        if ( recipe['href'] ) {
            result = this.http.put( recipe.href, recipe );
        } else {
            result = this.http.post( this.API, recipe );
        }
        return result;
    }

    remove( href: string ) {
        return this.http.delete( href );
    }

}
