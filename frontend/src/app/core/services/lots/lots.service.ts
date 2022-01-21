import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PATH_CONFIG } from 'src/app-config/routes/path.config';
import { CategoryModel } from '../../models/category.model';
import { LotCardModel, LotModel } from '../../models/lot.model';
import { SearchParamsModel } from '../../models/search-params.model';

@Injectable({
  providedIn: 'root'
})
export class LotsService {

  constructor(
    private http: HttpClient
  ) { }

  public getLotsByCategory(idCategory: number, searchParams: SearchParamsModel) {
    return this.http.get(
      PATH_CONFIG.LOTS_BY_CATEGORY_URL.replace('{idCategory}', String(idCategory)),
      {
        params: { ...searchParams }
      }
    );
  }

  public generateLotCardsData(lots: LotModel[], idToCategoryMap: Map<number, CategoryModel>): LotCardModel[] {
    return lots.map((lot: LotModel) => ({
      idLot: lot.idLot,
      name: lot.name,
      startPrice: lot.startPrice,
      endDate: lot.endDate * 1000,
      image: lot.image,
      year: 1,
      brand: '',
      type: '',
      category: idToCategoryMap.get(lot.idCategory),
      idWinner: lot.idWinner,
    }))
  }
}
