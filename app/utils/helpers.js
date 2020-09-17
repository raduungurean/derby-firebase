import {ROLE_GROUP_ADMIN, ROLE_HELPER, ROLE_PLAYER} from './config';

export function toDateTime(secs) {
  const t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);
  return t;
}

export function sumObjectsByKey(...objs) {
  return objs.reduce((a, b) => {
    for (let k in b) {
      if (b.hasOwnProperty(k)) a[k] = (a[k] || 0) + b[k];
    }
    return a;
  }, {});
}

export function belongsToLoggedInUser(gid, groups) {
  const groupIds = groups.map((g) => g.id);
  return !!groupIds.includes(gid);
}

export function isGroupAdmin(g, rolesList) {
  return !!rolesList[g].includes(ROLE_GROUP_ADMIN);
}

export function isGroupHelper(g, rolesList) {
  return !!rolesList[g].includes(ROLE_HELPER);
}

export function isPlayer(g, rolesList) {
  return !!rolesList[g].includes(ROLE_PLAYER);
}

export function getGroupData(g, groups) {
  return groups.find((gr) => gr.id === g);
}

export function showPlayerEditOptions(
  currentUserRoles,
  itemGroups,
  selectedGroup,
) {
  if (!selectedGroup) {
    // all groups
    return itemGroups.some((gid) => {
      if (!currentUserRoles[gid]) {
        return false;
      }
      return !!(
        currentUserRoles[gid].includes(ROLE_HELPER) ||
        currentUserRoles[gid].includes(ROLE_GROUP_ADMIN)
      );
    });
  } else {
    if (!currentUserRoles[selectedGroup]) {
      return false;
    }

    // only one group
    return !!(
      currentUserRoles[selectedGroup].includes(ROLE_HELPER) ||
      currentUserRoles[selectedGroup].includes(ROLE_GROUP_ADMIN)
    );
  }
}

export const isEmptyObject = (obj) =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

export function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

export function sortByTeam(a, b) {
  if (a.team === b.team) {
    return 0;
  }
  if (a.team === 'red' && b.team === 'blue') {
    return -1;
  }
  if (a.team === 'red' && b.team === 'none') {
    return -1;
  }
  if (a.team === 'blue' && b.team === 'none') {
    return -1;
  }
  return 1;
}
