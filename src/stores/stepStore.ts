import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const useCounterStore = create(
  persist<CounterState>(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set(() => ({ count: 0 })),
    }),
    {
      name: "counter-storage",
    },
  ),
);

export default useCounterStore;
