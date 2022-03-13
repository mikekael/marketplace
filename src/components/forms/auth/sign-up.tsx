import React, {useState} from 'react';
import TextInput from '@components/forms/inputs/text';
import SecureTextInput from '@components/forms/inputs/secure-text';
import RegisterButton from '@components/buttons/auth/register';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useStores} from '@app/context/root-store-context';
import {RegistrationErrorResponse} from '@app/services/auth';
import {Text} from 'react-native-elements';

type SignUpFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object({
  email: yup
    .string()
    .required('Email address field is required.')
    .email('Email address is not a valid format.'),
  password: yup
    .string()
    .required('Password field is required.')
    .min(8, 'Password should be atleast 8 characters long.'),
  confirmPassword: yup
    .string()
    .required('Confirm password field is required.')
    .test({
      name: 'password-match',
      test: (value, ctx) => ctx.parent.password === value,
      message: 'Passwords do not match.',
    }),
});

const SignUpForm: React.FunctionComponent = () => {
  const {control, handleSubmit, formState} = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
  });
  const [signUpError, setSignUpError] = useState<string>();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const {auth} = useStores();

  const onSubmit = async (data: SignUpFormData) => {
    setIsProcessing(true);

    try {
      await auth.register({
        email: data.email,
        password: data.password,
      });
    } catch (err: any) {
      if (err === RegistrationErrorResponse.EMAIL_ADDRESS_CONFLICT) {
        setSignUpError('Email address is already used.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {signUpError && <Text accessibilityRole="text">{signUpError}</Text>}
      <Controller
        name="email"
        control={control}
        render={({field}) => (
          <TextInput
            label="Email Address"
            testID="signup:email"
            onChange={field.onChange}
            value={field.value}
            error={formState.errors?.email?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({field}) => (
          <SecureTextInput
            label="Password"
            testID="signup:password"
            onChange={field.onChange}
            value={field.value}
            error={formState.errors?.password?.message}
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({field}) => (
          <SecureTextInput
            label="Confirm Password"
            testID="signup:confirm_password"
            onChange={field.onChange}
            value={field.value}
            error={formState.errors?.confirmPassword?.message}
          />
        )}
      />
      <RegisterButton
        onPress={handleSubmit(onSubmit)}
        testID="signup:register"
        isProcessing={isProcessing}
      />
    </>
  );
};

export default SignUpForm;
