import React from 'react';
import AppWrapper from '../containers/AppWrapper';
import InvitePlayerForm from '../containers/groups/InvitePlayerForm';

export default function GroupPlayerInviteScreen({route, navigation}) {
  let ge = route.params && route.params.ge ? route.params.ge : undefined;
  if (!ge) {
    return null;
  }
  return (
    <AppWrapper refreshing={false} onRefresh={() => {}} navigation={navigation}>
      <InvitePlayerForm ge={ge} />
    </AppWrapper>
  );
}
