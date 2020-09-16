import Modal, {
  ModalButton,
  ModalContent,
  ModalFooter,
} from 'react-native-modals';
import i18n from 'i18n-js';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {Text} from 'react-native-elements';
import {useDerbyTheme} from '../../utils/theme';

export default function ShareWebModal(props) {
  const {sizes} = useDerbyTheme();
  let textArea;
  const copyCodeToClipboard = () => {
    const el = textArea;
    el.select();
    document.execCommand('copy');
  };
  return (
    <Modal
      visible={props.visible !== undefined}
      onTouchOutside={props.onTouchOutside}
      modalStyle={{margin: sizes.BASE}}
      footer={
        <ModalFooter>
          <ModalButton
            style={{fontFamily: 'Rubik_400Regular'}}
            text={i18n.t('groups_page_share_group_cancel')}
            onPress={props.onTouchOutside}
          />
          <ModalButton
            style={{fontFamily: 'Rubik_400Regular'}}
            text={i18n.t('groups_page_share_group_copy')}
            onPress={async () => {
              await copyCodeToClipboard();
              await props.onTouchOutside();
            }}
          />
        </ModalFooter>
      }>
      <ModalContent style={{padding: sizes.BASE * 2}}>
        <Text
          style={{marginVertical: sizes.BASE, fontFamily: 'Rubik_400Regular'}}>
          {i18n.t('groups_page_share_group_label_info')}
        </Text>
        <textarea ref={(textarea) => (textArea = textarea)}>
          {props.url}
        </textarea>
      </ModalContent>
    </Modal>
  );
}

ShareWebModal.propTypes = {
  visible: PropTypes.any,
  onTouchOutside: PropTypes.func,
  url: PropTypes.string,
};
