import Environment from '@domain/environment';
import AuthStore from '@app/domain/stores/auth';
import AuthService from '@services/auth';

describe('AuthStore', () => {
  it('creates store instance', () => {
    const store = AuthStore.create({
      token: 'a sample token',
    });

    expect(store.token).toEqual('a sample token');
  });

  describe('authenticate', () => {
    it('assigns user and token', async () => {
      // stub
      jest
        .spyOn(AuthService.prototype, 'authenticate')
        .mockImplementationOnce(() =>
          Promise.resolve({
            user: {
              id: '1',
              name: 'John Doe',
              email: 'john@example.org',
            },
            token: 'a sample token',
          }),
        );

      const store = AuthStore.create({}, new Environment());

      await store.authenticate({
        email: 'john@example.org',
        password: 'password1234',
      });

      expect(store.token).toEqual('a sample token');
    });
  });

  describe('register', () => {
    it('assigns user and token', async () => {
      // stub
      jest.spyOn(AuthService.prototype, 'register').mockImplementationOnce(() =>
        Promise.resolve({
          user: {
            id: '1',
            name: 'John Doe',
            email: 'john@example.org',
          },
          token: 'a sample token',
        }),
      );

      const store = AuthStore.create({}, new Environment());

      await store.register({
        email: 'john@example.org',
        password: 'password1234',
      });

      expect(store.token).toEqual('a sample token');
    });
  });
});
