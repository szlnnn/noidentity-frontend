import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Role } from "../entity/Role";

interface RoleState {
  roles: Role[];
  addRole: (role: Role) => void;
  removeRole: (roleId: string) => void;
  getRoleById: (roleId: string) => Role | undefined;
  clearStorage: () => void; // Method to clear the storage
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
        localStorage.removeItem("role-storage"); // Use the key you defined in persist configuration
        set(() => ({ roles: [] })); // Optionally reset state to initial
      },
    }),
    {
      name: "role-storage", // The key used for storing the state in localStorage
      // You can add other persist options here if needed
    },
  ),
);

export default useRoleStore;
