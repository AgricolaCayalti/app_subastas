import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SubastasState {
    // Estado
    readmeIds: number[];               // IDs de las subastas ya "leídas"
    readme: boolean;

    // Acciones
    addReadmeId: (id: number) => void;
    setReadme: (readme: boolean) => void;
    handleAddOffer: (item: any) => void;  // la lógica completa
}

export const useSubastasStore = create<SubastasState>()(
    persist(
        (set, get) => ({
            readmeIds: [],
            readme: false,
            addReadmeId: (id) =>
                set((state) => ({
                    readmeIds: [...state.readmeIds, id],
                })),
            setReadme: (readme: boolean) =>
                set((state) => ({
                    readme,
                })),

            handleAddOffer: (item) => {
                set((state) => {
                    const esDeboMostrar = !state.readmeIds.includes(item.id);
                    return {
                        readmeIds: esDeboMostrar ? [...state.readmeIds, item.id] : state.readmeIds,
                        readme: esDeboMostrar,
                    };
                });
            }
        }),
        {
            name: 'subastas-readme',
            partialize: (state) => ({ readmeIds: state.readmeIds }),
        }
    )
);