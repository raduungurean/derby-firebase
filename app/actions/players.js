import {
  firebaseGetPlayer,
  firebaseGetPlayers,
  firebaseKickOutPlayer,
  firebaseUpdatePlayerSettings,
} from '../services/firebase-utils';
import {
  ERROR_KICKING_OUT_PLAYER,
  ERROR_LOADING_PLAYER,
  ERROR_LOADING_PLAYERS,
  ERROR_UPDATING_SETTINGS,
  KICK_OUT_CLEAR_ERROR,
  KICK_OUT_RESET_STATE,
  KICKED_OUT_PLAYER,
  KICKING_OUT_PLAYER,
  LOADED_PLAYER,
  LOADED_PLAYERS,
  LOADING_PLAYER,
  LOADING_PLAYERS,
  RESET_PLAYERS_STATE,
  UPDATE_SETTINGS_CLEAR_ERROR,
  UPDATE_SETTINGS_RESET_STATE,
  UPDATED_SETTINGS,
  UPDATING_SETTINGS,
} from '../constants/players';

export const errorLoadingPlayers = (err) => ({
  type: ERROR_LOADING_PLAYERS,
  payload: err,
});

export const loadingPlayers = (loading) => ({
  type: LOADING_PLAYERS,
  payload: loading,
});

export const loadedPlayers = (players, lastVisible) => ({
  type: LOADED_PLAYERS,
  payload: {
    players,
    lastVisible,
  },
});

export const resetPlayersState = () => ({
  type: RESET_PLAYERS_STATE,
});

export const loadPlayers = (groupId, lastVisible) => async (
  dispatch,
  getState,
) => {
  let g = groupId;

  if (!groupId) {
    const userState = getState().auth.user;
    if (userState.groups) {
      g = Object.keys(userState.groups);
    }
  }

  dispatch(loadingPlayers(true));
  firebaseGetPlayers(g, lastVisible)
    .then(async (all) => {
      await dispatch(loadedPlayers(all.players, all.lastVisible));
    })
    .catch((err) => {
      dispatch(errorLoadingPlayers('error loading players'));
    })
    .finally(() => {
      dispatch(loadingPlayers(false));
    });
};

export const loadingPlayer = (loading) => ({
  type: LOADING_PLAYER,
  payload: loading,
});

export const loadedPlayer = (player) => ({
  type: LOADED_PLAYER,
  payload: player,
});

export const errorLoadingPlayer = (err) => ({
  type: ERROR_LOADING_PLAYER,
  payload: err,
});

export const loadPlayer = (playerId) => async (dispatch) => {
  dispatch(loadingPlayer(true));
  firebaseGetPlayer(playerId)
    .then(async (res) => {
      await dispatch(loadedPlayer(res.player));
    })
    .catch((err) => {
      dispatch(errorLoadingPlayer('error loading player'));
    })
    .finally(() => {
      dispatch(loadingPlayer(false));
    });
};

export const kickingOut = (kicking) => ({
  type: KICKING_OUT_PLAYER,
  payload: kicking,
});

export const errorKickingOutPlayer = (err) => ({
  type: ERROR_KICKING_OUT_PLAYER,
  payload: err,
});

export const kickedOut = (data) => ({
  type: KICKED_OUT_PLAYER,
  payload: data,
});

export const clearErrorKickOutPlayer = () => ({
  type: KICK_OUT_CLEAR_ERROR,
});

export const resetPlayerKickOutState = () => ({
  type: KICK_OUT_RESET_STATE,
});

export const kickOutPlayerFromGroup = (data) => async (dispatch) => {
  dispatch(kickingOut(true));
  firebaseKickOutPlayer(data)
    .then(async (res) => {
      await dispatch(kickedOut(data));
    })
    .catch((err) => {
      dispatch(errorKickingOutPlayer('error kicking out'));
    })
    .finally(() => {
      dispatch(kickingOut(false));
    });
};

export const updatingPlayerSettings = (g, updating) => ({
  type: UPDATING_SETTINGS,
  payload: {
    updating,
    g,
  },
});

export const errorUpdatingPlayerSettings = (g, err) => ({
  type: ERROR_UPDATING_SETTINGS,
  payload: {
    err,
    g,
  },
});

export const updatedPlayerSettings = (g) => ({
  type: UPDATED_SETTINGS,
  payload: {
    g,
  },
});

export const clearErrorUpdatePlayerSettings = () => ({
  type: UPDATE_SETTINGS_CLEAR_ERROR,
});

export const resetPlayerSettingsState = () => ({
  type: UPDATE_SETTINGS_RESET_STATE,
});

export const updatePlayerSettings = (g, newSettings, id) => async (
  dispatch,
) => {
  dispatch(updatingPlayerSettings(g, true));
  firebaseUpdatePlayerSettings({gid: g, newSettings, id})
    .then(async (res) => {
      await dispatch(updatedPlayerSettings(g));
    })
    .catch((err) => {
      dispatch(errorUpdatingPlayerSettings(g, 'error updating settings'));
    })
    .finally(() => {
      dispatch(updatingPlayerSettings(g, false));
    });
};
