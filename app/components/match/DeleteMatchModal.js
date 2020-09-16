import Modal, {
  ModalButton,
  ModalContent,
  ModalFooter,
} from 'react-native-modals';
import i18n from 'i18n-js';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {Text} from 'react-native-elements';

export default function DeleteMatchModal({
  toDeleteItem,
  onTouchOutside,
  sizes,
  deleting,
  onPress,
}) {
  return (
    <Modal
      visible={toDeleteItem !== undefined}
      onTouchOutside={onTouchOutside}
      modalStyle={{margin: sizes.BASE}}
      footer={
        <ModalFooter>
          <ModalButton
            style={{fontFamily: 'Rubik_400Regular'}}
            text={i18n.t('matches_page_delete_match_modal_cancel')}
            onPress={onTouchOutside}
          />
          <ModalButton
            style={{fontFamily: 'Rubik_400Regular'}}
            text={
              deleting
                ? i18n.t('matches_page_delete_match_modal_ok_progress')
                : i18n.t('matches_page_delete_match_modal_ok')
            }
            onPress={onPress}
          />
        </ModalFooter>
      }>
      <ModalContent style={{padding: sizes.BASE * 2}}>
        <Text style={{fontFamily: 'Rubik_400Regular'}}>
          {i18n.t('matches_page_delete_match_modal_confirm')}
        </Text>
      </ModalContent>
    </Modal>
  );
}

DeleteMatchModal.propTypes = {
  toDeleteItem: PropTypes.any,
  onTouchOutside: PropTypes.func,
  onPress: PropTypes.func,
  sizes: PropTypes.any,
  deleting: PropTypes.bool,
};
