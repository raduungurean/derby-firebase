import React, {useState} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Divider, Icon, Image, Text} from 'react-native-elements';
import {logout} from '../actions/auth';
import i18n from 'i18n-js';
import ThemeSwitcher from '../containers/drawer/ThemeSwitcher';
import {setTheme} from '../actions/layout';
import {useDerbyTheme} from '../utils/theme';
import ModalProfileImage from '../components/profile/ModalProfileImage';

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const selectedTheme = useSelector((state) => state.layout.theme);
  const {colors, sizes} = useDerbyTheme();
  const [showProfileImageModal, setShowProfileImageModal] = useState(false);

  const styleProfileCard = [
    styles.profileCard,
    {
      borderBottomColor: colors.border,
      padding: (sizes.BASE / 2) * 0.7,
      marginBottom: (sizes.BASE / 2) * 0.7,
    },
  ];
  const styleUserName = {
    color: colors.text,
    paddingHorizontal: sizes.BASE,
    paddingTop: sizes.BASE,
    fontSize: sizes.BASE * 1.7,
    fontFamily: 'Rubik_400Regular',
  };
  const styleProfileCardImage = [
    styles.profileCardImage,
    {
      marginTop: (sizes.BASE / 2) * 0.9,
    },
  ];
  const stylesThemeSwitcher = [
    styles.themeSwitcher,
    {
      paddingHorizontal: sizes.BASE,
      paddingVertical: sizes.BASE / 2,
    },
  ];

  return (
    <>
      <DrawerContentScrollView
        style={{backgroundColor: colors.background}}
        {...props}>
        <Text style={styleUserName}>
          {`${props.user.first_name} ${props.user.last_name}`}
        </Text>
        <View style={styleProfileCard}>
          <TouchableOpacity
            onPress={() => {
              setShowProfileImageModal(true);
            }}>
            <Image
              containerStyle={styleProfileCardImage}
              source={{uri: props.user.photo_url}}
              style={{width: 100, height: 100}}
              PlaceholderContent={<ActivityIndicator />}
            />
          </TouchableOpacity>
        </View>
        <DrawerItemList activeTintColor={colors.primary} {...props} />
        <DrawerItem
          label={i18n.t('drawer_label_logout')}
          labelStyle={{
            marginLeft: 0,
          }}
          icon={({focused, color, size}) => (
            <Icon
              iconStyle={{marginLeft: 0, color: colors.text}}
              type="material-community"
              name="logout"
            />
          )}
          onPress={() => props.logout()}
        />
        <Divider
          style={{
            backgroundColor: colors.border,
            height: 0.5,
          }}
        />
        <View style={stylesThemeSwitcher}>
          <ThemeSwitcher
            value={selectedTheme !== 0}
            onChange={() => {
              dispatch(setTheme(selectedTheme === 0 ? 1 : 0));
            }}
          />
        </View>
      </DrawerContentScrollView>
      <ModalProfileImage
        onDismiss={() => {
          setShowProfileImageModal(false);
        }}
        onSwipeOut={() => setShowProfileImageModal(false)}
        visible={showProfileImageModal}
        user={props.user}
      />
    </>
  );
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

const styles = StyleSheet.create({
  profileCard: {
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  themeSwitcher: {},
  profileCardImage: {
    padding: 0,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#acacac',
  },
});

export default connect(mapStateToProps, {
  logout,
})(CustomDrawerContent);
