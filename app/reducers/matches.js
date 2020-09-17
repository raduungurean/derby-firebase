import {
  ADDED_MATCH,
  ADDING_MATCH,
  CLEAR_ERROR_ADD_MATCH,
  CLEAR_ERROR_DELETE_MATCH,
  CLEAR_ERROR_EDIT_MATCH,
  CLEAR_ERROR_EDIT_SCORE_MATCH,
  CLEAR_ERROR_EDIT_TEAMS_MATCH,
  CLEAR_ERROR_LOAD_MATCH,
  CLEAR_SUBSCRIBE_ERROR,
  CLEAR_UNSUBSCRIBE_ERROR,
  DELETED_MATCH,
  DELETING_MATCH,
  EDITED_MATCH,
  EDITED_SCORE_MATCH,
  EDITED_TEAMS_MATCH,
  EDITING_MATCH,
  EDITING_SCORE_MATCH,
  EDITING_TEAMS_MATCH,
  ERROR_ADDING_MATCH,
  ERROR_DELETING_MATCH,
  ERROR_EDITING_MATCH,
  ERROR_EDITING_SCORE_MATCH,
  ERROR_EDITING_TEAMS_MATCH,
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
  RESET_EDIT_MATCH_STATE,
  RESET_EDIT_SCORE_MATCH_STATE,
  RESET_EDIT_TEAMS_MATCH_STATE,
  RESET_LOAD_MATCH_STATE,
  RESET_STATE,
  RESET_SUBSCRIBE_STATE,
  RESET_UNSUBSCRIBE_STATE,
  SUBSCRIBED,
  SUBSCRIBING,
  UNSUBSCRIBED,
  UNSUBSCRIBING,
} from '../constants/matches';
import omit from 'lodash/omit';

