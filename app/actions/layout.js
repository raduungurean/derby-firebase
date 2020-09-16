import {
  CHANGE_THEME,
  RESTORING_SELECTED_GROUP,
  SET_SORT_PLAYERS_BY,
  TOGGLE_GROUP_SELECTOR,
} from '../constants/layout';
import {loggedIn} from './auth';
import {
  firebaseGetCurrentUserInfo,
  firebaseReloadCurrentUser,
} from '../services/firebase-utils';

export const setTheme = (theme) => ({
  type: CHANGE_THEME,
  payload: theme,
});

export const setSortPlayersBy = (by) => ({
  type: SET_SORT_PLAYERS_BY,
  payload: by,
});

export const toggleGroupSelector = (theme) => ({
  type: TOGGLE_GROUP_SELECTOR,
});

export const setSelectedGroupGlobally = (selectedGroup) => ({
  type: RESTORING_SELECTED_GROUP,
  payload: selectedGroup,
});

export const reloadUser = () => async (dispatch, getState) => {
  const auth = getState().auth;
  firebaseReloadCurrentUser().then(() => {
    firebaseGetCurrentUserInfo(auth.user.email, auth.user.emailVerified).then(
      (user) => {
        dispatch(loggedIn(user));
      },
    );
  });
};
