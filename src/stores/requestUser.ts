import { User } from "../entity/User";
import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

interface UserState {
  selectedUser: User | null;
  selectUser: (user: User) => void;
  removeSelectedUser: () => void;
}

const userPersistConfig: PersistOptions<UserState> = {
  name: "user-storage",
};

const createState: StateCreator<
  UserState,
  [["zustand/persist", unknown]],
  [],
  UserState
> = (set) => ({
  selectedUser: null,
  selectUser: (user) => set({ selectedUser: user }),
  removeSelectedUser: () => set({ selectedUser: null }),
});

export const useUserStore = create<UserState>()(
  persist(createState, userPersistConfig),
);
