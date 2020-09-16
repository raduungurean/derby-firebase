let _ddRef;

function setDdRef(navigatorRef) {
  _ddRef = navigatorRef;
}

function getDdRef() {
  return _ddRef;
}

export default {
  setDdRef,
  getDdRef,
};
