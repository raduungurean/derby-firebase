import React from 'react';
import DropdownAlert from 'react-native-dropdownalert';
import ddRef from '../services/drop-down-ref';
import {useDispatch} from 'react-redux';
import {
  clearLoginErrorMessage,
  clearSignUpErrorMessage,
  clearSignUpSuccessMessage,
  clearFpErrorMessage,
  clearFpSuccessMessage,
  clearVerifErrMessage,
  clearVerifSuccessMessage,
} from '../actions/auth';
import {
  clearErrorAddingGroup,
  clearErrorDeletingGroup,
  clearErrorEditingGroup,
  clearErrorInvitePlayer,
  clearErrorLeavingGroup,
  resetGroupsAddState,
  resetGroupsDeleteState,
  resetGroupsEditState,
  resetGroupsInvitesState,
  resetGroupsLeaveState,
} from '../actions/groups';
import {
  clearErrorUpdatingPassword,
  clearErrorUpdatingProfile,
  resetProfileState,
} from '../actions/profile';
import {
  clearErrorInviteAccept,
  clearErrorInviteReject,
  resetAcceptInvitesState,
  resetRejectInvitesState,
} from '../actions/invites';
import {
  clearErrorKickOutPlayer,
  clearErrorUpdatePlayerSettings,
  resetPlayerKickOutState,
  resetPlayerSettingsState,
} from '../actions/players';
import {
  clearErrorAddMatch,
  clearErrorDeleteMatch,
  clearErrorSubscribeMatch,
  clearErrorUnsubscribeMatch,
  resetAddMatchState,
  resetDeleteMatchState,
} from '../actions/matches';

const MyDropDownAlert = () => {
  const infoColor = '#003459';
  const dispatch = useDispatch();
  return (
    <DropdownAlert
      infoColor={infoColor}
      onClose={(alertType) => {
        if (alertType.payload.type === 'ERROR_SIGN_IN') {
          dispatch(clearLoginErrorMessage());
        }
        if (alertType.payload.type === 'ERROR_SIGN_UP') {
          dispatch(clearSignUpErrorMessage());
        }
        if (alertType.payload.type === 'SUCCESS_SIGN_UP') {
          dispatch(clearSignUpSuccessMessage());
        }
        if (alertType.payload.type === 'ERROR_FP') {
          dispatch(clearFpErrorMessage());
        }
        if (alertType.payload.type === 'SUCCESS_FP') {
          dispatch(clearFpSuccessMessage());
        }
        if (alertType.payload.type === 'ERROR_IP') {
          dispatch(clearErrorInvitePlayer());
        }
        if (alertType.payload.type === 'SUCCESS_IP') {
          dispatch(resetGroupsInvitesState());
        }
        if (alertType.payload.type === 'SUCCESS_EG') {
          dispatch(resetGroupsEditState());
        }
        if (alertType.payload.type === 'ERROR_EG') {
          dispatch(clearErrorEditingGroup());
        }
        if (alertType.payload.type === 'SUCCESS_AG') {
          dispatch(resetGroupsAddState());
        }
        if (alertType.payload.type === 'ERROR_AG') {
          dispatch(clearErrorAddingGroup());
        }
        if (alertType.payload.type === 'SUCCESS_DG') {
          dispatch(resetGroupsDeleteState());
        }
        if (alertType.payload.type === 'ERROR_DG') {
          dispatch(clearErrorDeletingGroup());
        }
        if (alertType.payload.type === 'SUCCESS_LG') {
          dispatch(resetGroupsLeaveState());
        }
        if (alertType.payload.type === 'ERROR_LG') {
          dispatch(clearErrorLeavingGroup());
        }
        if (alertType.payload.type === 'ERROR_PROF') {
          dispatch(clearErrorUpdatingProfile());
        }
        if (alertType.payload.type === 'ERROR_PASS') {
          dispatch(clearErrorUpdatingPassword());
        }
        if (alertType.payload.type === 'SUCCESS_PASS') {
          dispatch(resetProfileState());
        }
        if (alertType.payload.type === 'ERROR_RESEND') {
          dispatch(clearVerifErrMessage());
        }
        if (alertType.payload.type === 'SUCCESS_RESEND') {
          dispatch(clearVerifSuccessMessage());
        }
        if (alertType.payload.type === 'ERROR_A_INV') {
          dispatch(clearErrorInviteAccept());
        }
        if (alertType.payload.type === 'SUCCESS_A_INV') {
          dispatch(resetAcceptInvitesState());
        }
        if (alertType.payload.type === 'ERROR_R_INV') {
          dispatch(clearErrorInviteReject());
        }
        if (alertType.payload.type === 'SUCCESS_R_INV') {
          dispatch(resetRejectInvitesState());
        }
        if (alertType.payload.type === 'SUCCESS_KO') {
          dispatch(resetPlayerKickOutState());
        }
        if (alertType.payload.type === 'ERROR_KO') {
          dispatch(clearErrorKickOutPlayer());
        }
        if (alertType.payload.type === 'SUCCESS_PLST') {
          dispatch(resetPlayerSettingsState());
        }
        if (alertType.payload.type === 'ERROR_PLST') {
          dispatch(clearErrorUpdatePlayerSettings());
        }
        if (alertType.payload.type === 'SUCCESS_MTAD') {
          dispatch(resetAddMatchState());
        }
        if (alertType.payload.type === 'ERROR_MTAD') {
          dispatch(clearErrorAddMatch());
        }
        if (alertType.payload.type === 'SUCCESS_D_MT') {
          dispatch(resetDeleteMatchState());
        }
        if (alertType.payload.type === 'ERROR_D_MT') {
          dispatch(clearErrorDeleteMatch());
        }
        if (alertType.payload.type === 'ERROR_SUB') {
          dispatch(clearErrorSubscribeMatch());
        }
        if (alertType.payload.type === 'ERROR_UNSUB') {
          dispatch(clearErrorUnsubscribeMatch());
        }
      }}
      ref={(ref) => {
        ddRef.setDdRef(ref);
      }}
    />
  );
};

export default MyDropDownAlert;
