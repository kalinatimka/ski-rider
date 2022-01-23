import { UserModel } from "./user.model";

export interface BidModel {
  idBid: number,
  price: number,
  date: number,
  idUser: number,
  idLot: number,
  user: UserModel;
}
