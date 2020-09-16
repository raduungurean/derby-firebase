import axios from 'axios';
import {apiEndpoint} from '../utils/config';

async function sendForgotPasswordRequest(email) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${apiEndpoint}/password-recovery-email`, {email})
      .then(async (response) => {
        resolve(response);
      })
      .catch((err) => reject(err));
  });
}

export const apiUtils = {
  sendForgotPasswordRequest,
};
