import auth from '@react-native-firebase/auth';

/**
 * Wraps auth().signInWithEmailAndPassword
 */
const signInWithEmailAndPassword = (email: string, password: string) =>
  auth().signInWithEmailAndPassword(email, password);

/**
 * Wraps auth().createUserWithEmailAndPassword
 */
const createUserWithEmailAndPassword = (email: string, password: string) =>
  auth().createUserWithEmailAndPassword(email, password);

export default {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
};
