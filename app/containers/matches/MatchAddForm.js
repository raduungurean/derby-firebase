import React, {useEffect, useState} from 'react';
import {Button, Text} from 'react-native-elements';
import {ScrollView, StyleSheet} from 'react-native';
import {useDerbyTheme} from '../../utils/theme';
import i18n from 'i18n-js';
import {useDispatch, useSelector} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import {ROLE_GROUP_ADMIN, ROLE_HELPER} from '../../utils/config';
import MyDropDownPicker from '../../components/MyDropDownPicker';
import {LinearGradient} from 'expo-linear-gradient';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DateField from '../../components/DateField';
import {addMatch} from '../../actions/matches';
import {useAddMatchAlerts} from '../../hooks/useDropDownAlerts';

const MatchAddForm = () => {
  const {dark, sizes, colors} = useDerbyTheme();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const matches = useSelector((state) => state.matches);
  const {adding} = matches;
  const groups = !isEmpty(auth.user.groupData) ? auth.user.groupData : [];
  const locations = !isEmpty(auth.user.locations) ? auth.user.locations : [];
  const roles = auth.user.roles ? auth.user.roles : [];
  const [groupsData, setGroupsData] = useState([]);
  const [locationsData, setLocationsData] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isValid, setIsFormValid] = useState(false);

  const [date, setDate] = useState(undefined);
  const [group, setGroup] = useState(undefined);
  const [noPlayers, setNoPlayers] = useState(10);
  const [duration, setDuration] = useState(60);
  const [location, setLocation] = useState(undefined);

  useAddMatchAlerts(() => {
    setDate(undefined);
    setGroup(undefined);
    setNoPlayers(10);
    setDuration(10);
    setLocation(undefined);
  });

  useEffect(() => {
    if (date && group && noPlayers && duration && location) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [date, group, noPlayers, duration, location]);

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

  const minutesData = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120].map(
    (min) => {
      return {
        label: min + ' minutes',
        value: min,
      };
    },
  );

  const playersData = [
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
  ].map((playerCount) => {
    return {
      label: playerCount + ' players',
      value: playerCount,
    };
  });

  useEffect(() => {
    let adminGroups = [];
    Object.keys(roles).forEach((key) => {
      if (
        roles[key].includes(ROLE_GROUP_ADMIN) ||
        roles[key].includes(ROLE_HELPER)
      ) {
        adminGroups = adminGroups.concat(key);
      }
    });

    const _groupsData = adminGroups
      .map((groupId) => {
        const gr = groups.find((g) => g.id === groupId);
        if (!gr) {
          return undefined;
        }
        return {
          label: gr.name,
          value: gr.id,
        };
      })
      .filter((g) => g !== undefined);
    setGroupsData(_groupsData);
  }, [groups, roles]);

  useEffect(() => {
    let _locationsData = locations.map((l) => {
      return {
        label: l.name,
        value: l.id,
      };
    });
    setLocationsData(_locationsData);
  }, [locations]);

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
        {i18n.t('match_add_form_title')}
      </Text>

      {groupsData.length > 0 && (
        <MyDropDownPicker
          zIndex={4000}
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
          defaultValue={10}
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
          defaultValue={60}
          label={i18n.t('match_add_minutes_label')}
          items={minutesData}
          onChangeItem={(item) => {
            setDuration(item.value);
          }}
        />
      )}

      <DateField
        date={date}
        onSetDate={(dt) => setDate(dt)}
        onPress={showDatePicker}
      />

      <Button
        loading={adding}
        title={i18n.t('match_add_button_label')}
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
        onPress={() =>
          dispatch(addMatch({date, location, duration, noPlayers, group}))
        }
        disabled={!isValid}
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
    width: 250,
    borderRadius: Math.round(45 / 2),
    height: 40,
  },
  titleStyle: {
    fontFamily: 'Rubik_400Regular',
    marginRight: 'auto',
  },
});

export default MatchAddForm;
