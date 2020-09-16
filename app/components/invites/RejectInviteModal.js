import Modal, {
  ModalButton,
  ModalContent,
  ModalFooter,
} from 'react-native-modals';
import i18n from 'i18n-js';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {Text} from 'react-native-elements';
import InviteInfo from './InviteInfo';

export default function RejectInviteModal(props) {
  return (
    <Modal
      visible={props.visible !== undefined}
      onTouchOutside={props.onTouchOutside}
      modalStyle={{margin: props.sizes.BASE}}
      footer={
        <ModalFooter>
          <ModalButton
            style={{fontFamily: 'Rubik_400Regular'}}
            text={i18n.t('invites_page_reject_modal_cancel')}
            onPress={props.onTouchOutside}
          />
          <ModalButton
            style={{fontFamily: 'Rubik_400Regular'}}
            text={
              props.rejecting
                ? i18n.t('invites_page_reject_modal_ok_progress')
                : i18n.t('invites_page_reject_modal_ok')
            }
            onPress={props.onPress}
          />
        </ModalFooter>
      }>
      <ModalContent style={{padding: props.sizes.BASE * 2}}>
        <InviteInfo sizes={props.sizes} invite={props.toRejectInvite} />
        <Text style={{fontFamily: 'Rubik_400Regular'}}>
          {i18n.t('invites_page_reject_modal_confirm')}
        </Text>
      </ModalContent>
    </Modal>
  );
}

RejectInviteModal.propTypes = {
  visible: PropTypes.any,
  onTouchOutside: PropTypes.func,
  sizes: PropTypes.any,
  rejecting: PropTypes.any,
  onPress: PropTypes.func,
  toRejectInvite: PropTypes.any,
};
