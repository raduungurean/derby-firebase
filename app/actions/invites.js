import {
  INVITE_ACCEPT_CLEAR_ERROR,
  INVITE_ACCEPT_RESET_STATE,
  INVITE_ACCEPTED,
  INVITE_ACCEPTING,
  INVITE_ERR_ACCEPTING,
  INVITE_ERR_REJECTING,
  INVITE_REJECT_CLEAR_ERROR,
  INVITE_REJECT_RESET_STATE,
  INVITE_REJECTED,
  INVITE_REJECTING,
} from '../constants/invites';
import {
  firebaseAcceptInvite,
  firebaseRejectInvite,
} from '../services/firebase-utils';

export const rejectedInvite = () => ({
  type: INVITE_REJECTED,
});

export const rejectingInvite = (rejecting) => ({
  type: INVITE_REJECTING,
  payload: rejecting,
});

export const errorRejectingInvite = (err) => ({
  type: INVITE_ERR_REJECTING,
  payload: err,
});

export const clearErrorInviteReject = () => ({
  type: INVITE_REJECT_CLEAR_ERROR,
});

export const resetRejectInvitesState = () => ({
  type: INVITE_REJECT_RESET_STATE,
});

export const rejectInvite = ({id}) => async (dispatch) => {
  dispatch(rejectingInvite(true));
  firebaseRejectInvite(id)
    .then(async (res) => {
      await dispatch(rejectedInvite(res));
    })
    .catch((err) => {
      dispatch(errorRejectingInvite('error'));
    })
    .finally(() => {
      dispatch(rejectingInvite(false));
    });
};

export const acceptedInvite = () => ({
  type: INVITE_ACCEPTED,
});

export const acceptingInvite = (accepting) => ({
  type: INVITE_ACCEPTING,
  payload: accepting,
});

export const errorAcceptingInvite = (err) => ({
  type: INVITE_ERR_ACCEPTING,
  payload: err,
});

export const clearErrorInviteAccept = () => ({
  type: INVITE_ACCEPT_CLEAR_ERROR,
});

export const resetAcceptInvitesState = () => ({
  type: INVITE_ACCEPT_RESET_STATE,
});

export const acceptInvite = ({id}) => async (dispatch) => {
  dispatch(acceptingInvite(true));
  firebaseAcceptInvite(id)
    .then(async (res) => {
      await dispatch(acceptedInvite(res));
    })
    .catch((err) => {
      dispatch(errorAcceptingInvite('error'));
    })
    .finally(() => {
      dispatch(acceptingInvite(false));
    });
};
