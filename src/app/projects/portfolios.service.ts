import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Portfolio } from '../models/portfolio.model';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  constructor(private http: HttpClient) {}

  getPortfolios(pagesize: number, page: number) {
    const query = `?pagesize=${pagesize}&page=${page}`;
    return this.http
      .get<{ portfolios: Portfolio[]; total: number }>(
        'http://127.0.0.1:3000/api/portfolio' + query
      )
      .pipe(
        map((res) => res),
        catchError((error) => throwError(error))
      );
  }

  getAPortfolio(portfolioId: string) {
    return this.http
      .get<{ portfolio: Portfolio }>(
        'http://127.0.0.1:3000/api/portfolio/item/' + portfolioId
      )
      .pipe(
        map((res) => res.portfolio),
        catchError((error) => throwError(error))
      );
  }
}
