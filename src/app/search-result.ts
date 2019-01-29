import {Hit} from './hit';

export class SearchResult {
  hit: Hit[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
}
