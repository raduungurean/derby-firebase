import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';
import {FormInput} from '../../components/FormInput';
import i18n from 'i18n-js';
import isEmail from 'validator/lib/isEmail';
import {LinearGradient} from 'expo-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {recoverPassword} from '../../actions/auth';
import ddRef from '../../services/drop-down-ref';

const ForgotPasswordForm = () => {
  let refInputEmail;
  const [email, setEmail] = useState('');
  const [isEmailValid, setEmailValid] = useState('');
  const dispatch = useDispatch();
  const {recovering, recoveringErrorMessage, recoveringMessage} = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    const isEmailValid = isEmail(email);
    setEmailValid(isEmailValid);
  }, [email]);

  //TODO move this to hooks
  useEffect(() => {
    if (recoveringErrorMessage) {
      ddRef
        .getDdRef()
        .alertWithType(
          'error',
          i18n.t('auth_fp_alert_error_title'),
          i18n.t('auth_fp_alert_error_description'),
          {type: 'ERROR_FP'},
        );
      refInputEmail.shake();
    }

    if (recoveringMessage) {
      ddRef
        .getDdRef()
        .alertWithType(
          'success',
          i18n.t('auth_fp_alert_success_title'),
          i18n.t('auth_fp_alert_success_description'),
          {type: 'SUCCESS_FP'},
        );
      setEmail('');
    }
  }, [recoveringErrorMessage, recoveringMessage]);

  return (
    <View style={{display: 'flex', width: '100%', alignItems: 'center'}}>
      <FormInput
        refInput={(input) => (refInputEmail = input)}
        icon="envelope"
        error={!isEmailValid && email !== ''}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder={i18n.t('auth_fp_email_label')}
        returnKeyType="next"
        onSubmitEditing={() => {
          // also validate the email
          refInputEmail.focus();
        }}
      />
      <Button
        loading={recovering}
        title={i18n.t('auth_fp_submit_label')}
        containerStyle={{flex: -1}}
        buttonStyle={styles.recoverPasswordButton}
        linearGradientProps={{
          colors: ['#446459', '#36b8f4'],
          start: [1, 0],
          end: [0.2, 0],
        }}
        ViewComponent={LinearGradient}
        titleStyle={styles.recoverPasswordButtonText}
        onPress={() => {
          dispatch(recoverPassword(email));
        }}
        disabled={!isEmailValid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  recoverPasswordButtonText: {
    fontSize: 13,
  },
  recoverPasswordButton: {
    width: 250,
    borderRadius: Math.round(45 / 2),
    height: 45,
  },
});

export default ForgotPasswordForm;
