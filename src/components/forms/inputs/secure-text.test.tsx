import React from 'react';
import SecureTextInput from '@components/forms/inputs/secure-text';
import {render} from '@testing-library/react-native';

describe('SecureTextInput', () => {
  it('should be secured', () => {
    const {getByLabelText} = render(
      <SecureTextInput label="Password" testID="my_secure_input" />,
    );

    expect(getByLabelText('Password')).toHaveProp('secureTextEntry', true);
  });
});
