import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import SignInForm from '@components/forms/auth/sign-in';
import {RootStoreProvider} from '@app/context/root-store-context';
import RootStore from '@domain/stores/root';
import AuthStore from '@domain/stores/auth';
import {AuthenticationErrorCode} from '@services/auth';

const auth = AuthStore.create();
const rootStore = RootStore.create({
  auth,
});
const SignInFormWrapper: React.FunctionComponent = () => (
  <RootStoreProvider value={rootStore}>
    <SignInForm />
  </RootStoreProvider>
);

describe('SignInForm', () => {
  it('has email address field', () => {
    const {getByLabelText} = render(<SignInFormWrapper />);

    expect(getByLabelText('Email Address')).toBeTruthy();
  });

  it('has password field', () => {
    const {getByLabelText} = render(<SignInFormWrapper />);

    expect(getByLabelText('Password')).toBeTruthy();
  });

  it('has login button', () => {
    const {getByLabelText} = render(<SignInFormWrapper />);

    expect(getByLabelText('Login')).toBeTruthy();
  });

  it('should show error password and email address is required', async () => {
    const {getByLabelText, getByText} = render(<SignInFormWrapper />);

    fireEvent.press(getByLabelText('Login'));

    await waitFor(() => {
      expect(getByText('Email address field is required')).toBeTruthy();
      expect(getByText('Password field is required')).toBeTruthy();
    });
  });

  it('should show error email address is not valid format', async () => {
    const {getByLabelText, getByText} = render(<SignInFormWrapper />);

    fireEvent.changeText(getByLabelText('Email Address'), 'johndoe');
    fireEvent.press(getByLabelText('Login'));

    await waitFor(() => {
      expect(
        getByText('Provided email address is not a valid format'),
      ).toBeTruthy();
    });
  });

  it('should show sign in error message invalid user credentials', async () => {
    // stub
    auth.authenticate = jest.fn().mockRejectedValueOnce({
      code: AuthenticationErrorCode.INVALID_CREDENTIALS,
    });

    const {getByLabelText, getByText} = render(<SignInFormWrapper />);

    fireEvent.changeText(getByLabelText('Email Address'), 'john@example.org');
    fireEvent.changeText(getByLabelText('Password'), 'myPassword1234');
    fireEvent.press(getByLabelText('Login'));

    await waitFor(() => {
      expect(
        getByText('Invalid email address/passsword provided.'),
      ).toBeTruthy();
    });
  });

  it('should show sign in error user is disabled', async () => {
    // stub
    auth.authenticate = jest.fn().mockRejectedValueOnce({
      code: AuthenticationErrorCode.USER_DISABLED,
    });

    const {getByLabelText, getByText} = render(<SignInFormWrapper />);

    fireEvent.changeText(getByLabelText('Email Address'), 'john@example.org');
    fireEvent.changeText(getByLabelText('Password'), 'myPassword1234');
    fireEvent.press(getByLabelText('Login'));

    await waitFor(() => {
      expect(getByText('Your account is disabled.')).toBeTruthy();
    });
  });

  it('should show sign in error an error occurred', async () => {
    // stub
    auth.authenticate = jest.fn().mockRejectedValueOnce('an error occurred');

    const {getByLabelText, getByText} = render(<SignInFormWrapper />);

    fireEvent.changeText(getByLabelText('Email Address'), 'john@example.org');
    fireEvent.changeText(getByLabelText('Password'), 'myPassword1234');
    fireEvent.press(getByLabelText('Login'));

    await waitFor(() => {
      expect(
        getByText('An error occurred. Please try again later.'),
      ).toBeTruthy();
    });
  });
});
