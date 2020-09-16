import React, {useCallback, useState} from 'react';
import {useDerbyTheme} from '../../utils/theme';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, Text, TouchableOpacity} from 'react-native';
import {Icon, ListItem} from 'react-native-elements';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {
  firebaseGetCurrentUserInfo,
  firebaseReloadCurrentUser,
  fromFirebaseDate,
} from '../../services/firebase-utils';
import {loggedIn} from '../../actions/auth';
import i18n from 'i18n-js';
import {useFocusEffect} from '@react-navigation/core';
import {acceptInvite, rejectInvite} from '../../actions/invites';
import RejectInviteModal from '../../components/invites/RejectInviteModal';
import AcceptInviteModal from '../../components/invites/AcceptInviteModal';
import {
  useAcceptInviteAlerts,
  useRejectInviteAlerts,
} from '../../hooks/useDropDownAlerts';
import NoResultsMessage from '../../components/NoResultsMessage';

const InvitesList = () => {
  const {colors, sizes} = useDerbyTheme();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [toAcceptInvite, setToAcceptInvite] = useState(undefined);
  const [toRejectInvite, setToRejectInvite] = useState(undefined);
  const {accepting, rejecting} = useSelector((state) => state.invites);
  const invites = auth.user.invites ? auth.user.invites : [];

  useRejectInviteAlerts(() => {
    setToRejectInvite(undefined);
  });

  useAcceptInviteAlerts(() => {
    setToAcceptInvite(undefined);
  });

  const _mappedInvites = invites.map((g) => ({
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

  return (
    <>
      <RejectInviteModal
        visible={toRejectInvite}
        toRejectInvite={toRejectInvite}
        rejecting={rejecting}
        sizes={sizes}
        onTouchOutside={() => setToRejectInvite(undefined)}
        onPress={() => {
          dispatch(rejectInvite({id: toRejectInvite.id}));
          setToRejectInvite(undefined);
        }}
      />

      <AcceptInviteModal
        visible={toAcceptInvite}
        toAcceptInvite={toAcceptInvite}
        onTouchOutside={() => setToAcceptInvite(undefined)}
        sizes={sizes}
        accepting={accepting}
        onPress={() => {
          dispatch(acceptInvite({id: toAcceptInvite.id}));
          setToAcceptInvite(undefined);
        }}
      />

      {_mappedInvites.length === 0 && (
        <NoResultsMessage message={i18n.t('invites_list_no_results')} />
      )}

      <FlatList
        style={{flexGrow: 1, marginTop: sizes.BASE / 2}}
        contentContainerStyle={{alignSelf: 'stretch', overflow: 'hidden'}}
        keyExtractor={keyExtractor}
        data={_mappedInvites}
        refreshing={refreshing}
        onRefresh={() => doSetRefreshing()}
        onEndReachedThreshold={0.1}
        renderItem={({item}) => {
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
                        {item.group.name}
                      </Text>
                    </Col>
                  </Row>
                </Grid>
              )}
              subtitle={() => (
                <Text
                  style={{
                    color: colors.text,
                    fontFamily: 'Rubik_400Regular',
                    fontSize: sizes.BASE - 4,
                    marginTop: sizes.BASE / 3,
                  }}>
                  {i18n.t('invites_invited_by', {
                    user:
                      item.invitedBy.first_name +
                      ' ' +
                      item.invitedBy.last_name,
                    date: i18n.l('date_formats_short', item.dt),
                  })}
                </Text>
              )}
              rightElement={
                <>
                  <TouchableOpacity onPress={() => setToAcceptInvite(item)}>
                    <Icon
                      color={colors.textMuted}
                      type="simple-line-icon"
                      name="check"
                      size={22}
                      iconStyle={{
                        marginRight: sizes.BASE * 1.2,
                        color: colors.success,
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setToRejectInvite(item)}>
                    <Icon
                      color={colors.textMuted}
                      type="simple-line-icon"
                      name="close"
                      size={22}
                      iconStyle={{marginRight: sizes.BASE, color: colors.error}}
                    />
                  </TouchableOpacity>
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

InvitesList.propTypes = {};

export default InvitesList;
