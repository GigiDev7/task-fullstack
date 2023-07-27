import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { City } from './interface';

@Injectable()
export class AppService {
  async getCities(
    query: string,
    page: number = 1,
  ): Promise<{ data: City[]; totalPages: number; totalCities: number }> {
    const file = await fs.readFile(path.join(process.cwd(), '../cities.json'), {
      encoding: 'utf8',
    });
    let cities: City[] = JSON.parse(file);
    if (query) {
      cities = cities.filter((c) =>
        c.cityName.toLowerCase().includes(query.toLowerCase()),
      );
    }
    const skip = (page - 1) * 5;
    return {
      data: cities.slice(skip, skip + 5),
      totalPages: Math.ceil(cities.length / 5),
      totalCities: cities.length,
    };
  }
}
