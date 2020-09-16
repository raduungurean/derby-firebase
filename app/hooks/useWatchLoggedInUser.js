import {useEffect} from 'react';
import {
  firebaseGetCurrentUserInfo,
  firebaseReloadCurrentUser,
  firebaseUserQuery,
} from '../services/firebase-utils';
import loggedInUserQS from '../services/logged-in-user-qs';
import {loggedIn} from '../actions/auth';
import {useDispatch, useSelector} from 'react-redux';

export function useWatchLoggedInUser() {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      const qs = firebaseUserQuery(user.email);
      loggedInUserQS.listen(qs, function (snapshot) {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === 'modified') {
            firebaseReloadCurrentUser().then(() => {
              const changedData = change.doc.data();
              let emailVerified = user.emailVerified;
              if (changedData.emailVerified) {
                emailVerified = changedData.emailVerified;
              }
              firebaseGetCurrentUserInfo(changedData.email, emailVerified).then(
                (user) => {
                  dispatch(loggedIn(user));
                },
              );
            });
          }
        });
      });
    }
    return () => loggedInUserQS.unsubscribe();
  }, [user]);
}
