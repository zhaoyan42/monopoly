import { useCallback } from 'react';
import { Confirm } from '../components/Confirm.tsx';
import { useConfirmStore } from '../store/confirmStore.ts';

export function useConfirm() {
  const { visible, options, setVisible, setOptions } = useConfirmStore();

  const confirm = useCallback(
    ({
      content,
      confirmText,
      cancelText,
    }: {
      content: string;
      confirmText: string;
      cancelText: string;
    }) => {
      return new Promise<boolean>((resolve) => {
        setOptions({ content, confirmText, cancelText, resolve });
        setVisible(true);
      });
    },
    [setOptions, setVisible],
  );

  const { content: children, confirmText, cancelText, resolve } = options;

  const handleConfirm = useCallback(() => {
    if (resolve) resolve(true);
    setVisible(false);
  }, [resolve, setVisible]);

  const handleCancel = useCallback(() => {
    if (resolve) resolve(false);
    setVisible(false);
  }, [resolve, setVisible]);

  const ConfirmComponent = useCallback(
    () => (
      <Confirm
        visible={visible}
        confirmText={confirmText}
        cancelText={cancelText}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      >
        {children}
      </Confirm>
    ),
    [visible, children, confirmText, cancelText, handleConfirm, handleCancel],
  );

  return { confirm, ConfirmComponent };
}
