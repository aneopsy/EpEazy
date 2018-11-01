import React from 'react';
import {
  View,
  Image,
  Dimensions,
  Keyboard,
  StatusBar,
} from 'react-native';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkTheme,
} from 'react-native-ui-kitten';
import {
  RkSwitch
} from '../../components';
import {
  StackActions,
  NavigationActions,
} from 'react-navigation';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import Icon from 'react-native-vector-icons/FontAwesome';
import { GradientButton } from '../../components/gradientButton';
import { scaleModerate, scaleVertical } from '../../utils/scale';
import NavigationType from '../../config/navigation/propTypes';
import { PasswordTextInput } from '../../components/passwordTextInput';
import {
  userLogin,
  userLoginError,
  rememberMe } from '../../redux/login/action';
import { privateConstants } from '../../config/appPrivateConstants';

class LoginV1 extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    StatusBar.setHidden(true, 'none');
  }

  getThemeImageSource = (theme) => (
    theme.name === 'light' ?
      require('../../assets/images/backgroundLoginV1.png') : require('../../assets/images/backgroundLoginV1DarkTheme.png')
  );

  renderImage = () => {
    const screenSize = Dimensions.get('window');
    const imageSize = {
      width: screenSize.width,
      height: screenSize.height - scaleModerate(375, 1),
    };
    
    return (
      <Image
        style={[styles.image, imageSize]}
        source={this.getThemeImageSource(RkTheme.current)}
      />
    );
  };

  onLoginButtonPressed = () => {
    this.props.userLogin({login: privateConstants.login, password: privateConstants.password})
    // .then().catch((error) => {
    //   console.log(error) ||
    //   this.props.userLoginError(error.error)
    // });
  };

  onSignUpButtonPressed = () => {
    this.props.navigation.navigate('SignUp');
  };

  transferToDashboardIfLoggedIn() {
      if (this.props.login.user && this.props.login.isLoggingIn) {
        const toHome = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Loading' })],
        });
        this.props.navigation.dispatch(toHome);
      }
  }

  componentWillMount() {
      this.transferToDashboardIfLoggedIn();
  }

  componentDidUpdate() {
      this.transferToDashboardIfLoggedIn();
  }

  onRememberMeChanged = (value) => {
    console.log("ok")
    this.props.rememberMe(value)
  };

  render = () => (
    <RkAvoidKeyboard
      style={styles.screen}
      onStartShouldSetResponder={() => true}
      onResponderRelease={() => Keyboard.dismiss()}>
      <Spinner
          visible={this.props.login.loading}
          textContent={'Connection...'}
          textStyle={styles.spinnerTextStyle}
      />
      {this.renderImage()}
      <View style={styles.header}>
      <RkText rkType='logo h0' style={styles.logo}>EpEasy</RkText>
      {this.props.login.error ? (<RkText rkType='h5' style={styles.error}><Icon name="exclamation-circle" size={30} color={theme.colors.screen.danger} /> Request failed with status code {this.props.login.error.response.status}</RkText>) : (<View></View>) }
      </View>
      <View style={styles.container}>
        <RkTextInput rkType='rounded' placeholder='Email' />
        <PasswordTextInput placeholder='Password' />
        <View style={styles.row}>
          <RkText rkType='h5'>Remember me:</RkText>
          <RkSwitch
            style={styles.switch}
            value={this.props.login.rememberMe}
            name="Push"
            onValueChange={this.onRememberMeChanged}
          />
        </View>
        <GradientButton
          style={styles.save}
          rkType='large'
          onPress={this.onLoginButtonPressed}
          text='LOGIN'
        />
      </View>
    </RkAvoidKeyboard>
  )
}

const styles = RkStyleSheet.create(theme => ({
  row: {
    flexDirection: 'row',
    marginBottom: scaleVertical(24),
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  switch: {
    marginLeft: 20,
    alignSelf: 'flex-end',
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  error: {
    padding: 10,
    backgroundColor: theme.colors.screen.danger,
    color: '#FFF',
    margin: scaleVertical(5),
},
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.screen.base,
  },
  image: {
    resizeMode: 'cover',
    marginBottom: scaleVertical(5),
  },
  container: {
    paddingHorizontal: 18,
    paddingBottom: scaleVertical(50),
    alignItems: 'center',
    flex: -1,
    paddingTop: 5
  },
  header: {
    paddingBottom: scaleVertical(20),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  footer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: scaleVertical(24),
  },
  button: {
    marginHorizontal: 14,
  },
  save: {
    marginVertical: 20,
  },
  textRow: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
}));

const mapStateToProps = state => {
  return {
    login: state.Login,
  };
};

const mapDispatchToProps = {
  userLogin,
  userLoginError,
  rememberMe,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginV1);