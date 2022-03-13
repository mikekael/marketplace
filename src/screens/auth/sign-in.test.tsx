import React from 'react';
import SignInScreen from '@screens/auth/sign-in';
import {render} from '@testing-library/react-native';

describe('SignInScreen', () => {
  it('has a Marketplace heading text', () => {
    const {getByText} = render(<SignInScreen />);

    expect(getByText('Marketplace')).toBeTruthy();
  });
});
