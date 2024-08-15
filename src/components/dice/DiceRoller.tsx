import styled from 'styled-components';
import { Dice } from './Dice.tsx';

const DiceContainer = styled('div')`
  width: 50px;
  height: 50px;
  margin: 20px auto;
  perspective: 1000px;
`;

export function DiceRoller({
  rolling,
  targetPoint,
  onAnimationEnd,
}: {
  rolling: boolean;
  targetPoint: number;
  onAnimationEnd: () => void;
}) {
  return (
    <DiceContainer>
      <Dice
        rolling={rolling}
        targetPoint={targetPoint}
        onAnimationEnd={onAnimationEnd}
      />
    </DiceContainer>
  );
}
