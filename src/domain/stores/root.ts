import {Instance, types} from 'mobx-state-tree';
import Auth from './auth';

const RootStoreModel = types.model('RootStore', {
  auth: types.optional(Auth, {}),
});

export type RootStore = Instance<typeof RootStoreModel>;

export default RootStoreModel;
