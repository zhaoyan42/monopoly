import { Country } from './Country.ts';

export class CountryChain {
  constructor(private chain: Country[]) {}

  getNextCountry(country: Country) {
    const index = this.chain.findIndex((c) => c.name === country.name);
    if (index === -1) {
      throw new Error('Country not found');
    }
    if (index + 1 === this.chain.length) {
      return this.chain[0];
    } else {
      return this.chain[index + 1];
    }
  }
}
