import { WorldMap } from './model/Map.ts';
import { Country, countryList } from './model/Country.ts';
import { CountrySquare, EmptySquare } from './Square.tsx';
import { useRef } from 'react';
import { Player } from './model/Player.ts';
import styled from 'styled-components';

const BoardWrapper = styled('div')<{ $currentPlayerColor: string }>`
  flex-grow: 1;
  height: 0;
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  grid-template-rows: repeat(9, 1fr);
  border: 5px solid ${({ $currentPlayerColor }) => $currentPlayerColor};
  animation: breathing 1s infinite;

  @keyframes breathing {
    0% {
      border-color: ${({ $currentPlayerColor }) => $currentPlayerColor}00;
    }
    50% {
      border-color: ${({ $currentPlayerColor }) => $currentPlayerColor}FF;
    }
    100% {
      border-color: ${({ $currentPlayerColor }) => $currentPlayerColor}00;
    }
  }
`;

type BoardProps = { players: Player[]; currentPlayerIndex: number };

export function Board({ players, currentPlayerIndex }: BoardProps) {
  const worldMap = useRef(new WorldMap(countryList));

  function getPlayers(country: Country) {
    return players.filter((player) => player.country === country);
  }

  return (
    <BoardWrapper $currentPlayerColor={players[currentPlayerIndex].color}>
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
  );
}
