import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {
  public formatDate(date) {
    const newDate = this._formatDate(date);
    const regex = /^\d{4}\/\d{2}\/\d{2}$/;
    const control = regex.test(newDate);
    if (newDate == null && !control) {
        return "Geçersiz tarih";
      }
     return newDate
  }

  private _formatDate(date) {
    const parts = date.trim().split('-');
    if (parts.length !== 3) {
      return null;
    }

    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      return null;
    }

    const formattedDate = `${year}/${month.padStart(2, '0')}/${day.padStart(2,'0',)}`;

    return formattedDate;
  }
}
