import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class RequestService {
  constructor(private readonly httpService: HttpService) {}

  private async sender(url) {
    const { data } = await firstValueFrom(
      this.httpService.get(url).pipe(
        catchError((error: AxiosError) => {
          console.log(error)
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  public async getStudents(count = 1000) {
    const url = `https://randomuser.me/api/?results=${count}`;
    const data = await this.sender(url);
    return data.results;
  }

  public async getTitles(date = '2023/05/10') {
    const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/tr.wikipedia/all-access/${date}`;
    const data = await this.sender(url);
    return data.items[0].articles;
  }

  public async getUniversities(country) {
    const url = `http://universities.hipolabs.com/search?country=${country}`;
    const data = await this.sender(url);
    return data;
  }
}
