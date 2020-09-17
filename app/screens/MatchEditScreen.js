import React from 'react';
import AppWrapper from '../containers/AppWrapper';
import MatchEditForm from '../containers/matches/MatchEditForm';

export default function MatchEditScreen({navigation, route}) {
  let matchId = route.params && route.params.id ? route.params.id : undefined;
  if (!matchId) {
    return null;
  }
  return (
    <AppWrapper
      refreshing={false}
      navigation={navigation}
      onRefresh={undefined}>
      <MatchEditForm matchId={matchId} />
    </AppWrapper>
  );
}
