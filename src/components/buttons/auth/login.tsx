import React from 'react';
import Button, {ButtonProps} from '@components/buttons/button';

const LoginButton: React.FunctionComponent<
  Omit<ButtonProps, 'label'>
> = props => <Button label="Login" {...props} />;

export default LoginButton;
