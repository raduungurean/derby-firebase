import {ScrollView, StyleSheet, View, Platform} from 'react-native';
import * as React from 'react';
import AuthPage from '../components/AuthPage';

export default function AuthScreen() {
  return (
    <View style={styles.container}>
      {Platform.OS !== 'web' ? (
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <AuthPage />
        </ScrollView>
      ) : (
        <AuthPage />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
