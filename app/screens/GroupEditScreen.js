import React from 'react';
import AppWrapper from '../containers/AppWrapper';
import GroupEditForm from '../containers/groups/GroupEditForm';
import {reloadUser} from '../actions/layout';
import {useDispatch} from 'react-redux';

export default function GroupEditScreen({route, navigation}) {
  let ge = route.params && route.params.ge ? route.params.ge : undefined;
  const dispatch = useDispatch();
  if (!ge) {
    return null;
  }
  return (
    <AppWrapper
      navigation={navigation}
      refreshing={false}
      onRefresh={async () => {
        dispatch(reloadUser());
      }}>
      <GroupEditForm ge={ge} />
    </AppWrapper>
  );
}
