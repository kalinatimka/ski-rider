import { CategoryModel } from "./category.model";

export interface LotModel {
  idLot: string,
  name: string,
  description: string,
  startPrice: number,
  bidStep: number,
  endDate: number,
  image: string,
  idYear: number,
  idBrand: number,
  idType: number,
  idCategory: number,
  idCreator: number,
  idWinner: number,
}

export interface LotCardModel {
  idLot: string,
  name: string,
  startPrice: number,
  endDate: number,
  image: string,
  year: number,
  brand: string,
  type: string,
  category: CategoryModel,
  idWinner: number,
}
