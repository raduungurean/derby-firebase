import {Col, Row} from 'react-native-easy-grid';
import {Button, Icon, Text} from 'react-native-elements';
import i18n from 'i18n-js';
import Scores from './Scores';
import PropTypes from 'prop-types';
import React from 'react';
import {useDerbyTheme} from '../../utils/theme';

export default function RawDateAndScores({
  matchPassed,
  matchInProgress,
  item,
  showScores,
}) {
  const {colors, sizes} = useDerbyTheme();

  const dateStyles = {
    fontSize: sizes.BASE * 1.2,
    fontFamily: 'Rubik_400Regular',
    color: colors.text,
    paddingHorizontal: sizes.BASE / 4,
  };

  return (
    <Row
      size={1}
      style={{
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: sizes.BASE / 2,
      }}>
      <Col size={4}>
        <Row>
          <Col size={1} style={{alignItems: 'flex-start'}}>
            <Icon
              color={colors.text}
              type="evilicon"
              name="calendar"
              size={25}
            />
          </Col>
          <Col size={9} style={{alignItems: 'flex-start'}}>
            <Text style={dateStyles}>
              {i18n.l('date_formats_day', item.dt)}
            </Text>
          </Col>
        </Row>
        <Row>
          <Col size={1} style={{alignItems: 'flex-start'}}>
            <Icon color={colors.text} type="evilicon" name="clock" size={25} />
          </Col>
          <Col size={9} style={{alignItems: 'flex-start'}}>
            <Text style={dateStyles}>
              {i18n.l('date_formats_time', item.dt)}
            </Text>
          </Col>
        </Row>
      </Col>

      {['played'].includes(item.status) && showScores === true && (
        <Scores item={item} />
      )}

      {['to-play'].includes(item.status) && !matchPassed && !matchInProgress && (
        <Col
          size={2}
          style={{
            alignItems: 'flex-end',
          }}>
          <Button
            disabled
            disabledStyle={{borderColor: colors.success}}
            titleStyle={{fontSize: sizes.BASE * 0.7, color: colors.textMuted}}
            buttonStyle={{
              paddingVertical: sizes.BASE / 4,
            }}
            containerStyle={{marginTop: -sizes.BASE * 1.5}}
            title={i18n.t('matches_screen_label_upcoming')}
            type="outline"
            icon={
              <Icon
                type="ionicon"
                name="md-football"
                style={{marginRight: sizes.BASE / 2}}
                size={15}
                color={colors.success}
              />
            }
          />
        </Col>
      )}

      {['canceled'].includes(item.status) && (
        <Col
          size={2}
          style={{
            alignItems: 'flex-end',
          }}>
          <Button
            disabled
            titleStyle={{fontSize: sizes.BASE * 0.7, color: colors.textMuted}}
            buttonStyle={{
              paddingVertical: sizes.BASE / 4,
              borderColor: colors.error,
            }}
            containerStyle={{marginTop: -sizes.BASE * 1.5}}
            title={i18n.t('matches_screen_label_canceled')}
            type="outline"
            icon={
              <Icon
                type="material-community"
                name="cancel"
                style={{marginRight: sizes.BASE / 2}}
                size={15}
                color={colors.error}
              />
            }
          />
        </Col>
      )}
    </Row>
  );
}

RawDateAndScores.propTypes = {
  item: PropTypes.any,
};
