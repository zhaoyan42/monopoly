import { create } from 'zustand';
import { Country } from '../model/Country.ts';
import { Player } from '../model/Player.ts';

interface OwnedCountriesState {
  ownedCountries: Map<Player, Country[]>;
  getOwner: (country: Country) => Player | null;
  isCountryPurchased: (country: Country) => boolean;
  purchaseCountry: (player: Player, country: Country) => void;
  getOwnedCountries: (player: Player) => Country[];
}

export const useOwnedCountriesStore = create<OwnedCountriesState>(
  (set, get) => ({
    ownedCountries: new Map<Player, Country[]>(),

    getOwner: (country: Country) => {
      const { ownedCountries } = get();
      return (
        [...ownedCountries.entries()].find(([_, countries]) =>
          countries.includes(country),
        )?.[0] || null
      );
    },

    isCountryPurchased: (country: Country) => {
      const { ownedCountries } = get();
      return [...ownedCountries.values()].some((countries) =>
        countries.includes(country),
      );
    },

    purchaseCountry: (player: Player, country: Country) => {
      set((state) => {
        const playerCountries = state.ownedCountries.get(player) || [];
        const newOwnedCountries = new Map(state.ownedCountries).set(player, [
          ...playerCountries,
          country,
        ]);
        return { ownedCountries: newOwnedCountries };
      });
    },

    getOwnedCountries: (player: Player) => {
      const { ownedCountries } = get();
      return ownedCountries.get(player) || [];
    },
  }),
);
