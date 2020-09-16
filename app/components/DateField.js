import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../assets/style.css';
import {Text} from 'react-native';
import i18n from 'i18n-js';
import {useDerbyTheme} from '../utils/theme';

const DateField = ({date, onSetDate}) => {
  const {colors, sizes, dark} = useDerbyTheme();
  let classes = 'date-wrapper' + (dark ? ' dark-date' : ' light-date');

  const myDt = date ? date : new Date();

  return (
    <div className={classes}>
      <Text
        style={{
          color: colors.text,
          fontFamily: 'Rubik_400Regular',
          fontSize: sizes.BASE * 0.9,
        }}>
        {i18n.t('match_add_select_date')}
      </Text>
      <br />
      <DatePicker
        selected={myDt}
        onChange={onSetDate}
        showTimeSelect
        dateFormat="MMM d yyyy / hh:mm aa"
      />
    </div>
  );
};

export default DateField;
