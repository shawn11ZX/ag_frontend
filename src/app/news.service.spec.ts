import { TestBed } from '@angular/core/testing';

import { NewsService } from './news.service';
import {HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import {of} from 'rxjs';

describe('NewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
  }));

  it('should be created', (done: DoneFn) => {
    const service: NewsService = TestBed.get(NewsService);
    expect(service).toBeTruthy();
    service.searchNews('foo').subscribe(value => {
      expect(value.nbHits).toBeGreaterThanOrEqual(1)
      done();
    });
  });
});
