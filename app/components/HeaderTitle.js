import React from 'react';
import {Text} from 'react-native-elements';
import {Platform} from 'react-native';
import {navigate} from '../navigation/RootNavigation';
import {useDerbyTheme} from '../utils/theme';

const HeaderTitle = ({style, children}) => {
  const {colors} = useDerbyTheme();
  return (
    <Text
      onPress={() => {
        if (Platform.OS === 'web') {
          if (children === 'Derby.Today') {
            window.location.href = '/';
          }
        } else {
          if (children === 'Derby.Today') {
            navigate('home');
          }
        }
      }}
      style={[style, {color: colors.text}]}>
      {children}
    </Text>
  );
};

export default HeaderTitle;
