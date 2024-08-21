import styled from 'styled-components';
import { DiceAnimation } from './DiceAnimation.tsx';
import { useEffect, useState } from 'react';
import { Overlay } from '../Overlay.tsx';

const DiceContainer = styled('div')`
  width: 50px;
  height: 50px;
  margin: 20px auto;
  perspective: 1000px;
`;

export function DiceRoller({
  onSettled,
}: {
  onSettled: (steps: number) => void;
}) {
  const [points] = useState(Math.floor(Math.random() * 6) + 1);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSettled(points);
    }, 3000);
    return () => clearTimeout(timeout);
  });

  return (
    <Overlay>
      <DiceContainer>
        <DiceAnimation targetPoint={points} />
      </DiceContainer>
    </Overlay>
  );
}
