import {
  ADDED_GROUP,
  ADDING_GROUP,
  CLEAR_ERROR_ADDING_GROUP,
  CLEAR_ERROR_DELETING_GROUP,
  CLEAR_ERROR_EDITING_GROUP,
  CLEAR_ERROR_INVITE_PLAYER,
  CLEAR_ERROR_LEAVING_GROUP,
  DELETED_GROUP,
  DELETING_GROUP,
  EDITED_GROUP,
  EDITING_GROUP,
  ERROR_ADDING_GROUP,
  ERROR_DELETING_GROUP,
  ERROR_EDITING_GROUP,
  ERROR_INVITING_PLAYER,
  ERROR_LEAVING_GROUP,
  INVITED_PLAYER,
  INVITING_PLAYER,
  LEAVING_GROUP,
  LEFT_GROUP,
  RESET_GROUPS_ADD_STATE,
  RESET_GROUPS_DELETE_STATE,
  RESET_GROUPS_EDIT_STATE,
  RESET_GROUPS_INVITES_STATE,
  RESET_GROUPS_LEAVE_STATE,
} from '../constants/groups';

const INITIAL_STATE = {
  // invite players
  inviting: false,
  errorInviting: null,
  toInvitePlayer: {
    group: null,
    emailAddress: '',
  },
  inviteRequestSent: false,

  // edit group
  editing: false,
  requestSentEdit: false,
  errorEditing: null,

  // add group
  adding: false,
  requestSentAdd: false,
  errorAdding: null,

  // delete group
  deleting: false,
  errorDeleting: null,
  requestSentDelete: false,

  // leave group
  leaving: false,
  errorLeaving: null,
  requestSentLeave: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    // invite
    case INVITING_PLAYER: {
      return {
        ...state,
        inviting: action.payload,
      };
    }
    case INVITED_PLAYER: {
      return {
        ...state,
        toInvitePlayer: {
          group: null,
          emailAddress: '',
        },
        inviteRequestSent: true,
      };
    }
    case CLEAR_ERROR_INVITE_PLAYER: {
      return {
        ...state,
        errorInviting: null,
      };
    }

    case RESET_GROUPS_INVITES_STATE: {
      return {
        ...state,
        inviting: false,
        errorInviting: null,
        toInvitePlayer: {
          group: null,
          emailAddress: '',
        },
        inviteRequestSent: false,
      };
    }

    case ERROR_INVITING_PLAYER: {
      return {
        ...state,
        errorInviting: action.payload,
      };
    }

    // edit
    case EDITED_GROUP: {
      return {
        ...state,
        requestSentEdit: true,
      };
    }

    case ERROR_EDITING_GROUP: {
      return {
        ...state,
        errorEditing: action.payload,
      };
    }

    case CLEAR_ERROR_EDITING_GROUP: {
      return {
        ...state,
        errorEditing: null,
      };
    }

    case EDITING_GROUP: {
      return {
        ...state,
        editing: action.payload,
      };
    }

    case RESET_GROUPS_EDIT_STATE: {
      return {
        ...state,
        editing: false,
        requestSentEdit: false,
        errorEditing: null,
      };
    }

    // add
    case ADDING_GROUP: {
      let adding = {
        ...state,
        adding: action.payload,
      };
      if (!action.payload) {
        adding = {
          ...adding,
          requestSentAdd: false,
          adding: action.payload,
        };
      }
      return adding;
    }

    case ADDED_GROUP: {
      return {
        ...state,
        adding: false,
        requestSentAdd: true,
      };
    }

    case ERROR_ADDING_GROUP: {
      return {
        ...state,
        errorAdding: action.payload,
      };
    }

    case CLEAR_ERROR_ADDING_GROUP: {
      return {
        ...state,
        errorAdding: null,
      };
    }

    case RESET_GROUPS_ADD_STATE: {
      return {
        ...state,
        adding: false,
        requestSentAdd: false,
        errorAdding: null,
      };
    }

    // delete group
    case CLEAR_ERROR_DELETING_GROUP: {
      return {
        ...state,
        errorDeleting: null,
      };
    }

    case RESET_GROUPS_DELETE_STATE: {
      return {
        ...state,
        deleting: false,
        requestSentDelete: false,
        errorDeleting: null,
      };
    }

    case DELETING_GROUP: {
      let deleting = {
        ...state,
        deleting: action.payload,
      };
      if (!action.payload) {
        deleting = {
          ...deleting,
          requestSentDelete: false,
        };
      }
      return deleting;
    }

    case DELETED_GROUP: {
      return {
        ...state,
        deleting: false,
        requestSentDelete: true,
      };
    }

    case ERROR_DELETING_GROUP: {
      return {
        ...state,
        errorDeleting: action.payload,
      };
    }

    // leave group
    case RESET_GROUPS_LEAVE_STATE: {
      return {
        ...state,
        deleting: false,
        requestSentDelete: false,
        errorDeleting: null,
      };
    }

    case LEAVING_GROUP: {
      return {
        ...state,
        leaving: action.payload,
      };
    }

    case LEFT_GROUP: {
      return {
        ...state,
        requestSentLeave: true,
      };
    }

    case ERROR_LEAVING_GROUP: {
      return {
        ...state,
        errorLeaving: action.payload,
      };
    }

    case CLEAR_ERROR_LEAVING_GROUP: {
      return {
        ...state,
        errorLeaving: null,
      };
    }

    default:
      return state;
  }
}
