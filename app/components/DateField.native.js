import {Button, Icon} from 'react-native-elements';
import i18n from 'i18n-js';
import * as PropTypes from 'prop-types';
import React from 'react';
import {useDerbyTheme} from '../utils/theme';
import {StyleSheet} from 'react-native';

export default function DateField({date, onPress}) {
  const {dark, colors, sizes} = useDerbyTheme();

  return (
    <Button
      title={
        date
          ? i18n.l('date_formats_day', date) +
            ' at ' +
            i18n.l('date_formats_time', date)
          : i18n.t('match_add_select_date')
      }
      buttonStyle={styles.dateButton}
      containerStyle={{
        marginTop: sizes.BASE * 1.5,
        marginBottom: sizes.BASE,
        width: '100%',
      }}
      onPress={onPress}
      titleStyle={[
        styles.submitButtonText,
        {
          color: dark ? colors.text : colors.textMuted,
          fontSize: sizes.BASE,
        },
      ]}
      type="outline"
      icon={
        <Icon
          type="antdesign"
          name="calendar"
          style={{marginRight: sizes.BASE / 2}}
          size={20}
          color={colors.text}
        />
      }
    />
  );
}

DateField.propTypes = {
  date: PropTypes.any,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  dateButton: {
    width: '100%',
    borderRadius: Math.round(45 / 2),
    height: 35,
  },
});
