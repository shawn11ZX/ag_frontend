import { Component, OnInit } from '@angular/core';
import {NewsService} from '../news.service';
import {SearchResult} from '../search-result';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';

class Tag {
  value: string;
  displayName: string;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  tags: Array<Tag>;

  hitsPerPages: Array<number>;

  searchForm: FormGroup;

  private searchTerms = new Subject<string>();

  private searchResult$: Observable<SearchResult>;

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
      page: new FormControl(0),
      term: new FormControl('')
    }, {updateOn: 'change'});
    this.searchForm.valueChanges.subscribe(() => {
      this.searchTerms.next(this.searchForm.value);
    });
  }


  ngOnInit(): void {
    this.searchResult$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),

      // switch to new search observable each time the term changes
      switchMap((form: any) => {
        const curTerm: string = form.term;
        const curTag: string = form.tag.value;
        const curHitsPerPage: number  = form.hitsPerPage;
        return this.newService.searchNews(curTerm, curTag, curHitsPerPage);
      }),
    );
  }
}
