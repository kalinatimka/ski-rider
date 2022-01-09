import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';

import { CategoryModel } from 'src/app/core/models/category.model';
import { LotCardModel, LotModel } from 'src/app/core/models/lot.model';

import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { LotsService } from 'src/app/core/services/lots/lots.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {
  public categoryId: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public currentCategory: string = '';
  public lots: LotCardModel[] = null;

  private isInitDataReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private idToCategoryMap: Map<number, CategoryModel>;

  constructor(
    private route: ActivatedRoute,
    private lotsService: LotsService,
    private categoriesService: CategoriesService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params.id) {
        this.categoryId.next(params.id);
      } else {
        // navigate with params
      }
    });

    combineLatest([
      this.categoriesService.getAllCategories(),
    ]).pipe(
      take(1),
    ).subscribe(([categories]: [
      CategoryModel[]
    ]) => {
      this.idToCategoryMap = this.categoriesService.createCategoriesMap(categories);
      this.isInitDataReady.next(true);
    })

    combineLatest([
      this.categoryId,
      this.isInitDataReady,
    ]).pipe(
      filter(([id, isInitDataReady]) => !!id && isInitDataReady),
      tap(() => {
        this.lots = [];
        this.currentCategory = this.idToCategoryMap.get(Number(this.categoryId.getValue()))?.name;
        // start loadinng
      }),
      switchMap(([id]) => {
        return this.lotsService.getLotsByCategory(id);
      })
    ).subscribe((lots: LotModel[]) => {
      this.lots = lots.map((lot: LotModel) => ({
        idLot: lot.idLot,
        name: lot.name,
        startPrice: lot.startPrice,
        endDate: lot.endDate * 1000,
        image: lot.image,
        year: 1,
        brand: '',
        type: '',
        category: this.idToCategoryMap.get(lot.idCategory),
        idWinner: lot.idWinner,
      }));
      // end loading
    });
  }

}
