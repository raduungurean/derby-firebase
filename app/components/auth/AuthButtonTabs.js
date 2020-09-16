import React from 'react';
import {Button} from 'react-native-elements';
import * as PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import i18n from 'i18n-js';
import {useDerbyTheme} from '../../utils/theme';

export default function AuthButtonTabs(props) {
  const {sizes} = useDerbyTheme();

  let fs = 1;
  if (props.width < 250) {
    fs = 0.7;
  }
  if (props.width >= 250 && props.width < 350) {
    fs = 0.8;
  }

  return (
    <>
      <Button
        type="clear"
        activeOpacity={0.7}
        onPress={props.onLoginPress}
        containerStyle={{flex: 1}}
        titleStyle={[
          styles.categoryText,
          props.loginPage && styles.selectedCategoryText,
          {
            fontSize: sizes.BASE * fs,
            paddingVertical: sizes.BASE * fs,
            paddingHorizontal: sizes.BASE * fs,
          },
        ]}
        title={i18n.t('auth_sign_in_tab')}
      />
      <Button
        type="clear"
        activeOpacity={0.7}
        onPress={props.onSignupPress}
        containerStyle={{flex: 1}}
        titleStyle={[
          styles.categoryText,
          props.signUpPage && styles.selectedCategoryText,
          {
            fontSize: sizes.BASE * fs,
            paddingVertical: sizes.BASE * fs,
            paddingHorizontal: sizes.BASE * fs,
          },
        ]}
        title={i18n.t('auth_sign_up_tab')}
      />
    </>
  );
}

AuthButtonTabs.propTypes = {
  onLoginPress: PropTypes.func,
  loginPage: PropTypes.bool,
  onSignupPress: PropTypes.func,
  signUpPage: PropTypes.bool,
};

const styles = StyleSheet.create({
  categoryText: {
    textAlign: 'center',
    color: '#fff',
    lineHeight: 35,
    backgroundColor: 'rgba(203,227,45,0.8)',
    borderRadius: Math.round(45 / 2),
    opacity: 0.54,
  },
  selectedCategoryText: {
    opacity: 1,
  },
});
