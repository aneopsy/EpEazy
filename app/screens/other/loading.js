import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  StatusBar,
} from 'react-native';
import {
  RkText,
  RkTheme,
} from 'react-native-ui-kitten';
import {
  StackActions,
  NavigationActions,
} from 'react-navigation';
import { ProgressBar } from '../../components';
import { KittenTheme } from '../../config/theme';
import { scale, scaleVertical } from '../../utils/scale';
import NavigationType from '../../config/navigation/propTypes';
import { connect } from 'react-redux';
import { getProfile } from '../../redux/profile/reducer';
import { getNotificationMessage, getNotificationAlert, getNotificationComing } from '../../redux/notifications/action';
import { getModules, getActivities } from '../../redux/modules/action'

const delay = 50;

class loadingScreen extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  state = {
    progress: 0,
    load: [
      {f: this.props.getProfile(), r: this.props.profile},
      {f: this.props.getNotificationMessage(), r: this.props.notification.message},
      {f: this.props.getNotificationAlert(), r: this.props.notification.alert},
      {f: this.props.getNotificationComing(), r: this.props.notification.coming},
      {f: this.props.getModules(), r: this.props.modules},
      {f: this.props.getActivities(), r: this.props.activities},

    ]
  }

  componentDidMount() {
    StatusBar.setHidden(true, 'none');
    this.timer = setInterval(this.updateProgress, delay);
    this.state.load.map(f => f.f)
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  updateProgress = () => {
    if (this.props.profile && this.props.notification) {
      clearInterval(this.timer);
      setTimeout(this.onLoaded, delay);
    } else {
      const randProgress = this.state.load.reduce((a, b) => a + (b.r ? 1 : 0), 0) / this.state.load.length
      this.setState({ progress: randProgress > 1 ? 1 : randProgress });
    }
  };

  onLoaded = () => {
    StatusBar.setHidden(false, 'slide');
    const toHome = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    this.props.navigation.dispatch(toHome);
  };

  render = () => (
    <View style={styles.container}>
      <View>
        <Image
          style={[styles.image, { width: Dimensions.get('window').width }]}
          source={require('../../assets/images/splashBack.png')}
        />
        <View style={styles.text}>
          <RkText rkType='light' style={this.props.profile !== undefined ? styles.loaded : styles.hero}>Profile</RkText>
          <RkText rkType='light' style={this.props.profile ? styles.loaded : styles.hero}>Module</RkText>
          <RkText rkType='light' style={this.props.notification.message ? styles.loaded : styles.hero}>Messages</RkText>
          <RkText rkType='light' style={this.props.notification.alert ? styles.loaded : styles.hero}>Alert</RkText>
          <RkText rkType='light' style={this.props.notification.coming ? styles.loaded : styles.hero}>Coming</RkText>
        </View>
      </View>
      <ProgressBar
        color={RkTheme.current.colors.accent}
        style={styles.progress}
        progress={this.state.progress}
        width={scale(320)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: KittenTheme.colors.screen.base,
    justifyContent: 'space-between',
    flex: 1,
  },
  image: {
    resizeMode: 'cover',
    height: scaleVertical(430),
  },
  text: {
    alignItems: 'center',
  },
  hero: {
    fontSize: 18,
    color: RkTheme.current.colors.disabled,
  },
  loaded: {
    fontSize: 18,
    color: RkTheme.current.colors.success,
  },
  progress: {
    alignSelf: 'center',
    marginBottom: 35,
    backgroundColor: '#e5e5e5',
  },
});

const mapStateToProps = state => {
  return {
    profile: state.Profile.profile,
    notification: state.Notifications,
    modules: state.Modules
  };
};

const mapDispatchToProps = {
  getProfile,
  getNotificationMessage,
  getNotificationAlert,
  getNotificationComing,
  getModules,
  getActivities,
};

export default connect(mapStateToProps, mapDispatchToProps)(loadingScreen);