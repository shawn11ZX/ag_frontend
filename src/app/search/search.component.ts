import { Component, OnInit } from '@angular/core';
import {NewsService} from '../news.service';
import {SearchResult} from '../search-result';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  tags: any;

  hitsPerPages: any;

  curPage: number;

  curTag: string;

  curHitsPerPage: number

  private searchTerms = new Subject<string>();

  private searchResult$: Observable<SearchResult>;

  constructor(private newService: NewsService) {
    this.tags = [
      {value: 'story', displayName: 'story'},
      {value: 'comment', displayName: 'comment'},
      {value: '', displayName: 'all'},
    ];
    this.curTag = this.tags[0];

    this.hitsPerPages = [10, 20, 50, 100];
    this.curHitsPerPage = this.hitsPerPages[0];
  }


  // Push a search term into the observable stream.
  search(term: string): void {
    this.curPage = 0
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.searchResult$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.newService.searchNews(term, this.curTag.value, this.curHitsPerPage)),
    );
  }
}
