import React, {useCallback, useState} from 'react';
import {useDerbyTheme} from '../../utils/theme';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, Platform, Text, TouchableOpacity} from 'react-native';
import {Icon, ListItem} from 'react-native-elements';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {
  firebaseGetCurrentUserInfo,
  firebaseReloadCurrentUser,
  fromFirebaseDate,
} from '../../services/firebase-utils';
import {loggedIn} from '../../actions/auth';
import {
  apiEndpoint,
  ROLE_GROUP_ADMIN,
  ROLE_HELPER,
  ROLE_PLAYER,
} from '../../utils/config';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import {navigate} from '../../navigation/RootNavigation';
import i18n from 'i18n-js';
import DeleteGroupModal from '../../components/groups/DeleteGroupModal';
import {deleteGroup, leaveGroup} from '../../actions/groups';
import {
  useDeleteGroupsAlerts,
  useLeaveGroupsAlerts,
} from '../../hooks/useDropDownAlerts';
import LeaveGroupModal from '../../components/groups/LeaveGroupModal';
import {Share} from 'react-native';
import ShareWebModal from '../../components/groups/ShareWebModal';
import {useFocusEffect} from '@react-navigation/core';
import NoResultsMessage from '../../components/NoResultsMessage';

const GroupsList = () => {
  const {colors, sizes} = useDerbyTheme();
  const auth = useSelector((state) => state.auth);
  const groups = auth.user.groupData ? auth.user.groupData : [];
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [toLeaveItem, setToLeaveItem] = useState(undefined);
  const [toDeleteItem, setToDeleteItem] = useState(undefined);
  const [webShareModal, showWebShareModal] = useState(undefined);
  const {deleting, leaving} = useSelector((state) => state.groups);

  useDeleteGroupsAlerts(() => {
    setToDeleteItem(undefined);
  });

  useLeaveGroupsAlerts(() => {
    setToLeaveItem(undefined);
  });

  const _mappedGroups = groups.map((g) => ({
    ...g,
    dt: fromFirebaseDate(g.created_at).toDate(),
    textMutedColor: colors.textMuted,
  }));

  function reloadCurrentUser() {
    firebaseReloadCurrentUser().then(() => {
      firebaseGetCurrentUserInfo(auth.user.email, auth.user.emailVerified).then(
        (user) => {
          dispatch(loggedIn(user));
        },
      );
    });
  }

  useFocusEffect(
    useCallback(() => {
      reloadCurrentUser();
    }, []),
  );

  const listItemContainerStyle = {
    backgroundColor: colors.backgroundCard,
    borderRadius: sizes.BASE / 2,
    marginHorizontal: sizes.BASE / 1.5,
    marginVertical: sizes.BASE / 3,
    padding: sizes.BASE / 1.5,
    borderBottomWidth: 0,
    shadowColor: '#ddd',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 2,
  };

  const keyExtractor = (item, index) => index.toString();

  const doSetRefreshing = async () => {
    await setRefreshing(true);
    await (() => {
      reloadCurrentUser();
    })();
    await setRefreshing(false);
  };

  const myRoles = auth.user.roles;

  const onShare = async (shareUuid) => {
    const url = apiEndpoint + '/join-group/?gid=' + shareUuid;
    if (Platform.OS !== 'web') {
      try {
        const obj = {
          title: `Join Derby.Today`,
          message: `Join Derby.Today | A sports app for friend groups to manage their matches ${url}`,
          url: url,
        };
        const result = await Share.share(obj);
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      showWebShareModal(url);
    }
  };

  function selectValue(value) {
    if (value.op === 'leave') {
      setToLeaveItem(value.id);
    }
    if (value.op === 'edit') {
      navigate('group-edit', {ge: value.id});
    }
    if (value.op === 'delete') {
      setToDeleteItem(value.id);
    }
    if (value.op === 'invite') {
      navigate('group-invite', {ge: value.id});
    }
  }

  if (_mappedGroups.length === 0) {
    return <NoResultsMessage message={i18n.t('groups_no_results')} />;
  }

  return (
    <>
      <DeleteGroupModal
        toDeleteItem={toDeleteItem}
        deleting={deleting}
        sizes={sizes}
        onTouchOutside={() => setToDeleteItem(undefined)}
        onPress={() => {
          dispatch(deleteGroup({id: toDeleteItem}));
          setToDeleteItem(undefined);
        }}
      />

      <LeaveGroupModal
        visible={toLeaveItem}
        onTouchOutside={() => setToLeaveItem(undefined)}
        sizes={sizes}
        leaving={leaving}
        onPress={() => {
          dispatch(leaveGroup(toLeaveItem));
          setToLeaveItem(undefined);
        }}
      />

      <ShareWebModal
        visible={webShareModal}
        onTouchOutside={() => showWebShareModal(undefined)}
        url={webShareModal}
      />

      <FlatList
        style={{flexGrow: 1, marginTop: sizes.BASE / 2}}
        contentContainerStyle={{alignSelf: 'stretch', overflow: 'hidden'}}
        keyExtractor={keyExtractor}
        data={_mappedGroups}
        refreshing={refreshing}
        onRefresh={() => doSetRefreshing()}
        onEndReachedThreshold={0.1}
        renderItem={({item}) => {
          const isGroupAdmin =
            myRoles[item.id] && myRoles[item.id].includes(ROLE_GROUP_ADMIN);
          const isGroupHelper =
            myRoles[item.id] && myRoles[item.id].includes(ROLE_HELPER);
          const isPlayer =
            myRoles[item.id] && myRoles[item.id].includes(ROLE_PLAYER);

          const leaveEnabled = isPlayer && !isGroupAdmin;
          const editEnabled = isGroupAdmin || isGroupHelper;
          const deleteEnabled = isGroupAdmin;

          return (
            <ListItem
              underlayColor={colors.backgroundCard}
              key={item.id}
              containerStyle={listItemContainerStyle}
              title={() => (
                <Grid>
                  <Row>
                    <Col size={4} style={{justifyContent: 'center'}}>
                      <Text
                        style={{
                          fontFamily: 'Rubik_400Regular',
                          color: colors.textMuted,
                        }}>
                        {item.name}
                      </Text>
                    </Col>
                  </Row>
                </Grid>
              )}
              subtitle={() => (
                <>
                  <Text
                    style={{
                      color: colors.text,
                      fontFamily: 'Rubik_400Regular',
                      fontSize: sizes.BASE - 4,
                      marginTop: sizes.BASE / 3,
                    }}>
                    {i18n.t('groups_created_by', {
                      user: item.first_name + ' ' + item.last_name,
                      date: i18n.l('date_formats_short', item.dt),
                      users: item.group_users ? item.group_users : 1,
                    })}
                  </Text>
                  <Text
                    style={{
                      color: colors.text,
                      fontFamily: 'Rubik_400Regular',
                      fontSize: sizes.BASE - 4,
                      marginTop: sizes.BASE / 3,
                    }}>
                    {i18n.t('groups_count_games', {
                      matches: item.group_matches ? item.group_matches : 0,
                    })}
                  </Text>
                </>
              )}
              rightElement={
                <>
                  {item.allow_share && (
                    <TouchableOpacity onPress={() => onShare(item.share_uuid)}>
                      <Icon
                        color={colors.textMuted}
                        type="simple-line-icon"
                        name="share"
                        size={15}
                        iconStyle={{marginRight: sizes.BASE}}
                      />
                    </TouchableOpacity>
                  )}

                  <Menu onSelect={(value) => selectValue(value)}>
                    <MenuTrigger>
                      <Icon
                        color={colors.textMuted}
                        type="material-community"
                        size={22}
                        name="dots-horizontal-circle-outline"
                      />
                    </MenuTrigger>
                    <MenuOptions
                      customStyles={{
                        optionsContainer: {marginTop: -(sizes.BASE * 4.5)},
                      }}>
                      <MenuOption
                        disabled={!leaveEnabled}
                        value={{op: 'leave', id: item.id}}>
                        <Text
                          style={{
                            color: leaveEnabled
                              ? colors.text
                              : colors.textMuted,
                          }}>
                          {i18n.t('groups_context_menu_leave')}
                        </Text>
                      </MenuOption>
                      <MenuOption
                        disabled={!editEnabled}
                        value={{op: 'edit', id: item.id}}>
                        <Text
                          style={{
                            color: editEnabled ? colors.text : colors.textMuted,
                          }}>
                          {i18n.t('groups_context_menu_edit')}
                        </Text>
                      </MenuOption>
                      <MenuOption
                        disabled={!deleteEnabled}
                        value={{op: 'delete', id: item.id}}>
                        <Text
                          style={{
                            color: deleteEnabled
                              ? colors.text
                              : colors.textMuted,
                          }}>
                          {i18n.t('groups_context_menu_delete')}
                        </Text>
                      </MenuOption>
                      <MenuOption
                        disabled={!editEnabled}
                        value={{op: 'invite', id: item.id}}>
                        <Text
                          style={{
                            color: editEnabled ? colors.text : colors.textMuted,
                          }}>
                          {i18n.t('groups_context_menu_invite')}
                        </Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </>
              }
              contentContainerStyle={{alignItems: 'stretch'}}
              bottomDivider
            />
          );
        }}
      />
    </>
  );
};

GroupsList.propTypes = {};

export default GroupsList;
