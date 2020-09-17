import React from 'react';
import {Col, Row} from 'react-native-easy-grid/index';
import {Button, Icon, Text} from 'react-native-elements';
import i18n from 'i18n-js';
import {useDerbyTheme} from '../../utils/theme';
import {StyleSheet} from 'react-native';
import {sortByTeam} from '../../utils/helpers';

const MatchSubscriptions = ({subscriptions}) => {
  const {sizes, colors} = useDerbyTheme();
  const stylesCardLabel = {
    color: colors.text,
    fontSize: sizes.BASE * 0.8,
    fontFamily: 'Rubik_400Regular',
    marginRight: sizes.BASE,
    marginTop: 1,
  };
  return (
    <>
      <Row style={{marginTop: sizes.BASE * 0.7}}>
        <Col>
          <Text
            style={[
              stylesCardLabel,
              {
                fontFamily: 'Rubik_500Medium',
                marginBottom: sizes.BASE / 2.5,
                marginTop: sizes.BASE / 1.5,
              },
            ]}>
            {i18n.t('match_screen_subscribed_players')}
          </Text>
        </Col>
      </Row>
      <Row style={{flexWrap: 'wrap'}}>
        {subscriptions.sort(sortByTeam).map((subs) => {
          return (
            <Button
              containerStyle={{
                marginTop: sizes.BASE * 0.4,
                marginRight: sizes.BASE * 0.4,
              }}
              disabled={true}
              disabledStyle={{backgroundColor: colors.backgroundCard}}
              disabledTitleStyle={[
                styles.submitButtonText,
                {
                  color: colors.text,
                  fontSize: sizes.BASE * 0.7,
                },
              ]}
              titleStyle={[
                styles.submitButtonText,
                {
                  color: colors.text,
                  fontSize: sizes.BASE * 0.7,
                },
              ]}
              buttonStyle={[
                styles.submitButtonNoWidth,
                {
                  paddingHorizontal: sizes.BASE,
                  paddingVertical: sizes.BASE / 4,
                  borderWidth: 2,
                  borderColor: colors.joy2,
                },
              ]}
              icon={
                <Icon
                  size={sizes.BASE}
                  name={
                    subs.subscription === 'playing' ? 'caretup' : 'caretdown'
                  }
                  type="antdesign"
                  color={
                    subs.subscription === 'playing'
                      ? colors.joy2
                      : subs.subscription === 'not-playing'
                      ? colors.error
                      : colors.textMuted
                  }
                  style={{marginRight: sizes.BASE / 2}}
                />
              }
              title={subs.first_name + ' ' + subs.last_name}
              key={subs.first_name + ' ' + subs.last_name}
            />
          );
        })}
      </Row>
    </>
  );
};

const styles = StyleSheet.create({
  submitButtonText: {fontFamily: 'Rubik_300Light'},
  submitButton: {
    width: 200,
    borderRadius: Math.round(45 / 2),
    height: 35,
    marginRight: 1,
  },
  submitButtonNoWidth: {
    borderRadius: Math.round(45 / 2),
    height: 25,
    marginRight: 1,
  },
});

export default MatchSubscriptions;
