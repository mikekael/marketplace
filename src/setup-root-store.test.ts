import setupRootStore from '@app/setup-root-store';

describe('setupRootStore', () => {
  it('creates root store', async () => {
    const store = await setupRootStore();

    expect(store).toBeTruthy();
  });
});
