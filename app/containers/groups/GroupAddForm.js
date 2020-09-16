import React, {useEffect, useState} from 'react';
import {FormInput} from '../../components/FormInput';
import i18n from 'i18n-js';
import {Button, Text} from 'react-native-elements';
import {LinearGradient} from 'expo-linear-gradient';
import {StyleSheet, View} from 'react-native';
import {useDerbyTheme} from '../../utils/theme';
import {useDispatch, useSelector} from 'react-redux';
import {addGroup} from '../../actions/groups';
import isEmpty from 'validator/lib/isEmpty';
import {useAddGroupAlerts} from '../../hooks/useDropDownAlerts';

const GroupAddForm = () => {
  const {sizes, colors} = useDerbyTheme();
  const dispatch = useDispatch();
  const [formValid, setFormValid] = useState(false);
  let refInputGroupName;
  let refInputShortDescription;
  const [groupName, setGroupName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const groups = useSelector((state) => state.groups);
  const {adding} = groups;
  const [error, setError] = useState(false);

  useEffect(() => {
    setFormValid(!isEmpty(groupName));
  }, [groupName]);

  useAddGroupAlerts((fields) => {
    fields.forEach((field) => {
      if (field === 'name') {
        refInputGroupName.shake();
        setError(true);
      }
    });
  });

  return (
    <View style={{padding: sizes.BASE / 2, alignItems: 'center'}}>
      <FormInput
        refInput={(input) => (refInputGroupName = input)}
        icon="people"
        stylesInputContainer={styles.inputContainer}
        stylesinputContainerErr={styles.inputContainerErr}
        errorInputStyle={styles.errorInputStyle}
        iconColor={colors.text}
        placeholderTextColor={colors.textMuted}
        inputStyle={[
          styles.inputStyle,
          {color: colors.text, fontSize: sizes.BASE},
        ]}
        error={error}
        value={groupName}
        onChangeText={(text) => {
          setGroupName(text);
          if (error) {
            setError(false);
          }
        }}
        placeholder={i18n.t('ag_placeholder_group_name')}
        returnKeyType="next"
        onSubmitEditing={() => {
          // also validate the email
          refInputGroupName.focus();
        }}
      />
      <Text
        style={{
          fontStyle: 'italic',
          color: colors.text,
          fontFamily: 'Rubik_400Regular',
        }}>
        {i18n.t('ag_group_name_hint')}
      </Text>
      <FormInput
        refInput={(input) => (refInputShortDescription = input)}
        icon="pencil"
        stylesInputContainer={styles.inputContainer}
        stylesinputContainerErr={styles.inputContainerErr}
        inputStyle={[
          styles.inputStyle,
          {color: colors.text, fontSize: sizes.BASE},
        ]}
        errorInputStyle={styles.errorInputStyle}
        iconColor={colors.text}
        placeholderTextColor={colors.textMuted}
        error={false}
        value={shortDescription}
        onChangeText={(text) => setShortDescription(text)}
        placeholder={i18n.t('ag_placeholder_short_description')}
        returnKeyType="next"
        onSubmitEditing={() => {
          // also validate the email
          refInputShortDescription.focus();
        }}
      />
      <Text
        style={{
          fontStyle: 'italic',
          color: colors.text,
          fontFamily: 'Rubik_400Regular',
        }}>
        {i18n.t('ag_short_description_hint')}
      </Text>

      <Button
        loading={adding}
        title={i18n.t('ag_button_submit')}
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
        onPress={() => {
          dispatch(addGroup(groupName, shortDescription));
        }}
        disabled={!formValid}
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
  submitButtonText: {fontFamily: 'Rubik_400Regular'},
  submitButton: {
    width: 250,
    borderRadius: Math.round(45 / 2),
    height: 40,
  },
});

export default GroupAddForm;
