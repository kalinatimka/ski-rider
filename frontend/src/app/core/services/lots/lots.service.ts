import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PATH_CONFIG } from 'src/app-config/routes/path.config';

@Injectable({
  providedIn: 'root'
})
export class LotsService {

  constructor(
    private http: HttpClient
  ) { }

  public getLotsByCategory(idCategory: string) {
    return this.http.get(PATH_CONFIG.LOTS_BY_CATEGORY_URL.replace('{idCategory}', idCategory));
  }
}
