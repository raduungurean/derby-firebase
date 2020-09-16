import {Button} from 'react-native-elements';
import i18n from 'i18n-js';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {useDerbyTheme} from '../../utils/theme';
import {FormInput} from '../FormInput';
import {StyleSheet, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

export default function UpdatePasswordForm(props) {
  const {sizes, colors} = useDerbyTheme();
  return (
    <View
      style={{
        paddingHorizontal: sizes.BASE / 2,
        paddingVertical: sizes.BASE * 1.2,
        alignItems: 'center',
      }}>
      <FormInput
        icon="lock"
        stylesInputContainer={[
          styles.inputContainer,
          {borderColor: colors.joy3, backgroundColor: colors.backgroundCard},
        ]}
        stylesinputContainerErr={styles.inputContainerErr}
        inputStyle={[
          styles.inputStyle,
          {color: colors.text, fontSize: sizes.BASE},
        ]}
        errorInputStyle={styles.errorInputStyle}
        iconColor={colors.text}
        placeholderTextColor={colors.textMuted}
        onChangeText={props.onPasswordChange}
        placeholder={i18n.t('profile_placeholder_password')}
        returnKeyType="next"
        secureTextEntry
      />
      <FormInput
        icon="lock"
        stylesInputContainer={[
          styles.inputContainer,
          {borderColor: colors.joy3, backgroundColor: colors.backgroundCard},
        ]}
        stylesinputContainerErr={styles.inputContainerErr}
        inputStyle={[
          styles.inputStyle,
          {color: colors.text, fontSize: sizes.BASE},
        ]}
        errorInputStyle={styles.errorInputStyle}
        iconColor={colors.text}
        placeholderTextColor={colors.textMuted}
        onChangeText={props.onPasswordConfirmationChange}
        placeholder={i18n.t('profile_placeholder_password_confirmation')}
        returnKeyType="next"
        secureTextEntry
      />
      <Button
        loading={props.loading}
        title={i18n.t('profile_button_update_password')}
        containerStyle={{marginTop: sizes.BASE}}
        buttonStyle={styles.submitButton}
        linearGradientProps={{
          colors: [colors.primary, '#36b8f4'],
          start: [1, 0],
          end: [0.2, 0],
        }}
        ViewComponent={LinearGradient}
        titleStyle={[
          styles.submitButtonText,
          {color: colors.backgroundCard, fontSize: sizes.BASE},
        ]}
        disabledTitleStyle={{
          color: colors.textMuted,
        }}
        onPress={props.onPress}
        disabled={!props.formValid}
      />
    </View>
  );
}

UpdatePasswordForm.propTypes = {
  onPasswordChange: PropTypes.func,
  onPasswordConfirmationChange: PropTypes.func,
  buttonStyle: PropTypes.any,
  formValid: PropTypes.bool,
  onPress: PropTypes.func,
  loading: PropTypes.bool,
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingLeft: 8,
    borderRadius: 40,
    borderWidth: 1,
    height: 45,
    marginVertical: 3,
  },
  inputContainerErr: {
    paddingLeft: 8,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#ec5673',
    height: 45,
    marginVertical: 3,
  },
  inputStyle: {
    flex: 1,
    marginLeft: 10,
    color: 'white',
    fontFamily: 'Rubik_400Regular',
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: '#F44336',
    fontFamily: 'Rubik_400Regular',
  },
  submitButtonText: {fontFamily: 'Rubik_400Regular'},
  submitButton: {
    width: 250,
    borderRadius: Math.round(45 / 2),
    height: 40,
  },
});
