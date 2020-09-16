import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {navigate, navigationRef} from './RootNavigation';
import MyAppStack from './AppStack';
import {useDispatch, useSelector} from 'react-redux';
import SpinLoader from '../components/SpinLoader';
import {linking} from './useLinking';
import themes from '../utils/theme.tsx';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import {useWatchLoggedInUser} from '../hooks/useWatchLoggedInUser';
import {StatusBar} from 'expo-status-bar';
import {
  useResendVerificationEmailAlerts,
  useSubscribeAlerts,
  useUnsubscribeAlerts,
} from '../hooks/useDropDownAlerts';
import ModalSelector from '../components/groups/ModalSelector';
import {setSelectedGroupGlobally, toggleGroupSelector} from '../actions/layout';
import {AsyncStorage, Platform} from 'react-native';
import PushNotifications from '../containers/push/PushNotifications';

export default function NavContainer(props) {
  const {isLoading, user} = useSelector((state) => state.auth);
  const {theme, groupSelector, selectedGroup} = useSelector(
    (state) => state.layout,
  );
  const dispatch = useDispatch();
  const scheme = useColorScheme();
  const [selectedTheme, setSelectedTheme] = useState(null);

  useEffect(() => {
    if (theme === 3) {
      if (scheme === 'dark') {
        setSelectedTheme(1);
      } else {
        setSelectedTheme(0);
      }
    } else {
      setSelectedTheme(theme);
    }
  }, [scheme, theme]);

  useWatchLoggedInUser();
  useResendVerificationEmailAlerts();

  // I moved these in the main component because
  // it was triggering many times in their own components
  // (match and match list)
  useSubscribeAlerts();
  useUnsubscribeAlerts();

  if (isLoading || selectedTheme === null) {
    return <SpinLoader />;
  }

  return (
    <AppearanceProvider>
      <StatusBar style={selectedTheme === 1 ? 'light' : 'dark'} />
      <NavigationContainer
        ref={navigationRef}
        theme={themes[selectedTheme]}
        linking={linking}
        onReady={() => props.onReady()}>
        <MyAppStack />
        {user !== undefined && user !== null && Platform.OS !== 'web' && (
          <PushNotifications />
        )}
        {groupSelector && (
          <ModalSelector
            groups={user.groupData}
            onModalClose={() => dispatch(toggleGroupSelector())}
            visible={groupSelector}
            selectedGroup={selectedGroup}
            onChange={async (option) => {
              let currentRoute = null;
              if (navigationRef.current) {
                currentRoute = navigationRef.current.getCurrentRoute().name;
              }
              if (option.value !== undefined) {
                // WEB
                if (option.value !== 0) {
                  await AsyncStorage.setItem('@selected_group', option.value);
                  await dispatch(setSelectedGroupGlobally(option.value));
                  await navigate(currentRoute, {g: option.value});
                } else {
                  await AsyncStorage.removeItem('@selected_group');
                  await dispatch(setSelectedGroupGlobally(null));
                  await navigate(currentRoute, {g: null});
                }
                await dispatch(toggleGroupSelector());
              } else {
                // NATIVE
                if (option.key !== 0) {
                  await AsyncStorage.setItem('@selected_group', option.key);
                  await dispatch(setSelectedGroupGlobally(option.key));
                  await navigate(currentRoute, {g: option.key});
                } else {
                  await AsyncStorage.removeItem('@selected_group');
                  await dispatch(setSelectedGroupGlobally(null));
                  await navigate(currentRoute, {g: null});
                }
              }
            }}
          />
        )}
      </NavigationContainer>
    </AppearanceProvider>
  );
}
