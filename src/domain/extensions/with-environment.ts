import {getEnv, IStateTreeNode} from 'mobx-state-tree';
import Environment from '@domain/environment';

/**
 * Adds a computed property environment to the node
 */
const withEnvironment = (self: IStateTreeNode) => ({
  views: {
    /**
     * Access the environment property
     *
     * @type {Environment}
     */
    get environment() {
      return getEnv<Environment>(self);
    },
  },
});

export default withEnvironment;
