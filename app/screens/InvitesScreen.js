import React from 'react';
import AppWrapper from '../containers/AppWrapper';
import InvitesList from '../containers/invites/InvitesList';

export default function InvitesScreen({navigation}) {
  return (
    <AppWrapper refreshing={false} navigation={navigation}>
      <InvitesList />
    </AppWrapper>
  );
}
