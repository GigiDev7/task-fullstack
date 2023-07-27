import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from './config';
import { City } from './interface';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private http: HttpClient) {}

  getCities(query: string, page: number = 1) {
    return this.http.get<{ data: City[]; totalPages: number }>(
      `${BASE_URL}/cities?query=${query}&page=${page}`
    );
  }
}
