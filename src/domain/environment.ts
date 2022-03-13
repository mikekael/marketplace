import AuthService from '@services/auth';
import ApiService from '@services/api';

class Environment {
  /**
   * @type {ApiService}
   *
   * @readonly
   */
  readonly api: ApiService;

  /**
   * @type {AuthService}
   *
   * @readonly
   */
  readonly auth: AuthService;

  /**
   * Create instance of the environment where shared dependencies are used between models
   * using the dependency injection
   */
  constructor() {
    this.api = new ApiService({
      baseURL: 'http://localhost', // load me somewhere perhaps?
    });

    this.auth = new AuthService();
  }
}

/**
 * Create instance of the environment
 *
 * @returns {Promise<Environment>}
 */
export const createEnvironment = async () => {
  const env = new Environment();
  return env;
};

export default Environment;
