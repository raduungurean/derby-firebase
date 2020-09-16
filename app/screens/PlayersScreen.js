import React from 'react';
import AppWrapper from '../containers/AppWrapper';
import PlayersList from '../containers/players/PlayersList';
import {useGetSelectedGroup} from '../hooks/useGetSelectedGroup';

export default function PlayersScreen({navigation, route}) {
  const g = useGetSelectedGroup(route);
  return (
    <AppWrapper refreshing={false} navigation={navigation}>
      <PlayersList navigation={navigation} g={g} />
    </AppWrapper>
  );
}
