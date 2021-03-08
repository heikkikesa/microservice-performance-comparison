import { Injectable } from '@nestjs/common';
import * as universities from './data/universities.json';

@Injectable()
export class AppService {
  getUniversities(country: string): object {
    if (country !== '') {
      return universities.filter(
        (university) => university.country === country,
      );
    } else {
      return universities;
    }
  }
}