const INITIAL_STATE = {
  loadingMatches: false,
  errorLoadingMatches: null,
  currentPage: null,
  loadedAtLeastOneTime: undefined,
  hasNextPage: null,
  lastVisible: null,
  byId: {},

  // add match
  adding: false,
  added: false,
  errorAdding: '',

  // edit match
  editing: false,
  edited: false,
  errorEditing: '',

  // edit match teams
  editingTeams: false,
  editedTeams: false,
  errorEditingTeams: '',

  // edit set score
  editingScore: false,
  editedScore: false,
  errorEditingScore: '',

  // delete match
  deleting: false,
  deleted: false,
  errorDeleting: '',

  // load a match
  loading: false,
  loaded: false,
  errorLoading: '',

  // subscribe to a match
  subscribing: {},
  subscribed: false,
  errorSubscribing: '',

  // load a match
  unsubscribing: false,
  unsubscribed: false,
  errorUnsubscribing: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESET_STATE:
      return {
        ...INITIAL_STATE,
      };

    case LOADING_MATCHES:
      return {
        ...state,
        loadingMatches: action.payload !== undefined ? action.payload : true,
      };

    case LOADED_MATCHES: {
      const {currentPage, matches, hasNextPage, lastVisible} = action.payload;

      const updatedMatches = matches.reduce((accumulator, current) => {
        return Object.assign(accumulator, {[current.id]: current});
      }, {});

      return {
        ...state,
        loadingMatches: false,
        errorLoadingMatches: null,
        loadedAtLeastOneTime: true,
        currentPage,
        hasNextPage,
        lastVisible,
        byId: Object.assign({}, state.byId, updatedMatches),
      };
    }

    case ERROR_LOADING_MATCHES: {
      return {
        ...state,
        errorLoadingMatches: action.payload,
      };
    }

    case ADDING_MATCH: {
      return {
        ...state,
        adding: action.payload,
      };
    }

    case ADDED_MATCH: {
      const match = action.payload;

      const matches = {
        ...state.byId,
        [action.payload.id]: match,
      };

      return {
        ...state,
        added: true,
        byId: matches,
      };
    }

    case ERROR_ADDING_MATCH: {
      return {
        ...state,
        errorAdding: action.payload,
      };
    }

    case RESET_ADD_MATCH_STATE: {
      return {
        ...state,
        adding: false,
        added: false,
        errorAdding: '',
      };
    }

    case CLEAR_ERROR_ADD_MATCH: {
      return {
        ...state,
        errorAdding: '',
      };
    }

    case EDITING_MATCH: {
      return {
        ...state,
        editing: action.payload,
      };
    }

    case EDITED_MATCH: {
      const match = action.payload;

      const matches = {
        ...state.byId,
        [action.payload.id]: match,
      };

      return {
        ...state,
        edited: true,
        byId: matches,
      };
    }

    case ERROR_EDITING_MATCH: {
      return {
        ...state,
        errorEditing: action.payload,
      };
    }

    case RESET_EDIT_MATCH_STATE: {
      return {
        ...state,
        editing: false,
        edited: false,
        errorEditing: '',
      };
    }

    case CLEAR_ERROR_EDIT_MATCH: {
      return {
        ...state,
        errorEditing: '',
      };
    }

    case EDITING_SCORE_MATCH: {
      return {
        ...state,
        editingScore: action.payload,
      };
    }

    case EDITED_SCORE_MATCH: {
      const match = action.payload;

      const matches = {
        ...state.byId,
        [action.payload.id]: match,
      };

      return {
        ...state,
        editedScore: true,
        byId: matches,
      };
    }

    case ERROR_EDITING_SCORE_MATCH: {
      return {
        ...state,
        errorEditingScore: action.payload,
      };
    }

    case RESET_EDIT_SCORE_MATCH_STATE: {
      return {
        ...state,
        editingScore: false,
        editedScore: false,
        errorEditingScore: '',
      };
    }

    case CLEAR_ERROR_EDIT_SCORE_MATCH: {
      return {
        ...state,
        errorEditingScore: '',
      };
    }

    case EDITING_TEAMS_MATCH: {
      return {
        ...state,
        editingTeams: action.payload,
      };
    }

    case EDITED_TEAMS_MATCH: {
      const match = action.payload;

      const matches = {
        ...state.byId,
        [action.payload.id]: match,
      };

      return {
        ...state,
        editedTeams: true,
        byId: matches,
      };
    }

    case ERROR_EDITING_TEAMS_MATCH: {
      return {
        ...state,
        errorEditingTeams: action.payload,
      };
    }

    case RESET_EDIT_TEAMS_MATCH_STATE: {
      return {
        ...state,
        editingTeams: false,
        editedTeams: false,
        errorEditingTeams: '',
      };
    }

    case CLEAR_ERROR_EDIT_TEAMS_MATCH: {
      return {
        ...state,
        errorEditingTeams: '',
      };
    }

    case DELETING_MATCH: {
      return {
        ...state,
        deleting: action.payload,
      };
    }

    case DELETED_MATCH: {
      const matchId = action.payload;

      const matches = omit(state.byId, [matchId]);

      return {
        ...state,
        deleted: true,
        byId: matches,
      };
    }

    case ERROR_DELETING_MATCH: {
      return {
        ...state,
        errorDeleting: action.payload,
      };
    }

    case RESET_DELETE_MATCH_STATE: {
      return {
        ...state,
        deleting: false,
        deleted: false,
        errorDeleting: '',
      };
    }

    case CLEAR_ERROR_DELETE_MATCH: {
      return {
        ...state,
        errorDeleting: '',
      };
    }

    case LOADING_MATCH: {
      return {
        ...state,
        loading: action.payload,
      };
    }

    case LOADED_MATCH: {
      const match = action.payload.match;
      const matchId = action.payload.id;

      return {
        ...state,
        loaded: true,
        byId: {
          ...state.byId,
          [matchId]: {
            ...match,
            id: matchId,
          },
        },
      };
    }

    case ERROR_LOADING_MATCH: {
      return {
        ...state,
        errorLoading: action.payload,
      };
    }

    case RESET_LOAD_MATCH_STATE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        errorLoading: '',
      };
    }

    case CLEAR_ERROR_LOAD_MATCH: {
      return {
        ...state,
        errorLoading: '',
      };
    }

    case SUBSCRIBING: {
      return {
        ...state,
        subscribing: {
          ...state.subscribing,
          [action.payload.matchId]: action.payload.subscribing,
        },
      };
    }

    case SUBSCRIBED: {
      const match = action.payload.match;
      const matchId = action.payload.id;

      return {
        ...state,
        subscribed: true,
        byId: {
          ...state.byId,
          [matchId]: {
            ...match,
            id: matchId,
          },
        },
      };
    }

    case ERROR_SUBSCRIBING: {
      if (state.errorSubscribing !== '') {
        return state;
      }

      return {
        ...state,
        errorSubscribing: action.payload,
      };
    }

    case RESET_SUBSCRIBE_STATE: {
      return {
        ...state,
        subscribing: {},
        subscribed: false,
        errorSubscribing: '',
      };
    }

    case CLEAR_SUBSCRIBE_ERROR: {
      return {
        ...state,
        errorSubscribing: '',
      };
    }

    case UNSUBSCRIBING: {
      return {
        ...state,
        unsubscribing: {
          ...state.unsubscribing,
          [action.payload.matchId]: action.payload.unsubscribing,
        },
      };
    }

    case UNSUBSCRIBED: {
      const match = action.payload.match;
      const matchId = action.payload.id;

      return {
        ...state,
        unsubscribed: true,
        byId: {
          ...state.byId,
          [matchId]: {
            ...match,
            id: matchId,
          },
        },
      };
    }

    case ERROR_UNSUBSCRIBING: {
      if (state.errorUnsubscribing !== '') {
        return state;
      }
      return {
        ...state,
        errorUnsubscribing: action.payload,
      };
    }

    case RESET_UNSUBSCRIBE_STATE: {
      return {
        ...state,
        unsubscribing: {},
        unsubscribed: false,
        errorUnsubscribing: '',
      };
    }

    case CLEAR_UNSUBSCRIBE_ERROR: {
      return {
        ...state,
        errorUnsubscribing: '',
      };
    }

    default:
      return state;
  }
}
