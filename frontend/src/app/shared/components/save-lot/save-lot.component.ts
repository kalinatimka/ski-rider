import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-save-lot',
  templateUrl: './save-lot.component.html',
  styleUrls: ['./save-lot.component.scss']
})
export class SaveLotComponent implements OnInit {
  @Input()
  public isLotSaved: boolean;

  @Output()
  public saveButtonClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  public getIcon(): string {
    return this.isLotSaved ? 'bookmark' : 'bookmark_border';
  }

  public onButtonClick(): void {
    this.isLotSaved = !this.isLotSaved;
    this.saveButtonClick.emit(this.isLotSaved);
  }
}
