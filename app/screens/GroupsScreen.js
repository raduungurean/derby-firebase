import React from 'react';
import AppWrapper from '../containers/AppWrapper';
import GroupsList from '../containers/groups/GroupsList';

export default function GroupsScreen({navigation}) {
  return (
    <AppWrapper refreshing={false} navigation={navigation}>
      <GroupsList />
    </AppWrapper>
  );
}
