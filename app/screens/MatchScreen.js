import React from 'react';
import AppWrapper from '../containers/AppWrapper';
import {Text} from 'react-native-elements';
import Match from '../containers/matches/Match';

export default function MatchScreen({navigation, route}) {
  const id = route.params && route.params.id ? route.params.id : undefined;

  return (
    <AppWrapper
      refreshing={false}
      navigation={navigation}
      onRefresh={undefined}>
      <Match id={id} />
    </AppWrapper>
  );
}
