import React from 'react';
import {Avatar, ListItem, Text} from 'react-native-elements';
import {Col, Grid, Row} from 'react-native-easy-grid/index';
import {useDerbyTheme} from '../../utils/theme';

const TeamPlayerItem = ({item}) => {
  const {colors, sizes} = useDerbyTheme();
  return (
    <ListItem
      containerStyle={{
        paddingVertical: sizes.BASE * 0.2,
        paddingHorizontal: sizes.BASE * 0.2,
        backgroundColor: colors.backgroundCard,
        borderBottomWidth: 1,
        borderBottomColor: colors.joy3,
      }}
      leftAvatar={
        <Avatar rounded source={{uri: item.photo}} size={sizes.FONT * 1.7} />
      }
      title={
        <Text
          style={{
            fontFamily: 'Rubik_400Regular',
            color: colors.textMuted,
            fontSize: sizes.BASE * 0.7,
          }}>
          {item.first_name} {item.last_name}
        </Text>
      }
    />
  );
};

export default TeamPlayerItem;
