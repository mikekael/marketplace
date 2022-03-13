import React from 'react';
import TextInput, {TextInputProps} from '@components/forms/inputs/text';

type SecureTextInputProps = Omit<TextInputProps, 'isSecure'>;

const SecureTextInput: React.FunctionComponent<
  SecureTextInputProps
> = props => <TextInput {...props} isSecure />;

export default SecureTextInput;
