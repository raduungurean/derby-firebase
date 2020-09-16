import React, {useEffect, useState} from 'react';
import i18n from 'i18n-js';
import {FormInput} from '../../components/FormInput';
import {useDerbyTheme} from '../../utils/theme';
import {StyleSheet, Text, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {invitePlayer} from '../../actions/groups';
import isEmail from 'validator/lib/isEmail';
import ddRef from '../../services/drop-down-ref';

const InvitePlayerForm = ({ge}) => {
  let refInputEmail;
  const {colors, sizes} = useDerbyTheme();
  const [isEmailValid, setEmailValid] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const groups = useSelector((state) => state.groups);
  const {inviting, inviteRequestSent, errorInviting} = groups;
  const {user} = auth;

  const toGroup = user.groupData.find((gd) => gd.id === ge);

  useEffect(() => {
    const isEmailValid = isEmail(email);
    setEmailValid(isEmailValid);
  }, [email]);

  useEffect(() => {
    if (errorInviting) {
      const errSubject = i18n.t('invite_player_error_alert_subject');
      const errDescription = i18n.t('invite_player_error_alert_description');

      ddRef.getDdRef().alertWithType('error', errSubject, errDescription, {
        type: 'ERROR_IP',
      });
    }

    if (inviteRequestSent) {
      ddRef
        .getDdRef()
        .alertWithType(
          'info',
          i18n.t('invite_player_success_alert_subject'),
          i18n.t('invite_player_success_alert_description'),
          {type: 'SUCCESS_IP'},
        );
      setEmail('');
    }
  }, [errorInviting, inviteRequestSent]);

  if (!toGroup) {
    return null;
  }

  return (
    <View style={{padding: sizes.BASE / 2, alignItems: 'center'}}>
      <Text
        style={{
          fontFamily: 'Rubik_300Light',
          fontSize: sizes.BASE,
          marginRight: 'auto',
          margin: sizes.BASE,
          color: colors.text,
        }}>
        {i18n.t('invite_player_form_title', {group: toGroup.name})}
      </Text>

      <FormInput
        refInput={(input) => (refInputEmail = input)}
        icon="envelope"
        stylesInputContainer={styles.inputContainer}
        stylesinputContainerErr={styles.inputContainerErr}
        inputStyle={[
          styles.inputStyle,
          {color: colors.text, fontSize: sizes.BASE},
        ]}
        errorInputStyle={styles.errorInputStyle}
        iconColor={colors.text}
        placeholderTextColor={colors.textMuted}
        error={!isEmailValid && email !== ''}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder={i18n.t('invite_player_email_label')}
        returnKeyType="next"
        onSubmitEditing={() => {
          // also validate the email
          refInputEmail.focus();
        }}
      />
      <Button
        loading={inviting}
        title={i18n.t('invite_player_submit_label')}
        containerStyle={{marginTop: 0}}
        buttonStyle={styles.invitePlayerButton}
        linearGradientProps={{
          colors: [colors.primary, '#36b8f4'],
          start: [1, 0],
          end: [0.2, 0],
        }}
        ViewComponent={LinearGradient}
        titleStyle={[
          styles.invitePlayerButtonText,
          {color: colors.backgroundCard, fontSize: sizes.BASE},
        ]}
        disabledTitleStyle={{
          color: colors.textMuted,
        }}
        onPress={() => {
          dispatch(invitePlayer(email, user, toGroup));
        }}
        disabled={!isEmailValid}
      />
    </View>
  );
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
  invitePlayerButtonText: {fontFamily: 'Rubik_400Regular'},
  invitePlayerButton: {
    width: 250,
    borderRadius: Math.round(45 / 2),
    height: 40,
  },
});

export default InvitePlayerForm;
