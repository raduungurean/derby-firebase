import {Button} from 'react-native-elements';
import i18n from 'i18n-js';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {useDerbyTheme} from '../../utils/theme';
import {LinearGradient} from 'expo-linear-gradient';
import {StyleSheet, View} from 'react-native';
import {FormInput} from '../FormInput';

export default function UpdateProfileForm(props) {
  const {sizes, colors, dark} = useDerbyTheme();
  return (
    <View
      style={{
        paddingHorizontal: sizes.BASE / 2,
        paddingVertical: sizes.BASE * 1.2,
        alignItems: 'center',
      }}>
      <FormInput
        icon="user"
        value={props.firstName}
        onChangeText={props.onFirstNameChange}
        placeholder={i18n.t('profile_placeholder_first_name')}
        returnKeyType="next"
        inputStyle={[
          styles.inputStyle,
          {
            color: colors.text,
            fontSize: sizes.BASE,
          },
        ]}
        stylesInputContainer={[
          styles.inputContainer,
          {
            borderColor: colors.joy3,
            backgroundColor: colors.backgroundCard,
            marginTop: sizes.BASE / 4,
          },
        ]}
        stylesinputContainerErr={styles.inputContainerErr}
        errorInputStyle={styles.errorInputStyle}
        iconColor={colors.text}
        placeholderTextColor={colors.textMuted}
      />
      <FormInput
        icon="user"
        value={props.lastName}
        onChangeText={props.onLastNameChange}
        placeholder={i18n.t('profile_placeholder_last_name')}
        returnKeyType="next"
        inputStyle={[
          styles.inputStyle,
          {
            color: colors.text,
            fontSize: sizes.BASE,
          },
        ]}
        stylesInputContainer={[
          styles.inputContainer,
          {
            borderColor: colors.joy3,
            backgroundColor: colors.backgroundCard,
            marginTop: sizes.BASE / 4,
          },
        ]}
        stylesinputContainerErr={styles.inputContainerErr}
        errorInputStyle={styles.errorInputStyle}
        iconColor={colors.text}
        placeholderTextColor={colors.textMuted}
      />
      <FormInput
        icon="user"
        value={props.username}
        onChangeText={props.onUsernameChange}
        placeholder={i18n.t('profile_placeholder_username')}
        returnKeyType="next"
        inputStyle={[
          styles.inputStyle,
          {color: colors.text, fontSize: sizes.BASE},
        ]}
        stylesInputContainer={[
          styles.inputContainer,
          {
            borderColor: colors.joy3,
            backgroundColor: colors.backgroundCard,
            marginTop: sizes.BASE / 4,
          },
        ]}
        stylesinputContainerErr={styles.inputContainerErr}
        errorInputStyle={styles.errorInputStyle}
        iconColor={colors.text}
        placeholderTextColor={colors.textMuted}
      />
      <FormInput
        icon="envelope"
        value={props.email}
        onChangeText={props.onEmailChange}
        placeholder={i18n.t('profile_placeholder_email')}
        returnKeyType="next"
        inputStyle={[
          styles.inputStyle,
          {color: colors.text, fontSize: sizes.BASE},
        ]}
        stylesInputContainer={[
          styles.inputContainer,
          {
            borderColor: colors.joy3,
            backgroundColor: colors.backgroundCard,
            marginTop: sizes.BASE / 4,
          },
        ]}
        stylesinputContainerErr={styles.inputContainerErr}
        errorInputStyle={styles.errorInputStyle}
        iconColor={colors.text}
        placeholderTextColor={colors.textMuted}
      />
      <Button
        loading={props.loading}
        title={i18n.t('profile_button_update')}
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
          {
            color: dark ? colors.white : colors.backgroundCard,
            fontSize: sizes.BASE,
          },
        ]}
        disabledTitleStyle={{
          color: colors.textMuted,
        }}
        onPress={props.onUpdate}
        disabled={!props.formValid}
      />
    </View>
  );
}

UpdateProfileForm.propTypes = {
  firstName: PropTypes.string,
  onFirstNameChange: PropTypes.func,
  lastName: PropTypes.string,
  onLastNameChange: PropTypes.func,
  email: PropTypes.any,
  onEmailChange: PropTypes.func,
  onUsernameChange: PropTypes.func,
  username: PropTypes.string,
  buttonStyle: PropTypes.any,
  formValid: PropTypes.bool,
  onUpdate: PropTypes.func,
  loading: PropTypes.bool,
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingLeft: 8,
    borderRadius: 40,
    borderWidth: 1,
    height: 45,
    marginVertical: 0,
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
