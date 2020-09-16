import {
  ADDED_MATCH,
  ADDING_MATCH,
  CLEAR_ERROR_ADD_MATCH,
  CLEAR_ERROR_DELETE_MATCH,
  CLEAR_ERROR_LOAD_MATCH,
  CLEAR_SUBSCRIBE_ERROR,
  CLEAR_UNSUBSCRIBE_ERROR,
  DELETED_MATCH,
  DELETING_MATCH,
  ERROR_ADDING_MATCH,
  ERROR_DELETING_MATCH,
  ERROR_LOADING_MATCH,
  ERROR_LOADING_MATCHES,
  ERROR_SUBSCRIBING,
  ERROR_UNSUBSCRIBING,
  LOADED_MATCH,
  LOADED_MATCHES,
  LOADING_MATCH,
  LOADING_MATCHES,
  RESET_ADD_MATCH_STATE,
  RESET_DELETE_MATCH_STATE,
  RESET_LOAD_MATCH_STATE,
  RESET_STATE,
  RESET_SUBSCRIBE_STATE,
  RESET_UNSUBSCRIBE_STATE,
  SUBSCRIBED,
  SUBSCRIBING,
  UNSUBSCRIBED,
  UNSUBSCRIBING,
} from '../constants/matches';
import {
  firebaseAddMatch,
  firebaseDeleteMatch,
  firebaseGetMatches,
  firebaseLoadMatch,
  firebaseSubscribeToMatch,
  firebaseUnsubscribeToMatch,
} from '../services/firebase-utils';
import {navigate} from '../navigation/RootNavigation';
import {setSelectedGroupGlobally} from './layout';

export const loadingMatches = (loading) => ({
  type: LOADING_MATCHES,
  payload: loading,
});

export const resetMatchesListState = () => ({
  type: RESET_STATE,
});

export const loadedMatches = (
  matches,
  currentPage,
  hasNextPage,
  lastVisible,
) => ({
  type: LOADED_MATCHES,
  payload: {
    matches,
    currentPage,
    hasNextPage,
    lastVisible,
  },
});

export const errorLoadingMatches = (err) => ({
  type: ERROR_LOADING_MATCHES,
  payload: err,
});

export const loadMatchesFirstPage = (groupId) => async (dispatch, getState) => {
  let g = groupId;

  if (!groupId) {
    const userState = getState().auth.user;
    if (userState.groups) {
      g = Object.keys(userState.groups);
    }
  }

  dispatch(loadingMatches(true));
  firebaseGetMatches(g)
    .then(async (all) => {
      await dispatch(loadedMatches(all.matches, 1, null, all.lastVisible));
    })
    .catch((err) => {
      dispatch(errorLoadingMatches('error loading matches'));
    })
    .finally(() => {
      dispatch(loadingMatches(false));
    });
};

export const loadMatches = (groupId, lastVisible) => async (
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

  dispatch(loadingMatches(true));
  firebaseGetMatches(g, lastVisible)
    .then(async (all) => {
      await dispatch(loadedMatches(all.matches, 1, null, all.lastVisible));
    })
    .catch((err) => {
      dispatch(errorLoadingMatches('error loading matches'));
    })
    .finally(() => {
      dispatch(loadingMatches(false));
    });
};

export const addingMatch = (adding) => ({
  type: ADDING_MATCH,
  payload: adding,
});

export const addedMatch = (matchData) => ({
  type: ADDED_MATCH,
  payload: matchData,
});

export const errorAddingMatch = (msg) => ({
  type: ERROR_ADDING_MATCH,
  payload: msg,
});

export const clearErrorAddMatch = () => ({
  type: CLEAR_ERROR_ADD_MATCH,
});

export const resetAddMatchState = () => ({
  type: RESET_ADD_MATCH_STATE,
});

export const addMatch = (data) => async (dispatch) => {
  dispatch(addingMatch(true));
  firebaseAddMatch(data)
    .then(async (res) => {
      try {
        await dispatch(addedMatch(res));
        // TODO, add g= in URL maybe?
        await navigate('home');
        // TODO, if is already a group selected
        // switch to the new group
        // if is not, leave it like that
        // now I always switch to all-groups
        await dispatch(setSelectedGroupGlobally(null));
      } catch (e) {
        console.log('### error adding', e);
      }
    })
    .catch((err) => {
      dispatch(errorAddingMatch('error adding match'));
    })
    .finally(() => {
      dispatch(addingMatch(false));
    });
};

