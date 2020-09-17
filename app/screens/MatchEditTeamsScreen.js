import React from 'react';
import AppWrapper from '../containers/AppWrapper';
import MatchEditTeamsForm from '../containers/matches/MatchEditTeamsForm';

export default function MatchEditTeamsScreen({navigation, route}) {
  let matchId = route.params && route.params.id ? route.params.id : undefined;
  if (!matchId) {
    return null;
  }
  return (
    <AppWrapper
      refreshing={false}
      navigation={navigation}
      onRefresh={undefined}>
      <MatchEditTeamsForm matchId={matchId} />
    </AppWrapper>
  );
}
