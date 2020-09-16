import React from 'react';
import AppWrapper from '../containers/AppWrapper';
import Player from '../containers/players/Player';
import {useGetSelectedGroup} from '../hooks/useGetSelectedGroup';

export default function PlayerScreen({navigation, route}) {
  const g = useGetSelectedGroup(route);
  const id = route.params && route.params.id ? route.params.id : undefined;

  return (
    <AppWrapper
      refreshing={false}
      navigation={navigation}
      onRefresh={undefined}>
      <Player g={g} id={id} />
    </AppWrapper>
  );
}
