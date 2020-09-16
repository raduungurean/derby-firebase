import * as PropTypes from 'prop-types';
import React from 'react';
import {Text} from 'react-native-elements';
import {View} from 'react-native';
import i18n from 'i18n-js';
import Chart from 'react-apexcharts';
import {useDerbyTheme} from '../../utils/theme';

export default function VictoryChartWinLooseMobile({st}) {
  const {colors} = useDerbyTheme();

  if ((st && st.perf_hist && st.perf_hist.length === 0) || !st) {
    return (
      <Text style={{textAlign: 'left', fontFamily: 'Rubik_300Light'}}>
        {i18n.t('player_chart_not_available')}
      </Text>
    );
  }

  const series = [st.wins, st.looses, st.draws];

  const options = {
    chart: {
      type: 'donut',
    },
    labels: [
      'Wins (' + st.wins + ')',
      'Looses (' + st.looses + ')',
      'Draws (' + st.draws + ')',
    ],
    legend: {
      position: 'bottom',
      labels: {
        useSeriesColors: true,
      },
    },
    colors: [colors.primary, colors.error, colors.text],
  };

  return (
    <View>
      <Chart options={options} height={320} series={series} type="donut" />
    </View>
  );
}

VictoryChartWinLooseMobile.propTypes = {st: PropTypes.any};
