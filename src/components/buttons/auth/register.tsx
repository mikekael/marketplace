import React from 'react';
import Button, {ButtonProps} from '@components/buttons/button';

const RegisterButton: React.FunctionComponent<
  Omit<ButtonProps, 'label'>
> = props => <Button label="Register" {...props} />;

export default RegisterButton;
