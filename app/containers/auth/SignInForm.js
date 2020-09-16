import {FormInput} from '../../components/FormInput';
import {Button} from 'react-native-elements';
import {LinearGradient} from 'expo-linear-gradient';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import {login} from '../../actions/auth';
import {useDispatch, useSelector} from 'react-redux';
import ddRef from '../../services/drop-down-ref';
import i18n from 'i18n-js';

export default function SignInForm() {
  let refInputEmail;
  const [email, setEmail] = useState('');
  const [isEmailValid, setEmailValid] = useState('');

  let refInputPassword;
  const [password, setPassword] = useState('');
  const [isValidForm, setIsValidForm] = useState(false);

  const dispatch = useDispatch();
  const {loggingIn, loginErrorMessage} = useSelector((state) => state.auth);

  useEffect(() => {
    const isEmailValid = isEmail(email);
    setEmailValid(isEmailValid);
    const isPasswordValid = !isEmpty(password);
    setIsValidForm(isEmailValid && isPasswordValid);
  }, [password, email]);

  //TODO move this to hooks
  useEffect(() => {
    if (loginErrorMessage) {
      ddRef
        .getDdRef()
        .alertWithType(
          'error',
          i18n.t('auth_s_in_alert_error_title'),
          i18n.t('auth_s_in_alert_error_description'),
          {type: 'ERROR_SIGN_IN'},
        );
      refInputEmail.shake();
      refInputPassword.shake();
    }
  }, [loginErrorMessage]);

  return (
    <View style={{display: 'flex', width: '100%', alignItems: 'center'}}>
      <FormInput
        refInput={(input) => (refInputEmail = input)}
        icon="envelope"
        error={!isEmailValid && email !== ''}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder={i18n.t('auth_s_in_email_label')}
        returnKeyType="next"
        onSubmitEditing={() => {
          // also validate the email
          refInputEmail.focus();
        }}
      />
      <FormInput
        refInput={(input) => (refInputPassword = input)}
        icon="lock"
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder={i18n.t('auth_s_in_password_label')}
        secureTextEntry
        returnKeyType="next"
        onSubmitEditing={() => {
          // also validate the password
          refInputPassword.focus();
        }}
      />

      <Button
        loading={loggingIn}
        title={i18n.t('auth_s_in_submit_label')}
        containerStyle={{flex: -1}}
        buttonStyle={styles.signUpButton}
        linearGradientProps={{
          colors: ['#446459', '#36b8f4'],
          start: [1, 0],
          end: [0.2, 0],
        }}
        ViewComponent={LinearGradient}
        titleStyle={styles.signUpButtonText}
        onPress={() => {
          dispatch(login(email, password));
        }}
        disabled={!isValidForm}
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
