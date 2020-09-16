import React, {useEffect, useState} from 'react';
import UpdatePasswordForm from '../../components/password/UpdatePasswordForm';
import isEmpty from 'validator/lib/isEmpty';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {useDerbyTheme} from '../../utils/theme';
import {updatePassword} from '../../actions/profile';
import {useUpdatePasswordAlerts} from '../../hooks/useDropDownAlerts';
import {Text} from 'react-native-elements';
import i18n from 'i18n-js';

const PasswordForm = () => {
  const {colors, sizes} = useDerbyTheme();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [formValidPassword, setFormValidPassword] = useState(false);
  const {updatingPassword} = profile;

  useUpdatePasswordAlerts();

  useEffect(() => {
    setFormValidPassword(
      !isEmpty(password) &&
        !isEmpty(passwordConfirmation) &&
        password === passwordConfirmation &&
        password.length > 5,
    );
  }, [password, passwordConfirmation]);

  const submitButtonStyle = [
    styles.submitButton,
    {backgroundColor: colors.primary},
  ];

  return (
    <>
      <Text
        style={[
          styles.titleStyle,
          {
            paddingHorizontal: sizes.BASE * 1.5,
            paddingTop: sizes.BASE,
            fontSize: sizes.FONT * 1.3,
            color: colors.text,
          },
        ]}>
        {i18n.t('password_form_title')}
      </Text>
      <UpdatePasswordForm
        onPasswordChange={(text) => setPassword(text)}
        onPasswordConfirmationChange={(text) => setPasswordConfirmation(text)}
        buttonStyle={submitButtonStyle}
        formValid={formValidPassword}
        onPress={() => {
          dispatch(updatePassword(password, passwordConfirmation));
        }}
        loading={updatingPassword}
      />
    </>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    borderRadius: 30,
  },
  titleStyle: {
    fontFamily: 'Rubik_400Regular',
  },
});

export default PasswordForm;
