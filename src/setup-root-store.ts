import RootStoreModel, {RootStore as IRootStore} from '@domain/stores/root';
import {createEnvironment} from '@domain/environment';

/**
 * Setups the root store instance
 *
 * @returns {Promise<IRootStore>}
 */
const setupRootStore = async (): Promise<IRootStore> => {
  let rootStore: IRootStore, data: any;

  rootStore = RootStoreModel.create(data, await createEnvironment());

  return rootStore;
};

export default setupRootStore;
