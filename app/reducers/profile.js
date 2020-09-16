import {
  UPDATED_PROFILE,
  UPDATING_PROFILE,
  CLEAR_ERROR_UPDATING_PROFILE,
  ERROR_UPDATING_PROFILE,
  ERROR_UPDATING_PASSWORD,
  UPDATED_PASSWORD,
  UPDATING_PASSWORD,
  RESET_PROFILE_STATE,
  CLEAR_ERROR_UPDATING_PASSWORD,
  UPLOADING_PROFILE_PICTURE,
} from '../constants/profile';

const INITIAL_STATE = {
  updatingProfile: false,
  errorUpdatingProfile: null,
  requestSentUpdateProfile: false,
  updatingPassword: false,
  errorUpdatingPassword: null,
  requestSentUpdatePassword: false,
  uploadingProfilePicture: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESET_PROFILE_STATE: {
      return {
        ...INITIAL_STATE,
      };
    }

    case UPDATING_PROFILE: {
      let updating = {
        ...state,
        updatingProfile: action.payload,
      };
      if (!action.payload) {
        updating = {
          ...updating,
          requestSentUpdateProfile: false,
          updatingProfile: action.payload,
        };
      }
      return updating;
    }

    case UPDATED_PROFILE: {
      return {
        ...state,
        updatingProfile: false,
        requestSentUpdateProfile: true,
      };
    }

    case ERROR_UPDATING_PROFILE: {
      return {
        ...state,
        errorUpdatingProfile: action.payload,
      };
    }

    case CLEAR_ERROR_UPDATING_PROFILE: {
      return {
        ...state,
        errorUpdatingProfile: null,
      };
    }

    case UPDATING_PASSWORD: {
      let updatingPassword = {
        ...state,
        updatingPassword: action.payload,
      };
      if (!action.payload) {
        updatingPassword = {
          ...updatingPassword,
          requestSentUpdatePassword: false,
          updatingPassword: action.payload,
        };
      }
      return updatingPassword;
    }

    case UPDATED_PASSWORD: {
      return {
        ...state,
        updatingPassword: false,
        requestSentUpdatePassword: true,
      };
    }

    case ERROR_UPDATING_PASSWORD: {
      return {
        ...state,
        errorUpdatingPassword: action.payload,
      };
    }

    case CLEAR_ERROR_UPDATING_PASSWORD: {
      return {
        ...state,
        errorUpdatingPassword: null,
      };
    }

    case UPLOADING_PROFILE_PICTURE: {
      return {
        ...state,
        uploadingProfilePicture: action.payload,
      };
    }

    default:
      return state;
  }
}
