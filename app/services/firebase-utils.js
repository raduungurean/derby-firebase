import firebase from 'firebase';
import {firebaseConfig} from '../utils/config';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export function firebaseGetLocations(groupIds) {
  return new Promise((resolve, reject) => {
    firebase
      .app()
      .functions('europe-west3')
      .httpsCallable('app/locations')({gid: groupIds})
      .then(function (result) {
        if (result.data.error) {
          reject(result.data);
        } else {
          resolve(result.data.locations);
        }
      })
      .catch((err) => reject(err));
  });
}

export function firebaseGetGroups(groupIds) {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection('groups')
      .where(firebase.firestore.FieldPath.documentId(), 'in', groupIds)
      .get()
      .then((querySnapshot) => {
        const groups = [];
        querySnapshot.forEach((doc) => {
          groups.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        resolve(groups);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function firebaseSignIn(email, password) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const email = response.user.email;

        firebase
          .firestore()
          .collection('users')
          .where('email', '==', email)
          .get()
          .then((querySnapshot) => {
            if (!querySnapshot.empty) {
              const user = querySnapshot.docs[0];
              if (user) {
                resolve({
                  emailVerified: response.user.emailVerified,
                  ...user.data(),
                });
              }
            }
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function firebaseSignOut() {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function firebaseReloadCurrentUser() {
  return firebase.auth().currentUser.reload();
}

export function firebaseGetCurrentUser() {
  return firebase.auth().currentUser;
}

export function firebaseGetCurrentUserInfo(email, emailVerified) {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection('users')
      .where('email', '==', email)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const user = querySnapshot.docs[0];
          if (user) {
            resolve({
              emailVerified: emailVerified,
              ...user.data(),
            });
          }
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const onAuthUserListener = (next, fallback) =>
  firebase.auth().onAuthStateChanged((authUser) => {
    if (authUser) {
      firebase
        .firestore()
        .collection('users')
        .where('email', '==', authUser.email)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const user = querySnapshot.docs[0];
            if (user) {
              next({
                emailVerified: authUser.emailVerified,
                ...user.data(),
              });
            }
          }
        })
        .catch(() => fallback());
    } else {
      fallback();
    }
  });

export function firebaseRecoverPassword(email) {
  return new Promise((resolve, reject) => {
    firebase
      .app()
      .functions('europe-west3')
      .httpsCallable('app/recover-password')({email})
      .then(function (result) {
        if (result.data.error) {
          reject(result.data);
        } else {
          resolve(result.data);
        }
      })
      .catch((err) => reject(err));
  });
}

export function firebaseGetPlayers(g, lastVisible) {
  return new Promise((resolve, reject) => {
    firebase
      .app()
      .functions('europe-west3')
      .httpsCallable('app/players')({
        gid: g,
        last: lastVisible,
      })
      .then(function (result) {
        if (result.data.error) {
          reject(result.data);
        } else {
          resolve(result.data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function firebaseKickOutPlayer(data) {
  return new Promise((resolve, reject) => {
    firebase
      .app()
      .functions('europe-west3')
      .httpsCallable('app/player-kick-out')(data)
      .then(function (result) {
        if (result.data.error) {
          reject(result.data);
        } else {
          resolve(result.data);
        }
      })
      .catch((err) => reject(err));
  });
}

export function firebaseUpdatePlayerSettings(data) {
  return new Promise((resolve, reject) => {
    firebase
      .app()
      .functions('europe-west3')
      .httpsCallable('app/player-settings')(data)
      .then(function (result) {
        if (result.data.error) {
          reject(result.data);
        } else {
          resolve(result.data);
        }
      })
      .catch((err) => reject(err));
  });
}

export function firebaseGetPlayer(id) {
  return new Promise((resolve, reject) => {
    firebase
      .app()
      .functions('europe-west3')
      .httpsCallable('app/player')({
        id,
      })
      .then(function (result) {
        if (result.data.error) {
          reject(result.data);
        } else {
          resolve(result.data);
        }
      })
      .catch((err) => reject(err));
  });
}

export function firebaseInvitePlayer(email, invitedBy, group) {
  return new Promise((resolve, reject) => {
    const groupData = {
      id: group.id,
      name: group.name,
    };

    const invitedByData = {
      first_name: invitedBy.first_name,
      last_name: invitedBy.last_name,
      photo_url: invitedBy.photo_url,
    };

    firebase
      .app()
      .functions('europe-west3')
      .httpsCallable('app/invite-player')({
        email,
        invitedBy: invitedByData,
        group: groupData,
      })
      .then(function (result) {
        if (result.data.error) {
          reject(result.data);
        } else {
          resolve(result.data);
        }
      })
      .catch((err) => reject(err));
  });
}

export function firebaseAddGroup(groupInfo) {
  return new Promise((resolve, reject) => {
    firebase
      .app()
      .functions('europe-west3')
      .httpsCallable('app/add-group')({
        uid: groupInfo.uid,
        name: groupInfo.groupName,
        short_description: groupInfo.shortDescription,
      })
      .then(function (result) {
        if (result.data.error) {
          reject(result.data);
        } else {
          resolve(result.data);
        }
      })
      .catch((err) => reject(err));
  });
}

export function firebaseDeleteGroup(groupInfo) {
  return new Promise((resolve, reject) => {
    firebase
      .app()
      .functions('europe-west3')
      .httpsCallable('app/delete-group')({
        uid: groupInfo.uid,
        id: groupInfo.id,
      })
      .then(function (result) {
        if (result.data.error) {
          reject(result.data);
        } else {
          resolve(result.data);
        }
      })
      .catch((err) => reject(err));
  });
}

export function firebaseUpdateProfile(data) {
  return new Promise((resolve, reject) => {
    firebase
      .app()
      .functions('europe-west3')
      .httpsCallable('app/update-profile')(data)
      .then(function (result) {
        if (result.data.error) {
          reject(result.data);
        } else {
          resolve(result.data);
        }
      })
      .catch((err) => reject(err));
  });
}

export function firebaseUpdateProfilePicture(picUrl) {
  return new Promise((resolve, reject) => {
    firebase
      .app()
      .functions('europe-west3')
      .httpsCallable('app/update-profile-picture')({
        picUrl,
      })
      .then(function (result) {
        if (result.data.error) {
          reject(result.data);
        } else {
          resolve(result.data);
        }
      })
      .catch((err) => reject(err));
  });
}

export async function firebaseUploadFile(uid, picData) {
  let blob;

  if (!picData.blob) {
    const response = await fetch(picData.uri);
    blob = await response.blob();
  } else {
    blob = picData.uri;
  }

  return new Promise((resolve, reject) => {
    const storageRef = firebase.storage().ref();

    const metadata = {
      contentType: picData.type,
    };

    return storageRef
      .child(uid + '_' + picData.name)
      .put(blob, metadata)
      .then((snapshot) => {
        resolve(snapshot.ref.getDownloadURL());
      })
      .catch((e) => {
        console.log('### error uploading', e);
        reject(e);
      })
      .finally(() => {});
  });
}

export function firebaseUpdatePassword(password, passwordConfirmation) {
  return new Promise((resolve, reject) => {
    firebase
      .app()
      .functions('europe-west3')
      .httpsCallable('app/update-password')({
        password,
        passwordConfirmation,
      })
      .then(function (result) {
        if (result.data.error) {
          reject(result.data);
        } else {
          resolve(result.data);
        }
      })
      .catch((err) => reject(err));
  });
}

export function firebaseLeaveGroup(groupInfo) {
  return new Promise((resolve, reject) => {
    firebase
      .app()
      .functions('europe-west3')
      .httpsCallable('app/leave-group')({
        uid: groupInfo.uid,
        id: groupInfo.id,
      })
      .then(function (result) {
        if (result.data.error) {
          reject(result.data);
        } else {
          resolve(result.data);
        }
      })
      .catch((err) => reject(err));
  });
}

export function firebaseEditGroup(groupInfo) {
  return new Promise((resolve, reject) => {
    firebase
      .app()
      .functions('europe-west3')
      .httpsCallable('app/edit-group')({
        groupId: groupInfo.gId,
        name: groupInfo.groupName,
        allow_share: groupInfo.allowShare,
        short_description: groupInfo.shortDescription,
      })
      .then(function (result) {
        if (result.data.error) {
          reject(result.data);
        } else {
          resolve(result.data);
        }
      })
      .catch((err) => reject(err));
  });
}

export function firebaseUserQuery(email) {
  return firebase.firestore().collection('users').where('email', '==', email);
}

export function firebaseToPlayMatchesQuery(g) {
  if (g) {
    return firebase
      .firestore()
      .collection('matches')
      .where('g', '==', g)
      .where('status', '==', 'to-play');
  } else {
    return firebase
      .firestore()
      .collection('matches')
      .where('status', '==', 'to-play');
  }
}

export function firebaseMatchIdQuery(id) {
  return firebase.firestore().collection('matches').doc(id);
}

export const firebaseSignUpUser = (data) => {
  return new Promise((resolve, reject) => {
    firebase
      .app()
      .functions('europe-west3')
      .httpsCallable('app/sign-up')(data)
      .then(function (result) {
        if (result.data.error) {
          reject(result.data);
        } else {
          resolve(result.data);
        }
      })
      .catch((err) => reject(err));
  });
};

export const firebaseResendVerificationEmail = () => {
  return new Promise((resolve, reject) => {
    firebase
      .app()
      .functions('europe-west3')
      .httpsCallable('app/resend-verif-email')()
      .then(function (result) {
        if (result.data.error) {
          reject(result.data);
        } else {
          resolve(result.data);
        }
      })
      .catch((err) => reject(err));
  });
};

export const firebasePersistPushNotificationToken = (token) => {
  return new Promise((resolve, reject) => {
    firebase
      .app()
      .functions('europe-west3')
      .httpsCallable('app/persist-push-notification-token')({token})
      .then(function (result) {
        if (result.data.error) {
          reject(result.data);
        } else {
          resolve(result.data);
        }
      })
      .catch((err) => reject(err));
  });
};

export const firebaseRejectInvite = (id) => {
  return new Promise((resolve, reject) => {
    firebase
      .app()
      .functions('europe-west3')
      .httpsCallable('app/reject-invite')({id})
      .then(function (result) {
        if (result.data.error) {
          reject(result.data);
        } else {
          resolve(result.data);
        }
      })
      .catch((err) => reject(err));
  });
};

export const firebaseAcceptInvite = (id) => {
  return new Promise((resolve, reject) => {
    firebase
      .app()
      .functions('europe-west3')
      .httpsCallable('app/accept-invite')({id})
      .then(function (result) {
        if (result.data.error) {
          reject(result.data);
        } else {
          resolve(result.data);
        }
      })
      .catch((err) => reject(err));
  });
};

export function fromFirebaseDate(firebaseDate) {
  if (firebaseDate._seconds) {
    return new firebase.firestore.Timestamp(
      firebaseDate._seconds,
      firebaseDate._nanoseconds,
    );
  }

  return new firebase.firestore.Timestamp(
    firebaseDate.seconds,
    firebaseDate.nanoseconds,
  );
}

export function firebaseAddMatch(data) {
  return new Promise((resolve, reject) => {
    firebase
      .app()
      .functions('europe-west3')
      .httpsCallable('app/add-match')({
        ...data,
        date: data.date
          ? firebase.firestore.Timestamp.fromDate(data.date)
          : null,
      })
      .then(function (result) {
        if (result.data.error) {
          reject(result.data);
        } else {
          resolve(result.data.match);
        }
      })
      .catch((err) => reject(err));
  });
}

export function firebaseEditMatch(data) {
  return new Promise((resolve, reject) => {
    firebase
      .app()
      .functions('europe-west3')
      .httpsCallable('app/edit-match')({
        ...data,
        date: data.date
          ? firebase.firestore.Timestamp.fromDate(data.date)
          : null,
      })
      .then(function (result) {
        if (result.data.error) {
          reject(result.data);
        } else {
          resolve(result.data.match);
        }
      })
      .catch((err) => reject(err));
  });
}

export function firebaseEditMatchScore(data) {
  return new Promise((resolve, reject) => {
    firebase
      .app()
      .functions('europe-west3')
      .httpsCallable('app/edit-match-score')(data)
      .then(function (result) {
        if (result.data.error) {
          reject(result.data);
        } else {
          resolve(result.data.match);
        }
      })
      .catch((err) => reject(err));
  });
}

export function firebaseEditMatchTeams(data) {
  return new Promise((resolve, reject) => {
    firebase
      .app()
      .functions('europe-west3')
      .httpsCallable('app/edit-match-teams')(data)
      .then(function (result) {
        if (result.data.error) {
          reject(result.data);
        } else {
          resolve(result.data.match);
        }
      })
      .catch((err) => reject(err));
  });
}

export function firebaseDeleteMatch(data) {
  return new Promise((resolve, reject) => {
    firebase
      .app()
      .functions('europe-west3')
      .httpsCallable('app/delete-match')({
        id: data.id,
      })
      .then(function (result) {
        if (result.data.error) {
          reject(result.data);
        } else {
          resolve(result);
        }
      })
      .catch((err) => reject(err));
  });
}

export function firebaseLoadMatch(id) {
  return new Promise((resolve, reject) => {
    firebase
      .app()
      .functions('europe-west3')
      .httpsCallable('app/match')({
        id: id,
      })
      .then(function (result) {
        if (result.data.error) {
          reject(result.data);
        } else {
          resolve(result.data.match);
        }
      })
      .catch((err) => reject(err));
  });
}

export function firebaseSubscribeToMatch(matchId) {
  return new Promise((resolve, reject) => {
    firebase
      .app()
      .functions('europe-west3')
      .httpsCallable('app/subscribe')({
        id: matchId,
      })
      .then(function (result) {
        if (result.data.error) {
          reject(result.data);
        } else {
          resolve(result.data.match);
        }
      })
      .catch((err) => reject(err));
  });
}

export function firebaseUnsubscribeToMatch(matchId) {
  return new Promise((resolve, reject) => {
    firebase
      .app()
      .functions('europe-west3')
      .httpsCallable('app/unsubscribe')({
        id: matchId,
      })
      .then(function (result) {
        if (result.data.error) {
          reject(result.data);
        } else {
          resolve(result.data.match);
        }
      })
      .catch((err) => reject(err));
  });
}

export function firebaseGetMatches(g, lastVisible = undefined) {
  return new Promise((resolve, reject) => {
    let query;

    const groups = g.constructor !== Array ? [g] : g;
    let op = 'in';
    let queryBy = groups;
    if (groups.length === 1) {
      op = '==';
      queryBy = groups[0];
    }

    if (lastVisible === undefined) {
      query = firebase
        .firestore()
        .collection('matches')
        .where('group_id', op, queryBy)
        .orderBy('date', 'desc')
        .limit(15);
    } else {
      query = firebase
        .firestore()
        .collection('matches')
        .where('group_id', op, queryBy)
        .orderBy('date', 'desc')
        .startAfter(lastVisible)
        .limit(15);
    }

    query
      .get()
      .then((querySnapshot) => {
        const matches = [];
        querySnapshot.forEach((doc) => {
          matches.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        const lastVisible1 = querySnapshot.docs[querySnapshot.docs.length - 1];
        resolve({
          lastVisible: matches.length ? lastVisible1 : undefined,
          matches,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}
