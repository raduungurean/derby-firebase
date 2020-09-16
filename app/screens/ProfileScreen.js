import React from 'react';
import AppWrapper from '../containers/AppWrapper';
import ProfileForm from '../containers/profile/ProfileForm';

export default function ProfileScreen({navigation}) {
  return (
    <AppWrapper refreshing={false} onRefresh={() => {}} navigation={navigation}>
      <ProfileForm />
    </AppWrapper>
  );
}
