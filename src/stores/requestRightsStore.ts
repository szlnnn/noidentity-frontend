import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Role } from "../entity/Role";

interface RoleState {
  roles: Role[];
  addRole: (role: Role) => void;
  removeRole: (roleId: string) => void;
  getRoleById: (roleId: string) => Role | undefined;
  clearStorage: () => void;
}

const useRoleStore = create(
  persist<RoleState>(
    (set, get) => ({
      roles: [],
      addRole: (role) => set((state) => ({ roles: [...state.roles, role] })),
      removeRole: (roleId) =>
        set((state) => ({
          roles: state.roles.filter((role) => role.id !== roleId),
        })),
      getRoleById: (roleId) => {
        return get().roles.find((role) => role.id === roleId);
      },
      clearStorage: () => {
        localStorage.removeItem("role-storage");
        set(() => ({ roles: [] }));
      },
    }),
    {
      name: "role-storage",
    },
  ),
);

export default useRoleStore;
