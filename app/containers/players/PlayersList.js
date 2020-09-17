import React, {useCallback, useEffect, useState} from 'react';
import {useDerbyTheme} from '../../utils/theme';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator, FlatList, Text} from 'react-native';
import {Avatar, Icon, ListItem} from 'react-native-elements';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {fromFirebaseDate} from '../../services/firebase-utils';
import i18n from 'i18n-js';
import NoResultsMessage from '../../components/NoResultsMessage';
import {loadPlayers, resetPlayersState} from '../../actions/players';
import {useFocusEffect} from '@react-navigation/core';
import {showPlayerEditOptions, sumObjectsByKey} from '../../utils/helpers';
import SpinLoader from '../../components/SpinLoader';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import FilterByGroupMessage from '../../components/FilterByGroupMessage';
import TouchableOpacity from 'react-native';

const PlayersList = ({g, navigation}) => {
  const {colors, sizes} = useDerbyTheme();
  const dispatch = useDispatch();
  const players = useSelector((state) => state.players);
  const layout = useSelector((state) => state.layout);
  const auth = useSelector((state) => state.auth);

  const authUserRoles = auth.user.roles ? auth.user.roles : [];
  const {sortPlayersBy} = layout;
  const [refreshing, setRefreshing] = useState(false);
  const [_playersResult, setPlayersList] = useState([]);
  const {loadingPlayers} = players;

  const myGroup = auth.user.groupData.find((gr) => gr.id === g);

  useEffect(() => {
    const sortByFunc =
      sortPlayersBy === 'perf'
        ? sortByPerformance
        : sortPlayersBy === 'wins'
        ? sortByWins
        : sortByTotal;
    const pList = Object.values(players.byId).filter((p) => {
      if (!g) {
        return true;
      }
      return p.g.includes(g);
    });
    const _mappedPlayers = pList
      .map((g) => ({
        ...g,
        dt: fromFirebaseDate(g.created_at).toDate(),
        textMutedColor: colors.textMuted,
      }))
      .sort(sortByFunc);

    setPlayersList(_mappedPlayers);
  }, [players, g, sortPlayersBy]);

  useFocusEffect(
    useCallback(() => {
      dispatch(loadPlayers(g));
    }, [g]),
  );

  function sortByPerformance(a, b) {
    const aSt = g ? a.st[g] : sumObjectsByKey(...Object.values(a.st));
    const bSt = g ? b.st[g] : sumObjectsByKey(...Object.values(b.st));

    if (aSt.performance === bSt.performance) {
      if (aSt.wins > bSt.wins) {
        return -1;
      } else {
        return 1;
      }
    } else if (aSt.performance > bSt.performance) {
      return -1;
    } else {
      return 1;
    }
  }

  function sortByWins(a, b) {
    const aSt = g ? a.st[g] : sumObjectsByKey(...Object.values(a.st));
    const bSt = g ? b.st[g] : sumObjectsByKey(...Object.values(b.st));

    if (aSt.wins === bSt.wins) {
      if (aSt.performance > bSt.performance) {
        return -1;
      } else {
        return 1;
      }
    } else if (aSt.wins > bSt.wins) {
      return -1;
    } else {
      return 1;
    }
  }

  function sortByTotal(a, b) {
    const aSt = g ? a.st[g] : sumObjectsByKey(...Object.values(a.st));
    const bSt = g ? b.st[g] : sumObjectsByKey(...Object.values(b.st));

    if (aSt.total === bSt.total) {
      if (aSt.performance > bSt.performance) {
        return -1;
      } else {
        return 1;
      }
    } else if (aSt.total > bSt.total) {
      return -1;
    } else {
      return 1;
    }
  }

  const listItemContainerStyle = {
    backgroundColor: colors.backgroundCard,
    borderRadius: sizes.BASE / 2,
    marginHorizontal: sizes.BASE / 1.5,
    marginVertical: sizes.BASE / 3,
    padding: sizes.BASE / 1.5,
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

  const keyExtractor = (item, index) => index.toString();

  const doSetRefreshing = async () => {
    await setRefreshing(true);
    await dispatch(resetPlayersState());
    await dispatch(loadPlayers(g));
    await setRefreshing(false);
  };

  function selectValue(value) {
    if (value.op === 'settings') {
      navigation.navigate('player-settings', {
        id: value.id,
        g: g ? g : null,
      });
    }
  }

  if (loadingPlayers && _playersResult.length === 0) {
    return <SpinLoader />;
  }

  const renderItem = ({item}) => {
    const st = g ? item.st[g] : sumObjectsByKey(...Object.values(item.st));
    const lastMatch = g ? item.lastMatch[g] : null;

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('player', {
            id: item.id,
            g: g ? g : null,
          });
        }}>
        <ListItem
          underlayColor={colors.backgroundCard}
          // onPress={() => {
          //   navigation.push('home', {
          //     screen: 'players',
          //     params: {
          //       screen: 'player',
          //       params: {
          //         id: item.id,
          //       },
          //     },
          //   });
          // }}
          key={item.id}
          containerStyle={listItemContainerStyle}
          title={() => (
            <Grid>
              <Row>
                <Col size={4} style={{justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontFamily: 'Rubik_400Regular',
                      color: colors.textMuted,
                    }}>
                    {item.first_name} {item.last_name}
                  </Text>
                </Col>
              </Row>
            </Grid>
          )}
          leftAvatar={
            <Avatar
              rounded
              source={{uri: item.photo_url}}
              size={sizes.FONT * 2.5}
            />
          }
          subtitle={() => {
            let matches = 0;
            if (st) {
              matches = st.total;
            }
            return (
              <Text
                style={{
                  color: colors.text,
                  fontFamily: 'Rubik_400Regular',
                  fontSize: sizes.BASE - 4,
                  marginTop: sizes.BASE / 3,
                }}>
                {!st && <Text>{'-'}</Text>}
                {st && matches === 0 && (
                  <Text>
                    {i18n.t('players_no_matches', {
                      ...st,
                      matches: matches,
                    })}
                  </Text>
                )}
                {st && matches > 0 && (
                  <Text>
                    {i18n.t('players_match_numbers', {
                      ...st,
                      matches: matches,
                    })}
                  </Text>
                )}
              </Text>
            );
          }}
          rightElement={
            <>
              {lastMatch && lastMatch.matchResult === 'win' && (
                <Icon
                  color={colors.textMuted}
                  type="feather"
                  name="chevrons-up"
                  size={22}
                  iconStyle={{
                    marginRight: sizes.BASE * 1.2,
                    color: colors.joy33,
                  }}
                />
              )}
              {lastMatch && lastMatch.matchResult === 'loose' && (
                <Icon
                  color={colors.textMuted}
                  type="feather"
                  name="chevrons-down"
                  size={22}
                  iconStyle={{
                    marginRight: sizes.BASE * 1.2,
                    color: colors.error,
                  }}
                />
              )}
              {lastMatch && lastMatch.matchResult === 'draw' && (
                <Icon
                  color={colors.textMuted}
                  type="feather"
                  name="minus"
                  size={22}
                  iconStyle={{
                    marginRight: sizes.BASE * 1.2,
                    color: colors.textMuted,
                  }}
                />
              )}
              {showPlayerEditOptions(authUserRoles, item.g, g) && (
                <Menu onSelect={(value) => selectValue(value)}>
                  <MenuTrigger>
                    <Icon
                      color={colors.textMuted}
                      type="material-community"
                      name="dots-horizontal-circle-outline"
                      size={22}
                      iconStyle={{marginRight: sizes.BASE}}
                    />
                  </MenuTrigger>
                  <MenuOptions customStyles={{}}>
                    <MenuOption value={{op: 'settings', id: item.id}}>
                      <Text
                        style={{
                          color: colors.text,
                        }}>
                        {i18n.t('players_player_settings')}
                      </Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              )}
            </>
          }
          contentContainerStyle={{alignItems: 'stretch'}}
          bottomDivider
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      {g !== null && auth.user.groupData && myGroup && (
        <FilterByGroupMessage
          message={i18n.t('general_filter_by_group', {group: myGroup.name})}
          buttonText={i18n.t('general_filter_by_group_button')}
        />
      )}

      {_playersResult.length === 0 && !loadingPlayers && (
        <NoResultsMessage message={i18n.t('players_list_no_results')} />
      )}

      <FlatList
        style={{flexGrow: 1, marginTop: sizes.BASE / 2}}
        contentContainerStyle={{alignSelf: 'stretch', overflow: 'hidden'}}
        keyExtractor={keyExtractor}
        data={_playersResult}
        refreshing={refreshing}
        onRefresh={() => doSetRefreshing()}
        ListFooterComponent={() => {
          if (!loadingPlayers) return <Text>{''}</Text>;
          return <ActivityIndicator color={colors.primary} />;
        }}
        onEndReachedThreshold={0.1}
        renderItem={renderItem}
      />
    </>
  );
};

PlayersList.propTypes = {};

export default PlayersList;
