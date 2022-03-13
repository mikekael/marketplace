import React, {useState} from 'react';
import {Text} from 'react-native-elements';
import {Controller, useForm} from 'react-hook-form';
import TextInput from '@components/forms/inputs/text';
import SecureTextInput from '@components/forms/inputs/secure-text';
import LoginButton from '@components/buttons/auth/login';
import {yupResolver} from '@hookform/resolvers/yup';
import {InferType, object, string} from 'yup';
import {useStores} from '@app/context/root-store-context';
import {AuthenticationErrorCode} from '@services/auth';

const schema = object({
  email: string()
    .required('Email address field is required')
    .email('Provided email address is not a valid format'),
  password: string().required('Password field is required'),
});

type SignInFormData = InferType<typeof schema>;

const SignInForm: React.FunctionComponent = () => {
  const [signInError, setSignInError] = useState<string>();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const {auth} = useStores();

  const {control, handleSubmit, formState} = useForm<SignInFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsProcessing(true);

    try {
      await auth.authenticate({
        email: data.email,
        password: data.password,
      });
    } catch (err: any) {
      const {code} = err;

      if (code === AuthenticationErrorCode.INVALID_CREDENTIALS) {
        setSignInError('Invalid email address/passsword provided.');
      } else if (code === AuthenticationErrorCode.USER_DISABLED) {
        setSignInError('Your account is disabled.');
      } else {
        setSignInError('An error occurred. Please try again later.');
      }
    }

    setIsProcessing(false);
  };

  return (
    <>
      {signInError && <Text testID="signin:error">{signInError}</Text>}
      <Controller
        name="email"
        control={control}
        render={({field}) => (
          <TextInput
            label="Email Address"
            testID="signin:email"
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
            testID="signin:password"
            onChange={field.onChange}
            value={field.value}
            error={formState.errors?.password?.message}
          />
        )}
      />
      <LoginButton
        isProcessing={isProcessing}
        testID="signin:login"
        onPress={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default SignInForm;
