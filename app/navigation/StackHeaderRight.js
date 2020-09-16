import React, {useEffect, useState} from 'react';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {navigationRef} from './RootNavigation';
import {Button, Icon, withBadge} from 'react-native-elements';
import {useDerbyTheme} from '../utils/theme';
import {TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {toggleGroupSelector} from '../actions/layout';
import GroupSelector from '../components/groups/GroupSelector';
import PlayersSortMenu from '../containers/players/PlayersSortMenu';
import {ROLE_GROUP_ADMIN, ROLE_HELPER} from '../utils/config';

export default function StackHeaderRight({onOpenInvites, navigation}) {
  const auth = useSelector((state) => state.auth);
  const invites = auth.user.invites ? auth.user.invites : [];
  const groups = auth.user.g ? auth.user.g.length : 0;
  const roles = auth.user.roles ? auth.user.roles : [];
  const dispatch = useDispatch();
  const {selectedGroup} = useSelector((state) => state.layout);
  const [isGroupAdminOrHelper, setIsGroupAdminOrHelper] = useState(false);

  useEffect(() => {
    let groupAdminOrHelper = false;
    Object.keys(roles).forEach((key) => {
      if (
        roles[key].includes(ROLE_GROUP_ADMIN) ||
        roles[key].includes(ROLE_HELPER)
      ) {
        groupAdminOrHelper = true;
      }
    });
    setIsGroupAdminOrHelper(groupAdminOrHelper);
  }, [roles]);

  let currentRoute = null;
  if (navigationRef.current) {
    currentRoute = navigationRef.current.getCurrentRoute().name;
  }

  const {sizes, colors} = useDerbyTheme();

  const BadgedIcon = withBadge(invites.length, {
    left: sizes.BASE,
    right: 0,
    top: 0,
  })(Icon);

  return (
    <Grid>
      <Row>
        {groups > 1 && ['players', 'matches'].includes(currentRoute) && (
          <Col style={{justifyContent: 'center', marginRight: sizes.BASE}}>
            <GroupSelector
              onPress={() => {
                dispatch(toggleGroupSelector());
              }}
              selectedGroup={selectedGroup}
              sizes={sizes}
              colors={colors}
            />
          </Col>
        )}

        {currentRoute === 'players' && (
          <Col style={{justifyContent: 'center'}}>
            <PlayersSortMenu />
          </Col>
        )}

        {currentRoute === 'matches' && isGroupAdminOrHelper && (
          <Col style={{justifyContent: 'center'}}>
            <Col style={{justifyContent: 'center'}}>
              <View>
                <Button
                  type="clear"
                  containerStyle={{marginRight: sizes.BASE}}
                  onPress={() => navigation.navigate('match-add')}
                  icon={
                    <Icon
                      type="material-community"
                      name="plus"
                      size={sizes.BASE * 1.5}
                      color={colors.text}
                    />
                  }
                />
              </View>
            </Col>
          </Col>
        )}

        {currentRoute === 'groups' && (
          <Col style={{justifyContent: 'center'}}>
            <View>
              <Button
                type="clear"
                containerStyle={{marginRight: sizes.BASE}}
                onPress={() => navigation.navigate('group-add')}
                icon={
                  <Icon
                    type="material-community"
                    name="plus"
                    size={sizes.BASE * 1.5}
                    color={colors.text}
                  />
                }
              />
            </View>
          </Col>
        )}

        {invites.length > 0 && (
          <Col style={{justifyContent: 'center', marginRight: sizes.BASE * 2}}>
            <TouchableOpacity onPress={onOpenInvites}>
              <BadgedIcon
                type="antdesign"
                name="addusergroup"
                size={sizes.BASE * 1.5}
                color={colors.text}
              />
            </TouchableOpacity>
          </Col>
        )}
      </Row>
    </Grid>
  );
}
