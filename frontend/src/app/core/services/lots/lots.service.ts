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

  public getAllLots(searchParams: SearchParamsModel) {
    return this.http.get(
      PATH_CONFIG.ALL_LOTS,
      {
        params: { ...searchParams }
      }
    );
  }

  public getLotsByCategory(idCategory: number, searchParams: SearchParamsModel) {
    return this.http.get(
      PATH_CONFIG.LOTS_BY_CATEGORY_URL.replace('{idCategory}', String(idCategory)),
      {
        params: { ...searchParams }
      }
    );
  }

  public getLotFullData(idlot: string) {
    return this.http.get(
      PATH_CONFIG.LOT_FULL_DATA_URL.replace('{idLot}', idlot),
    );
  }

  public generateLotCardsData(lots: LotModel[], idToCategoryMap: Map<number, CategoryModel>): LotCardModel[] {
    return lots.map((lot: LotModel) => ({
      idLot: lot.idLot,
      name: lot.name,
      startPrice: lot.startPrice,
      endDate: lot.endDate,
      image: lot.image,
      year: 1,
      brand: '',
      type: '',
      category: idToCategoryMap.get(lot.idCategory),
      idWinner: lot.idWinner,
    }))
  }
}
