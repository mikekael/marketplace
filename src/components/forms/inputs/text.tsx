import React from 'react';
import {Input as RNativeInput} from 'react-native-elements';
import style from '@styles/input';

export type TextInputProps = {
  label: string;
  onChange?: (text: string) => void;
  testID?: string;
  isSecure?: boolean;
  value?: string;
  error?: string;
};

const TextInput: React.FunctionComponent<TextInputProps> = props => (
  <RNativeInput
    onChangeText={props.onChange}
    value={props.value}
    autoCompleteType
    label={props.label}
    accessibilityLabel={props.label}
    placeholder={props.label}
    secureTextEntry={props.isSecure || false}
    errorMessage={props.error}
    errorStyle={style.error}
    testID={props.testID}
  />
);

export default TextInput;
