import {Grid, Row} from 'react-native-easy-grid';
import {Platform, Text} from 'react-native';
import React from 'react';
import {useDerbyTheme} from '../utils/theme';
import DropDownPicker from 'react-native-dropdown-picker';

export default function MyDropDownPicker({
  items,
  onChangeItem,
  label,
  zIndex,
  defaultValue,
  placeholder,
}) {
  const {colors, sizes, dark} = useDerbyTheme();

  let pr = {};

  if (placeholder) {
    pr = {
      ...pr,
      placeholder: placeholder,
    };
  }

  if (defaultValue) {
    pr = {
      ...pr,
      defaultValue: defaultValue,
    };
  }

  return (
    <Grid style={Platform.OS === 'web' ? {zIndex: zIndex, width: '100%'} : {}}>
      <Row style={{marginBottom: sizes.BASE / 2, marginTop: sizes.BASE * 1.3}}>
        <Text
          style={{
            color: colors.text,
            fontFamily: 'Rubik_400Regular',
            fontSize: sizes.BASE * 0.9,
          }}>
          {label}
        </Text>
      </Row>
      <Row>
        <DropDownPicker
          {...pr}
          items={items}
          containerStyle={{height: 40, width: '100%'}}
          placeholderStyle={{
            color: colors.text,
            fontFamily: 'Rubik_400Regular',
          }}
          labelStyle={{
            color: dark ? colors.white : colors.text,
            fontFamily: 'Rubik_400Regular',
          }}
          arrowColor={colors.text}
          style={{
            backgroundColor: colors.backgroundCard,
          }}
          zIndex={zIndex}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{
            backgroundColor: colors.backgroundCardNoOpacity,
            borderWidth: 1,
            borderTopWidth: 0,
            opacity: 1,
          }}
          onChangeItem={onChangeItem}
        />
      </Row>
    </Grid>
  );
}
