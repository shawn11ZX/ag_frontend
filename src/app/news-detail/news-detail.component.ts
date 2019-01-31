import {Component, Input, OnInit} from '@angular/core';
import {Hit} from '../hit';

/**
 * display news detail
 * @author Shawn Change
 */
@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

  @Input() hit: Hit;

  isCollapsed: boolean;

  mouseOver: boolean;

  constructor() { }

  ngOnInit() {
    this.isCollapsed = true;
  }

  mouseEnter() {
    this.mouseOver = true;
  }

  mouseLeave() {
    this.mouseOver = false;
  }
}
