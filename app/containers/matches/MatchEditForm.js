import React, {useCallback, useEffect, useState} from 'react';
import {useDerbyTheme} from '../../utils/theme';
import {Button, Text} from 'react-native-elements';
import {ScrollView, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/core';
import {editMatch, loadMatch} from '../../actions/matches';
import {useDispatch, useSelector} from 'react-redux';
import SpinLoader from '../../components/SpinLoader';
import {minutesData, playersData} from '../../utils/config';
import {useLocations} from '../../hooks/useLocations';
import {useGroups} from '../../hooks/useGroups';
import i18n from 'i18n-js';
import MyDropDownPicker from '../../components/MyDropDownPicker';
import {LinearGradient} from 'expo-linear-gradient';
import DateField from '../../components/DateField';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {fromFirebaseDate} from '../../services/firebase-utils';
import {useEditMatchAlerts} from '../../hooks/useDropDownAlerts';

const MatchEditForm = ({matchId}) => {
  const {dark, sizes, colors} = useDerbyTheme();
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches);
  const [match, setMatch] = useState(null);
  const {editing} = matches;
  const locationsData = useLocations();
  const groupsData = useGroups();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [date, setDate] = useState(undefined);
  const [group, setGroup] = useState(undefined);
  const [noPlayers, setNoPlayers] = useState(10);
  const [duration, setDuration] = useState(60);
  const [location, setLocation] = useState(undefined);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };

  // TODO reset form values after showing error alert
  useEditMatchAlerts();

  useFocusEffect(
    useCallback(() => {
      dispatch(loadMatch(matchId));
    }, [matchId]),
  );

  useEffect(() => {
    const p = matches.byId[matchId];
    setMatch(p);
  }, [matches, matchId]);

  if (!match) {
    return <SpinLoader />;
  }

  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'center', flexDirection: 'column'}}
      style={{height: 'auto', margin: sizes.BASE / 1.5}}>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        isDarkModeEnabled={dark}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <Text
        style={[
          styles.titleStyle,
          {
            paddingRight: sizes.BASE * 1.5,
            paddingLeft: 0,
            paddingTop: sizes.BASE,
            fontSize: sizes.FONT * 1.2,
            color: colors.text,
          },
        ]}>
        {i18n.t('match_edit_form_title')}
      </Text>

      {groupsData.length > 0 && (
        <MyDropDownPicker
          zIndex={4000}
          defaultValue={match.group_id}
          placeholder={i18n.t('match_add_select_group_label')}
          label={i18n.t('match_add_group_name_label')}
          items={groupsData}
          onChangeItem={(item) => {
            setGroup(item.value);
          }}
        />
      )}

      {locationsData.length > 0 && (
        <MyDropDownPicker
          zIndex={3000}
          defaultValue={match.location_id}
          placeholder={i18n.t('match_add_select_location_label')}
          label={i18n.t('match_add_location_label')}
          items={locationsData}
          onChangeItem={(item) => {
            setLocation(item.value);
          }}
        />
      )}

      {playersData.length > 0 && (
        <MyDropDownPicker
          defaultValue={match.capacity}
          zIndex={2000}
          label={i18n.t('match_add_players_label')}
          items={playersData}
          onChangeItem={(item) => {
            setNoPlayers(item.value);
          }}
        />
      )}

      {minutesData.length > 0 && (
        <MyDropDownPicker
          zIndex={1000}
          defaultValue={match.duration}
          label={i18n.t('match_add_minutes_label')}
          items={minutesData}
          onChangeItem={(item) => {
            setDuration(item.value);
          }}
        />
      )}

      <DateField
        date={
          date
            ? date
            : match.date
            ? fromFirebaseDate(match.date).toDate()
            : null
        }
        onSetDate={(dt) => setDate(dt)}
        onPress={showDatePicker}
      />

      <Button
        loading={editing}
        title={i18n.t('match_edit_button_label')}
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
        onPress={() => {
          dispatch(
            editMatch({
              date,
              location,
              duration,
              noPlayers,
              group,
              id: match.id,
            }),
          );
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  submitButtonText: {fontFamily: 'Rubik_400Regular'},
  dateButton: {
    width: '100%',
    borderRadius: Math.round(45 / 2),
    height: 35,
  },
  submitButton: {
    width: 200,
    borderRadius: Math.round(45 / 2),
    height: 40,
  },
  titleStyle: {
    fontFamily: 'Rubik_400Regular',
    marginRight: 'auto',
  },
});

export default MatchEditForm;
