import {
  CLEAR_ERROR_INVITE_PLAYER,
  ERROR_INVITING_PLAYER,
  INVITED_PLAYER,
  INVITING_PLAYER,
  RESET_GROUPS_INVITES_STATE,
  EDITING_GROUP,
  EDITED_GROUP,
  CLEAR_ERROR_EDITING_GROUP,
  ERROR_EDITING_GROUP,
  RESET_GROUPS_EDIT_STATE,
  ADDING_GROUP,
  ADDED_GROUP,
  ERROR_ADDING_GROUP,
  CLEAR_ERROR_ADDING_GROUP,
  RESET_GROUPS_ADD_STATE,
  DELETING_GROUP,
  DELETED_GROUP,
  ERROR_DELETING_GROUP,
  CLEAR_ERROR_DELETING_GROUP,
  RESET_GROUPS_DELETE_STATE,
  LEAVING_GROUP,
  LEFT_GROUP,
  ERROR_LEAVING_GROUP,
  CLEAR_ERROR_LEAVING_GROUP,
  RESET_GROUPS_LEAVE_STATE,
} from '../constants/groups';
import {
  firebaseAddGroup,
  firebaseDeleteGroup,
  firebaseEditGroup,
  firebaseGetCurrentUserInfo,
  firebaseInvitePlayer,
  firebaseLeaveGroup,
  firebaseReloadCurrentUser,
} from '../services/firebase-utils';
import {navigate} from '../navigation/RootNavigation';
import {loggedIn} from './auth';

// invite player to group actions
export const invitingPlayer = (data) => ({
  type: INVITING_PLAYER,
  payload: data,
});

export const invitedPlayer = (data) => ({
  type: INVITED_PLAYER,
});

export const errorInvitingPlayer = (data) => ({
  type: ERROR_INVITING_PLAYER,
  payload: data,
});

export const clearErrorInvitePlayer = () => ({
  type: CLEAR_ERROR_INVITE_PLAYER,
});

export const resetGroupsInvitesState = () => ({
  type: RESET_GROUPS_INVITES_STATE,
});

export const invitePlayer = (email, invitedBy, group) => async (dispatch) => {
  dispatch(invitingPlayer(true));
  firebaseInvitePlayer(email, invitedBy, group)
    .then((res) => {
      dispatch(invitedPlayer());
    })
    .catch((err) => {
      dispatch(errorInvitingPlayer('other error'));
    })
    .finally(() => {
      dispatch(invitingPlayer(false));
    });
};

// edit group actions
export const editingGroup = (editing) => ({
  type: EDITING_GROUP,
  payload: editing,
});

export const editedGroup = () => ({
  type: EDITED_GROUP,
});

export const errorEditingGroup = (error) => ({
  type: ERROR_EDITING_GROUP,
  payload: error,
});

export const clearErrorEditingGroup = () => ({
  type: CLEAR_ERROR_EDITING_GROUP,
});

export const resetGroupsEditState = () => ({
  type: RESET_GROUPS_EDIT_STATE,
});

export const editGroup = (
  gId,
  groupName,
  shortDescription,
  allowShare,
) => async (dispatch, getState) => {
  dispatch(editingGroup(true));
  firebaseEditGroup({gId, groupName, shortDescription, allowShare})
    .then(async (res) => {
      await dispatch(editedGroup());
      await (() => {
        const auth = getState().auth;
        firebaseReloadCurrentUser().then(() => {
          firebaseGetCurrentUserInfo(
            auth.user.email,
            auth.user.emailVerified,
          ).then((user) => {
            dispatch(loggedIn(user));
          });
        });
      })();
      await navigate('groups');
    })
    .catch((err) => {
      if (err.message && err.message === 'already exists') {
        dispatch(errorEditingGroup({'already-exists': true}));
      } else {
        dispatch(errorEditingGroup('other error'));
      }
    })
    .finally(() => {
      dispatch(editingGroup(false));
    });
};

// add group actions
export const addingGroup = (adding) => ({
  type: ADDING_GROUP,
  payload: adding,
});

export const addedGroup = () => ({
  type: ADDED_GROUP,
});

export const errorAddingGroup = (error) => ({
  type: ERROR_ADDING_GROUP,
  payload: error,
});

export const clearErrorAddingGroup = () => ({
  type: CLEAR_ERROR_ADDING_GROUP,
});

export const resetGroupsAddState = () => ({
  type: RESET_GROUPS_ADD_STATE,
});

export const addGroup = (groupName, shortDescription) => async (
  dispatch,
  getState,
) => {
  dispatch(addingGroup(true));
  const auth = getState().auth;
  firebaseAddGroup({groupName, shortDescription, uid: auth.user.id})
    .then(async (res) => {
      // no need to firebaseReloadCurrentUser()
      // because it is automatically reloaded because we alter user.groups object
      await dispatch(addedGroup());
      await navigate('groups');
    })
    .catch((err) => {
      if (err.message && err.message === 'too many groups') {
        dispatch(errorAddingGroup({'too-many-groups': true}));
      } else if (err.message && err.message === 'already exists') {
        dispatch(errorAddingGroup({'already-exists': true}));
      } else {
        dispatch(errorAddingGroup('other error'));
      }
    })
    .finally(() => {
      dispatch(addingGroup(false));
    });
};

// delete

export const deletingGroup = (deleting) => ({
  type: DELETING_GROUP,
  payload: deleting,
});

export const deletedGroup = (deleting) => ({
  type: DELETED_GROUP,
  payload: deleting,
});

export const errorDeletingGroup = (error) => ({
  type: ERROR_DELETING_GROUP,
  payload: error,
});

export const clearErrorDeletingGroup = () => ({
  type: CLEAR_ERROR_DELETING_GROUP,
});

export const resetGroupsDeleteState = () => ({
  type: RESET_GROUPS_DELETE_STATE,
});

export const deleteGroup = (groupInfo) => async (dispatch, getState) => {
  dispatch(deletingGroup(true));
  const auth = getState().auth;
  firebaseDeleteGroup({...groupInfo, uid: auth.user.id})
    .then(async (res) => {
      // no need to firebaseReloadCurrentUser()
      // because it is automatically reloaded because we alter user.groups object
      await dispatch(deletedGroup());
      await navigate('groups');
    })
    .catch((err) => {
      if (err.message && err.message === 'not deletable') {
        dispatch(errorDeletingGroup({'not-deletable': true}));
      } else {
        dispatch(errorDeletingGroup('other error'));
      }
    })
    .finally(() => {
      dispatch(deletingGroup(false));
    });
};

// leave group
export const leavingGroup = (leaving) => ({
  type: LEAVING_GROUP,
  payload: leaving,
});

export const leftGroup = () => ({
  type: LEFT_GROUP,
});

export const errorLeavingGroup = (error) => ({
  type: ERROR_LEAVING_GROUP,
  payload: error,
});

export const clearErrorLeavingGroup = () => ({
  type: CLEAR_ERROR_LEAVING_GROUP,
});

export const resetGroupsLeaveState = () => ({
  type: RESET_GROUPS_LEAVE_STATE,
});

export const leaveGroup = (groupId) => async (dispatch, getState) => {
  dispatch(leavingGroup(true));
  const auth = getState().auth;
  firebaseLeaveGroup({id: groupId, uid: auth.user.id})
    .then(async (res) => {
      await dispatch(leftGroup());
      await navigate('groups');
    })
    .catch((err) => {
      dispatch(errorLeavingGroup('other error'));
    })
    .finally(() => {
      dispatch(leavingGroup(false));
    });
};
