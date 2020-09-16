import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon, withBadge} from 'react-native-elements';
import * as PropTypes from 'prop-types';

function GroupSelector(props) {
  const BadgedIconGroups = withBadge(props.selectedGroup ? '1' : '', {
    left: props.sizes.BASE,
    right: 0,
    status: 'warning',
    top: 0,
  })(Icon);

  return (
    <>
      <TouchableOpacity onPress={props.onPress}>
        {props.selectedGroup && (
          <BadgedIconGroups
            type="antdesign"
            status={'warning'}
            name="downcircleo"
            size={props.sizes.BASE * 1.5}
            color={props.colors.text}
          />
        )}
        {!props.selectedGroup && (
          <Icon
            type="antdesign"
            name="downcircleo"
            size={props.sizes.BASE * 1.5}
            color={props.colors.text}
          />
        )}
      </TouchableOpacity>
    </>
  );
}

GroupSelector.propTypes = {
  onPress: PropTypes.func,
  selectedGroup: PropTypes.any,
  sizes: PropTypes.shape({BASE: PropTypes.number, FONT: PropTypes.number}),
  colors: PropTypes.any,
};

export default GroupSelector;
