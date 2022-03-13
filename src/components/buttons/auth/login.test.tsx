import React from 'react';
import {render} from '@testing-library/react-native';
import LoginButton from '@components/buttons/auth/login';

describe('login button', () => {
  it('has login label', () => {
    const {getByRole} = render(<LoginButton onPress={() => {}} />);

    expect(getByRole('button')).toHaveTextContent('Login');
  });
});
