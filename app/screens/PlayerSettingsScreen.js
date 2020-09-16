import React from 'react';
import AppWrapper from '../containers/AppWrapper';
import {useGetSelectedGroup} from '../hooks/useGetSelectedGroup';
import PlayerSettingsPage from '../containers/players/PlayerSettingsPage';

export default function PlayerSettingsScreen({navigation, route}) {
  const g = useGetSelectedGroup(route);
  const id = route.params && route.params.id ? route.params.id : undefined;

  return (
    <AppWrapper
      refreshing={false}
      onRefresh={undefined}
      navigation={navigation}>
      <PlayerSettingsPage g={g} id={id} navigation={navigation} />
    </AppWrapper>
  );
}
