import Modal, {
  ModalButton,
  ModalContent,
  ModalFooter,
} from 'react-native-modals';
import i18n from 'i18n-js';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {Text} from 'react-native-elements';

export default function LeaveGroupModal(props) {
  return (
    <Modal
      visible={props.visible !== undefined}
      onTouchOutside={props.onTouchOutside}
      modalStyle={{margin: props.sizes.BASE}}
      footer={
        <ModalFooter>
          <ModalButton
            style={{fontFamily: 'Rubik_400Regular'}}
            text={i18n.t('groups_page_leave_group_modal_cancel')}
            onPress={props.onTouchOutside}
          />
          <ModalButton
            style={{fontFamily: 'Rubik_400Regular'}}
            text={
              props.leaving
                ? i18n.t('groups_page_leave_group_modal_ok_progress')
                : i18n.t('groups_page_leave_group_modal_ok')
            }
            onPress={props.onPress}
          />
        </ModalFooter>
      }>
      <ModalContent style={{padding: props.sizes.BASE * 2}}>
        <Text style={{fontFamily: 'Rubik_400Regular'}}>
          {i18n.t('groups_page_leave_group_modal_confirm')}
        </Text>
      </ModalContent>
    </Modal>
  );
}

LeaveGroupModal.propTypes = {
  visible: PropTypes.any,
  onTouchOutside: PropTypes.func,
  sizes: PropTypes.any,
  leaving: PropTypes.any,
  onPress: PropTypes.func,
};
