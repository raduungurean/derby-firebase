import {
  AUTH_CLEAR_FP_ERR_MSG,
  AUTH_CLEAR_FP_SUCCESS_MSG,
  AUTH_CLEAR_LOGIN_ERROR_MESSAGE,
  AUTH_CLEAR_SIGN_UP_ERR_MSG,
  AUTH_CLEAR_SIGN_UP_OK_MSG,
  AUTH_CLEAR_VERIF_ERR_MSG,
  AUTH_CLEAR_VERIF_SUCCESS,
  AUTH_ERR_LOG_IN,
  AUTH_ERR_SIGN_UP,
  AUTH_ERR_SND_RECOVER_EMAIL,
  AUTH_LOGGED_IN,
  AUTH_LOGOUT,
  AUTH_RECOVER_EMAIL_SENT,
  AUTH_RESENDING_VERIF_EM,
  AUTH_RESENDING_VERIF_EM_ERR,
  AUTH_RESENT_VERIF_EM,
  AUTH_SET_FIELD,
  AUTH_SET_LOGGING_IN,
  AUTH_SET_RECOVERING,
  AUTH_SET_SIGNING_UP,
  AUTH_SIGNED_UP,
  RESTORING_TOKEN,
} from '../constants/auth';

const INITIAL_STATE = {
  user: null,
  token: null,
  loggingIn: false,
  isLoading: false,
  loginErrorMessage: '',

  isSigningUp: false,
  signUpSuccessMessage: '',
  signUpErrorMessage: '',

  recovering: false,
  recoveringMessage: '',
  recoveringErrorMessage: '',

  registrationState: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  },

  resending: false,
  resendingMessage: '',
  resendingErrorMessage: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_LOGOUT: {
      return {
        ...INITIAL_STATE,
      };
    }

    case AUTH_SET_FIELD: {
      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          [action.payload.key]: action.payload.text,
        },
      };
    }

    case AUTH_CLEAR_LOGIN_ERROR_MESSAGE: {
      return {
        ...state,
        loginErrorMessage: '',
      };
    }

    case AUTH_SET_LOGGING_IN: {
      return {
        ...state,
        loggingIn: action.payload,
      };
    }

    case RESTORING_TOKEN: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case AUTH_LOGGED_IN:
      let {user, token} = action.payload;
      if (!(user.stats === undefined)) {
        user = {
          ...user,
          stats: {
            total: 0,
            wins: 0,
            looses: 0,
          },
        };
      }
      return {
        ...state,
        user,
        token,
        loggingIn: false,
        isLoading: false,
      };

    case AUTH_ERR_LOG_IN:
      return {
        ...state,
        loggingIn: false,
        loginErrorMessage: action.payload,
      };

    case AUTH_SET_RECOVERING:
      return {
        ...state,
        recovering: action.payload,
      };

    case AUTH_RECOVER_EMAIL_SENT:
      return {
        ...state,
        recoveringMessage: action.payload,
      };

    case AUTH_ERR_SND_RECOVER_EMAIL:
      return {
        ...state,
        recoveringErrorMessage: action.payload,
      };

    case AUTH_CLEAR_FP_SUCCESS_MSG:
      return {
        ...state,
        recoveringMessage: '',
      };

    case AUTH_CLEAR_FP_ERR_MSG:
      return {
        ...state,
        recoveringErrorMessage: '',
      };

    case AUTH_SET_SIGNING_UP:
      return {
        ...state,
        isSigningUp: action.payload,
      };

    case AUTH_SIGNED_UP:
      return {
        ...state,
        isSigningUp: false,
        signUpSuccessMessage: action.payload,
      };

    case AUTH_ERR_SIGN_UP:
      return {
        ...state,
        signUpErrorMessage: action.payload,
      };

    case AUTH_CLEAR_SIGN_UP_ERR_MSG:
      return {
        ...state,
        signUpErrorMessage: '',
      };

    case AUTH_CLEAR_SIGN_UP_OK_MSG:
      return {
        ...state,
        signUpSuccessMessage: '',
      };

    case AUTH_RESENDING_VERIF_EM: {
      return {
        ...state,
        resending: action.payload,
      };
    }

    case AUTH_RESENDING_VERIF_EM_ERR: {
      return {
        ...state,
        resendingErrorMessage: action.payload,
      };
    }

    case AUTH_RESENT_VERIF_EM: {
      return {
        ...state,
        resending: false,
        resendingMessage: action.payload,
      };
    }

    case AUTH_CLEAR_VERIF_ERR_MSG: {
      return {
        ...state,
        resendingErrorMessage: '',
      };
    }

    case AUTH_CLEAR_VERIF_SUCCESS: {
      return {
        ...state,
        resending: false,
        resendingMessage: '',
        resendingErrorMessage: '',
      };
    }

    default:
      return state;
  }
}
