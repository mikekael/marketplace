import '@testing-library/jest-native/extend-expect';

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('@react-native-firebase/auth', () => () => ({
  signInWithEmailAndPassword: jest.fn().mockResolvedValue(),
}));
