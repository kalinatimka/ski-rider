import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  public timeToClose(timestamp: number): string {
    const dateNowInSec = Math.round(Date.now() / 1000);
    const time = timestamp - dateNowInSec;

    if (time < 0) {
        return "Торги окончены";
    } else if (time < 86400) {
        return moment.unix(time).format("HH:mm:ss");
    } else if (time < 2592000) {
        return this.dimension(Math.round(time / 86400), 'j');
    } else if (time < 31104000) {
        return this.dimension(Math.round(time / 2592000), 'n');
    } else if (time >= 31104000) {
        return this.dimension(Math.round(time / 31104000), 'Y');
    }
  }

  public getBidDate(timestamp: number): string {
    const dateNowInSec = Math.round(Date.now() / 1000);
    const time = dateNowInSec - timestamp;

    if (time < 60) {
      return '< минуты назад';
    } else if (time < 3600) {
        return this.dimension(Math.round(time / 60), 'i') + ' назад';
    } else if (time < 86400) {
        return this.dimension(Math.round(time / 3600), 'G') + ' назад';
    } else if (time < 2592000) {
        return this.dimension(Math.round(time / 86400), 'j') + ' назад';
    } else if (time < 31104000) {
        return this.dimension(Math.round(time / 2592000), 'n') + ' назад';
    } else if (time >= 31104000) {
        return this.dimension(Math.round(time / 31104000), 'Y') + ' назад';
    }
  }

  private dimension(timestamp: number, type: string): string {
    const dimension = {
      'n': ['месяцев', 'месяц', 'месяца', 'месяц'],
      'j': ['дней', 'день', 'дня'],
      'G': ['часов', 'час', 'часа'],
      'i': ['минут', 'минуту', 'минуты'],
      'Y': ['лет', 'год', 'года'],
    }

    let index;

    if (timestamp >= 5 && timestamp <= 20) {
      index = 0;
    } else if (timestamp == 1 || timestamp % 10 == 1) {
      index = 1;
    } else if ((timestamp <= 4 && timestamp >= 1) || (timestamp % 10 <= 4 && timestamp % 10 >= 1)) {
      index = 2;
    } else {
      index = 0;
    }
    return `${timestamp} ${dimension[type][index]}`;
  }
}
