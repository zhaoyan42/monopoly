import { WorldMap } from './model/Map.ts';
import { Country, countryList } from './model/Country.ts';
import { CountrySquare, EmptySquare } from './Square.tsx';
import { useRef, useState } from 'react';
import { Player } from './model/Player.ts';
import { CountryChain } from './model/CountryChain.ts';
import styled from 'styled-components';
import { useImmer } from 'use-immer';

import { useConfirm } from './hooks/useConfirm.tsx';

const BoardWrapper = styled('div')`
  flex-grow: 1;
  height: 0;
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  grid-template-rows: repeat(9, 1fr);
`;

export function Board() {
  const worldMap = useRef(new WorldMap(countryList));
  const countryChain = useRef(new CountryChain(countryList));

  const [players, setPlayers] = useImmer([
    new Player('#ff0000', countryList[0]),
    new Player('#00ff00', countryList[0]),
    new Player('#0000ff', countryList[0]),
  ]);

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const { confirm } = useConfirm();

  function getPlayers(country: Country) {
    return players.filter((player) => player.country === country);
  }

  function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  async function roll() {
    const currentPlayer = players[currentPlayerIndex];
    const steps = rollDice();
    console.log(`%c${steps}`, `color: ${currentPlayer.color};`);

    const targetCountry = countryChain.current.getTargetCountry(
      currentPlayer.country,
      steps,
    );
    setPlayers((draft) => {
      draft[currentPlayerIndex].country = targetCountry;
    });
    setCurrentPlayerIndex((index) => (index + 1) % players.length);

    const result = await confirm({
      content: '你想要买下' + targetCountry.name + '吗?',
      confirmText: '购买',
      cancelText: '不要',
    });

    console.log(result);
  }

  return (
    <>
      <BoardWrapper onClick={roll}>
        {Array(9)
          .fill(0)
          .flatMap((_, y) =>
            Array(16)
              .fill(0)
              .map((_, x) => {
                const country = worldMap.current.getCountry(x, y);
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
          )}
      </BoardWrapper>
    </>
  );
}
