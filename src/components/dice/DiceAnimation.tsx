import { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

const rotate = keyframes`
    0% { transform: rotateX(0) rotateY(0); }
    20% { transform: rotateX(180deg) rotateY(90deg); }
    40% { transform: rotateX(360deg) rotateY(180deg); }
    60% { transform: rotateX(540deg) rotateY(270deg); }
    80% { transform: rotateX(720deg) rotateY(360deg); }
    100% { transform: rotateX(900deg) rotateY(450deg); }
`;

const DiceWrapper = styled('div')<{
  $rolling: boolean;
}>`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  animation: ${({ $rolling }) =>
    $rolling
      ? css`
          ${rotate} 0.8s infinite linear
        `
      : 'none'};
`;

function Face({
  face,
  shouldRotate = true,
}: {
  face: number;
  shouldRotate?: boolean;
}) {
  return (
    <FaceWrapper face={face} $shouldRotate={shouldRotate}>
      {face}
    </FaceWrapper>
  );
}
const FaceWrapper = styled('div')<{ face: number; $shouldRotate?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
  ${({ face, $shouldRotate = true }) => {
    if (!$shouldRotate) return '';
    switch (face) {
      case 1:
        return 'transform: rotateY(0deg) translateZ(25px);';
      case 2:
        return 'transform: rotateY(90deg) translateZ(25px);';
      case 3:
        return 'transform: rotateY(180deg) translateZ(25px);';
      case 4:
        return 'transform: rotateY(-90deg) translateZ(25px);';
      case 5:
        return 'transform: rotateX(90deg) translateZ(25px);';
      case 6:
        return 'transform: rotateX(-90deg) translateZ(25px);';
      default:
        return '';
    }
  }}
`;

export function DiceAnimation({ targetPoint }: { targetPoint: number }) {
  const [innerRolling, setInnerRolling] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInnerRolling(false);
    }, 2000);
    return () => clearTimeout(timer);
  });

  return innerRolling ? (
    <DiceWrapper $rolling={innerRolling}>
      <Face face={1} />
      <Face face={2} />
      <Face face={3} />
      <Face face={4} />
      <Face face={5} />
      <Face face={6} />
    </DiceWrapper>
  ) : (
    <Face face={targetPoint} shouldRotate={false} />
  );
}
