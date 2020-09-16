import React, {Component} from 'react';
import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  StyleSheet,
  UIManager,
  View,
} from 'react-native';

import {Button} from 'react-native-elements';
import SignInLogo from './auth/SignInLogo';
import AuthButtonTabs from './auth/AuthButtonTabs';
import SignInForm from '../containers/auth/SignInForm';
import SignUpForm from '../containers/auth/SignUpForm';
import i18n from 'i18n-js';
import ForgotPasswordForm from '../containers/auth/ForgotPasswordForm';

const BG_IMAGE = require('../../assets/images/bg.jpg');

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class AuthPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategory: 0,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };

    this.selectCategory = this.selectCategory.bind(this);
  }

  onChange({window, screen}) {
    this.setState({
      ...this.state,
      width: window.width,
      height: window.height,
    });
  }

  componentDidMount() {
    Dimensions.addEventListener('change', this.onChange.bind(this));
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onChange.bind(this));
  }

  selectCategory(selectedCategory) {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      selectedCategory,
    });
  }

  render() {
    const {selectedCategory} = this.state;
    const isLoginPage = selectedCategory === 0;
    const isSignUpPage = selectedCategory === 1;
    const isForgotPasswordPage = selectedCategory === 2;

    return (
      <View style={styles.container}>
        <ImageBackground
          source={BG_IMAGE}
          style={[
            styles.bgImage,
            {
              width: this.state.width,
              height: this.state.height,
            },
          ]}>
          <View style={styles.titleContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <SignInLogo
                source={require('../../assets/images/logo_dark.png')}
              />
            </View>
          </View>
          <View>
            <KeyboardAvoidingView
              contentContainerStyle={styles.loginContainer}
              behavior="padding">
              <View style={{flexDirection: 'row', marginBottom: 4}}>
                {!isForgotPasswordPage && (
                  <AuthButtonTabs
                    width={this.state.width}
                    onLoginPress={() => this.selectCategory(0)}
                    loginPage={isLoginPage}
                    onSignupPress={() => this.selectCategory(1)}
                    signUpPage={isSignUpPage}
                  />
                )}
                {isForgotPasswordPage && (
                  <Button
                    type="clear"
                    containerStyle={{flex: 1}}
                    titleStyle={styles.forgotPassword}
                    title={i18n.t('auth_forgot_password_title')}
                  />
                )}
              </View>

              <View
                style={[
                  styles.formContainer,
                  {
                    width:
                      Platform.OS === 'web'
                        ? this.state.width < 300
                          ? this.state.width * 0.9
                          : this.state.width * 0.8
                        : this.state.width - 30,
                  },
                ]}>
                {isLoginPage && <SignInForm />}
                {isSignUpPage && <SignUpForm />}
                {isForgotPasswordPage && <ForgotPasswordForm />}
              </View>
            </KeyboardAvoidingView>

            <View style={styles.helpContainer}>
              {isLoginPage && (
                <Button
                  title={i18n.t('auth_forgot_password_label')}
                  titleStyle={{color: 'white'}}
                  buttonStyle={{backgroundColor: 'transparent'}}
                  underlayColor="transparent"
                  onPress={() => {
                    this.selectCategory(2);
                  }}
                />
              )}
              {(isSignUpPage || isForgotPasswordPage) && (
                <Button
                  title={i18n.t('auth_have_account_link')}
                  titleStyle={{color: 'white'}}
                  buttonStyle={{backgroundColor: 'transparent'}}
                  underlayColor="transparent"
                  onPress={() => {
                    this.selectCategory(0);
                  }}
                />
              )}
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPassword: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    lineHeight: 35,
    backgroundColor: 'rgba(166,186,28,0.95)',
    borderRadius: Math.round(45 / 2),
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  titleContainer: {
    height: 55,
    marginVertical: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    // width: Platform.OS === 'web' ? '500px' : SCREEN_WIDTH - 30,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpContainer: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
