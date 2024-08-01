import { Country } from './Country.ts';

export class WorldMap {
  private positionMap: (Country | null)[][] = [];

  constructor(countries: Country[]) {
    for (let y = 0; y < 9; y++) {
      this.positionMap[y] = [];
      for (let x = 0; x < 16; x++) {
        const country = countries?.[x + y * 16];
        this.positionMap[y].push(country || null);
      }
    }
  }

  getCountry(x: number, y: number) {
    return this.positionMap[y][x];
  }
}
