import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Dialog from 'react-native-dialog';

const DerbyDialog = ({visible}) => {
  return (
    <View>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Account delete</Dialog.Title>
        <Dialog.Description>
          Do you want to delete this account? You cannot undo this action.
        </Dialog.Description>
        <Dialog.Button label="Cancel" />
        <Dialog.Button label="Delete" />
      </Dialog.Container>
    </View>
  );
};

DerbyDialog.propTypes = {
  visible: PropTypes.bool,
};

export default DerbyDialog;
