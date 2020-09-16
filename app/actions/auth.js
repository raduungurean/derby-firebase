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
import {navigate} from '../navigation/RootNavigation';
import {
  firebaseGetGroups,
  firebaseGetLocations,
  firebasePersistPushNotificationToken,
  firebaseResendVerificationEmail,
  firebaseSignIn,
  firebaseSignOut,
  firebaseSignUpUser,
} from '../services/firebase-utils';
import {apiUtils} from '../services/api-utils';
import {resetMatchesListState} from './matches';
import {resetPlayersState} from './players';

export const loggedIn = (data) => async (dispatch) => {
  const groupIds = Object.keys(data.groups);
  let newData;
  if (groupIds.length) {
    const [groups, locations] = await Promise.all([
      firebaseGetGroups(groupIds),
      firebaseGetLocations(groupIds),
    ]);

    newData = {
      ...data,
      user: {
        ...data,
        groupData: groups,
        locations: locations,
      },
    };
  } else {
    newData = {
      ...data,
      user: {
        ...data,
      },
    };
  }

  await dispatch({
    type: AUTH_LOGGED_IN,
    payload: newData,
  });
};

export const restoringToken = () => ({
  type: RESTORING_TOKEN,
});

export const clearLoginErrorMessage = () => ({
  type: AUTH_CLEAR_LOGIN_ERROR_MESSAGE,
});

export const errorLogIn = (errorMessage) => ({
  type: AUTH_ERR_LOG_IN,
  payload: errorMessage,
});

export const isLoggingIn = (logging) => ({
  type: AUTH_SET_LOGGING_IN,
  payload: logging,
});

export const signingUp = (signing) => ({
  type: AUTH_SET_SIGNING_UP,
  payload: signing,
});

export const signedUp = (payload) => ({
  type: AUTH_SIGNED_UP,
  payload: payload,
});

export const errorSignUp = (errorMessage) => ({
  type: AUTH_ERR_SIGN_UP,
  payload: errorMessage,
});

export const clearSignUpErrorMessage = () => ({
  type: AUTH_CLEAR_SIGN_UP_ERR_MSG,
});

export const clearSignUpSuccessMessage = () => ({
  type: AUTH_CLEAR_SIGN_UP_OK_MSG,
});

export const setRegistrationField = ({key, text}) => ({
  type: AUTH_SET_FIELD,
  payload: {key, text, type: 'registrationState'},
});

export const signUp = (data) => (dispatch) => {
  dispatch(signingUp(true));
  firebaseSignUpUser(data)
    .then(async (res) => {
      await dispatch(signedUp('Successfully registered.'));
      await dispatch(login(data.email, data.password));
    })
    .catch((err) => {
      let errMsg = 'Please try again later.';
      if (err.errorCode && err.errorCode === 'auth/email-already-exists') {
        errMsg = 'The email address is already in use by another account.';
      }
      dispatch(errorSignUp(errMsg));
    })
    .finally(() => {
      dispatch(signingUp(false));
    });
};

export const login = (email, password) => (dispatch) => {
  dispatch(isLoggingIn(true));
  firebaseSignIn(email, password)
    .then(async (res) => {
      await dispatch(loggedIn(res));
      await navigate('home');
    })
    .catch((err) => {
      dispatch(errorLogIn('Wrong username or password'));
    })
    .finally(() => {
      dispatch(isLoggingIn(false));
    });
};

export const loggedOut = () => ({
  type: AUTH_LOGOUT,
});

export const logout = () => async (dispatch) => {
  await firebaseSignOut()
    .then(async (res) => {
      await dispatch(loggedOut());
      await dispatch(resetMatchesListState());
      await dispatch(resetPlayersState());
      await navigate('auth');
    })
    .catch((err) => {});
};

export const isRecovering = (recovering) => ({
  type: AUTH_SET_RECOVERING,
  payload: recovering,
});

export const errorRecoveringPassword = (errorMessage) => ({
  type: AUTH_ERR_SND_RECOVER_EMAIL,
  payload: errorMessage,
});

export const recoverEmailSent = (res) => ({
  type: AUTH_RECOVER_EMAIL_SENT,
  payload: res,
});

export const recoverPassword = (email) => (dispatch) => {
  dispatch(isRecovering(true));
  apiUtils
    .sendForgotPasswordRequest(email)
    .then(async (res) => {
      await dispatch(recoverEmailSent('Successfully sent.'));
    })
    .catch((err) => {
      dispatch(
        errorRecoveringPassword('Error sending the recover password email'),
      );
    })
    .finally(() => {
      dispatch(isRecovering(false));
    });
};

export const clearFpErrorMessage = () => ({
  type: AUTH_CLEAR_FP_ERR_MSG,
});

export const clearFpSuccessMessage = () => ({
  type: AUTH_CLEAR_FP_SUCCESS_MSG,
});

export const resendingVerificationEmail = (resending) => ({
  type: AUTH_RESENDING_VERIF_EM,
  payload: resending,
});

export const errorResendingVerificationEmail = (err) => ({
  type: AUTH_RESENDING_VERIF_EM_ERR,
  payload: err,
});

export const resentVerificationEmail = (payload) => ({
  type: AUTH_RESENT_VERIF_EM,
  payload: payload,
});

export const clearVerifErrMessage = () => ({
  type: AUTH_CLEAR_VERIF_ERR_MSG,
});

export const clearVerifSuccessMessage = () => ({
  type: AUTH_CLEAR_VERIF_SUCCESS,
});

export const resendVerificationEmail = () => (dispatch) => {
  dispatch(resendingVerificationEmail(true));
  firebaseResendVerificationEmail()
    .then(async (res) => {
      await dispatch(resentVerificationEmail(res));
    })
    .catch((err) => {
      dispatch(errorResendingVerificationEmail('Error sending'));
    })
    .finally(() => {
      dispatch(resendingVerificationEmail(false));
    });
};

export const persistPushNotificationsToken = (token) => {
  return firebasePersistPushNotificationToken(token)
    .then(async (res) => {
      console.log('### persisted', res);
    })
    .catch((err) => {
      console.log('### error persisting', err);
    });
};
