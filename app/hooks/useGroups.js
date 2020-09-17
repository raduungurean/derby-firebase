import {useEffect, useState} from 'react';
import {ROLE_GROUP_ADMIN, ROLE_HELPER} from '../utils/config';
import isEmpty from 'lodash/isEmpty';
import {useSelector} from 'react-redux';

export function useGroups() {
  const auth = useSelector((state) => state.auth);
  const groups = !isEmpty(auth.user.groupData) ? auth.user.groupData : [];
  const roles = auth.user.roles ? auth.user.roles : [];
  const [groupsData, setGroupsData] = useState([]);

  useEffect(() => {
    let adminGroups = [];
    Object.keys(roles).forEach((key) => {
      if (
        roles[key].includes(ROLE_GROUP_ADMIN) ||
        roles[key].includes(ROLE_HELPER)
      ) {
        adminGroups = adminGroups.concat(key);
      }
    });

    const _groupsData = adminGroups
      .map((groupId) => {
        const gr = groups.find((g) => g.id === groupId);
        if (!gr) {
          return undefined;
        }
        return {
          label: gr.name,
          value: gr.id,
        };
      })
      .filter((g) => g !== undefined);
    setGroupsData(_groupsData);
  }, [groups, roles]);

  return groupsData;
}
