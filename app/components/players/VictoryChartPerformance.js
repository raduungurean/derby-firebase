import * as PropTypes from 'prop-types';
import React from 'react';
import {Text} from 'react-native-elements';
import {View} from 'react-native';
import i18n from 'i18n-js';
import Chart from 'react-apexcharts';

export default function VictoryChartPerformance({st}) {
  if ((st && st.perf_hist && st.perf_hist.length === 0) || !st) {
    return (
      <Text style={{textAlign: 'left', fontFamily: 'Rubik_300Light'}}>
        {i18n.t('player_chart_not_available')}
      </Text>
    );
  }

  const options = {
    stroke: {
      curve: 'straight',
      width: st.perf_hist && st.perf_hist.length > 30 ? 1 : 2,
    },
    markers: {
      size: 0,
    },
    chart: {
      zoom: false,
      toolbar: {
        show: false,
      },
    },
    annotations: {
      yaxis: [
        {
          y: 0,
          borderColor: '#00E396',
          label: {
            borderColor: '#00E396',
            style: {
              color: '#fff',
              background: '#00E396',
            },
            text: 'ranking line',
          },
        },
      ],
    },
    yaxis: {
      labels: {
        formatter: (value) => {
          return value + '';
        },
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
    },
  };

  const series = [
    {
      name: 'Performance',
      data: st.perf_hist.map((p) => p + ''),
    },
  ];

  return (
    <View>
      <Chart options={options} series={series} type="line" height={320} />
    </View>
  );
}

VictoryChartPerformance.propTypes = {st: PropTypes.any};
