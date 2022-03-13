import auth from '@app/wrappers/firebase/auth';
import fakeUser from '@app/wrappers/firebase/__fixtures__/user';
import AuthService, {AuthenticationErrorCode, RegistrationErrorResponse} from '@services/auth';

jest.mock('@app/wrappers/firebase/auth');

const firebase = jest.mocked(auth);
const createService = () => new AuthService();

describe('AuthService', () => {
  describe('authenticate', () => {
    it('resolves user and the token', async () => {
      // stub
      firebase.signInWithEmailAndPassword.mockResolvedValueOnce({
        user: fakeUser,
      });

      const service = createService();

      await expect(
        service.authenticate({
          email: 'john@example.org',
          password: 'password1234',
        }),
      ).resolves.toEqual({
        token: 'my token',
        user: {
          id: '1',
          name: 'John Doe',
          email: 'john@example.org',
        },
      });
    });

    it('throws invalid credentials for invalid email value', async () => {
      firebase.signInWithEmailAndPassword.mockRejectedValue({
        code: 'auth/invalid-email',
      });

      const service = createService();

      await expect(
        service.authenticate({
          email: 'john@example.org',
          password: 'password1234',
        }),
      ).rejects.toEqual({
        code: AuthenticationErrorCode.INVALID_CREDENTIALS,
      });
    });

    it('throws invalid credentials for user not found', async () => {
      firebase.signInWithEmailAndPassword.mockRejectedValue({
        code: 'auth/user-not-found',
      });

      const service = createService();

      await expect(
        service.authenticate({
          email: 'john@example.org',
          password: 'password1234',
        }),
      ).rejects.toEqual({
        code: AuthenticationErrorCode.INVALID_CREDENTIALS,
      });
    });

    it('throws invalid credentials for wrong password', async () => {
      firebase.signInWithEmailAndPassword.mockRejectedValue({
        code: 'auth/wrong-password',
      });

      const service = createService();

      await expect(
        service.authenticate({
          email: 'john@example.org',
          password: 'password1234',
        }),
      ).rejects.toEqual({
        code: AuthenticationErrorCode.INVALID_CREDENTIALS,
      });
    });

    it('throws user disabled', async () => {
      firebase.signInWithEmailAndPassword.mockRejectedValue({
        code: 'auth/user-disabled',
      });

      const service = createService();

      await expect(
        service.authenticate({
          email: 'john@example.org',
          password: 'password1234',
        }),
      ).rejects.toEqual({
        code: AuthenticationErrorCode.USER_DISABLED,
      });
    });
  });

  describe('register', () => {
    it('resolves user and the token', async () => {
      // stub
      firebase.createUserWithEmailAndPassword.mockResolvedValueOnce({
        user: fakeUser,
      });

      const service = createService();

      await expect(
        service.register({
          email: 'john@example.org',
          password: 'password1234',
        }),
      ).resolves.toEqual({
        token: 'my token',
        user: {
          id: '1',
          name: 'John Doe',
          email: 'john@example.org',
        },
      });
    });

    it('throws error code email address conflict', async () => {
      // stub
      firebase.createUserWithEmailAndPassword.mockRejectedValueOnce({
        code: 'auth/email-already-in-use',
      });

      const service = createService();

      await expect(
        service.register({
          email: 'john@example.org',
          password: 'password1234',
        }),
      ).rejects.toEqual(RegistrationErrorResponse.EMAIL_ADDRESS_CONFLICT);
    });

    it('throws error code email address is invalid', async () => {
      // stub
      firebase.createUserWithEmailAndPassword.mockRejectedValueOnce({
        code: 'auth/invalid-email',
      });

      const service = createService();

      await expect(
        service.register({
          email: 'john@example.org',
          password: 'password1234',
        }),
      ).rejects.toEqual(RegistrationErrorResponse.EMAIL_ADDRESS_INVALID);
    });

    it('thrpws unknown error', async () => {
      // stub
      firebase.createUserWithEmailAndPassword.mockRejectedValueOnce(
        'an error occurred',
      );

      const service = createService();

      await expect(
        service.register({
          email: 'john@example.org',
          password: 'password1234',
        }),
      ).rejects.toEqual('an error occurred');
    });
  });
});
