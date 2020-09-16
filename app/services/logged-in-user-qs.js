let _unsubscribe;

function listen(qs, callback) {
  _unsubscribe = qs.onSnapshot(callback);
}

function unsubscribe() {
  if (_unsubscribe) {
    _unsubscribe();
  }
}

export default {
  listen,
  unsubscribe,
};
