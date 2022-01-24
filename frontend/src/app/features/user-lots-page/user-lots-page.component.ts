import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { CategoryModel } from 'src/app/core/models/category.model';
import { LotCardModel, LotsDataModel } from 'src/app/core/models/lot.model';
import { SearchParamsModel } from 'src/app/core/models/search-params.model';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { LotsService } from 'src/app/core/services/lots/lots.service';

@Component({
  selector: 'app-user-lots-page',
  templateUrl: './user-lots-page.component.html',
  styleUrls: ['./user-lots-page.component.scss']
})
export class UserLotsPageComponent implements OnInit {
  public lots: LotCardModel[] = null;
  public totalPages: number = 0;
  public searchParams: SearchParamsModel;

  private isInitDataReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private idToCategoryMap: Map<number, CategoryModel>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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

    combineLatest([
      this.isInitDataReady$,
      this.route.queryParams,
    ]).pipe(
      filter(([isInitDataReady]) => isInitDataReady),
      switchMap(([_, queryParams]) => {
        this.searchParams = {
          pageNumber: Number(queryParams.pageNumber) || 0,
          pageSize: Number(queryParams.pageSize) || 6,
          propertyName: queryParams.propertyName || 'creatingDate',
          order: queryParams.order || 'desc',
        }

        this.lots = [];
        this.totalPages = 0;

        return this.lotsService.getUserLots(Number(localStorage.getItem('idUser')), this.searchParams);
      })
    ).subscribe((lotsData: LotsDataModel) => {
      this.lots = this.lotsService.generateLotCardsData(lotsData.lots, this.idToCategoryMap);
      this.totalPages = lotsData.totalPages;
    });
  }

  public onPageChanged(page: number): void {
    this.router.navigate([], {
      queryParams: {
        pageNumber: page - 1,
      },
      queryParamsHandling: 'merge',
    });
  }
}
