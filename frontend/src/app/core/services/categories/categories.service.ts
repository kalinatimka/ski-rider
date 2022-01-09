import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PATH_CONFIG } from 'src/app-config/routes/path.config';
import { CategoryModel } from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(PATH_CONFIG.CATEGORIES_URL);
  }

  public createCategoriesMap(categories: CategoryModel[]): Map<number, CategoryModel> {
    return categories.reduce((acc, category: CategoryModel) => {
      acc.set(Number(category.idCategory), category);
      return acc;
    }, new Map<number, CategoryModel>());
  }
}
