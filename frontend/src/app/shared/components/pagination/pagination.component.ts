import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input()
  public currentPage: number;
  @Input()
  public pagesCount: number;

  @Output()
  public pageChanged: EventEmitter<number> = new EventEmitter<number>();


  public pages: number[];
  public isPrevButtonEnabled: boolean;
  public isNextButtonEnabled: boolean;

  constructor() { }

  ngOnInit(): void {
    this.isPrevButtonEnabled = this.currentPage > 1;
    this.isNextButtonEnabled = this.pagesCount !== this.currentPage;
    this.pages = Array.from({ length: this.pagesCount }, (_, i) => i + 1);
  }

  public onPageClick(page: number): void {
    this.pageChanged.emit(page);
  }
}
