import {VictoryPie, VictoryLegend} from 'victory-native';
import * as PropTypes from 'prop-types';
import React from 'react';
import {useDerbyTheme} from '../../utils/theme';
import {Text} from 'react-native-elements';
import {View, Dimensions} from 'react-native';
import Svg from 'react-native-svg';

export default function VictoryChartWinLooseMobile({st}) {
  const {colors, sizes} = useDerbyTheme();

  if (!st) {
    return null;
  }

  if (st.total === 0) {
    return <Text style={{textAlign: 'center'}}>chart not available</Text>;
  }

  return (
    <View>
      <VictoryPie
        width={Dimensions.get('window').width}
        padding={{right: 120, left: 70}}
        labels={[st.wins, st.looses, st.draws]}
        colorScale={[colors.joy2, colors.error, colors.textMuted]}
        animate={{
          duration: 1000,
        }}
        padAngle={({datum}) => datum.y / 5}
        innerRadius={70}
        style={{
          labels: {fill: colors.text},
          parent: {
            marginVertical: 'auto',
          },
        }}
        data={[
          {x: 'Wins', y: st.wins + ' wins'},
          {x: 'Looses', y: st.looses + ' looses'},
          {x: 'Draws', y: st.draws + ' draws'},
        ]}
      />
    </View>
  );
}

VictoryChartWinLooseMobile.propTypes = {st: PropTypes.any};
