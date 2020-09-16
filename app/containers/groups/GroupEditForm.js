import React, {useEffect, useState} from 'react';
import {StyleSheet, Switch, View} from 'react-native';
import {useDerbyTheme} from '../../utils/theme';
import {Button, Text} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import isEmpty from 'validator/lib/isEmpty';
import i18n from 'i18n-js';
import {FormInput} from '../../components/FormInput';
import {LinearGradient} from 'expo-linear-gradient';
import {editGroup} from '../../actions/groups';
import {useEditGroupAlerts} from '../../hooks/useDropDownAlerts';
import {Col, Grid, Row} from 'react-native-easy-grid';

const GroupEditForm = ({ge}) => {
  const {sizes, colors} = useDerbyTheme();
  const dispatch = useDispatch();
  const [formValid, setFormValid] = useState(false);
  const groups = useSelector((state) => state.groups);
  const {editing} = groups;
  let refInputGroupName;
  let refInputShortDescription;
  const auth = useSelector((state) => state.auth);
  const {user} = auth;

  const toGroup = user.groupData.find((gd) => gd.id === ge);
  const [groupName, setGroupName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [allowShare, setAllowShare] = useState(undefined);
  const [error, setError] = useState(false);

  useEffect(() => {
    setShortDescription(toGroup.short_description);
    setGroupName(toGroup.name);
    setAllowShare(toGroup.allow_share);
  }, [toGroup]);

  useEffect(() => {
    setFormValid(!isEmpty(groupName));
  }, [groupName]);

  useEditGroupAlerts((fields) => {
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
        stylesInputContainer={[
          styles.inputContainer,
          {marginTop: sizes.BASE * 1.5},
        ]}
        stylesinputContainerErr={[
          styles.inputContainerErr,
          {marginTop: sizes.BASE * 1.5},
        ]}
        inputStyle={[
          styles.inputStyle,
          {color: colors.text, fontSize: sizes.BASE},
        ]}
        errorInputStyle={styles.errorInputStyle}
        iconColor={colors.text}
        placeholderTextColor={colors.textMuted}
        error={error}
        value={groupName}
        onChangeText={(text) => setGroupName(text)}
        placeholder={i18n.t('eg_placeholder_group_name')}
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
          marginRight: 'auto',
          marginLeft: sizes.BASE,
        }}>
        {i18n.t('eg_group_name_hint')}
      </Text>

      <FormInput
        refInput={(input) => (refInputShortDescription = input)}
        icon="pencil"
        stylesInputContainer={[
          styles.inputContainer,
          {marginTop: sizes.BASE * 1.5},
        ]}
        stylesinputContainerErr={[
          styles.inputContainerErr,
          {marginTop: sizes.BASE * 1.5},
        ]}
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
        placeholder={i18n.t('eg_placeholder_short_description')}
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
          marginRight: 'auto',
          marginLeft: sizes.BASE,
        }}>
        {i18n.t('eg_short_description_hint')}
      </Text>

      <Grid
        style={[
          styles.alignToLeft,
          {
            marginLeft: sizes.BASE,
            marginTop: sizes.BASE * 1.5,
            marginBottom: sizes.BASE * 2,
            width: '100%',
          },
        ]}>
        <Row>
          <Col size={2}>
            <Text
              style={{
                fontFamily: 'Rubik_400Regular',
                fontSize: sizes.BASE * 1.1,
                color: colors.text,
              }}>
              {i18n.t('eg_allow_share')}
            </Text>
          </Col>
          <Col
            size={4}
            style={{
              paddingHorizontal: sizes.BASE * 2,
              alignItems: 'flex-start',
            }}>
            <Switch
              value={allowShare}
              onValueChange={(value) => setAllowShare(value)}
            />
          </Col>
        </Row>
      </Grid>

      <Text
        style={{
          fontStyle: 'italic',
          color: colors.text,
          fontFamily: 'Rubik_400Regular',
          marginRight: 'auto',
          marginLeft: sizes.BASE,
        }}>
        {allowShare
          ? i18n.t('eg_allow_share_hint_true')
          : i18n.t('eg_allow_share_hint_false')}
      </Text>

      <Button
        loading={editing}
        title={i18n.t('eg_button_submit')}
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
          dispatch(editGroup(g, groupName, shortDescription, allowShare));
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
  alignToLeft: {
    marginRight: 'auto',
  },
});

export default GroupEditForm;
