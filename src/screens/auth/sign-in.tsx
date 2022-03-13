import React from 'react';
import {KeyboardAvoidingView} from 'react-native';
import Heading from '@components/text/heading';
import SignInForm from '@components/forms/auth/sign-in';

const SignInScreen = () => {
  return (
    <KeyboardAvoidingView>
      <Heading testID="signin:heading">Marketplace</Heading>
      <SignInForm />
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
