import { Component, Input, OnInit } from '@angular/core';
import { PATH_CONFIG } from 'src/app-config/routes/path.config';
import { LotCardModel } from 'src/app/core/models/lot.model';

@Component({
  selector: 'app-lot-card',
  templateUrl: './lot-card.component.html',
  styleUrls: ['./lot-card.component.scss']
})
export class LotCardComponent implements OnInit {
  @Input()
  public lotData: LotCardModel;


  constructor() { }

  ngOnInit(): void {
  }

  getImageLink(fileName: string): string {
    return PATH_CONFIG.LOT_IMAGE_URL.replace('{filename}', fileName);
  }
}
