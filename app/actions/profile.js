import {
  CLEAR_ERROR_UPDATING_PASSWORD,
  CLEAR_ERROR_UPDATING_PROFILE,
  ERROR_UPDATING_PASSWORD,
  ERROR_UPDATING_PROFILE,
  RESET_PROFILE_STATE,
  UPDATED_PASSWORD,
  UPDATED_PROFILE,
  UPDATING_PASSWORD,
  UPDATING_PROFILE,
  UPLOADING_PROFILE_PICTURE,
} from '../constants/profile';
import {
  firebaseUpdatePassword,
  firebaseUpdateProfile,
  firebaseUpdateProfilePicture,
  firebaseUploadFile,
} from '../services/firebase-utils';

export const resetProfileState = () => ({
  type: RESET_PROFILE_STATE,
});

export const updatingProfile = (updating) => ({
  type: UPDATING_PROFILE,
  payload: updating,
});

export const updatedProfile = () => ({
  type: UPDATED_PROFILE,
});

export const errorUpdatingProfile = (err) => ({
  type: ERROR_UPDATING_PROFILE,
  payload: err,
});

export const clearErrorUpdatingProfile = () => ({
  type: CLEAR_ERROR_UPDATING_PROFILE,
});

export const updateProfile = (data) => async (dispatch) => {
  dispatch(updatingProfile(true));
  firebaseUpdateProfile(data)
    .then(async (res) => {
      await dispatch(updatedProfile());
    })
    .catch((err) => {
      dispatch(errorUpdatingProfile('other error'));
    })
    .finally(() => {
      dispatch(updatingProfile(false));
    });
};

export const updatingPassword = (updating) => ({
  type: UPDATING_PASSWORD,
  payload: updating,
});

export const updatedPassword = () => ({
  type: UPDATED_PASSWORD,
});

export const errorUpdatingPassword = (err) => ({
  type: ERROR_UPDATING_PASSWORD,
  payload: err,
});

export const clearErrorUpdatingPassword = () => ({
  type: CLEAR_ERROR_UPDATING_PASSWORD,
});

export const updatePassword = (password, passwordConfirmation) => async (
  dispatch,
) => {
  dispatch(updatingPassword(true));
  firebaseUpdatePassword(password, passwordConfirmation)
    .then(async (res) => {
      await dispatch(updatedPassword());
    })
    .catch((err) => {
      dispatch(errorUpdatingPassword('other error'));
    })
    .finally(() => {
      dispatch(updatingPassword(false));
    });
};

export const uploadingFile = (uploading) => ({
  type: UPLOADING_PROFILE_PICTURE,
  payload: uploading,
});

export const uploadPicture = (picData, done) => (dispatch, getState) => {
  dispatch(uploadingFile(true));
  const uid = getState().auth.user.id;
  firebaseUploadFile(uid, picData)
    .then((picUrl) => {
      firebaseUpdateProfilePicture(picUrl)
        .then(() => {
          done();
        })
        .catch(() => {
          done();
        })
        .finally(() => {
          done();
        });
    })
    .catch((err) => {
      console.log('### err', err);
    })
    .finally(() => {
      dispatch(uploadingFile(true));
    });
};
