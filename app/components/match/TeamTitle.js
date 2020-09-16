import React from 'react';
import {Icon, Text} from 'react-native-elements';
import * as PropTypes from 'prop-types';
import {useDerbyTheme} from '../../utils/theme';
import i18n from 'i18n-js';
import {Col, Grid, Row} from 'react-native-easy-grid';

function TeamTitle({teamColor}) {
  const {colors, sizes} = useDerbyTheme();
  return (
    <Grid>
      <Row>
        <Col>
          <Row style={{alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: 'Rubik_400Regular',
                color: colors.text,
              }}>
              {i18n.t('match_team_title')}{' '}
            </Text>
            <Icon
              size={sizes.BASE * 0.9}
              name="md-shirt"
              type="ionicon"
              color={teamColor === 'blue' ? colors.primary : colors.error}
              style={{marginLeft: sizes.BASE * 0.5}}
            />
          </Row>
        </Col>
      </Row>
    </Grid>
  );
}

TeamTitle.propTypes = {
  teamColor: PropTypes.string,
};

export default TeamTitle;
