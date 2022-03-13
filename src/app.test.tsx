import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import App from '@app/app';

describe('App', () => {
  it('rendered correctly', async () => {
    const {getByTestId} = render(<App />);

    await waitFor(() => {
      expect(getByTestId('app')).toBeTruthy();
    });
  });
});
