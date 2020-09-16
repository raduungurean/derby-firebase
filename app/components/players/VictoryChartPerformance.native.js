import React from 'react';
import {LineChart, Grid} from 'react-native-svg-charts';
import {useDerbyTheme} from '../../utils/theme';
import {Line} from 'react-native-svg';
import {Text} from 'react-native-elements';
import {Defs, LinearGradient, Stop} from 'react-native-svg';
import i18n from 'i18n-js';

const HorizontalLine = ({y}) => (
  <Line
    key={'zero-axis'}
    x1={'0%'}
    x2={'100%'}
    y1={y(0)}
    y2={y(0)}
    stroke={'grey'}
    strokeDasharray={[4, 5]}
    strokeWidth={2}
  />
);

const Gradient = () => {
  const {colors} = useDerbyTheme();
  return (
    <Defs key={'gradient'}>
      <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
        <Stop offset={'0%'} stopColor={colors.joy4} />
        <Stop offset={'100%'} stopColor={colors.primary} />
      </LinearGradient>
    </Defs>
  );
};

export default function VictoryChartPerformance({st}) {
  if ((st && st.perf_hist && st.perf_hist.length === 0) || !st) {
    return (
      <Text style={{fontFamily: 'Rubik_300Light'}}>
        {i18n.t('player_chart_not_available')}
      </Text>
    );
  }

  return (
    <LineChart
      style={{height: 230}}
      data={st.perf_hist}
      // curve={shape.curveBasis}
      animate={true}
      animationDuration={1000}
      svg={{stroke: 'url(#gradient)', strokeWidth: 2}}
      contentInset={{top: 20, bottom: 20}}>
      <Grid />
      <Gradient />
      <HorizontalLine />
    </LineChart>
  );
}
