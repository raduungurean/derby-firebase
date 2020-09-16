import * as PropTypes from 'prop-types';
import {Col, Grid, Row} from 'react-native-easy-grid';
import React from 'react';
import {Icon} from 'react-native-elements';
import {useDerbyTheme} from '../utils/theme';

export default function StackHeaderLeft(props) {
  const {colors, sizes} = useDerbyTheme();
  return (
    <Grid>
      <Row style={{alignItems: 'center'}}>
        {!props.props.canGoBack && (
          <Col>
            <Icon
              iconStyle={{
                marginLeft: (sizes.BASE / 2) * 0.875,
                color: colors.text,
              }}
              size={sizes.BASE * 1.8}
              type="material-community"
              name="menu"
              onPress={() => props.onOpenDrawer()}
            />
          </Col>
        )}
        {props.props.canGoBack && (
          <Col>
            <Icon
              iconStyle={{
                marginLeft: (sizes.BASE / 2) * 0.875,
                color: colors.text,
              }}
              type="material-community"
              name="arrow-left"
              style={{marginLeft: 5}}
              onPress={() => props.onBack()}
            />
          </Col>
        )}
      </Row>
    </Grid>
  );
}

StackHeaderLeft.propTypes = {
  props: PropTypes.any,
  onBack: PropTypes.func,
  onOpenDrawer: PropTypes.func,
};
