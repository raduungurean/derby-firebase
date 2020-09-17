import React, {useState} from 'react';
import {Avatar, ListItem, Text} from 'react-native-elements';
import {useDerbyTheme} from '../../utils/theme';

const TeamPlayerItem = ({item, rightElement, fontSizeBigger}) => {
  const {colors, sizes} = useDerbyTheme();

  return (
    <ListItem
      containerStyle={{
        paddingVertical: sizes.BASE * (fontSizeBigger ? 0.3 : 0.2),
        paddingHorizontal: sizes.BASE * (fontSizeBigger ? 0.5 : 0.2),
        backgroundColor: colors.backgroundCard,
        borderBottomWidth: 1,
        borderBottomColor: colors.joy3,
      }}
      rightElement={rightElement}
      leftAvatar={
        <Avatar
          rounded
          source={{uri: item.photo}}
          size={sizes.FONT * (fontSizeBigger ? 2.1 : 1.7)}
        />
      }
      title={
        <Text
          style={{
            fontFamily: 'Rubik_400Regular',
            color: colors.textMuted,
            fontSize: sizes.BASE * (fontSizeBigger ? 0.9 : 0.7),
          }}>
          {item.first_name} {item.last_name}
        </Text>
      }
    />
  );
};

export default TeamPlayerItem;
