import React, {useState} from 'react';
import AppWrapper from '../containers/AppWrapper';
import UpdateProfilePicture from '../containers/profile/UpdateProfilePicture';
import UpdateProfilePictureWeb from '../containers/profile/UpdateProfilePictureWeb';
import {Platform} from 'react-native';
import UpdateProfilePictureWebModal from '../containers/profile/UpdateProfilePictureWebModal';

export default function UpdateProfilePictureScreen({navigation}) {
  const [
    showWebModalPictureUploadForm,
    setShowWebModalPictureUploadForm,
  ] = useState(false);
  return (
    <AppWrapper refreshing={false} onRefresh={() => {}} navigation={navigation}>
      {Platform.OS !== 'web' && <UpdateProfilePicture />}
      {Platform.OS === 'web' && (
        <UpdateProfilePictureWeb
          onPress={() => setShowWebModalPictureUploadForm(true)}
        />
      )}
      {Platform.OS === 'web' && (
        <UpdateProfilePictureWebModal
          visible={showWebModalPictureUploadForm}
          onBackdropPress={() => setShowWebModalPictureUploadForm(false)}
        />
      )}
    </AppWrapper>
  );
}
