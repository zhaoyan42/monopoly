import React from 'react';
import styled from 'styled-components';

const Overlay = styled('div')<{ $visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${({ $visible }) => ($visible ? 'grid' : 'none')};
  place-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: #000000;
`;

const DialogWrapper = styled('div')`
  background-color: #ffffff;
  padding: 24px;
  border-radius: 12px;
  max-width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const DialogCard = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Actions = styled('div')`
  display: flex;
  justify-content: center;
`;

const Button = styled('button')`
  padding: 16px 24px;
  border-radius: 8px;
  border: none;
  background-color: #000000;
  color: #ffffff;
  font-size: 18px;
  cursor: pointer;
  text-align: center;
`;

const ContentWrapper = styled('div')`
  font-size: 18px;
  text-align: center;
`;

export function Alert({
  children,
  visible,
  buttonText = 'OK',
  onClose,
}: {
  children: React.ReactNode;
  visible: boolean;
  buttonText?: string;
  onClose: () => void;
}) {
  return (
    <Overlay $visible={visible}>
      <DialogWrapper>
        <DialogCard>
          <ContentWrapper>{children}</ContentWrapper>
          <Actions>
            <Button onClick={onClose}>{buttonText}</Button>
          </Actions>
        </DialogCard>
      </DialogWrapper>
    </Overlay>
  );
}
