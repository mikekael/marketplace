import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import SignIn from '@screens/auth/sign-in';
import {RootStore} from '@domain/stores/root';
import setupRootStore from '@app/setup-root-store';
import {RootStoreProvider} from './context/root-store-context';

const App: React.FunctionComponent = () => {
  const [rootStore, setRootStore] = useState<RootStore>();

  useEffect(() => {
    (() => {
      setupRootStore().then(setRootStore);
    })();
  }, []);

  // replace me with loader or something while waiting for our rootstore to get done
  if (!rootStore) {
    return null;
  }

  return (
    <SafeAreaView testID="app" accessible>
      <RootStoreProvider value={rootStore}>
        <SignIn />
      </RootStoreProvider>
    </SafeAreaView>
  );
};

export default App;
