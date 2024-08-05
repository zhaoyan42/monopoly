import styled from 'styled-components';
import { Player } from './model/Player.ts';

const PlayerSquareWrapper = styled('div')`
  width: 10vh;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const PlayerSquareContent = styled('div')<{ $player: Player }>`
  width: 80%;
  height: 80%;
  background-color: ${({ $player }) => $player.color};
  border-radius: 10%;
`;

export function PlayerSquare({ player }: { player: Player }) {
  return (
    <PlayerSquareWrapper>
      <PlayerSquareContent $player={player} />
    </PlayerSquareWrapper>
  );
}
