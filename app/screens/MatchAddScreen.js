import React from 'react';
import AppWrapper from '../containers/AppWrapper';
import MatchAddForm from '../containers/matches/MatchAddForm';

export default function MatchAddScreen({navigation, route}) {
  return (
    <AppWrapper
      refreshing={false}
      navigation={navigation}
      onRefresh={undefined}>
      <MatchAddForm />
    </AppWrapper>
  );
}
