import React from 'react';
import {Button, Icon} from 'react-native-elements';
import i18n from 'i18n-js';
import {useDerbyTheme} from '../../utils/theme';
import {StyleSheet} from 'react-native';

const SubscribedText = () => {
  const {colors, sizes, dark} = useDerbyTheme();
  return (
    <Button
      disabled={true}
      disabledTitleStyle={{color: colors.text}}
      disabledStyle={{borderColor: colors.success}}
      buttonStyle={styles.submitButtonFull}
      onPress={() => {}}
      icon={
        <Icon
          type="entypo"
          name="thumbs-up"
          style={{marginRight: sizes.BASE / 2}}
          size={15}
          color={colors.success}
        />
      }
      type="outline"
      titleStyle={[
        styles.submitButtonText,
        {
          color: dark ? colors.white : colors.backgroundCard,
          fontSize: sizes.BASE * 0.75,
        },
      ]}
      title={i18n.t('matches_screen_subscribed')}
    />
  );
};

const styles = StyleSheet.create({
  submitButtonFull: {
    width: 235,
    borderRadius: Math.round(45 / 2),
    height: 35,
    marginRight: 1,
  },
});

export default SubscribedText;
