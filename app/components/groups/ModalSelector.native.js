import React from 'react';
import ModalSelector from 'react-native-modal-selector';
import i18n from 'i18n-js';

const ModalSelectorNative = ({
  visible,
  onModalClose,
  groups,
  selectedGroup,
  onChange,
}) => {
  let _mappedGroups = groups.map((g) => {
    return {
      key: g.id,
      label: selectedGroup === g.id ? g.name + ' *' : g.name,
    };
  });

  _mappedGroups = [
    {key: 0, label: 'All groups' + (!selectedGroup ? ' *' : '')},
  ].concat(_mappedGroups);

  return (
    <ModalSelector
      data={_mappedGroups}
      visible={visible}
      initValueTextStyle={{display: 'none'}}
      onChange={onChange}
      cancelText={i18n.t('groups_select_cancel')}
      onModalClose={onModalClose}
    />
  );
};

export default ModalSelectorNative;
