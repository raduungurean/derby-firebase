import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet} from 'react-native';
import {useDerbyTheme} from '../../utils/theme';
import i18n from 'i18n-js';
import {Button, Input, Text} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {Grid, Col, Row} from 'react-native-easy-grid/index';
import TeamPlayerItem from '../../components/match/TeamPlayerItem';
import SpinLoader from '../../components/SpinLoader';
import {useFocusEffect} from '@react-navigation/core';
import {editMatchScore, loadMatch} from '../../actions/matches';
import NoResultsMessage from '../../components/NoResultsMessage';
import TeamTitle from '../../components/match/TeamTitle';
import {LinearGradient} from 'expo-linear-gradient';
import isNumeric from 'validator/lib/isNumeric';
import {useEditMatchScoreAlerts} from '../../hooks/useDropDownAlerts';

const MatchEditScoreForm = ({matchId}) => {
  const {colors, sizes, dark} = useDerbyTheme();
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches);
  const {editingScore} = matches;
  const [match, setMatch] = useState(null);
  const [teamRedScore, setTeamRedScore] = useState(null);
  const [teamBlueScore, setTeamBlueScore] = useState(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const p = matches.byId[matchId];
    setMatch(p);
  }, [matches, matchId]);

  useFocusEffect(
    useCallback(() => {
      dispatch(loadMatch(matchId));
    }, [matchId]),
  );

  useEffect(() => {
    if (match) {
      setTeamRedScore(match.team_red_score);
      setTeamBlueScore(match.team_blue_score);
    }
  }, [match]);

  useEffect(() => {
    if (isNumeric(teamRedScore + '') && isNumeric(teamBlueScore + '')) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [teamRedScore, teamBlueScore]);

  useEditMatchScoreAlerts();

  if (!match) {
    return <SpinLoader />;
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
        {i18n.t('match_edit_score_form_title')}
      </Text>
      {blueList.length > 0 && redList.length > 0 && (
        <>
          <Grid style={{width: '100%', marginVertical: sizes.BASE}}>
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
                    <Input
                      placeholder="Score"
                      value={teamRedScore}
                      onChangeText={(newScore) => setTeamRedScore(newScore)}
                      containerStyle={{marginTop: sizes.BASE / 4}}
                      inputStyle={[
                        styles.titleStyle,
                        {
                          color: colors.text,
                          textAlign: 'center',
                          fontSize: sizes.FONT * 0.8,
                          width: sizes.BASE * 2,
                          minHeight: 25,
                        },
                      ]}
                    />
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
                    <Input
                      placeholder="Score"
                      containerStyle={{marginTop: sizes.BASE / 4}}
                      value={teamBlueScore}
                      onChangeText={(newScore) => setTeamBlueScore(newScore)}
                      inputStyle={[
                        styles.titleStyle,
                        {
                          color: colors.text,
                          textAlign: 'center',
                          fontSize: sizes.FONT * 0.8,
                          width: sizes.BASE * 2,
                          minHeight: 25,
                        },
                      ]}
                    />
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
          </Grid>
          <Button
            loading={editingScore}
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
                editMatchScore({
                  teamBlueScore,
                  teamRedScore,
                  id: match.id,
                }),
              );
            }}
          />
        </>
      )}
      {blueList.length === 0 && redList.length === 0 && (
        <NoResultsMessage message={i18n.t('match_edit_score_teams_not_set')} />
      )}
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

export default MatchEditScoreForm;
