import { Country } from './Country.ts';

export class CountryChain {
  constructor(private countries: Country[]) {}

  getNextCountry(country: Country) {
    const index = this.countries.findIndex((c) => c.name === country.name);
    if (index === -1) {
      throw new Error('Country not found');
    }
    if (index + 1 === this.countries.length) {
      return this.countries[0];
    } else {
      return this.countries[index + 1];
    }
  }

  getTargetCountry(country: Country, steps: number) {
    let nextCountry = country;
    for (let i = 0; i < steps; i++) {
      nextCountry = this.getNextCountry(nextCountry);
    }
    return nextCountry;
  }
}
