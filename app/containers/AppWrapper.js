import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {RefreshControl, StyleSheet} from 'react-native';
import * as PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Icon, Text} from 'react-native-elements';
import {LinearGradient} from 'expo-linear-gradient';
import i18n from 'i18n-js';
import {useDerbyTheme} from '../utils/theme';
import {resendVerificationEmail} from '../actions/auth';
import {useRoute} from '@react-navigation/core';
import ActionButton from 'react-native-action-button';
import {useGetSelectedGroup} from '../hooks/useGetSelectedGroup';

const AppWrapper = ({refreshing, onRefresh, navigation, children}) => {
  const route = useRoute();
  useGetSelectedGroup(route);
  const {user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showFab, setShowFab] = useState(false);
  const {dark, sizes, colors} = useDerbyTheme();

  const linearGradientStyles = [
    styles.linearGradient,
    {
      marginHorizontal: sizes.BASE - 4,
      paddingHorizontal: sizes.BASE,
      paddingVertical: sizes.BASE,
    },
  ];
  const resendButtonStyles = [
    styles.resendButtonStyle,
    {
      paddingVertical: sizes.BASE / 6,
      paddingHorizontal: sizes.BASE / 2,
    },
  ];
  const resendButtonContainerStyles = [
    styles.resendButtonContainerStyle,
    {
      marginRight: sizes.BASE / 2,
      marginTop: sizes.BASE / 2,
    },
  ];
  const resendButtonTitleStyles = [
    styles.resendButtonTitleStyle,
    {
      fontSize: sizes.BASE - 4,
      fontFamily: 'Rubik_400Regular',
      color: dark ? '#fff' : colors.backgroundCard,
    },
  ];

  useEffect(() => {
    if (
      [
        'password',
        'profile',
        'update-profile-picture',
        'invites',
        'player',
        'match',
        'match-add',
        'match-edit',
        'match-teams',
        'match-score',
        'player-settings',
      ].includes(route.name)
    ) {
      setShowFab(true);
    }
  }, []);

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={[
          styles.container,
          {backgroundColor: colors.backgroundScreen},
        ]}
        refreshControl={
          onRefresh && (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          )
        }>
        {!user.emailVerified && (
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={linearGradientStyles}
            colors={['#eca43d', '#eea840', '#F9A620']}>
            <Text h5 style={styles.notVerifiedStyle}>
              {i18n.t('general_email_not_verified_1')}
              {i18n.t('general_email_not_verified_2')}
            </Text>
            <Button
              containerStyle={resendButtonContainerStyles}
              titleStyle={resendButtonTitleStyles}
              buttonStyle={resendButtonStyles}
              onPress={() => dispatch(resendVerificationEmail())}
              title={i18n.t('general_email_not_button_resend')}
            />
          </LinearGradient>
        )}
        {children}
        {showFab && (
          <ActionButton
            buttonColor={colors.primary}
            hideShadow
            renderIcon={() => (
              <Icon color={colors.white} type="feather" name="home" size={25} />
            )}
            onPress={() => {
              navigation.navigate('home');
            }}
          />
        )}
      </ScrollView>
    </>
  );
};

AppWrapper.propTypes = {
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
  children: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  linearGradient: {
    flexDirection: 'column',
    borderRadius: 5,
    margin: 5,
    alignItems: 'flex-start',
  },
  resendButtonStyle: {
    borderRadius: 5,
    borderWidth: 1,
  },
  resendButtonTitleStyle: {},
  resendButtonContainerStyle: {
    marginLeft: 0,
    display: 'flex',
  },
  notVerifiedStyle: {
    color: '#fff',
    fontWeight: '400',
    fontFamily: 'Rubik_400Regular',
  },
});

export default AppWrapper;
