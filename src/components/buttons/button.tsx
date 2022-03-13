import React from 'react';
import {Button as RNButton} from 'react-native-elements/dist/buttons/Button';

export type ButtonProps = {
  label: string;
  onPress: () => void;
  isProcessing?: boolean;
  disabled?: boolean;
  testID?: string;
};

const Button: React.FunctionComponent<ButtonProps> = props => (
  <RNButton
    accessibilityRole="button"
    accessibilityLabel={props.label}
    title={props.label}
    onPress={props.onPress}
    loading={props.isProcessing}
    loadingProps={{accessibilityRole: 'progressbar'}}
    disabled={props.isProcessing || props.disabled}
    testID={props.testID}
  />
);

export default Button;
