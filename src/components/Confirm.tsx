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
  padding: 16px;
  border-radius: 8px;
`;

const DialogCard = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Actions = styled('div')`
  display: flex;
  gap: 8px;
`;

const Button = styled('button')`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background-color: #000000;
  color: #ffffff;
  cursor: pointer;
`;

const ContentWrapper = styled('div')`
  font-size: 16px;
`;

export function Confirm({
  children,
  visible,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: {
  children: React.ReactNode;
  visible: boolean;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Overlay $visible={visible}>
      <DialogWrapper>
        <DialogCard>
          <ContentWrapper>{children}</ContentWrapper>
          <Actions>
            <Button onClick={onConfirm}>{confirmText}</Button>
            <Button onClick={onCancel}>{cancelText}</Button>
          </Actions>
        </DialogCard>
      </DialogWrapper>
    </Overlay>
  );
}
