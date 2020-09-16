import {StyleSheet, View} from 'react-native';
import {Button, Icon, Text} from 'react-native-elements';
import i18n from 'i18n-js';
import React, {useState} from 'react';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {useDerbyTheme} from '../../utils/theme';
import UploadButtonIcon from '../../components/profile/UploadButtonIcon';
import {uploadPicture} from '../../actions/profile';

export default function UpdateProfilePicture(props) {
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const {colors, sizes} = useDerbyTheme();
  const {user} = useSelector((state) => state.auth);
  const thumb = user.photo_url;

  const submitButtonStyle = [
    styles.submitButton,
    {backgroundColor: colors.primary},
  ];

  const _handleImagePicked = async (pickerResult) => {
    try {
      if (!pickerResult.cancelled) {
        const uriParts = pickerResult.uri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        await dispatch(
          uploadPicture(
            {
              uri: pickerResult.uri,
              name: `newFile.${fileType}`,
              type: `image/${fileType}`,
            },
            () => {
              setUploading(false);
            },
          ),
        );
      }
    } catch (e) {
      console.log('error', e);
      await setUploading(false);
    }
  };

  const _takePhoto = async () => {
    const {status: cameraPerm} = await Permissions.askAsync(Permissions.CAMERA);

    const {status: cameraRollPerm} = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
    );

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      const pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      await setUploading(true);
      await _handleImagePicked(pickerResult);
    }
  };

  const _pickImage = async () => {
    const {status: cameraRollPerm} = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
    );

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });

      await setUploading(true);
      await _handleImagePicked(pickerResult);
    }
  };

  return (
    <View style={{marginTop: sizes.BASE, padding: sizes.BASE}}>
      <Grid
        style={{
          marginVertical: sizes.BASE * 1.5,
          marginHorizontal: sizes.BASE / 1.5,
        }}>
        <Row>
          <Col style={{justifyContent: 'center'}}>
            <Text
              style={{
                color: colors.text,
                fontSize: sizes.BASE * 1.3,
                fontFamily: 'Rubik_400Regular',
              }}>
              {i18n.t('edit_profile_picture_label')}
            </Text>
          </Col>
          <Col style={{justifyContent: 'center', alignItems: 'flex-end'}}>
            <UploadButtonIcon uploading={uploading} thumb={thumb} />
          </Col>
        </Row>
      </Grid>

      <Button
        onPress={_pickImage}
        icon={
          <Icon
            type="material-community"
            name="image-multiple"
            size={sizes.FONT}
            color={colors.textMuted}
            iconStyle={{
              marginRight: sizes.BASE,
              fontSize: sizes.BASE * 1.5,
            }}
          />
        }
        buttonStyle={submitButtonStyle}
        containerStyle={{marginTop: sizes.BASE}}
        titleStyle={{fontSize: sizes.BASE}}
        title={i18n.t('edit_profile_pick')}
      />

      <Button
        onPress={_takePhoto}
        icon={
          <Icon
            type="antdesign"
            name="camera"
            size={sizes.FONT}
            color={colors.textMuted}
            iconStyle={{
              marginRight: sizes.BASE,
              fontSize: sizes.BASE * 1.5,
            }}
          />
        }
        buttonStyle={submitButtonStyle}
        containerStyle={{marginTop: sizes.BASE}}
        titleStyle={{fontSize: sizes.BASE, fontFamily: 'Rubik_400Regular'}}
        title={i18n.t('edit_profile_take')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    borderRadius: 30,
  },
});
