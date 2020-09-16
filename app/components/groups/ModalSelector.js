import React from 'react';
import Modal, {ModalTransition} from '@atlaskit/modal-dialog';
import {Platform} from 'react-native';
import Select from 'react-select';

if (Platform.OS === 'web') {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(
    document.createTextNode(
      'div::-webkit-scrollbar{\n' +
        '\twidth:6px;\n' +
        '\tbackground-color:#cccccc;\n' +
        '\t}\n' +
        '\tdiv::-webkit-scrollbar:horizontal{\n' +
        '\theight:6px;\n' +
        '\t}\n' +
        '\tdiv::-webkit-scrollbar-track{\n' +
        '\tborder:0px #787878 solid;\n' +
        '\tborder-radius:4px;\n' +
        '\t-webkit-box-shadow:0 0 6px #c8c8c8 inset;\n' +
        '\t}\n' +
        '\tdiv::-webkit-scrollbar-thumb{\n' +
        '\tbackground-color:#999;\n' +
        '\tborder:0px solid #000000;\n' +
        '\tborder-radius:8px;\n' +
        '\t}\n' +
        '\tdiv::-webkit-scrollbar-thumb:hover{\n' +
        '\tbackground-color:#999;\n' +
        '\tborder:1px solid #333333;\n' +
        '\t}\n' +
        '\tdiv::-webkit-scrollbar-thumb:active{\n' +
        '\tbackground-color:#666;\n' +
        '\tborder:1px solid #333333;\n' +
        '\t}\n' +
        'h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5 {\n' +
        '  font-family: Rubik_400Regular;\n' +
        '  font-weight: 400;\n' +
        '  color: rgb(23, 43, 77);\n' +
        '}',
    ),
  );
  document.head.appendChild(style);
}

const ModalSelector = ({
  visible,
  onModalClose,
  groups,
  selectedGroup,
  onChange,
}) => {
  let _mappedGroups = groups.map((g) => {
    return {
      value: g.id,
      label: selectedGroup === g.id ? g.name + ' *' : g.name,
    };
  });

  _mappedGroups = [
    {value: 0, label: 'All groups' + (!selectedGroup ? ' *' : '')},
  ].concat(_mappedGroups);

  const defaultValue = _mappedGroups.find((m) => m.label.includes(' *'));

  return (
    <ModalTransition>
      {visible && (
        <Modal
          height={450}
          actions={[{text: 'Close', onClick: onModalClose}]}
          onClose={() => onModalClose}
          heading="Select group">
          <Select
            defaultValue={defaultValue}
            onChange={onChange}
            options={_mappedGroups}
          />
        </Modal>
      )}
    </ModalTransition>
  );
};

export default ModalSelector;
