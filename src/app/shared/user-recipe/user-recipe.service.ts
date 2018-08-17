import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable( {
    providedIn: 'root'
} )
export class UserRecipeService {
    public API = '//localhost:8080/user-recipe';

    constructor( private http: HttpClient ) { }

    getAll(): Observable<any> {
        return this.http.get( this.API );
    }

    get( id: string ) {
        return this.http.get( this.API + '/' + id );
    }

    save( userrecipe: any ): Observable<any> {
        let result: Observable<Object>;
        if ( userrecipe['href'] ) {
            result = this.http.put( userrecipe.href, userrecipe );
        } else {
            result = this.http.post( this.API, userrecipe );
        }
        return result;
    }

    remove( href: string ) {
        return this.http.delete( href );
    }
}
