import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Icon, ListItem, Text} from 'react-native-elements';
import {
  addedMatch,
  deleteMatch,
  doSubscribe,
  doUnsubscribe,
  loadMatches,
  loadMatchesFirstPage,
  resetMatchesListState,
} from '../../actions/matches';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDerbyTheme} from '../../utils/theme';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {
  firebaseToPlayMatchesQuery,
  fromFirebaseDate,
} from '../../services/firebase-utils';
import RawDateAndScores from '../../components/match/DateAndScores';
import i18n from 'i18n-js';
import {ROLE_GROUP_ADMIN, ROLE_HELPER} from '../../utils/config';
import NoResultsMessage from '../../components/NoResultsMessage';
import {useFocusEffect} from '@react-navigation/core';
import SpinLoader from '../../components/SpinLoader';
import FilterByGroupMessage from '../../components/FilterByGroupMessage';
import SubscribeButtons from '../../components/match/SubscribeButtons';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {addMinutes} from '../../utils/helpers';
import DeleteMatchModal from '../../components/match/DeleteMatchModal';
import {useDeleteMatchAlerts} from '../../hooks/useDropDownAlerts';
import {navigate} from '../../navigation/RootNavigation';
import MatchSubscriptions from '../../components/match/MatchSubscriptions';
import SubscribedText from '../../components/match/SubscribedText';

