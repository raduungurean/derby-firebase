import {FormInput} from '../../components/FormInput';
import {Button} from 'react-native-elements';
import {LinearGradient} from 'expo-linear-gradient';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import {setRegistrationField, signUp} from '../../actions/auth';
import {useDispatch, useSelector} from 'react-redux';
import ddRef from '../../services/drop-down-ref';
import i18n from 'i18n-js';

export default function SignUpForm() {
  const dispatch = useDispatch();
  const {
    isSigningUp,
    signUpErrorMessage,
    signUpSuccessMessage,
    registrationState,
  } = useSelector((state) => state.auth);

  let refInputFirstName;
  let refInputLastName;
  let refInputEmail;
  let refInputPassword;
  let refInputPasswordConfirmation;

  const {
    firstName,
    lastName,
    email,
    password,
    passwordConfirmation,
  } = registrationState;

  const [isEmailValid, setIsEmailValid] = useState(undefined);
  const [isFirstNameValid, setIsFirstNameValid] = useState(undefined);
  const [isLastNameValid, setIsLastNameValid] = useState(undefined);
  const [isPasswordValid, setIsPasswordValid] = useState(undefined);
  const [isDigitsPassword, setIsDigitsPassword] = useState(true);

  //TODO move this to hooks
  useEffect(() => {
    if (signUpErrorMessage) {
      let errDescription = i18n.t('auth_s_up_alert_error_description');
      if (signUpErrorMessage.includes('email address')) {
        errDescription = signUpErrorMessage;
        setIsEmailValid(false);
        refInputEmail.shake();
      }

      ddRef
        .getDdRef()
        .alertWithType(
          'error',
          i18n.t('auth_s_up_alert_error_title'),
          errDescription,
          {type: 'ERROR_SIGN_UP'},
        );
    }
  }, [signUpErrorMessage]);

  //TODO move this to hooks
  useEffect(() => {
    if (signUpSuccessMessage) {
      ddRef
        .getDdRef()
        .alertWithType(
          'info',
          i18n.t('auth_s_up_alert_success_title'),
          i18n.t('auth_s_up_alert_success_description'),
          {type: 'SUCCESS_SIGN_UP'},
        );
    }
  }, [signUpSuccessMessage]);

  useEffect(() => {
    if (isEmailValid === false) {
      const _isEmailValid = isEmail(email);
      setIsEmailValid(_isEmailValid);
    }
  }, [email]);

  useEffect(() => {
    if (isDigitsPassword === false) {
      const _isFirstNameValid = !isEmpty(firstName);
      setIsFirstNameValid(_isFirstNameValid);
    }
  }, [firstName]);

  useEffect(() => {
    if (isLastNameValid === false) {
      const _isLastNameValid = !isEmpty(lastName);
      setIsLastNameValid(_isLastNameValid);
    }
  }, [lastName]);

  useEffect(() => {
    if (isDigitsPassword === false) {
      if (!/\d/g.test(password) && password.length > 6) {
        setIsDigitsPassword(false);
      } else {
        setIsDigitsPassword(true);
      }
    }

    if (isPasswordValid === false) {
      const _isPasswordValid =
        !isEmpty(password) && password.length > 6 && /\d/g.test(password);

      setIsPasswordValid(_isPasswordValid);
    }
  }, [password]);

  const validateForm = () => {
    Keyboard.dismiss();
    const _isEmailValid = isEmail(email);
    const _isFirstNameValid = !isEmpty(firstName);
    const _isLastNameValid = !isEmpty(lastName);
    const _isPasswordValid =
      !isEmpty(password) && password.length > 6 && /\d/g.test(password);

    if (!/\d/g.test(password) && password.length > 6) {
      LayoutAnimation.easeInEaseOut();
      setIsDigitsPassword(false);
    } else {
      setIsDigitsPassword(true);
    }

    setIsEmailValid(_isEmailValid);
    setIsFirstNameValid(_isFirstNameValid);
    setIsLastNameValid(_isLastNameValid);
    setIsPasswordValid(_isPasswordValid);

    if (!_isEmailValid) {
      refInputEmail.shake();
    }

    if (!_isFirstNameValid) {
      refInputFirstName.shake();
    }

    if (!_isLastNameValid) {
      refInputLastName.shake();
    }

    if (!_isPasswordValid) {
      refInputPassword.shake();
    }

    if (password !== passwordConfirmation) {
      refInputPassword.shake();
      refInputPasswordConfirmation.shake();
    }

    const isValid =
      _isEmailValid &&
      _isFirstNameValid &&
      _isLastNameValid &&
      _isPasswordValid &&
      password === passwordConfirmation;

    if (isValid) {
      const signUpData = {
        email,
        firstName,
        lastName,
        password,
      };
      dispatch(signUp(signUpData));
    }

    return isValid;
  };

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  function _setField(key, text) {
    dispatch(
      setRegistrationField({
        key,
        text,
      }),
    );
  }

  return (
    <View style={{display: 'flex', width: '100%', alignItems: 'center'}}>
      <FormInput
        refInput={(input) => (refInputFirstName = input)}
        icon="user"
        value={firstName}
        onChangeText={(text) => _setField('firstName', text)}
        placeholder={i18n.t('auth_s_up_first_name_label')}
        error={isFirstNameValid === false}
        returnKeyType="next"
        onSubmitEditing={() => {
          refInputFirstName.focus();
        }}
      />

      <FormInput
        refInput={(input) => (refInputLastName = input)}
        icon="user"
        value={lastName}
        onChangeText={(text) => _setField('lastName', text)}
        placeholder={i18n.t('auth_s_up_last_name_label')}
        error={isLastNameValid === false}
        returnKeyType="next"
        onSubmitEditing={() => {
          refInputLastName.focus();
        }}
      />

      <FormInput
        refInput={(input) => (refInputEmail = input)}
        icon="envelope"
        value={email}
        onChangeText={(text) => _setField('email', text)}
        placeholder={i18n.t('auth_s_up_email_label')}
        error={isEmailValid === false}
        returnKeyType="next"
        onSubmitEditing={() => {
          refInputEmail.focus();
        }}
      />

      <FormInput
        refInput={(input) => (refInputPassword = input)}
        icon="lock"
        value={password}
        onChangeText={(text) => _setField('password', text)}
        placeholder={i18n.t('auth_s_up_password_label')}
        error={isPasswordValid === false}
        secureTextEntry
        returnKeyType="next"
        errorMessage={
          isDigitsPassword
            ? null
            : 'The password should include at least one digit'
        }
        onSubmitEditing={() => {
          // also validate the password
          refInputPassword.focus();
        }}
      />

      <FormInput
        refInput={(input) => (refInputPasswordConfirmation = input)}
        icon="lock"
        value={passwordConfirmation}
        onChangeText={(text) => _setField('passwordConfirmation', text)}
        placeholder={i18n.t('auth_s_up_password_confirmation_label')}
        secureTextEntry
        returnKeyType="next"
        onSubmitEditing={() => {
          // also validate the password
          refInputPasswordConfirmation.focus();
        }}
      />

      <Button
        loading={isSigningUp}
        title={i18n.t('auth_s_up_submit_label')}
        containerStyle={{flex: -1}}
        buttonStyle={styles.signUpButton}
        linearGradientProps={{
          colors: ['#548C2F', '#F9A620'],
          start: [1, 0],
          end: [0.2, 0],
        }}
        ViewComponent={LinearGradient}
        titleStyle={styles.signUpButtonText}
        onPress={() => validateForm()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  signUpButtonText: {
    fontSize: 13,
  },
  signUpButton: {
    width: 250,
    borderRadius: Math.round(45 / 2),
    height: 45,
  },
});
