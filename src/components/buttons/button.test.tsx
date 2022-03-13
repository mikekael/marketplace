import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Button from '@components/buttons/button';

describe('button component', () => {
  it('should have a title', () => {
    const {getByText} = render(<Button onPress={() => {}} label="My button" />);

    expect(getByText('My button')).toBeTruthy();
  });

  it('should be disabled', () => {
    const {getByText} = render(
      <Button onPress={() => {}} label="My button" disabled={true} />,
    );

    expect(getByText('My button')).toBeDisabled();
  });

  it('should be processing', () => {
    const {getByRole} = render(
      <Button onPress={() => {}} label="My button" isProcessing={true} />,
    );

    expect(getByRole('progressbar')).toBeTruthy();
  });

  it('should trigger function on press', () => {
    const fn = jest.fn();
    const {getByText} = render(
      <Button onPress={() => fn()} label="My button" />,
    );

    fireEvent.press(getByText('My button'));

    expect(fn).toHaveBeenCalled();
  });
});
