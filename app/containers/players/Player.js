import React, {useCallback, useEffect, useState} from 'react';
import {useDerbyTheme} from '../../utils/theme';
import {ScrollView, StyleSheet, View, RefreshControl} from 'react-native';
import {Avatar, Text} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {Col, Grid, Row} from 'react-native-easy-grid';
import i18n from 'i18n-js';
import {fromFirebaseDate} from '../../services/firebase-utils';
import {useFocusEffect} from '@react-navigation/core';
import {loadPlayer} from '../../actions/players';
import PlayerCharts from '../../components/players/PlayerCharts';
import SpinLoader from '../../components/SpinLoader';
import ModalProfileImage from '../../components/profile/ModalProfileImage';

const Player = ({id, g}) => {
  const {sizes, colors} = useDerbyTheme();
  const dispatch = useDispatch();
  const players = useSelector((state) => state.players);
  const auth = useSelector((state) => state.auth);
  const authUserGroups = auth.user.groupData ? auth.user.groupData : [];
  const [refreshing, setRefreshing] = useState(false);
  const [player, setPlayer] = useState(null);
  const [groupsList, setGroupsList] = useState([]);
  const [showProfileImageModal, setShowProfileImageModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      dispatch(loadPlayer(id));
    }, [id]),
  );

  useEffect(() => {
    const p = players.byId[id];

    setPlayer(p);

    if (p) {
      const gList = Object.keys(p.st)
        .filter((k) => {
          const authUserGroupIds = authUserGroups.map((g) => g.id);
          return authUserGroupIds.includes(k);
        })
        .filter((k) => {
          if (g && Object.keys(p.st).includes(g)) {
            if (k !== g) {
              return false;
            }
          }
          return true;
        })
        .map((groupId) => {
          return authUserGroups.find((g) => g.id === groupId);
        });
      setGroupsList(gList);
    }
  }, [players, authUserGroups]);

  const playerNameStyles = {
    fontSize: sizes.BASE * 1.5,
    color: colors.text,
  };

  if (!player) {
    return <SpinLoader />;
  }

  let playerDate = '';

  if (player.created_at) {
    playerDate = fromFirebaseDate(player.created_at).toDate();
  }

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
        {groupsList.map((group) => {
          return (
            <PlayerCharts
              showTitle={groupsList.length > 1}
              key={group.id}
              group={group}
              player={player}
            />
          );
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  playerName: {
    fontFamily: 'Rubik_300Light',
  },
  lbl: {
    fontFamily: 'Rubik_400Regular',
  },
});

export default Player;
