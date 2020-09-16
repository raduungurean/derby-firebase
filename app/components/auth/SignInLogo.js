import {Image, Platform, TouchableOpacity} from 'react-native';
import * as PropTypes from 'prop-types';
import React from 'react';

export default function SignInLogo(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        if (Platform.OS === 'web') {
          window.location.reload();
        }
      }}>
      <Image
        source={props.source}
        style={{
          width: 250,
          height: 55,
        }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

SignInLogo.propTypes = {source: PropTypes.any};
