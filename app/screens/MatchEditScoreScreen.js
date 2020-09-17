import React from 'react';
import AppWrapper from '../containers/AppWrapper';
import MatchEditScoreForm from '../containers/matches/MatchEditScoreForm';

export default function MatchEditScoreScreen({navigation, route}) {
  let matchId = route.params && route.params.id ? route.params.id : undefined;
  if (!matchId) {
    return null;
  }
  return (
    <AppWrapper
      refreshing={false}
      navigation={navigation}
      onRefresh={undefined}>
      <MatchEditScoreForm matchId={matchId} />
    </AppWrapper>
  );
}
