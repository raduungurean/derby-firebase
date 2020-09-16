import React from 'react';
import AppWrapper from '../containers/AppWrapper';
import GroupAddForm from '../containers/groups/GroupAddForm';

export default function GroupAddScreen({navigation}) {
  return (
    <AppWrapper refreshing={false} onRefresh={() => {}} navigation={navigation}>
      <GroupAddForm />
    </AppWrapper>
  );
}
