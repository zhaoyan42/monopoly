import { WorldMap } from './model/Map.ts';
import { Country, countryList } from './model/Country.ts';
import { CountrySquare, EmptySquare } from './Square.tsx';
import { useState } from 'react';
import { Player } from './model/Player.ts';

export function Board() {
  const worldMap = new WorldMap(countryList);

  const [players] = useState([
    new Player('#ff0000', countryList[0]),
    new Player('#00ff00', countryList[0]),
    new Player('#0000ff', countryList[0]),
  ]);

  function getPlayers(country: Country) {
    return players.filter((player) => player.country === country);
  }

  return Array(9)
    .fill(0)
    .flatMap((_, y) =>
      Array(16)
        .fill(0)
        .map((_, x) => {
          const country = worldMap.getCountry(x, y);
          return country ? (
            <CountrySquare
              key={`${y}-${x}`}
              country={country}
              players={getPlayers(country)}
            />
          ) : (
            <EmptySquare key={`${y}-${x}`}></EmptySquare>
          );
        }),
    );
}
