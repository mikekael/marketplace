import {FirebaseAuthTypes} from '@react-native-firebase/auth';

const fakeUser: FirebaseAuthTypes.User = {
  displayName: 'John Doe',
  email: 'john@example.org',
  emailVerified: true,
  isAnonymous: false,
  metadata: {},
  phoneNumber: '09221711247',
  photoURL: null,
  providerData: [],
  providerId: 'email',
  uid: '91d418b1-890f-4477-9186-481cb379a982',
  delete: jest.fn(),
  getIdToken: jest.fn().mockResolvedValue('my token'),
  getIdTokenResult: jest.fn(),
  linkWithCredential: jest.fn(),
  reauthenticateWithCredential: jest.fn(),
  reload: jest.fn(),
  sendEmailVerification: jest.fn(),
  verifyBeforeUpdateEmail: jest.fn(),
  toJSON: jest.fn(),
  unlink: jest.fn(),
  updateEmail: jest.fn(),
  updatePassword: jest.fn(),
  updatePhoneNumber: jest.fn(),
  updateProfile: jest.fn(),
};

export default fakeUser;
