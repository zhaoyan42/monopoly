import { Country } from '../model/Country.ts';
import { Player } from '../model/Player.ts';
import { useState } from 'react';

export function useOwnedCountriesStore() {
  const [ownedCountries, setOwnedCountries] = useState<Map<Player, Country[]>>(
    new Map(),
  );

  function getOwner(country: Country) {
    return (
      [...ownedCountries.entries()].find(([_, countries]) =>
        countries.includes(country),
      )?.[0] || null
    );
  }

  function isCountryPurchased(country: Country) {
    return [...ownedCountries.values()].some((countries) =>
      countries.includes(country),
    );
  }

  function purchaseCountry(player: Player, country: Country) {
    setOwnedCountries((prev) => {
      const playerCountries = prev.get(player) || [];
      return new Map(prev).set(player, [...playerCountries, country]);
    });
  }

  function getOwnedCountries(player: Player): Country[] {
    return ownedCountries.get(player) || [];
  }

  return { purchaseCountry, getOwnedCountries, isCountryPurchased, getOwner };
}
