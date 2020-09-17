import {LinearGradient} from 'expo-linear-gradient';
import {Text} from 'react-native-elements';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useDerbyTheme} from '../utils/theme';
import {useDispatch} from 'react-redux';
import {toggleGroupSelector} from '../actions/layout';

export default function FilterByGroupMessage({message, buttonText}) {
  const {sizes} = useDerbyTheme();
  const dispatch = useDispatch();
  const linearGradientStyles = [
    styles.linearGradient,
    {
      marginHorizontal: sizes.BASE - 6,
      paddingHorizontal: sizes.BASE / 2,
      paddingVertical: sizes.BASE / 3,
    },
  ];
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={linearGradientStyles}
      colors={['#eca43d', '#eea840', '#F9A620']}>
      <Text h5 style={styles.notVerifiedStyle}>
        {message}
      </Text>
      <Text
        h5
        style={[styles.resetGroupStyle, {marginLeft: sizes.BASE / 2}]}
        onPress={() => dispatch(toggleGroupSelector())}>
        {buttonText}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flexDirection: 'row',
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 0,
    alignItems: 'flex-start',
  },
  notVerifiedStyle: {
    color: '#fff',
    fontFamily: 'Rubik_400Regular',
  },
  resetGroupStyle: {
    color: '#fff',
    fontFamily: 'Rubik_500Medium',
    textDecorationLine: 'underline',
  },
});

FilterByGroupMessage.propTypes = {
  message: PropTypes.string,
};