export const deletingMatch = (deleting) => ({
  type: DELETING_MATCH,
  payload: deleting,
});

export const deletedMatch = (matchId) => ({
  type: DELETED_MATCH,
  payload: matchId,
});

export const errorDeletingMatch = (msg) => ({
  type: ERROR_DELETING_MATCH,
  payload: msg,
});

export const clearErrorDeleteMatch = () => ({
  type: CLEAR_ERROR_DELETE_MATCH,
});

export const resetDeleteMatchState = () => ({
  type: RESET_DELETE_MATCH_STATE,
});

export const deleteMatch = (data) => async (dispatch) => {
  dispatch(deletingMatch(true));
  firebaseDeleteMatch(data)
    .then(async (res) => {
      try {
        await dispatch(deletedMatch(data.id));
      } catch (e) {
        console.log('### error adding', e);
      }
    })
    .catch((err) => {
      dispatch(errorDeletingMatch('error adding match'));
    })
    .finally(() => {
      dispatch(deletingMatch(false));
    });
};

export const loadingMatch = (loading) => ({
  type: LOADING_MATCH,
  payload: loading,
});

export const loadedMatch = (data) => ({
  type: LOADED_MATCH,
  payload: data,
});

export const errorLoadingMatch = (msg) => ({
  type: ERROR_LOADING_MATCH,
  payload: msg,
});

export const clearErrorLoadMatch = () => ({
  type: CLEAR_ERROR_LOAD_MATCH,
});

export const resetLoadMatchState = () => ({
  type: RESET_LOAD_MATCH_STATE,
});

export const loadMatch = (id) => async (dispatch) => {
  dispatch(loadingMatch(true));
  firebaseLoadMatch(id)
    .then(async (res) => {
      try {
        await dispatch(
          loadedMatch({
            match: res,
            id: id,
          }),
        );
      } catch (e) {
        console.log('### error adding', e);
      }
    })
    .catch((err) => {
      dispatch(errorLoadingMatch('error adding match'));
    })
    .finally(() => {
      dispatch(loadingMatch(false));
    });
};

export const subscribing = (subscribing, matchId) => ({
  type: SUBSCRIBING,
  payload: {
    subscribing,
    matchId,
  },
});

export const subscribed = (data) => ({
  type: SUBSCRIBED,
  payload: data,
});

export const errorSubscribing = (msg) => ({
  type: ERROR_SUBSCRIBING,
  payload: msg,
});

export const clearErrorSubscribeMatch = () => ({
  type: CLEAR_SUBSCRIBE_ERROR,
});

export const resetSubscribeState = () => ({
  type: RESET_SUBSCRIBE_STATE,
});

export const doSubscribe = (matchId) => async (dispatch) => {
  dispatch(subscribing(true, matchId));
  firebaseSubscribeToMatch(matchId)
    .then(async (res) => {
      try {
        await dispatch(
          subscribed({
            match: res,
            id: matchId,
          }),
        );
      } catch (e) {
        console.log('### error subscribing', e);
      }
    })
    .catch((err) => {
      dispatch(errorSubscribing('error subscribing'));
    })
    .finally(() => {
      dispatch(subscribing(false, matchId));
    });
};

export const unsubscribing = (unsubscribing, matchId) => ({
  type: UNSUBSCRIBING,
  payload: {
    unsubscribing,
    matchId,
  },
});

export const unsubscribed = (data) => ({
  type: UNSUBSCRIBED,
  payload: data,
});

export const errorUnsubscribing = (msg) => ({
  type: ERROR_UNSUBSCRIBING,
  payload: msg,
});

export const clearErrorUnsubscribeMatch = () => ({
  type: CLEAR_UNSUBSCRIBE_ERROR,
});

export const resetUnsubscribeState = () => ({
  type: RESET_UNSUBSCRIBE_STATE,
});

export const doUnsubscribe = (matchId) => async (dispatch) => {
  dispatch(unsubscribing(true, matchId));
  firebaseUnsubscribeToMatch(matchId)
    .then(async (res) => {
      try {
        await dispatch(
          unsubscribed({
            match: res,
            id: matchId,
          }),
        );
      } catch (e) {
        console.log('### error adding', e);
      }
    })
    .catch((err) => {
      dispatch(errorUnsubscribing('error subscribing'));
    })
    .finally(() => {
      dispatch(unsubscribing(false, matchId));
    });
};
