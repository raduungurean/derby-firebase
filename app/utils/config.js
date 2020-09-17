import Constants from 'expo-constants';

export const {firebaseConfig} = Constants.manifest.extra;
export const apiEndpoint = 'https://api.derby.today/api';

export const ROLE_SUPER_ADMIN = '1';
export const ROLE_GROUP_ADMIN = '2';
export const ROLE_HELPER = '3';
export const ROLE_PLAYER = '4';

export const playersData = [
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
].map((playerCount) => {
  return {
    label: playerCount + ' players',
    value: playerCount,
  };
});

export const minutesData = [
  10,
  20,
  30,
  40,
  50,
  60,
  70,
  80,
  90,
  100,
  110,
  120,
].map((min) => {
  return {
    label: min + ' minutes',
    value: min,
  };
});
