import {LinearGradient} from 'expo-linear-gradient';
import {Text} from 'react-native-elements';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useDerbyTheme} from '../utils/theme';

export default function NoResultsMessage({message}) {
  const {colors, sizes} = useDerbyTheme();
  const linearGradientStyles = [
    styles.linearGradient,
    {
      marginHorizontal: sizes.BASE - 4,
      paddingHorizontal: sizes.BASE,
      paddingVertical: sizes.BASE,
      marginVertical: sizes.BASE / 1.5,
      borderWidth: 0,
      borderRadius: 5,
      width: '100%',
    },
  ];

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={linearGradientStyles}
      colors={[colors.joy2, colors.joy33, colors.joy2]}>
      <Text
        style={{
          color: colors.white,
          fontWeight: '500',
          fontFamily: 'Rubik_300Light',
        }}>
        {message}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flexDirection: 'column',
    borderRadius: 5,
    margin: 5,
    alignItems: 'flex-start',
  },
});

NoResultsMessage.propTypes = {
  message: PropTypes.string,
};
