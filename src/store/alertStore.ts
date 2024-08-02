import { create } from 'zustand';
import { ReactNode } from 'react';

interface AlertOptions {
  content: ReactNode;
  buttonText?: string;
}

interface AlertState {
  visible: boolean;
  options: AlertOptions;
  setVisible: (visible: boolean) => void;
  setOptions: (options: AlertOptions) => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  visible: false,
  options: {
    content: '',
    buttonText: 'OK',
  },
  setVisible: (visible) => set({ visible }),
  setOptions: (options) => set({ options }),
}));
