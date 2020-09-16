import Menu, {MenuItem} from 'react-native-material-menu';
import {Platform} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import React, {useRef, useState} from 'react';
import {useDerbyTheme} from '../../utils/theme';
import {setSortPlayersBy} from '../../actions/layout';
import {useDispatch} from 'react-redux';

export default function PlayersSortMenu() {
  const [modalVisible, setModalVisible] = useState(false);
  const menu = useRef();
  const dispatch = useDispatch();
  const {colors, sizes} = useDerbyTheme();

  const hideMenu = () => {
    menu.current.hide(() => setModalVisible(false));
  };

  const showMenu = async () => {
    await setModalVisible(true);
    await menu.current.show();
  };

  return (
    <Menu
      ref={menu}
      style={
        Platform.OS === 'web'
          ? {
              borderWidth: 1,
              borderColor: colors.joy2,
              right: 'auto',
              top: -25,
              left: 0,
            }
          : {}
      }
      button={
        <Button
          type="clear"
          containerStyle={{marginRight: sizes.BASE}}
          onPress={showMenu}
          icon={
            <Icon
              type="material-community"
              name="sort-variant"
              size={sizes.BASE * 1.5}
              color={colors.text}
            />
          }
        />
      }>
      {modalVisible && (
        <>
          <MenuItem
            onPress={() => {
              hideMenu();
              dispatch(setSortPlayersBy('wins'));
            }}>
            By Wins
          </MenuItem>
          <MenuItem
            onPress={() => {
              hideMenu();
              dispatch(setSortPlayersBy('total'));
            }}>
            By Total
          </MenuItem>
          <MenuItem
            onPress={() => {
              hideMenu();
              dispatch(setSortPlayersBy('perf'));
            }}>
            By Performance
          </MenuItem>
        </>
      )}
    </Menu>
  );
}
