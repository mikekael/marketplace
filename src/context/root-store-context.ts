import type {RootStore} from '@domain/stores/root';
import {createContext, useContext} from 'react';

const RootStoreContext = createContext<RootStore>({} as RootStore);

export const RootStoreProvider = RootStoreContext.Provider;

export const useStores = () => useContext(RootStoreContext);
