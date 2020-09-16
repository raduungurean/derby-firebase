import {ActivityIndicator, View} from 'react-native';
import React from 'react';
import {useDerbyTheme} from '../utils/theme';

export default function SpinLoader() {
  const {colors} = useDerbyTheme();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator color={colors.primary} size={40} />
    </View>
  );
}
