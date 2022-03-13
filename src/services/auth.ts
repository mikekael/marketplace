import {UniqueIdentity} from '@domain/domain.types';
import auth from '@app/wrappers/firebase/auth';

export type Credentials = {
  /**
   * Email address of the user
   *
   * @type {string}
   * @readonly
   */
  readonly email: string;
  /**
   * Password of the user
   *
   * @type {string}
   * @readonly
   */
  readonly password: string;
};

export type User = {
  /**
   * Current user unique identity
   *
   * @type {UniqueIdentity}
   * @readonly
   */
  readonly id: UniqueIdentity;
  /**
   * Current user full name
   *
   * @type {string}
   * @readonly
   */
  readonly name: string;
  /**
   * Current user unique email address
   *
   * @type {string}
   * @readonly
   */
  readonly email: string;
};

type AuthResult = {
  /**
   * Current authenticated user data
   *
   * @type {User}
   */
  user: User;
  /**
   * Current authentication token
   *
   * @type {string}
   */
  token: string;
};

export class AuthenticationError {
  /**
   * Create instance of the authentication error
   *
   * @param code AuthenticationErrorCode
   */
  constructor(readonly code: AuthenticationErrorCode) {}
}

export enum AuthenticationErrorCode {
  /**
   * Error to be thrown when user has invalid credentials provided
   *
   * @type {number}
   */
  INVALID_CREDENTIALS = 1,
  /**
   * Error to be throw when user was disabled
   *
   * @type {number}
   */
  USER_DISABLED = 2,
}

export enum RegistrationErrorResponse {
  /**
   * Error to be throw when email address is already exists
   *
   * @type {number}
   */
  EMAIL_ADDRESS_CONFLICT = 3,

  /**
   * Error to be thrown when email address format is invalid
   *
   * @type {number}
   */
  EMAIL_ADDRESS_INVALID = 4,
}

class AuthService {
  /**
   * Authenticate user based on credentials provided
   *
   * @param {Credentials} credentials
   *
   * @returns {Promise<AuthResult>}
   *
   * @error AuthenticationError
   */
  async authenticate(credentials: Credentials): Promise<AuthResult> {
    const {email, password} = credentials;

    try {
      return await auth
        .signInWithEmailAndPassword(email, password)
        .then(({user}) => user.getIdToken())
        .then(async token => ({
          user: await this.whoAmI(),
          token,
        }));
    } catch (err: any) {
      const {code} = err;

      if (
        code === 'auth/invalid-email' ||
        code === 'auth/user-not-found' ||
        code === 'auth/wrong-password'
      ) {
        throw new AuthenticationError(
          AuthenticationErrorCode.INVALID_CREDENTIALS,
        );
      } else if (code === 'auth/user-disabled') {
        throw new AuthenticationError(AuthenticationErrorCode.USER_DISABLED);
      }

      // if we cant recognized the code then we just rethrow it a possibility that
      // this is another error on our end (must not happened)
      throw err;
    }
  }

  /**
   * Register a new user
   *
   * @param  {Credentials} credentials
   *
   * @returns {Promise<AuthResult>}
   *
   * @error RegistrationErrorResponse.EMAIL_ADDRESS_CONFLICT
   * @error RegistrationErrorResponse.EMAIL_ADDRESS_INVALID
   */
  async register(credentials: Credentials): Promise<AuthResult> {
    const {email, password} = credentials;

    try {
      return await auth
        .createUserWithEmailAndPassword(email, password)
        .then(({user}) => user.getIdToken())
        .then(async token => ({
          user: await this.whoAmI(),
          token,
        }));
    } catch (err: any) {
      const {code} = err;

      if (code === 'auth/email-already-in-use') {
        throw RegistrationErrorResponse.EMAIL_ADDRESS_CONFLICT;
      } else if (code === 'auth/invalid-email') {
        throw RegistrationErrorResponse.EMAIL_ADDRESS_INVALID;
      }

      // if we cant recognized the code then we just rethrow it a possibility that
      // this is another error on our end (must not happened)
      throw err;
    }
  }

  /**
   * @todo
   */
  protected async whoAmI(): Promise<User> {
    return {
      id: '1',
      name: 'John Doe',
      email: 'john@example.org',
    };
  }
}

export default AuthService;
