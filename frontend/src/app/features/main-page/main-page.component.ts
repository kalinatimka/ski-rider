import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { CategoryModel } from 'src/app/core/models/category.model';
import { LotCardModel, LotsDataModel } from 'src/app/core/models/lot.model';
import { SearchParamsModel } from 'src/app/core/models/search-params.model';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { LotsService } from 'src/app/core/services/lots/lots.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  public lots: LotCardModel[] = null;
  public searchParams: SearchParamsModel;

  private isInitDataReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private idToCategoryMap: Map<number, CategoryModel>;

  constructor(
    private lotsService: LotsService,
    private categoriesService: CategoriesService,
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.categoriesService.getAllCategories(),
    ]).pipe(
      take(1),
    ).subscribe(([categories]: [
      CategoryModel[]
    ]) => {
      this.idToCategoryMap = this.categoriesService.createCategoriesMap(categories);
      this.isInitDataReady$.next(true);
    });

    this.isInitDataReady$.pipe(
      filter((isInitDataReady) => isInitDataReady),
      switchMap(() => {
        this.searchParams = {
          pageNumber: 0,
          pageSize: 6,
          propertyName: 'creatingDate',
          order: 'desc',
        }

        this.lots = [];

        return this.lotsService.getAllLots(this.searchParams);
      })
    ).subscribe((lotsData: LotsDataModel) => {
      this.lots = this.lotsService.generateLotCardsData(lotsData.lots, this.idToCategoryMap);
    });
  }
}
