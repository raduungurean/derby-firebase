import {Button, Text} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';
import i18n from 'i18n-js';
import VictoryChartWinLooseMobile from './VictoryChartWinLooseMobile.native';
import {Col, Grid, Row} from 'react-native-easy-grid';
import VictoryChartPerformance from './VictoryChartPerformance.native';
import * as PropTypes from 'prop-types';
import React from 'react';
import {useDerbyTheme} from '../../utils/theme';

export default function PlayerCharts(props) {
  const {sizes, colors, dark} = useDerbyTheme();

  const listItemContainerStyle = {
    height: 'auto',
    flex: 0,
    backgroundColor: colors.backgroundCard,
    borderRadius: sizes.BASE / 2,
    marginHorizontal: sizes.BASE / 1.5,
    marginVertical: sizes.BASE / 3,
    padding: sizes.BASE,
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

  return (
    <>
      {props.showTitle && (
        <Text
          style={[
            styles.groupTitle,
            {
              fontSize: sizes.BASE * 1.2,
              color: colors.text,
              paddingTop: sizes.BASE * 1.2,
              paddingBottom: sizes.BASE / 4,
              paddingHorizontal: sizes.BASE,
            },
          ]}>
          {props.group.name}
        </Text>
      )}

      <View style={listItemContainerStyle}>
        <Text
          style={[
            styles.chartTitle,
            {
              fontSize: sizes.BASE * 1.2,
              color: colors.text,
            },
          ]}>
          {i18n.t('player_screen_label_overview')}
        </Text>

        <VictoryChartWinLooseMobile st={props.player.st[props.group.id]} />

        <Grid style={{marginTop: sizes.BASE * 1.4}}>
          <Row>
            <Col style={{justifyContent: 'center'}}>
              <Text
                style={[
                  styles.chartTitle,
                  {
                    fontSize: sizes.BASE * 1.2,
                    color: colors.text,
                  },
                ]}>
                {i18n.t('player_screen_label_performance')}
              </Text>
            </Col>
            <Col
              style={{
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              {props.player.st[props.group.id].perf_hist.length > 0 && (
                <Button
                  title={props.player.st[props.group.id].performance}
                  titleStyle={{
                    color: dark ? colors.textMuted : colors.white,
                    fontSize: sizes.BASE / 1.5,
                  }}
                  buttonStyle={{
                    paddingVertical: sizes.BASE / 4,
                    backgroundColor:
                      props.player.st[props.group.id].performance >= 0
                        ? colors.joy3
                        : colors.error,
                  }}
                />
              )}
            </Col>
          </Row>
        </Grid>

        <VictoryChartPerformance st={props.player.st[props.group.id]} />
      </View>
    </>
  );
}

PlayerCharts.propTypes = {
  group: PropTypes.any,
  player: PropTypes.any,
  showTitle: PropTypes.bool,
};

const styles = StyleSheet.create({
  groupTitle: {textAlign: 'left', fontFamily: 'Rubik_400Regular'},
  chartTitle: {textAlign: 'left', fontFamily: 'Rubik_300Light'},
});
