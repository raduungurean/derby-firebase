import React from 'react';
import AppWrapper from '../containers/AppWrapper';
import MatchesList from '../containers/matches/MatchesList';
import {useGetSelectedGroup} from '../hooks/useGetSelectedGroup';

export default function HomeScreen({route, navigation}) {
  const g = useGetSelectedGroup(route);
  return (
    <AppWrapper
      refreshing={false}
      onRefresh={undefined}
      navigation={navigation}>
      <MatchesList g={g} />
    </AppWrapper>
  );
}
