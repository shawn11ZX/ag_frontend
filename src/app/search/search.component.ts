import { Component, OnInit } from '@angular/core';
import {NewsService} from '../news.service';
import {SearchResult} from '../search-result';
import {Observable, Subject} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';

class Tag {
  value: string;
  displayName: string;
}

/**
 * provide search functions and paging
 * @author Shawn Change
 */
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  tags: Array<Tag>; // available tags for user to choose

  hitsPerPages: Array<number>; // available item per page for user to choose

  searchForm: FormGroup; // form group

  curPage: number; // current page

  private searchTerms = new Subject<string>(); // filter form change

  private searchResult$: Observable<SearchResult>; // search result


  /**
   * constructor
   * @param {NewsService} newService, service for remote data fetching
   */
  constructor(private newService: NewsService) {
    this.tags = [
      {value: 'story', displayName: 'story'},
      {value: 'comment', displayName: 'comment'},
      {value: '', displayName: 'all'},
    ];

    this.hitsPerPages = [5, 10, 20, 50, 100];

    this.searchForm = new FormGroup({
      tag: new FormControl(this.tags[0]),
      hitsPerPage: new FormControl(this.hitsPerPages[0]),
      term: new FormControl('')
    }, {updateOn: 'change'});

    // any form input change will trigger refresh
    this.searchForm.valueChanges.subscribe((data) => {
      this.curPage = 0; // set page to 0, since search condition changed
      this.searchTerms.next(this.searchForm.value);
    });

    this.curPage = 0;

  }

  setPage(page: number): void {
    this.curPage = page;
    this.searchTerms.next(this.searchForm.value);
  }

  ngOnInit(): void {
    this.searchResult$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // switch to new search observable each time the term changes
      switchMap((form: any) => {
        const curTerm: string = form.term;
        const curTag: string = form.tag.value;
        const curHitsPerPage: number  = form.hitsPerPage;
        return this.newService.searchNews(curTerm, curTag, curHitsPerPage, this.curPage);
      }),
    );
  }
}
