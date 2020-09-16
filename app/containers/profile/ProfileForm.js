import React, {useEffect, useState} from 'react';
import UpdateProfileForm from '../../components/profile/UpdateProfileForm';
import {useDispatch, useSelector} from 'react-redux';
import {useDerbyTheme} from '../../utils/theme';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import {StyleSheet} from 'react-native';
import {updateProfile} from '../../actions/profile';
import {useUpdateProfileAlerts} from '../../hooks/useDropDownAlerts';
import {Text} from 'react-native-elements';
import i18n from 'i18n-js';

const ProfileForm = () => {
  const {colors, sizes} = useDerbyTheme();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  if (!auth.user) {
    return null;
  }
  const {updatingProfile} = profile;

  const submitButtonStyle = [
    styles.submitButton,
    {backgroundColor: colors.primary},
  ];

  const [firstName, setFirstName] = useState(auth.user.first_name);
  const [lastName, setLastName] = useState(auth.user.last_name);
  const [email, setEmail] = useState(auth.user.email);
  const [username, setUsername] = useState(auth.user.username);
  const [formValidMain, setFormValidMain] = useState(false);

  useEffect(() => {
    setFormValidMain(
      !isEmpty(firstName) && !isEmpty(lastName) && isEmail(email),
    );
  }, [firstName, lastName, email]);

  useUpdateProfileAlerts();

  return (
    <>
      <Text
        style={[
          styles.titleStyle,
          {
            paddingHorizontal: sizes.BASE * 1.5,
            paddingTop: sizes.BASE,
            fontSize: sizes.FONT * 1.2,
            color: colors.text,
          },
        ]}>
        {i18n.t('profile_form_title')}
      </Text>
      <UpdateProfileForm
        firstName={firstName}
        onFirstNameChange={(text) => setFirstName(text)}
        lastName={lastName}
        onLastNameChange={(text) => setLastName(text)}
        email={email}
        onEmailChange={(text) => setEmail(text)}
        username={username}
        onUsernameChange={(text) => setUsername(text)}
        buttonStyle={submitButtonStyle}
        formValid={formValidMain}
        onUpdate={() => {
          dispatch(updateProfile({firstName, lastName, email, username}));
        }}
        loading={updatingProfile}
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

export default ProfileForm;
