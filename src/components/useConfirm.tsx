import { useCallback, useState } from 'react';
import { Confirm } from './Confirm';

export function useConfirm() {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<{
    content: string;
    confirmText: string;
    cancelText: string;
    resolve?: (value: boolean) => void;
  }>({
    content: '确定吗？',
    confirmText: '确定',
    cancelText: '取消',
  });

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
    [],
  );

  const { content: children, confirmText, cancelText, resolve } = options;

  const handleConfirm = useCallback(() => {
    if (resolve) resolve(true);
    setVisible(false);
  }, [resolve]);

  const handleCancel = useCallback(() => {
    if (resolve) resolve(false);
    setVisible(false);
  }, [resolve]);

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
