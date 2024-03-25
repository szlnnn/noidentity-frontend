import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Role } from "../entity/Role";

interface RoleState {
  rolesToRevoke: Role[];
  addRoleToRevoke: (role: Role) => void;
  removeRoleFromRevoke: (roleId: string) => void;
  getRevokeRoleById: (roleId: string) => Role | undefined;
  clearRevokedRolesStorage: () => void;
}

const useRevokeRoleStore = create(
  persist<RoleState>(
    (set, get) => ({
      rolesToRevoke: [],
      addRoleToRevoke: (role) =>
        set((state) => ({ rolesToRevoke: [...state.rolesToRevoke, role] })),
      removeRoleFromRevoke: (roleId) =>
        set((state) => ({
          rolesToRevoke: state.rolesToRevoke.filter(
            (role) => role.id !== roleId,
          ),
        })),
      getRevokeRoleById: (roleId) => {
        return get().rolesToRevoke.find((role) => role.id === roleId);
      },
      clearRevokedRolesStorage: () => {
        localStorage.removeItem("revoke-role-storage");
        set(() => ({ rolesToRevoke: [] }));
      },
    }),
    {
      name: "revoke-role-storage",
    },
  ),
);

export default useRevokeRoleStore;
