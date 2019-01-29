import {Component, Input, OnInit} from '@angular/core';
import {Hit} from '../hit';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

  @Input() hit: Hit;

  constructor() { }

  ngOnInit() {
  }
}
