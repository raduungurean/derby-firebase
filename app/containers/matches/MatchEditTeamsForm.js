import React, {useCallback, useEffect, useState} from 'react';
import {useDerbyTheme} from '../../utils/theme';
import {FlatList, ScrollView, StyleSheet} from 'react-native';
import i18n from 'i18n-js';
import {Button, Icon, Text} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {useEditMatchTeamsAlerts} from '../../hooks/useDropDownAlerts';
import SpinLoader from '../../components/SpinLoader';
import {useFocusEffect} from '@react-navigation/core';
import {editMatchTeams, loadMatch} from '../../actions/matches';
import {Col, Grid, Row} from 'react-native-easy-grid';
import TeamPlayerItem from '../../components/match/TeamPlayerItem';
import {sortByTeam} from '../../utils/helpers';
import {LinearGradient} from 'expo-linear-gradient';
import isEmpty from 'lodash/isEmpty';

const MatchEditTeamsForm = ({matchId}) => {
  const {colors, sizes, dark} = useDerbyTheme();
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches);
  const [match, setMatch] = useState(null);
  const [teams, setTeams] = useState({});
  const {editingTeams} = matches;
  const [isValid, setIsValid] = useState(false);

  const nextType = (type) => {
    let newType;
    if (type === 'none') {
      newType = 'red';
    } else if (type === 'red') {
      newType = 'blue';
    } else {
      newType = 'none';
    }
    return newType;
  };

  const isTeam = (localState, initialState, team) => {
    if (localState.team && localState.team === team) {
      return true;
    }
    if (localState.team && localState.team !== team) {
      return false;
    }
    return initialState.team === team;
  };

  const isSubsType = (localState, initialState, type) => {
    if (localState.subscription && localState.subscription === type) {
      return true;
    }
    if (localState.subscription && localState.subscription !== type) {
      return false;
    }
    return initialState.subscription === type;
  };

  const setTheTeams = (playerId, isRedTeam, isBlueTeam) => {
    let colr = 'none';

    if (isRedTeam) {
      colr = 'red';
    }

    if (isBlueTeam) {
      colr = 'blue';
    }

    setTeams({
      ...teams,
      [playerId]: {
        ...teams[playerId],
        team: nextType(colr),
      },
    });
  };

  const setPlayerPlaying = (playerId) => {
    setTeams({
      ...teams,
      [playerId]: {
        ...teams[playerId],
        subscription: 'playing',
      },
    });
  };

  const setPlayerNotPlaying = (playerId) => {
    setTeams({
      ...teams,
      [playerId]: {
        ...teams[playerId],
        subscription: 'not-playing',
      },
    });
  };

  useEffect(() => {
    const p = matches.byId[matchId];
    setMatch(p);
  }, [matches, matchId]);

  useEffect(() => {
    if (!isEmpty(teams)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [teams]);

  useFocusEffect(
    useCallback(() => {
      dispatch(loadMatch(matchId));
    }, [matchId]),
  );

  useEditMatchTeamsAlerts();

  if (!match) {
    return <SpinLoader />;
  }

  let matchSubscriptions = [];
  if (match.subscriptions) {
    matchSubscriptions = match.subscriptions.map((ms) => {
      return {
        ...ms,
        localState: {
          team: teams[ms.user_id] ? teams[ms.user_id].team : undefined,
          subscription: teams[ms.user_id]
            ? teams[ms.user_id].subscription
            : undefined,
        },
      };
    });
  }

  // console.log('### matchSubscriptions', matchSubscriptions);

  const keyExtractor = (item, index) => index.toString();

  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'center', flexDirection: 'column'}}
      style={{height: 'auto', margin: sizes.BASE / 1.5}}>
      <Text
        style={[
          styles.titleStyle,
          {
            paddingRight: sizes.BASE * 1.5,
            paddingLeft: 0,
            paddingTop: sizes.BASE,
            fontSize: sizes.FONT * 1.2,
            color: colors.text,
          },
        ]}>
        {i18n.t('match_edit_teams_form_title')}
      </Text>

      {match.subscriptions && match.subscriptions.length > 0 && (
        <Grid style={{width: '100%', marginVertical: sizes.BASE}}>
          <Row>
            <Col>
              <FlatList
                keyExtractor={keyExtractor}
                data={matchSubscriptions.sort(sortByTeam)}
                renderItem={({item}) => {
                  const playerId = item.user_id;
                  const isRedTeam = isTeam(item.localState, item, 'red');
                  const isNoTeam = isTeam(item.localState, item, 'none');
                  const isBlueTeam = isTeam(item.localState, item, 'blue');
                  const isPlaying = isSubsType(
                    item.localState,
                    item,
                    'playing',
                  );
                  const isNotPlaying = isSubsType(
                    item.localState,
                    item,
                    'not-playing',
                  );

                  let colorShirt = dark ? colors.text : colors.backgroundScreen;
                  if (isNotPlaying) {
                    colorShirt = dark ? colors.text : colors.backgroundScreen;
                  } else {
                    if (isBlueTeam) {
                      colorShirt = colors.primary;
                    } else if (isRedTeam) {
                      colorShirt = colors.error;
                    }
                  }

                  return (
                    <TeamPlayerItem
                      fontSizeBigger={true}
                      rightElement={
                        <Grid>
                          <Row>
                            <Col>
                              {isPlaying && (
                                <Icon
                                  type="octicon"
                                  name="thumbsup"
                                  style={{marginRight: sizes.BASE / 2}}
                                  size={25}
                                  onPress={() => setPlayerNotPlaying(playerId)}
                                  color={colors.success}
                                />
                              )}
                              {isNotPlaying && (
                                <Icon
                                  type="octicon"
                                  name="thumbsup"
                                  style={{marginRight: sizes.BASE / 2}}
                                  size={25}
                                  onPress={() => setPlayerPlaying(playerId)}
                                  color={colors.error}
                                />
                              )}
                            </Col>
                            <Col>
                              <Icon
                                name="md-shirt"
                                type="ionicon"
                                style={{marginRight: sizes.BASE / 2}}
                                size={25}
                                onPress={() =>
                                  setTheTeams(playerId, isRedTeam, isBlueTeam)
                                }
                                color={colorShirt}
                              />
                            </Col>
                          </Row>
                        </Grid>
                      }
                      item={item}
                    />
                  );
                }}
              />
            </Col>
          </Row>
        </Grid>
      )}

      <Button
        loading={editingTeams}
        title={i18n.t('match_edit_button_label')}
        containerStyle={{marginTop: sizes.BASE}}
        buttonStyle={styles.submitButton}
        linearGradientProps={{
          colors: [colors.primary, '#36b8f4'],
          start: [1, 0],
          end: [0.2, 0],
        }}
        ViewComponent={LinearGradient}
        titleStyle={[
          styles.submitButtonText,
          {
            color: dark ? colors.white : colors.backgroundCard,
            fontSize: sizes.BASE,
          },
        ]}
        disabledTitleStyle={{
          color: colors.textMuted,
        }}
        disabled={!isValid}
        onPress={() => {
          dispatch(
            editMatchTeams({
              teams,
              id: match.id,
            }),
          );
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  submitButtonText: {fontFamily: 'Rubik_400Regular'},
  dateButton: {
    width: '100%',
    borderRadius: Math.round(45 / 2),
    height: 35,
  },
  submitButton: {
    width: 200,
    borderRadius: Math.round(45 / 2),
    height: 40,
  },
  titleStyle: {
    fontFamily: 'Rubik_400Regular',
    marginRight: 'auto',
  },
});

export default MatchEditTeamsForm;
