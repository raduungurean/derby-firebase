import Constants from 'expo-constants';

export const {firebaseConfig} = Constants.manifest.extra;
export const apiEndpoint = 'https://api.derby.today/api';

export const ROLE_SUPER_ADMIN = '1';
export const ROLE_GROUP_ADMIN = '2';
export const ROLE_HELPER = '3';
export const ROLE_PLAYER = '4';
