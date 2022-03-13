import React from 'react';
import {render} from '@testing-library/react-native';
import RegisterButton from './register';

describe('RegisterButton', () => {
  it('has register text', () => {
    const {getByRole} = render(<RegisterButton onPress={jest.fn()} />);

    expect(getByRole('button')).toHaveTextContent('Register');
  });
});
