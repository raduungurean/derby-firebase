import React from 'react';
import AuthScreen from '../screens/AuthScreen';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useSelector} from 'react-redux';
import HomeScreen from '../screens/HomeScreen';
import StackHeaderLeft from './StackHeaderLeft';
import {goBack} from './RootNavigation';
import {Icon} from 'react-native-elements';
import StackHeaderRight from './StackHeaderRight';
import CustomDrawerContent from './CustomDrawerContent';
import ProfileScreen from '../screens/ProfileScreen';
import i18n from 'i18n-js';
import {useDerbyTheme} from '../utils/theme';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PlayersScreen from '../screens/PlayersScreen';
import GroupsScreen from '../screens/GroupsScreen';
import GroupPlayerInviteScreen from '../screens/GroupPlayerInviteScreen';
import GroupEditScreen from '../screens/GroupEditScreen';
import GroupAddScreen from '../screens/GroupAddScreen';
import PasswordScreen from '../screens/PasswordScreen';
import UpdateProfilePictureScreen from '../screens/UpdateProfilePictureScreen';
import InvitesScreen from '../screens/InvitesScreen';
import PlayerScreen from '../screens/PlayerScreen';
import PlayerSettingsScreen from '../screens/PlayerSettingsScreen';
import MatchAddScreen from '../screens/MatchAddScreen';
import MatchScreen from '../screens/MatchScreen';
import HeaderTitle from '../components/HeaderTitle';

const Stack = createStackNavigator();
const ProfileUploadPictureStack = createStackNavigator();
const InvitesStack = createStackNavigator();
const PlayersStack = createStackNavigator();
const HomeStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function screenOptions() {
  return ({navigation}) => ({
    cardOverlayEnabled: true,
    gestureEnabled: false,
    ...MyTransition,
    headerLeft: (props) => {
      return (
        <StackHeaderLeft
          props={props}
          onBack={() => goBack()}
          onOpenDrawer={() => navigation.openDrawer()}
        />
      );
    },
    headerTitle: (props) => <HeaderTitle {...props} />,
    headerRight: (props) => (
      <StackHeaderRight
        navigation={navigation}
        onOpenInvites={() => {
          navigation.navigate('invites');
        }}
      />
    ),
  });
}

