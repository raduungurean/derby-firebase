import React from 'react';
import AppWrapper from '../containers/AppWrapper';
import PasswordForm from '../containers/password/PasswordForm';

export default function PasswordScreen({navigation}) {
  return (
    <AppWrapper refreshing={false} onRefresh={() => {}} navigation={navigation}>
      <PasswordForm />
    </AppWrapper>
  );
}
