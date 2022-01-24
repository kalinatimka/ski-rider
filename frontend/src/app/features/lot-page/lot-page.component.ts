import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PATH_CONFIG } from 'src/app-config/routes/path.config';

import { BidModel } from 'src/app/core/models/bid.model';
import { CategoryModel } from 'src/app/core/models/category.model';
import { FullLotModel, LotModel } from 'src/app/core/models/lot.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';

import { BidsService } from 'src/app/core/services/bids/bids.service';
import { LotsService } from 'src/app/core/services/lots/lots.service';
import { TimeService } from 'src/app/core/services/time/time.service';

@Component({
  selector: 'app-lot-page',
  templateUrl: './lot-page.component.html',
  styleUrls: ['./lot-page.component.scss']
})
export class LotPageComponent implements OnInit {
  public form: FormGroup = null;

  public lot: LotModel;
  public bids: BidModel[];
  public category: CategoryModel;

  public bidMinPrice: number;
  public currentPrice: number;

  public timeToClose;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private bidsService: BidsService,
    private lotsService: LotsService,
    private timeService: TimeService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      cost: [null, Validators.required],
    });

    this.route.queryParams.pipe(
      switchMap((queryParams) => {
        this.lot = null;
        this.bids = null;
        this.category = null;

        return this.lotsService.getLotFullData(queryParams.id);
      }),
      switchMap((lotData: FullLotModel) => {
        this.lot = lotData.lot;
        this.bids = lotData.bids;
        this.category = lotData.category;

        this.updatePrices(this.lot, this.bids);

        this.timeToClose = this.getTimeToClose(this.lot.endDate);
        setInterval(() => {
          this.timeToClose = this.getTimeToClose(this.lot.endDate);
        }, 1000);

        this.bidsService.joinAuction(this.lot);
        return this.bidsService.getBid();
      })
    ).subscribe((bid: BidModel) => {
      this.bids = [
        bid,
        ...this.bids,
      ];

      this.updatePrices(this.lot, this.bids);
    });
  }

  public makeBid(): void {
    this.bidsService.makeBid({
      idLot: Number(this.lot.idLot),
      idUser: Number(localStorage.getItem('idUser')),
      price: this.form.value.cost,
    });
    this.form.reset();
  }

  public getImageLink(fileName: string): string {
    return PATH_CONFIG.LOT_IMAGE_URL.replace('{filename}', fileName);
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public getBidDate(timestamp: number): string {
    return this.timeService.getBidDate(timestamp);
  }

  private getTimeToClose(timestamp: number): string {
    return this.timeService.timeToClose(timestamp);
  }

  private updatePrices(lot: LotModel, bids: BidModel[]): void {
    this.currentPrice = bids.length ? Math.max(...bids.map((bid)=> bid.price)) : lot.startPrice;
    this.bidMinPrice = bids.length ? (this.currentPrice + lot.bidStep) : lot.startPrice;
  }
}
