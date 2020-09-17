import React from 'react';
import {Button, Icon} from 'react-native-elements';
import i18n from 'i18n-js';
import {useDerbyTheme} from '../../utils/theme';
import {StyleSheet} from 'react-native';

const SubscribedText = () => {
  const {colors, sizes} = useDerbyTheme();
  return (
    <Button
      buttonStyle={styles.submitButtonFull}
      icon={
        <Icon
          type="octicon"
          name="thumbsup"
          style={{marginRight: sizes.BASE / 2}}
          size={15}
          color={colors.success}
        />
      }
      type="outline"
      titleStyle={[
        styles.submitButtonText,
        {
          color: colors.success,
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
    borderWidth: 0,
    height: 20,
    marginRight: 1,
    paddingVertical: 0,
  },
});

export default SubscribedText;
