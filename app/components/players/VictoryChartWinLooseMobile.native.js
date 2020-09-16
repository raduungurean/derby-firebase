import React from 'react';
import {PieChart} from 'react-native-svg-charts';
import {Text as SVGText} from 'react-native-svg';
import * as PropTypes from 'prop-types';
import {useDerbyTheme} from '../../utils/theme';
import {Text} from 'react-native-elements';
import {Col, Grid, Row} from 'react-native-easy-grid';
import i18n from 'i18n-js';

export default function VictoryChartWinLooseMobile({st}) {
  const {colors, sizes, dark} = useDerbyTheme();

  if ((st && st.perf_hist && st.perf_hist.length === 0) || !st) {
    return (
      <Text style={{fontFamily: 'Rubik_300Light'}}>
        {i18n.t('player_chart_not_available')}
      </Text>
    );
  }

  const data = [
    {
      key: 1,
      amount: st.wins,
      svg: {fill: colors.primary},
    },
    {
      key: 2,
      amount: st.looses,
      svg: {fill: colors.error},
    },
    {
      key: 3,
      amount: st.draws,
      svg: {fill: colors.text},
    },
  ];

  const Labels = ({slices, height, width}) => {
    return slices.map((slice, index) => {
      const {labelCentroid, pieCentroid, data} = slice;
      return (
        <SVGText
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill={'white'}
          textAnchor={'middle'}
          alignmentBaseline={'middle'}
          fontSize={24}
          stroke={'black'}
          strokeWidth={0.2}>
          {data.amount}
        </SVGText>
      );
    });
  };

  return (
    <>
      <PieChart
        style={{height: 200}}
        valueAccessor={({item}) => item.amount}
        data={data}
        spacing={0}
        animate={true}
        animationDuration={1000}
        outerRadius={'95%'}>
        <Labels />
      </PieChart>
      <Grid
        style={{
          borderWidth: 2,
          borderColor: colors.backgroundCard,
          marginTop: sizes.BASE,
        }}>
        <Row>
          <Col
            style={{
              alignItems: 'center',
              backgroundColor: colors.joy1,
            }}>
            <Text style={{color: dark ? colors.textMuted : colors.white}}>
              Wins
            </Text>
          </Col>
          <Col
            style={{
              alignItems: 'center',
              backgroundColor: colors.text,
            }}>
            <Text style={{color: dark ? colors.textMuted : colors.white}}>
              Draws
            </Text>
          </Col>
          <Col
            style={{
              alignItems: 'center',
              backgroundColor: colors.error,
            }}>
            <Text style={{color: dark ? colors.textMuted : colors.white}}>
              Lost
            </Text>
          </Col>
        </Row>
      </Grid>
    </>
  );
}

VictoryChartWinLooseMobile.propTypes = {st: PropTypes.any};
