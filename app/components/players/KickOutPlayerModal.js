import Modal, {
  ModalButton,
  ModalContent,
  ModalFooter,
} from 'react-native-modals';
import i18n from 'i18n-js';
import * as React from 'react';
import {Text} from 'react-native-elements';
import {isEmptyObject} from '../../utils/helpers';

export default function KickOutPlayerModal({
  toKickOutPlayerItem,
  onTouchOutside,
  sizes,
  kickingOut,
  onPress,
}) {
  return (
    <Modal
      visible={!isEmptyObject(toKickOutPlayerItem)}
      onTouchOutside={onTouchOutside}
      modalStyle={{margin: sizes.BASE}}
      footer={
        <ModalFooter>
          <ModalButton
            style={{fontFamily: 'Rubik_400Regular'}}
            text={i18n.t('player_kick_out_modal_cancel')}
            onPress={onTouchOutside}
          />
          <ModalButton
            style={{fontFamily: 'Rubik_400Regular'}}
            text={
              kickingOut
                ? i18n.t('player_kick_out_modal_ok_progress')
                : i18n.t('player_kick_out_modal_ok')
            }
            onPress={onPress}
          />
        </ModalFooter>
      }>
      <ModalContent style={{padding: sizes.BASE * 2}}>
        <Text style={{fontFamily: 'Rubik_400Regular'}}>
          {i18n.t('player_kick_out_modal_confirm', {
            group: toKickOutPlayerItem.group,
            player: toKickOutPlayerItem.player,
          })}
        </Text>
      </ModalContent>
    </Modal>
  );
}
