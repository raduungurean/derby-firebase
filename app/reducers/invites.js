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

const INITIAL_STATE = {
  accepting: false,
  requestSentAccept: false,
  errorAccepting: null,

  rejecting: false,
  requestSentReject: false,
  errorRejecting: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case INVITE_REJECTED: {
      return {
        ...state,
        requestSentReject: true,
      };
    }

    case INVITE_REJECTING: {
      return {
        ...state,
        rejecting: action.payload,
      };
    }

    case INVITE_ERR_REJECTING: {
      return {
        ...state,
        errorRejecting: action.payload,
      };
    }

    case INVITE_REJECT_CLEAR_ERROR: {
      return {
        ...state,
        errorRejecting: '',
      };
    }

    case INVITE_REJECT_RESET_STATE: {
      return {
        ...state,
        rejecting: false,
        requestSentReject: false,
        errorRejecting: null,
      };
    }

    case INVITE_ACCEPTED: {
      return {
        ...state,
        requestSentAccept: true,
      };
    }

    case INVITE_ACCEPTING: {
      return {
        ...state,
        accepting: action.payload,
      };
    }

    case INVITE_ERR_ACCEPTING: {
      return {
        ...state,
        errorAccepting: action.payload,
      };
    }

    case INVITE_ACCEPT_CLEAR_ERROR: {
      return {
        ...state,
        errorAccepting: '',
      };
    }

    case INVITE_ACCEPT_RESET_STATE: {
      return {
        ...state,
        accepting: false,
        requestSentAccept: false,
        errorAccepting: null,
      };
    }

    default:
      return state;
  }
}