function HomeTabs() {
  const {colors, sizes} = useDerbyTheme();
  return (
    <Tab.Navigator lazy={false}>
      <Tab.Screen
        name="matches"
        options={{
          title: i18n.t('home_tab_matches'),
          tabBarIcon: ({focused, color}) => {
            let theColor = colors.text;
            if (focused) {
              theColor = colors.primary;
            }

            return (
              <Icon
                iconStyle={{marginLeft: 0, color: theColor}}
                type="ionicon"
                name="ios-football"
              />
            );
          },
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="players"
        options={{
          title: i18n.t('home_tab_players'),
          tabBarIcon: ({focused, color}) => {
            let theColor = colors.text;
            if (focused) {
              theColor = colors.primary;
            }
            return (
              <Icon
                iconStyle={{marginLeft: 0, color: theColor}}
                type="ionicon"
                name="md-person"
              />
            );
          },
        }}
        component={MyPlayersStack}
      />
      <Tab.Screen
        name="groups"
        options={{
          title: i18n.t('home_tab_groups'),
          tabBarIcon: ({focused, color}) => {
            let theColor = colors.text;
            if (focused) {
              theColor = colors.primary;
            }
            return (
              <Icon
                iconStyle={{marginLeft: 0, color: theColor}}
                type="ionicon"
                name="md-people"
              />
            );
          },
        }}
        component={GroupsScreen}
      />
    </Tab.Navigator>
  );
}

function MyPlayersStack() {
  const {sizes} = useDerbyTheme();
  return (
    <PlayersStack.Navigator
      screenOptions={screenOptions()}
      initialRouteName="players">
      <PlayersStack.Screen
        options={{
          title: i18n.t('header_players'),
          headerTitleStyle: {
            fontFamily: 'Rubik_500Medium',
            fontSize: sizes.BASE * 1.3,
          },
        }}
        name="players"
        component={PlayersScreen}
      />
    </PlayersStack.Navigator>
  );
}

function MyInvitesStack() {
  const {sizes} = useDerbyTheme();
  return (
    <InvitesStack.Navigator
      screenOptions={screenOptions()}
      initialRouteName="invites">
      <InvitesStack.Screen
        options={{
          title: i18n.t('header_invites'),
          headerTitleStyle: {
            fontFamily: 'Rubik_500Medium',
            fontSize: sizes.BASE * 1.3,
          },
        }}
        name="invites"
        component={InvitesScreen}
      />
    </InvitesStack.Navigator>
  );
}

function MyProfileUploadPictureStack() {
  const {sizes} = useDerbyTheme();
  return (
    <ProfileUploadPictureStack.Navigator
      screenOptions={screenOptions()}
      initialRouteName="update-profile-picture">
      <ProfileUploadPictureStack.Screen
        options={{
          title: i18n.t('header_edit_profile_picture'),
          headerTitleStyle: {
            fontFamily: 'Rubik_500Medium',
            fontSize: sizes.BASE * 1.3,
          },
        }}
        name="update-profile-picture"
        component={UpdateProfilePictureScreen}
      />
    </ProfileUploadPictureStack.Navigator>
  );
}

function MyHomeStack() {
  const {sizes} = useDerbyTheme();
  return (
    <HomeStack.Navigator
      screenOptions={screenOptions()}
      initialRouteName="home">
      <HomeStack.Screen
        options={{
          title: i18n.t('header_title_home'),
          headerTitleStyle: {
            fontFamily: 'Rubik_500Medium',
            fontSize: sizes.BASE * 1.3,
          },
        }}
        name="home"
        component={HomeTabs}
      />
      <HomeStack.Screen
        options={{
          title: i18n.t('header_group_invite'),
          headerTitleStyle: {
            fontFamily: 'Rubik_500Medium',
            fontSize: sizes.BASE * 1.3,
          },
        }}
        name="group-invite"
        component={GroupPlayerInviteScreen}
      />
      <HomeStack.Screen
        options={{
          title: i18n.t('header_group_edit'),
          headerTitleStyle: {
            fontFamily: 'Rubik_500Medium',
            fontSize: sizes.BASE * 1.3,
          },
        }}
        name="group-edit"
        component={GroupEditScreen}
      />
      <HomeStack.Screen
        options={{
          title: i18n.t('header_player'),
          headerTitleStyle: {
            fontFamily: 'Rubik_500Medium',
            fontSize: sizes.BASE * 1.3,
          },
        }}
        name="player"
        component={PlayerScreen}
      />
      <HomeStack.Screen
        options={{
          title: i18n.t('header_match'),
          headerTitleStyle: {
            fontFamily: 'Rubik_500Medium',
            fontSize: sizes.BASE * 1.3,
          },
        }}
        name="match"
        component={MatchScreen}
      />
      <HomeStack.Screen
        options={{
          title: i18n.t('header_player_settings'),
          headerTitleStyle: {
            fontFamily: 'Rubik_500Medium',
            fontSize: sizes.BASE * 1.3,
          },
        }}
        name="player-settings"
        component={PlayerSettingsScreen}
      />
      <HomeStack.Screen
        options={{
          title: i18n.t('header_match_add'),
          headerTitleStyle: {
            fontFamily: 'Rubik_500Medium',
            fontSize: sizes.BASE * 1.3,
          },
        }}
        name="match-add"
        component={MatchAddScreen}
      />
      <HomeStack.Screen
        options={{
          title: i18n.t('header_group_add'),
          headerTitleStyle: {
            fontFamily: 'Rubik_500Medium',
            fontSize: sizes.BASE * 1.3,
          },
        }}
        name="group-add"
        component={GroupAddScreen}
      />
    </HomeStack.Navigator>
  );
}

function MyProfileStack() {
  const {sizes} = useDerbyTheme();
  return (
    <HomeStack.Navigator
      screenOptions={screenOptions()}
      initialRouteName="profile">
      <HomeStack.Screen
        options={{
          title: i18n.t('header_title_profile'),
          headerTitleStyle: {
            fontFamily: 'Rubik_500Medium',
            fontSize: sizes.BASE * 1.3,
          },
        }}
        name="profile"
        component={ProfileScreen}
      />
    </HomeStack.Navigator>
  );
}

function MyPasswordStack() {
  const {sizes} = useDerbyTheme();
  return (
    <HomeStack.Navigator
      screenOptions={screenOptions()}
      initialRouteName="password">
      <HomeStack.Screen
        options={{
          title: i18n.t('header_title_password'),
          headerTitleStyle: {
            fontFamily: 'Rubik_500Medium',
            fontSize: sizes.BASE * 1.3,
          },
        }}
        name="profile"
        component={PasswordScreen}
      />
    </HomeStack.Navigator>
  );
}

export default function AppStack() {
  const {user} = useSelector((state) => state.auth);
  const {colors} = useDerbyTheme();

  return user == null ? (
    <Stack.Navigator>
      <Stack.Screen
        name="auth"
        component={AuthScreen}
        options={{
          headerShown: false,
          animationTypeForReplace: user ? 'pop' : 'push',
        }}
      />
    </Stack.Navigator>
  ) : (
    <Drawer.Navigator
      openByDefault={false}
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        options={{
          title: i18n.t('drawer_label_home'),
          unmountOnBlur: true,
          drawerIcon: ({focused, color, size}) => (
            <Icon
              iconStyle={{marginLeft: 0, color: colors.text}}
              type="material-community"
              name="home-circle"
            />
          ),
        }}
        name="home"
        component={MyHomeStack}
      />
      <Drawer.Screen
        options={{
          title: i18n.t('drawer_label_profile'),
          unmountOnBlur: true,
          drawerIcon: ({focused, color, size}) => (
            <Icon
              iconStyle={{marginLeft: 0, color: colors.text}}
              type="material-community"
              name="account-circle"
            />
          ),
        }}
        name="profile"
        component={MyProfileStack}
      />
      <Drawer.Screen
        options={{
          title: i18n.t('drawer_label_password'),
          unmountOnBlur: true,
          drawerIcon: ({focused, color, size}) => (
            <Icon
              iconStyle={{marginLeft: 0, color: colors.text}}
              type="material-community"
              name="lock"
            />
          ),
        }}
        name="password"
        component={MyPasswordStack}
      />
      <Drawer.Screen
        options={{
          title: i18n.t('drawer_label_profile_picture'),
          unmountOnBlur: true,
          drawerIcon: ({focused, color, size}) => (
            <Icon
              iconStyle={{marginLeft: 0, color: colors.text}}
              type="material-community"
              name="image"
            />
          ),
        }}
        name="update-profile-picture"
        component={MyProfileUploadPictureStack}
      />

      <Drawer.Screen
        options={{
          title: i18n.t('drawer_label_invites'),
          unmountOnBlur: true,
          drawerIcon: ({focused, color, size}) => (
            <Icon
              iconStyle={{marginLeft: 0, color: colors.text}}
              type="antdesign"
              name="addusergroup"
            />
          ),
        }}
        name="invites"
        component={MyInvitesStack}
      />
    </Drawer.Navigator>
  );
}

const MyTransition = {
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  gestureDirection: 'horizontal',
};
