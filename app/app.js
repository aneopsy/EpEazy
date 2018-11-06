import React from 'react';
import { View, NetInfo, Dimensions } from 'react-native';
import {
  AppLoading,
  Font,
} from 'expo';
import {
  createDrawerNavigator,
  createStackNavigator,
} from 'react-navigation';
import { Provider, connect } from "react-redux";
import { withRkTheme, RkText } from 'react-native-ui-kitten';
import { PersistGate } from 'redux-persist/integration/react'

import { AppRoutes } from './config/navigation/routesBuilder';
import * as Screens from './screens';
import { bootstrap } from './config/bootstrap';
import track from './config/analytics';
import { data } from './data';
import { store, persistor } from './redux/store'


bootstrap();
data.populateData();
console.ignoredYellowBox = [
  'Warning: Failed prop type: Invalid props.style key `fontSize` supplied to `View`',
  'Warning: Failed prop type: Invalid props.style key `container` supplied to `View`',
  'Warning: Failed prop type: Invalid props.style key `fontSize` supplied to `RkButton`'
];

const { width } = Dimensions.get('window');

const KittenApp = createStackNavigator({
  First: {
    screen: Screens.SplashScreen,
  },
  Login: {
    screen: Screens.LoginV1,
  },
  Loading: {
    screen: Screens.loadingScreen,
  },
  Home: {
    screen: createDrawerNavigator(
      {
        ...AppRoutes,
      },
      {
        contentComponent: (props) => {
          const SideMenu = withRkTheme(Screens.SideMenu);
          return <SideMenu {...props} />;
        },
      },
    ),
  },
}, {
  headerMode: 'none',
  initialRouteName: "First",
});

export default class App extends React.Component {
  state = {
    isLoaded: false,
    isConnected: true,
  };

  componentWillMount() {
    this.loadAssets();
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
 }

  handleConnectivityChange = (isConnected) => {
    this.setState({ isConnected });
  }

  onNavigationStateChange = (previous, current) => {
    const screen = {
      current: this.getCurrentRouteName(current),
      previous: this.getCurrentRouteName(previous),
    };
    if (screen.previous !== screen.current) {
      track(screen.current);
    }
  };

  getCurrentRouteName = (navigation) => {
    const route = navigation.routes[navigation.index];
    return route.routes ? this.getCurrentRouteName(route) : route.routeName;
  };

  loadAssets = async () => {
    await Font.loadAsync({
      fontawesome: require('./assets/fonts/fontawesome.ttf'),
      FontAwesome: require('./assets/fonts/fontawesome.ttf'),
      icomoon: require('./assets/fonts/icomoon.ttf'),
      'Righteous-Regular': require('./assets/fonts/Righteous-Regular.ttf'),
      'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
      'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
      'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    });
    this.setState({ isLoaded: true });
  };

  renderLoading = () => (
    <AppLoading />
  );

  renderNotConnection = () => (
    <View style={{
      backgroundColor: '#b52424',
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      width,
      position: 'absolute',
      top: 30
    }}>
      <RkText rkType='h6' style={{ color: '#fff' }}>No Internet Connection</RkText>
    </View>
  );

  renderApp = () => (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={{ flex: 1 }}>
          <KittenApp onNavigationStateChange={this.onNavigationStateChange} />
        </View>
      </PersistGate>
    </Provider>
  );

  render = () => (this.state.isConnected ? ((this.state.isLoaded ? this.renderApp() : this.renderLoading())) : (this.renderNotConnection()));
}

Expo.registerRootComponent(App);
