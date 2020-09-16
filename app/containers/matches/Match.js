import React, {useCallback, useEffect, useState} from 'react';
import {Button, Icon, Text} from 'react-native-elements';
import {useDerbyTheme} from '../../utils/theme';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/core';
import {
  addedMatch,
  doSubscribe,
  doUnsubscribe,
  loadMatch,
} from '../../actions/matches';
import {
  firebaseMatchIdQuery,
  fromFirebaseDate,
} from '../../services/firebase-utils';
import RawDateAndScores from '../../components/match/DateAndScores';
import {Col, Grid, Row} from 'react-native-easy-grid';
import i18n from 'i18n-js';
import SubscribeButtons from '../../components/match/SubscribeButtons';
import {addMinutes} from '../../utils/helpers';
import SpinLoader from '../../components/SpinLoader';
import TeamTitle from '../../components/match/TeamTitle';
import TeamPlayerItem from '../../components/match/TeamPlayerItem';
import Scores from '../../components/match/Scores';
import MatchSubscriptions from '../../components/match/MatchSubscriptions';
import SubscribedText from '../../components/match/SubscribedText';

const Match = ({id}) => {
  const {sizes, colors, dark} = useDerbyTheme();
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches);
  const [refreshing, setRefreshing] = useState(false);
  const [match, setMatch] = useState(null);
  const navigation = useNavigation();
  const {subscribing, unsubscribing} = matches;
  const auth = useSelector((state) => state.auth);
  const myUid = auth.user.id;

  useFocusEffect(
    useCallback(() => {
      dispatch(loadMatch(id));
    }, [id]),
  );

  useEffect(() => {
    const p = matches.byId[id];
    setMatch(p);
  }, [matches]);

  useEffect(() => {
    const matchQuery = firebaseMatchIdQuery(id);
    const unsubscribe = matchQuery.onSnapshot(function (doc) {
      const data = doc.data();
      if (doc.exists) {
        dispatch(
          addedMatch({
            ...data,
            id: id,
          }),
        );
      }
    });

    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    if (match) {
      const matchDt = fromFirebaseDate(match.date).toDate();
      navigation.setOptions({title: i18n.l('date_formats_day', matchDt)});
    }
  }, [match]);

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

  if (!match) {
    return <SpinLoader />;
  }

  const locked = match.confirmations_locked;
  let matchInProgress = false;
  const matchDt = fromFirebaseDate(match.date).toDate();
  const matchStartDate = matchDt;
  const matchEndDate = addMinutes(matchDt, match.duration);
  let loggedInUserIsSubscribed;
  if (match.subscriptions) {
    loggedInUserIsSubscribed = match.subscriptions.find(
      (s) => s.user_id === myUid,
    );
  }
  const nowDate = new Date();

  const inProgress =
    matchStartDate.getTime() <= nowDate.getTime() &&
    nowDate.getTime() <= matchEndDate.getTime();

  const matchPassed = matchEndDate.getTime() <= nowDate.getTime();

  if (!locked && inProgress && match.status === 'to-play') {
    matchInProgress = true;
  }

  let blueList = [];
  let redList = [];

  if (match.subscriptions && match.subscriptions.length > 0) {
    blueList = match.subscriptions.filter((s) => s.team === 'blue');
    redList = match.subscriptions.filter((s) => s.team === 'red');
  }

  const keyExtractor = (item, index) => index.toString();

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={async () => {
            await setRefreshing(true);
            await setMatch(matches.byId[id] ? matches.byId[id] : null);
            await setRefreshing(false);
          }}
        />
      }
      style={{height: 'auto', marginVertical: sizes.BASE / 1.5}}>
      <View style={listItemContainerStyle}>
        <Grid>
          <RawDateAndScores
            matchPassed={matchPassed}
            matchInProgress={matchInProgress}
            showScores={false}
            item={{
              dt: matchDt,
              ...match,
            }}
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
                  {match.location_name}
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
                <Text style={stylesCardLabel}>{match.group_name}</Text>
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
                  count: match.capacity,
                })}
                {', '}
                {i18n.t('matches_screen_minutes', {
                  count: match.duration,
                })}
              </Text>
              <Text style={stylesCardLabel}>
                <Text style={{fontFamily: 'Rubik_300Light'}}>
                  {i18n.t('matches_screen_created_by')}
                </Text>{' '}
                {match.created_by_first_name + ' ' + match.created_by_last_name}
              </Text>
            </Col>
          </Row>
          {match.status === 'to-play' && (
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
                      title={i18n.t('matches_screen_confirmations_locked')}
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
                  loggedInUserIsSubscribed.subscription === 'playing' && (
                    <Row>
                      <SubscribedText />
                    </Row>
                  )}

                {!locked && !matchInProgress && !matchPassed && (
                  <Row
                    style={{
                      marginTop: sizes.BASE / 2,
                      paddingTop: sizes.BASE / 2,
                    }}>
                    <SubscribeButtons
                      subscribed={loggedInUserIsSubscribed}
                      loadingSubscribe={subscribing[match.id]}
                      loadingUnsubscribe={unsubscribing[match.id]}
                      onSubscribe={() => {
                        dispatch(doSubscribe(match.id));
                      }}
                      onUnsubscribe={() => {
                        dispatch(doUnsubscribe(match.id));
                      }}
                      locked={locked}
                    />
                  </Row>
                )}
              </Col>
            </Row>
          )}

          {blueList.length > 0 && redList.length > 0 && (
            <>
              <Row style={{marginTop: sizes.BASE * 0.7}}>
                <Col
                  style={{
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: colors.joy2,
                    padding: sizes.BASE * 0.3,
                  }}>
                  <Row>
                    <Col style={{justifyContent: 'center'}}>
                      <TeamTitle
                        colors={colors}
                        sizes={sizes}
                        teamColor={'red'}
                      />
                    </Col>
                    <Col
                      style={{
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                      }}>
                      <Scores item={match} only={'red'} />
                    </Col>
                  </Row>
                </Col>
                <Col
                  style={{
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: colors.joy2,
                    padding: sizes.BASE * 0.3,
                  }}>
                  <Row>
                    <Col style={{justifyContent: 'center'}}>
                      <TeamTitle
                        colors={colors}
                        sizes={sizes}
                        teamColor={'blue'}
                      />
                    </Col>
                    <Col
                      style={{
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                      }}>
                      <Scores item={match} only={'blue'} />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FlatList
                    keyExtractor={keyExtractor}
                    data={redList}
                    renderItem={({item}) => <TeamPlayerItem item={item} />}
                  />
                </Col>
                <Col>
                  <FlatList
                    keyExtractor={keyExtractor}
                    data={blueList}
                    renderItem={({item}) => <TeamPlayerItem item={item} />}
                  />
                </Col>
              </Row>
            </>
          )}

          {match.subscriptions && match.subscriptions.length > 0 && (
            <MatchSubscriptions subscriptions={match.subscriptions} />
          )}
        </Grid>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  submitButtonText: {fontFamily: 'Rubik_300Light'},
  submitButton: {
    width: 200,
    borderRadius: Math.round(45 / 2),
    height: 35,
    marginRight: 1,
  },
  submitButtonNoWidth: {
    borderRadius: Math.round(45 / 2),
    height: 25,
    marginRight: 1,
  },
});

export default Match;
