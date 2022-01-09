import { Component, Input, OnInit } from '@angular/core';
import { LotCardModel } from 'src/app/core/models/lot.model';

@Component({
  selector: 'app-lots-list',
  templateUrl: './lots-list.component.html',
  styleUrls: ['./lots-list.component.scss']
})
export class LotsListComponent implements OnInit {
  @Input()
  public lots: LotCardModel[];


  constructor() { }

  ngOnInit(): void {
  }

}
