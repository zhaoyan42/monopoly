import { describe, it, expect } from 'vitest';
import { CountryChain } from './CountryChain.ts';
import { countryList } from './Country.ts';

describe('CountryChain', () => {
  it('getNextCountry', () => {
    // Arrange
    const countries = countryList;
    const chain = new CountryChain(countries);

    // Assert
    expect(chain.getNextCountry(countries[0])).eq(countries[1]);
    expect(chain.getNextCountry(countries[1])).eq(countries[2]);
    expect(chain.getNextCountry(countries[2])).eq(countries[3]);
    expect(chain.getNextCountry(countries[countries.length - 1])).eq(
      countries[0],
    );
  });
});
