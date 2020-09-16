import React from 'react';
import {Text} from 'react-native-elements';
import {View} from 'react-native';
import i18n from 'i18n-js';

const InviteInfo = ({invite, sizes}) => {
  if (!invite) return null;
  return (
    <View style={{marginBottom: sizes.BASE}}>
      <Text
        h4
        h4Style={{fontSize: sizes.BASE * 1.3, fontFamily: 'Rubik_400Regular'}}>
        <Text style={{fontWeight: 'bold'}}>
          {i18n.t('invites_invited_by_details')}
        </Text>
        : {invite.invitedBy.first_name + ' ' + invite.invitedBy.last_name}
      </Text>
      <Text
        h4
        h4Style={{fontSize: sizes.BASE * 1.1, fontFamily: 'Rubik_400Regular'}}>
        <Text style={{fontWeight: 'bold'}}>
          {i18n.t('invites_group_name_details')}
        </Text>
        : {invite.group.name}
      </Text>
    </View>
  );
};
export default InviteInfo;
