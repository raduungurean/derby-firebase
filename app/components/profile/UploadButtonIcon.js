import {useDerbyTheme} from '../../utils/theme';
import {Avatar, Icon} from 'react-native-elements';
import React from 'react';
import {ActivityIndicator} from 'react-native';

export default function UploadButtonIcon({thumb, uploading, ratio}) {
  const {colors, sizes} = useDerbyTheme();

  if (uploading) {
    return <ActivityIndicator color={colors.primary} />;
  }

  if (thumb && !thumb.includes('player.jpg')) {
    return (
      <Avatar
        rounded
        source={{uri: thumb}}
        size={sizes.FONT * (ratio ? ratio : 2.5)}
      />
    );
  }
  return (
    <Icon
      type="material-community"
      name="image"
      containerStyle={{marginRight: sizes.BASE / 2}}
      size={sizes.FONT * (ratio ? ratio : 2.5)}
      color={colors.background}
    />
  );
}
