import {Col, Row} from 'react-native-easy-grid';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import PropTypes from 'prop-types';
import React from 'react';
import {useDerbyTheme} from '../../utils/theme';

export default function Scores({item, only}) {
  const {colors, sizes} = useDerbyTheme();

  let scoreIsSet = true;
  if (isNaN(item.team_red_score) || isNaN(item.team_blue_score)) {
    scoreIsSet = false;
  }

  if (!scoreIsSet) {
    return (
      <Col size={1} style={{alignItems: 'flex-end'}}>
        <Text>-</Text>
      </Col>
    );
  }

  let teamRedScore = parseInt(item.team_red_score, 10);
  let teamBlueScore = parseInt(item.team_blue_score, 10);

  const winner =
    teamRedScore > teamBlueScore
      ? 'team1'
      : teamRedScore === teamBlueScore
      ? 'none'
      : 'team2';

  let firstTeamBgColor = colors.textMuted;
  let firstTeamTextColor = colors.textMuted;
  let secondTeamBgColor = colors.textMuted;
  let secondTeamTextColor = colors.textMuted;

  if (winner === 'team1') {
    firstTeamBgColor = colors.backgroundSuccess;
    firstTeamTextColor = colors.success;
    secondTeamBgColor = colors.backgroundError;
    secondTeamTextColor = colors.error;
  }

  if (winner === 'team2') {
    firstTeamBgColor = colors.backgroundError;
    firstTeamTextColor = colors.error;
    secondTeamBgColor = colors.backgroundSuccess;
    secondTeamTextColor = colors.success;
  }

  const cond =
    item.team_red_score !== undefined && item.team_blue_score !== undefined;

  let showRed = true;
  let showBlue = true;

  if (only === 'red') {
    showRed = true;
    showBlue = false;
  }

  if (only === 'blue') {
    showRed = false;
    showBlue = true;
  }

  return (
    <>
      {cond && (
        <Col size={1.3} style={{alignItems: 'flex-end', borderColor: '0099ff'}}>
          <Row style={{justifyContent: 'center'}}>
            {showRed && (
              <Col size={1}>
                <View
                  style={{
                    borderColor: firstTeamBgColor,
                    borderWidth: 1,
                    width: 35,
                    height: 28,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 5,
                  }}>
                  <Text
                    style={{
                      color: firstTeamTextColor,
                      fontSize: 13,
                      marginHorizontal: 5,
                      fontFamily: 'Rubik_300Light',
                    }}>
                    {item.team_red_score ? item.team_red_score : '-'}
                  </Text>
                </View>
              </Col>
            )}
            {showBlue && (
              <Col size={1}>
                <View
                  style={{
                    borderColor: secondTeamBgColor,
                    borderWidth: 1,
                    width: 35,
                    height: 28,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 5,
                  }}>
                  <Text
                    style={{
                      color: secondTeamTextColor,
                      fontSize: 13,
                      marginHorizontal: 5,
                      fontFamily: 'Rubik_300Light',
                    }}>
                    {item.team_blue_score ? item.team_blue_score : '-'}
                  </Text>
                </View>
              </Col>
            )}
          </Row>
        </Col>
      )}
    </>
  );
}

Scores.propTypes = {
  item: PropTypes.any,
  only: PropTypes.string,
};
