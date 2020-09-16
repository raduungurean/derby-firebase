import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import i18n from 'i18n-js';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {useDerbyTheme} from '../../utils/theme';
import UploadButtonIcon from '../../components/profile/UploadButtonIcon';
import {useSelector} from 'react-redux';

export default function UpdateProfilePictureWeb(props) {
  const {colors, sizes} = useDerbyTheme();
  const {user} = useSelector((state) => state.auth);
  const thumb = user.photo_url;
  const submitButtonStyle = [
    styles.submitButton,
    {backgroundColor: colors.primary},
  ];
  return (
    <View style={{marginTop: sizes.BASE, padding: sizes.BASE}}>
      <Text
        style={{
          marginBottom: sizes.BASE,
          color: colors.text,
          fontSize: sizes.BASE * 1.2,
        }}>
        {i18n.t('profile_card_upload_profile_image')}
      </Text>
      <Button
        icon={<UploadButtonIcon ratio={1.5} uploading={false} thumb={thumb} />}
        iconRight
        iconContainerStyle={{borderColor: '#8dc919', borderWidth: 1}}
        onPress={props.onPress}
        buttonStyle={submitButtonStyle}
        titleStyle={{
          fontSize: sizes.BASE,
          fontFamily: 'Rubik_400Regular',
          marginRight: sizes.BASE,
        }}
        title={i18n.t('profile_card_pick_an_image')}
      />
    </View>
  );
}

UpdateProfilePictureWeb.propTypes = {
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  submitButton: {
    borderRadius: 30,
  },
});