const MatchesList = ({g, onRefresh}) => {
  const matches = useSelector((state) => state.matches);
  const {
    loadingMatches,
    loadedAtLeastOneTime,
    subscribing,
    unsubscribing,
  } = matches;
  const dispatch = useDispatch();
  const {colors, sizes} = useDerbyTheme();
  const [refreshing, setRefreshing] = useState(false);
  const auth = useSelector((state) => state.auth);
  const myRoles = auth.user.roles;
  const myUid = auth.user.id;
  const myGroup = auth.user.groupData.find((gr) => gr.id === g);
  const [toDeleteItem, setToDeleteItem] = useState(undefined);

  useDeleteMatchAlerts(() => {
    setToDeleteItem(undefined);
  });

  useFocusEffect(
    useCallback(() => {
      dispatch(loadMatchesFirstPage(g));
    }, [g]),
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

  const stylesCardLabel = {
    color: colors.text,
    fontSize: sizes.BASE * 0.8,
    fontFamily: 'Rubik_400Regular',
    marginRight: sizes.BASE,
    marginTop: 1,
  };

  const stylesCardLabelContainer = {
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 0,
    paddingVertical: 4,
    margin: 2,
  };

  const keyExtractor = (item, index) => index.toString();

  const groupMatches = Object.values(matches.byId)
    .filter((m) => {
      if (!g) {
        return true;
      }
      return m['group_id'] === g;
    })
    .sort((a, b) => {
      const aSeconds = a.date.seconds ? a.date.seconds : a.date._seconds;
      const bSeconds = b.date.seconds ? b.date.seconds : b.date._seconds;
      return aSeconds < bSeconds ? 1 : -1;
    });

  const mappedMatches = groupMatches.map((match) => ({
    ...match,
    dt: fromFirebaseDate(match.date).toDate(),
    textMutedColor: colors.textMuted,
  }));

  const doSetRefreshing = async () => {
    await setRefreshing(true);
    await (() => {
      dispatch(resetMatchesListState());
      dispatch(loadMatches(g));
    })();
    await setRefreshing(false);
  };

  let onEndReachedCalledDuringMomentum = true;

  if (loadedAtLeastOneTime && mappedMatches.length === 0) {
    return (
      <>
        {g !== null && auth.user.groupData && myGroup && (
          <FilterByGroupMessage
            message={i18n.t('general_filter_by_group', {group: myGroup.name})}
            buttonText={i18n.t('general_filter_by_group_button')}
          />
        )}
        <NoResultsMessage
          message={i18n.t('matches_screen_no_matches_in_group')}
        />
      </>
    );
  }

  useEffect(() => {
    const matchesQuery = firebaseToPlayMatchesQuery(g);

    const unsubscribe = matchesQuery.onSnapshot(function (snapshot) {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === 'modified') {
          const matchId = change.doc.id;
          const changedData = change.doc.data();
          dispatch(
            addedMatch({
              ...changedData,
              id: matchId,
            }),
          );
        }
      });
    });

    return () => unsubscribe();
  }, [g]);

  if (loadingMatches && mappedMatches.length === 0) {
    return <SpinLoader />;
  }

  return (
    <>
      <DeleteMatchModal
        toDeleteItem={toDeleteItem}
        deleting={false}
        sizes={sizes}
        onTouchOutside={() => setToDeleteItem(undefined)}
        onPress={() => {
          dispatch(deleteMatch(toDeleteItem));
          setToDeleteItem(undefined);
        }}
      />

      {g !== null && auth.user.groupData && myGroup && (
        <FilterByGroupMessage
          message={i18n.t('general_filter_by_group', {group: myGroup.name})}
          buttonText={i18n.t('general_filter_by_group_button')}
        />
      )}
      <FlatList
        style={{flexGrow: 1, paddingTop: sizes.BASE * 0.4}}
        contentContainerStyle={{alignSelf: 'stretch', overflow: 'hidden'}}
        keyExtractor={keyExtractor}
        data={mappedMatches}
        refreshing={refreshing}
        ListFooterComponent={() => {
          if (!loadingMatches) return <Text>{''}</Text>;
          return <ActivityIndicator color={colors.primary} />;
        }}
        onRefresh={() => doSetRefreshing()}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum = false;
        }}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          if (!onEndReachedCalledDuringMomentum) {
            onEndReachedCalledDuringMomentum = true;
            if (matches.hasNextPage || matches.lastVisible) {
              dispatch(loadMatches(g, matches.lastVisible));
            }
          }
        }}
        renderItem={({item}) => {
          const isGroupAdmin =
            myRoles[item.group_id] &&
            myRoles[item.group_id].includes(ROLE_GROUP_ADMIN);
          const isGroupHelper =
            myRoles[item.group_id] &&
            myRoles[item.group_id].includes(ROLE_HELPER);

          const locked = item.confirmations_locked;

          let matchInProgress = false;
          const matchStartDate = item.dt;
          const matchEndDate = addMinutes(item.dt, item.duration);
          const nowDate = new Date();

          const inProgress =
            matchStartDate.getTime() <= nowDate.getTime() &&
            nowDate.getTime() <= matchEndDate.getTime();

          const matchPassed = matchEndDate.getTime() <= nowDate.getTime();

          if (!locked && inProgress && item.status === 'to-play') {
            matchInProgress = true;
          }

          let loggedInUserIsSubscribed;
          if (item.subscriptions) {
            loggedInUserIsSubscribed = item.subscriptions.find(
              (s) => s.user_id === myUid,
            );
          }

          return (
            <TouchableOpacity
              onPress={() => {
                navigate('match', {
                  id: item.id,
                });
              }}>
              <ListItem
                underlayColor={colors.backgroundCard}
                key={item.id}
                containerStyle={listItemContainerStyle}
                title={() => (
                  <Grid>
                    <RawDateAndScores
                      showScores={true}
                      matchPassed={matchPassed}
                      matchInProgress={matchInProgress}
                      item={item}
                    />
                    <Row>
                      <Col style={stylesCardLabelContainer}>
                        <Row style={{marginRight: 'auto'}}>
                          <Text
                            style={[
                              stylesCardLabel,
                              {
                                fontFamily: 'Rubik_500Medium',
                              },
                            ]}>
                            {item.location_name}
                          </Text>
                          <Icon
                            color={colors.textMuted}
                            type="evilicon"
                            name="location"
                            size={20}
                          />
                        </Row>
                      </Col>
                      <Col style={stylesCardLabelContainer}>
                        <Row style={{marginLeft: 'auto'}}>
                          <Text style={stylesCardLabel}>{item.group_name}</Text>
                          <Icon
                            color={colors.textMuted}
                            type="material-community"
                            name="account-group-outline"
                            size={20}
                          />
                        </Row>
                      </Col>
                    </Row>
                    <Row size={1} style={{marginTop: sizes.BASE / 4}}>
                      <Col
                        size={4}
                        style={{
                          paddingVertical: sizes.BASE / 4,
                          paddingHorizontal: sizes.BASE / 4,
                        }}>
                        <Text style={stylesCardLabel}>
                          <Text style={{fontFamily: 'Rubik_300Light'}}>
                            {i18n.t('matches_screen_info')}
                          </Text>{' '}
                          {i18n.t('matches_screen_capacity', {
                            count: item.capacity,
                          })}
                          {', '}
                          {i18n.t('matches_screen_minutes', {
                            count: item.duration,
                          })}
                        </Text>
                        <Text style={stylesCardLabel}>
                          <Text style={{fontFamily: 'Rubik_300Light'}}>
                            {i18n.t('matches_screen_created_by')}
                          </Text>{' '}
                          {item.created_by_first_name +
                            ' ' +
                            item.created_by_last_name}
                        </Text>
                      </Col>
                      <Col
                        size={1}
                        style={{
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                        }}>
                        {(isGroupAdmin || isGroupHelper) && (
                          <Menu
                            onSelect={(value) => {
                              if (value.op === 'delete') {
                                setToDeleteItem({id: value.id});
                              }
                              if (value.op === 'edit') {
                                navigate('match-edit', {
                                  id: value.id,
                                });
                              }
                              if (value.op === 'score') {
                                navigate('match-score', {
                                  id: value.id,
                                });
                              }
                              if (value.op === 'teams') {
                                navigate('match-teams', {
                                  id: value.id,
                                });
                              }
                            }}>
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
                                optionsContainer: {
                                  marginTop: -(sizes.BASE * 4.5),
                                },
                              }}>
                              <MenuOption value={{op: 'edit', id: item.id}}>
                                <Text style={{color: colors.text}}>
                                  {i18n.t('matches_screen_menu_edit')}
                                </Text>
                              </MenuOption>
                              <MenuOption value={{op: 'teams', id: item.id}}>
                                <Text style={{color: colors.text}}>
                                  {i18n.t('matches_screen_set_teams')}
                                </Text>
                              </MenuOption>
                              {item.status === 'to-play' && (
                                <MenuOption value={{op: 'score', id: item.id}}>
                                  <Text style={{color: colors.text}}>
                                    {i18n.t('matches_screen_set_score')}
                                  </Text>
                                </MenuOption>
                              )}
                              {item.status === 'played' && (
                                <MenuOption value={{op: 'score', id: item.id}}>
                                  <Text style={{color: colors.text}}>
                                    {i18n.t('matches_screen_change_score')}
                                  </Text>
                                </MenuOption>
                              )}
                              <MenuOption value={{op: 'delete', id: item.id}}>
                                <Text style={{color: colors.warning}}>
                                  {i18n.t('matches_screen_menu_delete')}
                                </Text>
                              </MenuOption>
                            </MenuOptions>
                          </Menu>
                        )}
                      </Col>
                    </Row>
                    {item.status === 'to-play' && (
                      <Row>
                        <Col
                          style={{
                            paddingVertical: sizes.BASE / 4,
                            paddingHorizontal: sizes.BASE / 4,
                            alignItems: 'center',
                          }}>
                          {!!locked && !matchPassed && (
                            <Row
                              style={{
                                marginTop: sizes.BASE / 2,
                                paddingTop: sizes.BASE / 2,
                              }}>
                              <Button
                                titleStyle={[
                                  styles.submitButtonText,
                                  {
                                    fontSize: sizes.FONT * 0.7,
                                    color: colors.warning,
                                  },
                                ]}
                                buttonStyle={[
                                  styles.submitButton,
                                  {
                                    borderWidth: 1,
                                    borderColor: colors.joy3,
                                  },
                                ]}
                                title={i18n.t(
                                  'matches_screen_confirmations_locked',
                                )}
                                type="outline"
                              />
                            </Row>
                          )}

                          {!!matchInProgress && (
                            <Row
                              style={{
                                marginTop: sizes.BASE / 2,
                                paddingTop: sizes.BASE / 2,
                              }}>
                              <Button
                                titleStyle={[
                                  styles.submitButtonText,
                                  {
                                    fontSize: sizes.FONT * 0.8,
                                    color: colors.warning,
                                  },
                                ]}
                                buttonStyle={[
                                  styles.submitButton,
                                  {
                                    borderWidth: 1,
                                    borderColor: colors.joy3,
                                  },
                                ]}
                                title={i18n.t('match_screen_playing_now')}
                                type="outline"
                              />
                            </Row>
                          )}

                          {!locked &&
                            !matchInProgress &&
                            !matchPassed &&
                            loggedInUserIsSubscribed &&
                            loggedInUserIsSubscribed.subscription ===
                              'playing' && (
                              <Row>
                                <SubscribedText />
                              </Row>
                            )}

                          {!locked && !matchInProgress && !matchPassed && (
                            <Row
                              style={{
                                marginTop: 0,
                                paddingTop: sizes.BASE / 2,
                              }}>
                              <SubscribeButtons
                                subscribed={loggedInUserIsSubscribed}
                                loadingSubscribe={subscribing[item.id]}
                                loadingUnsubscribe={unsubscribing[item.id]}
                                onSubscribe={() => {
                                  dispatch(doSubscribe(item.id));
                                }}
                                onUnsubscribe={() => {
                                  dispatch(doUnsubscribe(item.id));
                                }}
                                locked={locked}
                              />
                            </Row>
                          )}
                        </Col>
                      </Row>
                    )}

                    {item.status === 'to-play' &&
                      item.subscriptions &&
                      item.subscriptions.length > 0 && (
                        <MatchSubscriptions
                          subscriptions={item.subscriptions}
                        />
                      )}
                  </Grid>
                )}
                contentContainerStyle={{alignItems: 'stretch'}}
                bottomDivider
              />
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

MatchesList.propTypes = {
  g: PropTypes.string,
};

const styles = StyleSheet.create({
  subscribedText: {fontFamily: 'Rubik_400Regular'},
  submitButtonText: {fontFamily: 'Rubik_300Light'},
  submitButton: {
    width: 200,
    borderRadius: Math.round(45 / 2),
    height: 35,
    marginRight: 1,
  },
});

export default MatchesList;
