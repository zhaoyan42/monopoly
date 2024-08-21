import React from 'react';
import styled from 'styled-components';
import { Overlay } from './Overlay.tsx';

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
  gap: 16px;
  justify-content: center;
`;

const Button = styled('button')<{ $primary?: boolean }>`
  padding: 16px 24px;
  border-radius: 8px;
  border: none;
  background-color: ${({ $primary }) => ($primary ? '#000000' : '#cccccc')};
  color: ${({ $primary }) => ($primary ? '#ffffff' : '#000000')};
  font-size: 18px;
  cursor: pointer;
  flex-grow: 1;
  text-align: center;
`;

const ContentWrapper = styled('div')`
  font-size: 18px;
  text-align: center;
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
    visible && (
      <Overlay>
        <DialogWrapper>
          <DialogCard>
            <ContentWrapper>{children}</ContentWrapper>
            <Actions>
              <Button $primary={true} onClick={onConfirm}>
                {confirmText}
              </Button>
              <Button onClick={onCancel}>{cancelText}</Button>
            </Actions>
          </DialogCard>
        </DialogWrapper>
      </Overlay>
    )
  );
}
