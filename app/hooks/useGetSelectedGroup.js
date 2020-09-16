import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedGroupGlobally} from '../actions/layout';
import {AsyncStorage} from 'react-native';

export function useGetSelectedGroup(route) {
  const dispatch = useDispatch();
  const selectedGroup = useSelector((state) => state.layout.selectedGroup);
  const auth = useSelector((state) => state.auth);
  const loggedInUserGroups = auth.user.groupData
    ? auth.user.groupData.map((m) => m.id)
    : [];

  useEffect(() => {
    const group = route.params && route.params.g ? route.params.g : undefined;

    if (group) {
      dispatch(setSelectedGroupGlobally(group));
    } else {
      AsyncStorage.getItem('@selected_group')
        .then((item) => {
          dispatch(setSelectedGroupGlobally(item));
        })
        .catch((e) => {
          setSelectedGroupGlobally(null);
        });
    }
  }, [route]);

  if (selectedGroup === null) {
    return null;
  } else if (loggedInUserGroups.includes(selectedGroup)) {
    return selectedGroup;
  } else {
    return null;
  }
}
