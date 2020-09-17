import {Button, Icon} from 'react-native-elements';
import {LinearGradient} from 'expo-linear-gradient';
import React from 'react';
import {useDerbyTheme} from '../../utils/theme';
import {StyleSheet} from 'react-native';
import i18n from 'i18n-js';

export default function SubscribeButtons({
  locked,
  onSubscribe,
  onUnsubscribe,
  loadingSubscribe,
  loadingUnsubscribe,
  subscribed,
}) {
  const {colors, sizes, dark} = useDerbyTheme();

  let showSubscribeButton = true;
  let showUnsubscribeButton = true;
  let showFullButton = false;

  if (subscribed && subscribed.subscription === 'playing') {
    showSubscribeButton = false;
    showUnsubscribeButton = true;
    showFullButton = true;
  }

  if (subscribed && subscribed.subscription === 'not-playing') {
    showSubscribeButton = true;
    showUnsubscribeButton = false;
    showFullButton = true;
  }

  return (
    <>
      {showSubscribeButton && (
        <Button
          linearGradientProps={{
            colors: [colors.success1, colors.success, colors.success],
            start: [1, 0],
            end: [0.2, 0],
          }}
          disabled={locked}
          disabledTitleStyle={{color: colors.textMuted1}}
          buttonStyle={
            showFullButton ? styles.submitButtonFull : styles.submitButton
          }
          ViewComponent={LinearGradient}
          onPress={onSubscribe}
          loading={loadingSubscribe}
          icon={
            <Icon
              type="antdesign"
              name="checkcircle"
              style={{marginRight: sizes.BASE / 2}}
              size={15}
              color={!locked ? colors.white : colors.textMuted1}
            />
          }
          titleStyle={[
            styles.submitButtonText,
            {
              color: dark ? colors.white : colors.backgroundCard,
              fontSize: sizes.BASE * 0.7,
            },
          ]}
          title={i18n.t('matches_screen_ill_be_there')}
        />
      )}

      {showUnsubscribeButton && (
        <>
          <Button
            linearGradientProps={{
              colors: [colors.error, colors.error, colors.error1],
              start: [1, 0],
              end: [0.2, 0],
            }}
            disabled={locked}
            disabledTitleStyle={{color: colors.textMuted1}}
            buttonStyle={
              showFullButton
                ? styles.submitButtonCancelFull
                : styles.submitButtonCancel
            }
            ViewComponent={LinearGradient}
            onPress={onUnsubscribe}
            loading={loadingUnsubscribe}
            iconRight
            icon={
              <Icon
                type="antdesign"
                name="closecircle"
                style={{marginLeft: sizes.BASE / 2}}
                size={15}
                color={!locked ? colors.white : colors.textMuted1}
              />
            }
            titleStyle={[
              styles.submitButtonText,
              {
                color: dark ? colors.white : colors.backgroundCard,
                fontSize: sizes.BASE * 0.7,
              },
            ]}
            title={i18n.t('matches_screen_not_this_time')}
          />
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  submitButtonText: {fontFamily: 'Rubik_300Light'},
  submitButtonFull: {
    width: 235,
    borderRadius: Math.round(45 / 2),
    height: 35,
    marginRight: 1,
  },
  submitButton: {
    width: 135,
    borderTopLeftRadius: Math.round(45 / 2),
    borderBottomLeftRadius: Math.round(45 / 2),
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    height: 35,
    marginRight: 1,
  },
  submitButtonCancelFull: {
    width: 235,
    borderRadius: Math.round(45 / 2),
    height: 35,
    marginLeft: 1,
  },
  submitButtonCancel: {
    width: 135,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: Math.round(45 / 2),
    borderBottomRightRadius: Math.round(45 / 2),
    height: 35,
    marginLeft: 1,
  },
});
