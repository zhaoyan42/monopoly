import { WorldMap } from './model/Map.ts';
import { Country, countryList } from './model/Country.ts';
import { CountrySquare, EmptySquare } from './Square.tsx';
import { useRef } from 'react';
import { Player } from './model/Player.ts';
import styled from 'styled-components';
import { PlayerSquare } from './PlayerInfo.tsx';

const BoardWrapper = styled('div')`
  display: flex;
  height: 100%;
`;

const LeftWrapper = styled('div')`
  flex: 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RightWrapper = styled('div')`
  flex: 1 1;
  display: flex;
  flex-direction: column;
`;

const MapWrapper = styled('div')<{ $currentPlayerColor: string }>`
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

type BoardProps = {
  players: Player[];
  currentPlayerIndex: number;
  onClick: () => void;
};

export function Board({ players, currentPlayerIndex, onClick }: BoardProps) {
  const worldMap = useRef(new WorldMap(countryList));

  function getPlayers(country: Country) {
    return players.filter((player) => player.country === country);
  }

  return (
    <BoardWrapper>
      <LeftWrapper>
        <div>
          {players.map((player) => (
            <PlayerSquare key={player.color} player={player} />
          ))}
        </div>
        <div>
          <PlayerSquare player={players[currentPlayerIndex]} />
        </div>
      </LeftWrapper>
      <RightWrapper onClick={onClick}>
        <MapWrapper $currentPlayerColor={players[currentPlayerIndex].color}>
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
        </MapWrapper>
      </RightWrapper>
    </BoardWrapper>
  );
}
