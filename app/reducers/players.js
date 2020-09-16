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
import omit from 'lodash/omit';

const INITIAL_STATE = {
  // players
  loadingPlayers: false,
  errorLoadingPlayers: null,
  lastVisible: null,
  byId: {},

  // player
  loadingPlayer: false,
  errorLoadingPlayer: null,

  // kick out player
  kickingOutPlayer: false,
  errorKickingOut: '',
  requestKickOutSuccess: false,

  // updating player settings
  updatingPlayerSettings: {},
  errorUpdatingPlayerSettings: {},
  requestSentUpdatePlayerSettings: {},
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESET_PLAYERS_STATE: {
      return {
        ...INITIAL_STATE,
      };
    }

    case LOADING_PLAYERS: {
      return {
        ...state,
        loadingPlayers: action.payload,
      };
    }

    case ERROR_LOADING_PLAYERS: {
      return {
        ...state,
        errorLoadingPlayers: action.payload,
      };
    }

    case LOADED_PLAYERS: {
      const players = action.payload.players;
      const updatedPlayers = players.reduce((accumulator, current) => {
        return Object.assign(accumulator, {[current.id]: current});
      }, {});

      return {
        ...state,
        lastVisible: action.payload.lastVisible,
        byId: Object.assign({}, state.byId, updatedPlayers),
      };
    }

    case LOADING_PLAYER: {
      return {
        ...state,
        loadingPlayer: action.payload,
      };
    }

    case ERROR_LOADING_PLAYER: {
      return {
        ...state,
        errorLoadingPlayer: action.payload,
      };
    }

    case LOADED_PLAYER: {
      let updatedPlayer = {
        byId: {
          [action.payload.id]: action.payload,
        },
      };

      return {
        ...state,
        byId: Object.assign({}, state.byId, updatedPlayer.byId),
      };
    }

    case KICKING_OUT_PLAYER: {
      return {
        ...state,
        kickingOutPlayer: action.payload,
      };
    }

    case ERROR_KICKING_OUT_PLAYER: {
      return {
        ...state,
        errorKickingOut: action.payload,
      };
    }

    case KICK_OUT_CLEAR_ERROR: {
      return {
        ...state,
        errorKickingOut: '',
      };
    }

    case KICKED_OUT_PLAYER: {
      let player = state.byId[action.payload.id];
      if (!player) {
        return {
          ...state,
        };
      }

      player = {
        ...player,
        g: player.g.filter((gr) => gr !== action.payload.gid),
        groups: omit(player.g, [action.payload.gid]),
        roles: omit(player.roles, [action.payload.gid]),
        st: omit(player.roles, [action.payload.gid]),
        lastMatch: omit(player.lastMatch, [action.payload.gid]),
      };

      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: player,
        },
        requestKickOutSuccess: true,
      };
    }

    case KICK_OUT_RESET_STATE: {
      return {
        ...state,
        kickingOutPlayer: false,
        errorKickingOut: '',
        requestKickOutSuccess: false,
      };
    }

    case UPDATING_SETTINGS: {
      return {
        ...state,
        updatingPlayerSettings: {
          ...state.updatingPlayerSettings,
          [action.payload.g]: action.payload.updating,
        },
      };
    }

    case ERROR_UPDATING_SETTINGS: {
      return {
        ...state,
        errorUpdatingPlayerSettings: {
          ...state.errorUpdatingPlayerSettings,
          [action.payload.g]: action.payload.err,
        },
      };
    }

    case UPDATED_SETTINGS: {
      return {
        ...state,
        requestSentUpdatePlayerSettings: {
          ...state.requestSentUpdatePlayerSettings,
          [action.payload.g]: true,
        },
      };
    }

    case UPDATE_SETTINGS_CLEAR_ERROR: {
      return {
        ...state,
        errorUpdatingPlayerSettings: {},
      };
    }

    case UPDATE_SETTINGS_RESET_STATE: {
      return {
        ...state,
        updatingPlayerSettings: {},
        errorUpdatingPlayerSettings: {},
        requestSentUpdatePlayerSettings: {},
      };
    }

    default:
      return state;
  }
}
