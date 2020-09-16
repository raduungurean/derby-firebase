import {Icon, Input} from 'react-native-elements';
import React from 'react';
import {StyleSheet} from 'react-native';

export const FormInput = (props) => {
  const {icon, refInput, error, ...otherProps} = props;

  const stylesInputContainerErr = props.stylesInputContainerErr
    ? props.stylesInputContainerErr
    : styles.inputContainerErr;

  const stylesInputContainer = props.stylesInputContainer
    ? props.stylesInputContainer
    : styles.inputContainer;

  const stylesInputStyle = props.inputStyle
    ? props.inputStyle
    : styles.inputStyle;

  const stylesErrorInputStyle = props.errorInputStyle
    ? props.errorInputStyle
    : styles.errorInputStyle;

  const iconColor = props.iconColor ? props.iconColor : '#5ae2ad';
  const placeholderTextColor = props.placeholderTextColor
    ? props.placeholderTextColor
    : '#5ae2ad';

  return (
    <Input
      {...otherProps}
      ref={refInput}
      inputContainerStyle={
        error ? stylesInputContainerErr : stylesInputContainer
      }
      leftIcon={
        <Icon
          name={icon}
          type={'simple-line-icon'}
          color={iconColor}
          size={18}
        />
      }
      inputStyle={stylesInputStyle}
      autoFocus={false}
      autoCapitalize="none"
      keyboardAppearance="dark"
      errorStyle={stylesErrorInputStyle}
      autoCorrect={false}
      blurOnSubmit={false}
      placeholderTextColor={placeholderTextColor}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingLeft: 8,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#5ae2ad',
    height: 45,
    marginVertical: 3,
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
    fontSize: 16,
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: '#F44336',
  },
});
