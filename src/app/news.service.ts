import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Hit} from './hit';
import {SearchResult} from './search-result';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private searchUrl = 'http://hn.algolia.com/api/v1/search?';  // URL to web api
  constructor(private http: HttpClient) { }

  private log(message: string) {
    console.log(message);
  }
  /* GET heroes whose name contains search term */
  searchNews(term: string): Observable<SearchResult> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of(new SearchResult());
    }
    return this.http.get<SearchResult>(`${this.searchUrl}query=${term}`).pipe(
      tap(_ => this.log(`found news matching "${term}"`)),
      catchError(this.handleError<SearchResult>('searchHeroes', new SearchResult()))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
