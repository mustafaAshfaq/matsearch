import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { map, retry, tap, catchError } from 'rxjs/operators';
//import 'rxjs/add/operator/map';

@Injectable()
export class BookService {
  booksApiUrl = 'https://www.googleapis.com/books/v1/volumes';
  constructor(private http: HttpClient) { }

    searchBooks(query: string): Observable<any> {
      
        return this.http.get(`${this.booksApiUrl}/?q=${query}`).pipe
            (
            retry(3),
            catchError(this.handleError)
            );
          //.map(res => res.json());
  }

  getBookById(id: string): Observable<any> {
      return this.http.get(`${this.booksApiUrl}/${id}`)
          .pipe(
          retry(3),
          catchError(this.handleError)
          );
          //.map((resp) => resp.json());
    }
    private handleError(error: HttpErrorResponse) {
        console.log(error)
        // if (error.error instanceof ErrorEvent)
        //     console.log('error in connection');
        // else
        //     console.log(`Server Error ${error.status}, error details:${error.error}`);
        return throwError(`Error in fetching data, please try again`);
    }
}
