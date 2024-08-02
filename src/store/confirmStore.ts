import { create } from 'zustand';

interface ConfirmState {
  visible: boolean;
  options: {
    content: string;
    confirmText: string;
    cancelText: string;
    resolve?: (value: boolean) => void;
  };
  setVisible: (visible: boolean) => void;
  setOptions: (options: {
    content: string;
    confirmText: string;
    cancelText: string;
    resolve?: (value: boolean) => void;
  }) => void;
}

export const useConfirmStore = create<ConfirmState>((set) => ({
  visible: false,
  options: {
    content: '确定吗？',
    confirmText: '确定',
    cancelText: '取消',
  },
  setVisible: (visible) => set({ visible }),
  setOptions: (options) => set({ options }),
}));
