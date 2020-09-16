import {
  CHANGE_THEME,
  RESTORING_SELECTED_GROUP,
  SET_SORT_PLAYERS_BY,
  TOGGLE_GROUP_SELECTOR,
} from '../constants/layout';

const INITIAL_STATE = {
  theme: 0,
  selectedGroup: undefined,
  sortPlayersBy: 'perf',
  groupSelector: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_THEME: {
      return {
        ...state,
        theme: action.payload,
      };
    }

    case SET_SORT_PLAYERS_BY: {
      return {
        ...state,
        sortPlayersBy: action.payload,
      };
    }

    case TOGGLE_GROUP_SELECTOR: {
      return {
        ...state,
        groupSelector: !state.groupSelector,
      };
    }
    case RESTORING_SELECTED_GROUP: {
      if (state.selectedGroup === action.payload) {
        return state;
      }
      return {
        ...state,
        selectedGroup: action.payload,
      };
    }
    default:
      return state;
  }
}
