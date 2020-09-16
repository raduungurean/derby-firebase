import {Col, Grid, Row} from 'react-native-easy-grid';
import * as PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Switch} from 'react-native';
import {Text} from 'react-native-elements';
import {useDerbyTheme} from '../../utils/theme';

export default function ThemeSwitcher(props) {
  const {colors, sizes} = useDerbyTheme();
  const themeSwitcherStyles = [styles.textThemeSwitcher, {color: colors.text}];

  return (
    <Grid style={styles.grid}>
      <Row>
        <Col>
          <Text style={[themeSwitcherStyles, {fontSize: sizes.BASE * 1.1}]}>
            {'Dark'}
          </Text>
        </Col>
        <Col>
          <Switch value={props.value} onValueChange={props.onChange} />
        </Col>
      </Row>
    </Grid>
  );
}

ThemeSwitcher.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func,
};

const styles = StyleSheet.create({
  grid: {
    width: '50%',
    marginTop: 5,
  },
  textThemeSwitcher: {
    fontFamily: 'Rubik_400Regular',
  },
});
