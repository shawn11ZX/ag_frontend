import {Hit} from './hit';

export class SearchResult {
  hits: Hit[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
}
