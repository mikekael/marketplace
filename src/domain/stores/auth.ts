import {types, flow} from 'mobx-state-tree';
import {Credentials} from '@services/auth';
import withEnvironment from '@domain/extensions/with-environment';
import User from '@domain/models/user';

const AuthStore = types
  .model('AuthStore', {
    token: types.maybeNull(types.string),
    user: types.maybeNull(User),
  })
  .extend(withEnvironment)
  .actions(self => ({
    /**
     * Authenticate using the credentials
     *
     * @param {Credentials} credentials
     *
     * @returns {Promise<void>}
     *
     * @error {AuthenticationError}
     */
    authenticate: flow(function* (credentials: Credentials) {
      const {token, user} = yield self.environment.auth.authenticate(
        credentials,
      );

      self.token = token;
      self.user = User.create({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    }),
    /**
     * Register a new user
     *
     * @param {Credentials} credentials
     *
     * @returns {Promise<void>}
     */
    register: flow(function* (credentials: Credentials) {
      const {token, user} = yield self.environment.auth.register(credentials);

      self.token = token;
      self.user = User.create({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    }),
  }));

export default AuthStore;
