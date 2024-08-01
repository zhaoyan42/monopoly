import styled from 'styled-components';
import { Country } from './model/Country.ts';
import { Player } from './model/Player.ts';
import { useEffect, useState } from 'react';

const CountrySquareWrapper = styled('div')<{ $playerColor: string | null }>`
  ${({ $playerColor }) =>
    $playerColor ? `border: 3px solid ${$playerColor}` : ''};
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 8px;
  margin: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

function useIntervalIndex(playersCount: number, interval: number) {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  useEffect(() => {
    // Do not start the interval if there are no players
    if (playersCount === 0) {
      return;
    }

    const intervalId = setInterval(() => {
      setCurrentPlayerIndex((index) => (index + 1) % playersCount);
    }, interval);

    return () => clearInterval(intervalId);
  }, [playersCount, interval]);

  return currentPlayerIndex;
}

export function CountrySquare({
  country,
  players,
}: {
  country: Country;
  players: Player[];
}) {
  const currentPlayerIndex = useIntervalIndex(players.length, 800);

  function getCurrentPlayerColor() {
    const currentPlayer = players?.[currentPlayerIndex];
    return currentPlayer?.color || null;
  }

  return (
    <CountrySquareWrapper $playerColor={getCurrentPlayerColor()}>
      {country.name.substring(0, 1)}
    </CountrySquareWrapper>
  );
}

export const EmptySquare = styled('div')`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 8px;
  margin: 8px;
  overflow: hidden;
`;
