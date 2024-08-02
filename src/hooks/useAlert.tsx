import { ReactNode, useCallback } from 'react';
import { Alert } from '../components/Alert';
import { useAlertStore } from '../store/alertStore';

export function useAlert() {
  const { visible, options, setVisible, setOptions } = useAlertStore();

  const alert = useCallback(
    (options: { content: ReactNode; buttonText?: string }) => {
      setOptions(options);
      setVisible(true);
    },
    [setOptions, setVisible],
  );

  const AlertComponent = useCallback(
    () => (
      <Alert
        visible={visible}
        buttonText={options.buttonText}
        onClose={() => {
          setVisible(false);
        }}
      >
        {options.content}
      </Alert>
    ),
    [visible, options, setVisible],
  );

  return { alert, AlertComponent };
}
