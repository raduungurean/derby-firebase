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

export default function AcceptInviteModal(props) {
  return (
    <Modal
      visible={props.visible !== undefined}
      onTouchOutside={props.onTouchOutside}
      modalStyle={{margin: props.sizes.BASE}}
      footer={
        <ModalFooter>
          <ModalButton
            style={{fontFamily: 'Rubik_400Regular'}}
            text={i18n.t('invites_accept_group_modal_cancel')}
            onPress={props.onTouchOutside}
          />
          <ModalButton
            style={{fontFamily: 'Rubik_400Regular'}}
            text={
              props.accepting
                ? i18n.t('invites_accept_group_modal_ok_progress')
                : i18n.t('invites_accept_group_modal_ok')
            }
            onPress={props.onPress}
          />
        </ModalFooter>
      }>
      <ModalContent style={{padding: props.sizes.BASE * 2}}>
        <InviteInfo sizes={props.sizes} invite={props.toAcceptInvite} />
        <Text style={{fontFamily: 'Rubik_400Regular'}}>
          {i18n.t('invites_accept_group_modal_confirm')}
        </Text>
      </ModalContent>
    </Modal>
  );
}

AcceptInviteModal.propTypes = {
  visible: PropTypes.any,
  onTouchOutside: PropTypes.func,
  sizes: PropTypes.any,
  accepting: PropTypes.any,
  onPress: PropTypes.func,
  toAcceptInvite: PropTypes.any,
};
