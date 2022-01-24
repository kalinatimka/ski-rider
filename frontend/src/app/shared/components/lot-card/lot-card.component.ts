import { Component, Input, OnInit } from '@angular/core';
import { PATH_CONFIG } from 'src/app-config/routes/path.config';
import { LotCardModel } from 'src/app/core/models/lot.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TimeService } from 'src/app/core/services/time/time.service';

@Component({
  selector: 'app-lot-card',
  templateUrl: './lot-card.component.html',
  styleUrls: ['./lot-card.component.scss']
})
export class LotCardComponent implements OnInit {
  @Input()
  public lotData: LotCardModel;

  public timeToClose: string;

  constructor(
    private timeService: TimeService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.timeToClose = this.timeService.timeToClose(this.lotData.endDate);
    setInterval(() => {
      this.timeToClose = this.timeService.timeToClose(this.lotData.endDate);
    }, 1000)
  }

  getImageLink(fileName: string): string {
    return PATH_CONFIG.LOT_IMAGE_URL.replace('{filename}', fileName);
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
