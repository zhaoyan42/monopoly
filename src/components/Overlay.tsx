import { ReactNode } from 'react';
import styled from 'styled-components';

const OverlayWrapper = styled('div')`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function Overlay({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return <OverlayWrapper onClick={onClick}>{children}</OverlayWrapper>;
}
