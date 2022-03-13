import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import SignUpForm from '@components/forms/auth/sign-up';
import {RootStoreProvider} from '@app/context/root-store-context';
import AuthStore from '@domain/stores/auth';
import RootStore from '@domain/stores/root';
import {RegistrationErrorResponse} from '@app/services/auth';

const auth = AuthStore.create();
const root = RootStore.create({
  auth,
});

const SignUpFormWrapper: React.FunctionComponent = () => (
  <RootStoreProvider value={root}>
    <SignUpForm />
  </RootStoreProvider>
);

const renderComponent = () => render(<SignUpFormWrapper />);

describe('SignUpForm', () => {
  it('has email address field', () => {
    const {getByLabelText} = renderComponent();

    expect(getByLabelText('Email Address')).toBeTruthy();
  });

  it('has password field', () => {
    const {getByLabelText} = renderComponent();

    expect(getByLabelText('Password')).toBeTruthy();
  });

  it('has confirm password field', () => {
    const {getByLabelText} = renderComponent();

    expect(getByLabelText('Confirm Password')).toBeTruthy();
  });

  it('has register button', () => {
    const {getByLabelText} = renderComponent();

    expect(getByLabelText('Register')).toBeTruthy();
  });

  it('shows email address field is required', async () => {
    const {getByLabelText, getByText} = renderComponent();

    fireEvent.changeText(getByLabelText('Email Address'), '');
    fireEvent.press(getByLabelText('Register'));

    await waitFor(() => {
      expect(getByText('Email address field is required.')).toBeTruthy();
    });
  });

  it('shows email address field is not a valid format', async () => {
    const {getByLabelText, getByText} = renderComponent();

    fireEvent.changeText(
      getByLabelText('Email Address'),
      'an invalid email address',
    );
    fireEvent.press(getByLabelText('Register'));

    await waitFor(() => {
      expect(getByText('Email address is not a valid format.')).toBeTruthy();
    });
  });

  it('shows password field is required', async () => {
    const {getByLabelText, getByText} = renderComponent();

    fireEvent.changeText(getByLabelText('Password'), '');
    fireEvent.press(getByLabelText('Register'));

    await waitFor(() => {
      expect(getByText('Password field is required.')).toBeTruthy();
    });
  });

  it('shows password field requires to be 8 characters long', async () => {
    const {getByLabelText, getByText} = renderComponent();

    fireEvent.changeText(getByLabelText('Password'), 'passwor');
    fireEvent.press(getByLabelText('Register'));

    await waitFor(() => {
      expect(
        getByText('Password should be atleast 8 characters long.'),
      ).toBeTruthy();
    });
  });

  it('sshows confirm password is required', async () => {
    const {getByLabelText, getByText} = renderComponent();

    fireEvent.changeText(getByLabelText('Confirm Password'), '');
    fireEvent.press(getByLabelText('Register'));

    await waitFor(() => {
      expect(getByText('Confirm password field is required.')).toBeTruthy();
    });
  });

  it('shows passwords should match', async () => {
    const {getByLabelText, getByText} = renderComponent();

    fireEvent.changeText(getByLabelText('Password'), 'my password');
    fireEvent.changeText(getByLabelText('Confirm Password'), 'password');
    fireEvent.press(getByLabelText('Register'));

    await waitFor(() => {
      expect(getByText('Passwords do not match.')).toBeTruthy();
    });
  });

  describe('on error', () => {
    it('displays email address is already used', async () => {
      // stub
      auth.register = jest
        .fn()
        .mockRejectedValueOnce(
          RegistrationErrorResponse.EMAIL_ADDRESS_CONFLICT,
        );

      const {getByLabelText, getByText} = renderComponent();

      // fillup the fields
      fireEvent.changeText(getByLabelText('Email Address'), 'john@example.org');
      fireEvent.changeText(getByLabelText('Password'), 'password1234');
      fireEvent.changeText(getByLabelText('Confirm Password'), 'password1234');

      // click register button
      fireEvent.press(getByLabelText('Register'));

      await waitFor(() => {
        expect(getByText('Email address is already used.')).toBeTruthy();
      });
    });
  });
});

// test cases
// validate inputs
// - email is required
// - email should be valid format
// - password is required
// - passwords should match
// - display error message when registration failed due to (email conflict, missing required fields)
