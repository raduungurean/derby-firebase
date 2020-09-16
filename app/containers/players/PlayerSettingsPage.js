import React, {useCallback, useEffect, useState} from 'react';
import {Avatar, Button, CheckBox, Icon, Text} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {
  ActivityIndicator,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useDerbyTheme} from '../../utils/theme';
import SpinLoader from '../../components/SpinLoader';
import {useFocusEffect} from '@react-navigation/core';
import {
  kickOutPlayerFromGroup,
  loadPlayer,
  updatePlayerSettings,
} from '../../actions/players';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {
  belongsToLoggedInUser,
  getGroupData,
  isGroupAdmin,
  isGroupHelper,
  isPlayer,
} from '../../utils/helpers';
import i18n from 'i18n-js';
import KickOutPlayerModal from '../../components/players/KickOutPlayerModal';
import {
  useKickOutAlerts,
  usePlayerSettingsAlerts,
} from '../../hooks/useDropDownAlerts';
import isEmpty from 'lodash/isEmpty';
import {fromFirebaseDate} from '../../services/firebase-utils';
import ModalProfileImage from '../../components/profile/ModalProfileImage';

const PlayerSettingsPage = ({id, g, navigation}) => {
  const {colors, sizes, dark} = useDerbyTheme();
  const players = useSelector((state) => state.players);
  const [player, setPlayer] = useState(null);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [playerSettings, setPlayerSettings] = useState({});
  const [playerSettingsTouched, setPlayerSettingsTouched] = useState({});
  const [toKickOutPlayerItem, setToKickOutPlayer] = useState({});
  const auth = useSelector((state) => state.auth);
  const authUserGroupData = auth.user.groupData ? auth.user.groupData : [];
  const authUserRoles = auth.user.roles ? auth.user.roles : [];
  const {kickingOutPlayer, updatingPlayerSettings} = players;
  const [showProfileImageModal, setShowProfileImageModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      dispatch(loadPlayer(id));
    }, [id]),
  );

  useEffect(() => {
    const p = players.byId[id];
    setPlayer(p);
  }, [players]);

  useKickOutAlerts();

  usePlayerSettingsAlerts();

  function stateFromPlayer(pl, _authUserGroupData) {
    let ps = {};
    pl.g.forEach((gr) => {
      if (belongsToLoggedInUser(gr, _authUserGroupData)) {
        const _isPlayerGroupAdmin = isGroupAdmin(gr, pl.roles);
        const _isPlayerGroupHelper = isGroupHelper(gr, pl.roles);
        const _isPlayer = isPlayer(gr, pl.roles);
        if (_isPlayer) {
          ps = {
            ...ps,
            [gr]: 'player',
          };
        }
        if (_isPlayerGroupHelper) {
          ps = {
            ...ps,
            [gr]: 'group-helper',
          };
        }
        if (_isPlayerGroupAdmin) {
          ps = {
            ...ps,
            [gr]: 'group-admin',
          };
        }
      }
    });
    setPlayerSettings(ps);
  }

  useEffect(() => {
    if (player) {
      stateFromPlayer(player, authUserGroupData);
    }
  }, [player, authUserGroupData]);

  const resetGroupCheckboxes = (g) => {
    setPlayerSettingsTouched({
      ...setPlayerSettingsTouched,
      [g]: false,
    });
    stateFromPlayer(player, authUserGroupData);
  };

  const listItemContainerStyle = {
    height: 'auto',
    flex: 0,
    backgroundColor: colors.backgroundCard,
    borderRadius: sizes.BASE / 2,
    marginHorizontal: sizes.BASE / 1.5,
    marginVertical: sizes.BASE / 3,
    padding: sizes.BASE,
    borderBottomWidth: 0,
    shadowColor: '#ddd',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 2,
  };

  const checkboxContainerStyle = {
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: dark ? colors.card : colors.backgroundScreen,
    color: colors.text,
    borderColor: colors.textMuted,
    borderWidth: 0,
    borderRadius: 5,
  };

  const checkboxTitleStyle = {
    fontFamily: 'Rubik_400Regular',
    color: colors.text,
  };

  const checkboxTitleDisabledStyle = {
    fontFamily: 'Rubik_300Light',
    color: colors.textMuted,
  };

  const playerNameStyles = {
    fontSize: sizes.BASE * 1.5,
    color: colors.text,
  };

  const submitButtonStyle = [
    styles.submitButton,
    {
      backgroundColor: colors.primary,
      marginHorizontal: sizes.BASE,
    },
  ];

  const kickOutButtonStyle = [
    {
      paddingVertical: sizes.BASE / 4,
      borderWidth: 0,
    },
  ];

  const cancelButtonStyle = [
    styles.submitButton,
    {marginHorizontal: sizes.BASE},
  ];

  if (!player) {
    return <SpinLoader />;
  }

  let playerDate = '';

  if (player.created_at) {
    playerDate = fromFirebaseDate(player.created_at).toDate();
  }

  return (
    <>
      <ModalProfileImage
        onDismiss={() => {
          setShowProfileImageModal(false);
        }}
        onSwipeOut={() => setShowProfileImageModal(false)}
        visible={showProfileImageModal}
        editable={false}
        user={player}
      />

      <KickOutPlayerModal
        toKickOutPlayerItem={toKickOutPlayerItem}
        kickingOut={kickingOutPlayer}
        sizes={sizes}
        onTouchOutside={() => setToKickOutPlayer({})}
        onPress={async () => {
          await dispatch(kickOutPlayerFromGroup(toKickOutPlayerItem));
          await setToKickOutPlayer({});
          await navigation.push('home', {
            screen: 'players',
            params: {
              g: g ? g : null,
            },
          });
        }}
      />

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              await setRefreshing(true);
              await setPlayer(players.byId[id] ? players.byId[id] : null);
              await setRefreshing(false);
            }}
          />
        }
        style={{height: 'auto', marginVertical: sizes.BASE / 1.5}}>
        <View style={listItemContainerStyle}>
          <Grid>
            <Row style={{paddingVertical: sizes.BASE / 2}}>
              <Col size={1}>
                <Avatar
                  onPress={() => setShowProfileImageModal(true)}
                  rounded
                  source={{uri: player.photo_url}}
                  size={sizes.FONT * 4}
                />
              </Col>

              <Col size={3} style={{justifyContent: 'center'}}>
                <Text style={[styles.playerName, playerNameStyles]}>
                  {player.first_name} {player.last_name}
                </Text>
              </Col>
            </Row>
            <Row style={{paddingVertical: sizes.BASE / 2}}>
              <Col size={1}>
                <Text style={[styles.lbl, {color: colors.textMuted}]}>
                  {i18n.t('player_screen_label_username')}
                </Text>
              </Col>
              <Col size={3}>
                <Text style={[styles.lbl, {color: colors.text}]}>
                  {player.username}
                </Text>
              </Col>
            </Row>
            <Row style={{paddingVertical: sizes.BASE / 2}}>
              <Col size={1}>
                <Text style={[styles.lbl, {color: colors.textMuted}]}>
                  {i18n.t('player_screen_label_date')}
                </Text>
              </Col>
              <Col size={3}>
                {player.created_at && (
                  <Text style={[styles.lbl, {color: colors.text}]}>
                    {i18n.l('date_formats_day', playerDate)}
                  </Text>
                )}
              </Col>
            </Row>
          </Grid>
        </View>
        {player.g.map((g) => {
          if (belongsToLoggedInUser(g, authUserGroupData)) {
            const _isGroupAdmin = isGroupAdmin(g, authUserRoles);
            const _isGroupHelper = isGroupHelper(g, authUserRoles);
            const _isPlayerGroupAdmin = isGroupAdmin(g, player.roles);
            const _isPlayerGroupHelper = isGroupHelper(g, player.roles);

            // helpers should not be able to edit
            // admins or other helpers in the same group
            if (
              (_isGroupAdmin || _isGroupHelper) &&
              id !== auth.user.id &&
              !(_isGroupAdmin && _isPlayerGroupAdmin) &&
              !(_isGroupHelper && _isPlayerGroupAdmin) &&
              !(_isGroupHelper && _isPlayerGroupHelper)
            ) {
              const group = getGroupData(g, authUserGroupData);
              const updatingGroup =
                updatingPlayerSettings && updatingPlayerSettings[g] === true;
              return (
                <View key={g} style={listItemContainerStyle}>
                  <Grid>
                    <Row
                      style={{
                        marginBottom: sizes.BASE / 2,
                        padding: sizes.BASE / 4,
                      }}>
                      <Col style={{justifyContent: 'center'}}>
                        <Text
                          style={[
                            styles.lbl,
                            {
                              color: colors.text,
                              fontSize: sizes.FONT * 1.2,
                            },
                          ]}>
                          {group.name}
                        </Text>
                      </Col>
                      <Col
                        style={{
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                        }}>
                        {kickingOutPlayer && (
                          <View
                            style={
                              Platform.OS === 'web' ? {display: 'inline'} : ''
                            }>
                            <ActivityIndicator color={colors.primary} />
                          </View>
                        )}
                        {!kickingOutPlayer && (
                          <Button
                            onPress={() =>
                              setToKickOutPlayer({
                                id: id,
                                gid: g,
                                player:
                                  player.first_name + ' ' + player.last_name,
                                group: group.name,
                              })
                            }
                            type="raised"
                            containerStyle={{paddingHorizontal: sizes.BASE / 4}}
                            icon={
                              <Icon
                                type="material-community"
                                name="account-remove"
                                size={sizes.FONT * 0.8}
                                color={colors.error}
                                iconStyle={{
                                  marginRight: sizes.BASE / 2,
                                  fontSize: sizes.BASE * 0.8,
                                }}
                              />
                            }
                            buttonStyle={kickOutButtonStyle}
                            titleStyle={{
                              fontSize: sizes.BASE * 0.8,
                              color: colors.error,
                              fontFamily: 'Rubik_500Medium',
                            }}
                            title={i18n.t('player_settings_kick_out')}
                          />
                        )}
                      </Col>
                    </Row>
                  </Grid>
                  <CheckBox
                    containerStyle={checkboxContainerStyle}
                    textStyle={checkboxTitleDisabledStyle}
                    title={'Group Admin'}
                    disabled={true}
                    checked={
                      playerSettings[g] && playerSettings[g] === 'group-admin'
                    }
                    onPress={() => {
                      setPlayerSettings({
                        ...playerSettings,
                        [g]: 'group-admin',
                      });
                      setPlayerSettingsTouched({
                        ...playerSettingsTouched,
                        [g]: true,
                      });
                    }}
                  />
                  <CheckBox
                    containerStyle={checkboxContainerStyle}
                    textStyle={checkboxTitleStyle}
                    title={'Group Helper'}
                    checked={
                      playerSettings[g] && playerSettings[g] === 'group-helper'
                    }
                    onPress={() => {
                      setPlayerSettings({
                        ...playerSettings,
                        [g]: 'group-helper',
                      });
                      setPlayerSettingsTouched({
                        ...playerSettingsTouched,
                        [g]: true,
                      });
                    }}
                  />
                  <CheckBox
                    containerStyle={checkboxContainerStyle}
                    textStyle={checkboxTitleStyle}
                    title={'Player'}
                    checked={
                      playerSettings[g] && playerSettings[g] === 'player'
                    }
                    onPress={() => {
                      setPlayerSettings({
                        ...playerSettings,
                        [g]: 'player',
                      });
                      setPlayerSettingsTouched({
                        ...playerSettingsTouched,
                        [g]: true,
                      });
                    }}
                  />
                  <Grid>
                    <Row>
                      <Col size={1}>
                        <Button
                          onPress={() => resetGroupCheckboxes(g)}
                          disabled={playerSettingsTouched[g] !== true}
                          type="outline"
                          icon={
                            <Icon
                              type="antdesign"
                              name="back"
                              size={sizes.FONT}
                              color={colors.textMuted}
                              iconStyle={{
                                marginRight: sizes.BASE,
                                fontSize: sizes.BASE * 1.5,
                              }}
                            />
                          }
                          buttonStyle={cancelButtonStyle}
                          containerStyle={{marginTop: sizes.BASE}}
                          titleStyle={{fontSize: sizes.BASE}}
                          title={i18n.t('player_settings_cancel')}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col size={2}>
                        <Button
                          loading={updatingGroup}
                          onPress={() => {
                            if (
                              playerSettingsTouched[g] &&
                              !isEmpty(playerSettings[g])
                            ) {
                              dispatch(
                                updatePlayerSettings(g, playerSettings[g], id),
                              );
                            }
                          }}
                          disabled={!playerSettingsTouched[g]}
                          icon={
                            <Icon
                              type="material-community"
                              name="content-save"
                              size={sizes.FONT}
                              color={dark ? colors.textMuted : colors.white}
                              iconStyle={{
                                marginRight: sizes.BASE,
                                fontSize: sizes.BASE * 1.5,
                              }}
                            />
                          }
                          buttonStyle={[
                            submitButtonStyle,
                            {
                              display:
                                updatingGroup && Platform.OS === 'web'
                                  ? 'inline'
                                  : 'flex',
                            },
                          ]}
                          containerStyle={{marginTop: sizes.BASE}}
                          titleStyle={{fontSize: sizes.BASE}}
                          title={i18n.t('player_settings_save')}
                        />
                      </Col>
                    </Row>
                  </Grid>
                </View>
              );
            }
          }
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  playerName: {
    fontFamily: 'Rubik_500Medium',
  },
  lbl: {
    fontFamily: 'Rubik_300Light',
  },
  submitButton: {
    borderRadius: 30,
  },
});

export default PlayerSettingsPage;
