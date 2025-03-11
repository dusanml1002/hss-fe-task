import {create} from "zustand/react";

interface StoreState {
    selectedIds: number[];
    toggleSelection: (id: number) => void;
    clearSelection: () => void;
}

export const useStore = create<StoreState>((set) => ({
    selectedIds: [],
    toggleSelection: (id: number) => {
        set((state: StoreState) => ({
            selectedIds: state.selectedIds.includes(id) ?
                state.selectedIds.filter((selectedId) => selectedId !== id) :
                [...state.selectedIds, id],
        }))
    },
    clearSelection: () => {  set({selectedIds: []})}
}))