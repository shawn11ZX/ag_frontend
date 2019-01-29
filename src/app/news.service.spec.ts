import { TestBed } from '@angular/core/testing';

import { NewsService } from './news.service';
import {HttpClient} from '@angular/common/http';

describe('NewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
   providers: [HttpClient]
  }));

  it('should be created', () => {
    const service: NewsService = TestBed.get(NewsService);
    expect(service).toBeTruthy();
    service.searchNews('foo');
  });
});
