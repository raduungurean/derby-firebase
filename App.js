import * as React from 'react';
import {Provider} from 'react-redux';
import store from './app/reducers';
import MyDropDownAlert from './app/containers/MyDropDownAlert';
import NavContainer from './app/navigation/NavContainer';
import {isMountedRef} from './app/navigation/RootNavigation';
import {onAuthUserListener} from './app/services/firebase-utils';
import {loggedIn, loggedOut, restoringToken} from './app/actions/auth';
import i18n from 'i18n-js';
import './app/utils/translations';
import * as Localization from 'expo-localization';
import {
  useFonts,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_300Light,
} from '@expo-google-fonts/rubik';
import SpinLoader from './app/components/SpinLoader';
import {useEffect} from 'react';
import {MenuProvider} from 'react-native-popup-menu';

function App() {
  useEffect(() => {
    i18n.locale = Localization.locale;
    i18n.fallbacks = true;
    console.disableYellowBox = true;
    return () => (isMountedRef.current = false);
  }, []);

  useEffect(async () => {
    await store.dispatch(restoringToken());
    const listen = onAuthUserListener(
      async (authUser) => {
        store.dispatch(
          loggedIn({
            ...authUser,
          }),
        );
      },
      () => {
        store.dispatch(loggedOut());
      },
    );
    return () => listen();
  }, []);

  let [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_300Light,
  });

  if (!fontsLoaded) {
    return <SpinLoader />;
  }

  return (
    <Provider store={store}>
      <MenuProvider>
        <NavContainer
          onReady={() => {
            isMountedRef.current = true;
          }}
        />
        <MyDropDownAlert />
      </MenuProvider>
    </Provider>
  );
}

export default App;
