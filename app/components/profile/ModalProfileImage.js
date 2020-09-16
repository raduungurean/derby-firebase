import Modal, {ModalContent, SlideAnimation} from 'react-native-modals';
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  StyleSheet,
} from 'react-native';
import {Button, Icon, Image} from 'react-native-elements';
import * as PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {useDerbyTheme} from '../../utils/theme';
import i18n from 'i18n-js';
import {navigate} from '../../navigation/RootNavigation';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

export default function ModalProfileImage(props) {
  const [dimensions, setDimensions] = useState({window, screen});
  const {colors, sizes} = useDerbyTheme();

  const imageWidth = dimensions.window.width * 0.8;
  const imageHeight = dimensions.window.height * 0.8;

  const onChange = ({window, screen}) => {
    setDimensions({window, screen});
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  });

  return (
    <Modal
      modalStyle={{
        backgroundColor: 'rgba(255,255,255,0.97)',
        borderRadius: 2,
      }}
      width={Platform.OS !== 'web' ? 0.9 : 0.95}
      height={Platform.OS !== 'web' ? 0.9 : 0.95}
      onDismiss={props.onDismiss}
      onTouchOutside={props.onDismiss}
      swipeDirection={['left', 'right']}
      onSwipeOut={props.onSwipeOut}
      visible={props.visible}
      modalAnimation={new SlideAnimation({slideFrom: 'right'})}>
      <ModalContent style={{flexDirection: 'column'}}>
        <Image
          source={{uri: props.user.photo_url}}
          style={{
            borderRadius: 2,
            margin: 'auto',
            width: imageWidth,
            height: imageHeight - sizes.BASE * 4,
          }}
          PlaceholderContent={<ActivityIndicator />}
        />
        {props.editable !== false && (
          <Button
            type="outline"
            containerStyle={{
              marginVertical: sizes.BASE,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title={i18n.t('drawer_edit_image_modal_edit_button')}
            titleStyle={[
              styles.submitButtonText,
              {color: colors.primary, fontSize: sizes.BASE},
            ]}
            buttonStyle={styles.submitButton}
            disabledTitleStyle={{
              color: colors.textMuted,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
            icon={
              <Icon
                type="entypo"
                name="edit"
                style={{marginRight: sizes.BASE}}
                size={sizes.BASE}
                color={colors.primary}
              />
            }
            onPress={async () => {
              await navigate('update-profile-picture');
              await props.onDismiss();
            }}
          />
        )}
      </ModalContent>
    </Modal>
  );
}

ModalProfileImage.propTypes = {
  onDismiss: PropTypes.func,
  onSwipeOut: PropTypes.func,
  visible: PropTypes.bool,
  user: PropTypes.any,
  editable: PropTypes.bool,
};

const styles = StyleSheet.create({
  submitButtonText: {fontFamily: 'Rubik_400Regular'},
  submitButton: {
    width: 250,
    margin: 'auto',
  },
});
