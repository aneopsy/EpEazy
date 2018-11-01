import React from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import {
  RkText,
  RkButton,
  RkStyleSheet,
  RkCard,
} from 'react-native-ui-kitten';
import {
  Avatar,
  Gallery,
} from '../../components';
import { data } from '../../data';
import { FontIcons } from '../../assets/icons';
import formatNumber from '../../utils/textUtils';
import { connect } from 'react-redux';

import { getProfile } from '../../redux/profile/reducer';
import {
  AreaChart,
} from '../../components/';

class ProfileV2 extends React.Component {
  static navigationOptions = {
    title: 'User Profile'.toUpperCase(),
  };

  componentDidMount() {
    this.props.getProfile();
  }

  onNotificationButtonPressed = () => {
    this.props.navigation.navigate('Notifications');
  };

  render = () => (
    <ScrollView style={styles.root}>
      <View style={[styles.header, styles.bordered]}>
        <View style={styles.row}>
          <View style={styles.buttons}>
            <RkButton style={styles.button} rkType='icon circle'>
              <RkText rkType='moon large primary'>{FontIcons.profile}</RkText>
            </RkButton>
          </View>
          <Avatar img={{uri:this.props.profile.picture}} rkType='big' />
          <View style={styles.buttons}>
            <RkButton style={styles.button} rkType='icon circle'>
              <RkText rkType='moon large primary'
                onPress={this.onNotificationButtonPressed}
              >{FontIcons.mail}</RkText>
              
            </RkButton>
          </View>
        </View>
        <View style={styles.section}>
          <RkText rkType='header2'>{`${this.props.profile.firstname} ${this.props.profile.lastname}`}</RkText>
        </View>
      </View>
      <View style={styles.userInfo}>
        <View style={styles.section}>
          <RkText rkType='header3' style={styles.space}>{this.props.profile.credits}</RkText>
          <RkText rkType='secondary1 hintColor'>Spice</RkText>
        </View>
        <View style={styles.section}>
          <RkText rkType='header3' style={styles.space}>{formatNumber(this.props.profile.credits)}</RkText>
          <RkText rkType='secondary1 hintColor'>Credits</RkText>
        </View>
        <View style={styles.section}>
          <RkText rkType='header3' style={styles.space}>{this.props.profile.credits}</RkText>
          <RkText rkType='secondary1 hintColor'>GPA</RkText>
        </View>
      </View>
      <RkCard>
      <View rkCardHeader>
          <RkText rkType='header'>Netsoul Log</RkText>
        </View>
        <View rkCardContent>
          <AreaChart />
        </View>
      </RkCard>
    </ScrollView>
  );
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  header: {
    paddingTop: 25,
    paddingBottom: 17,
  },
  row: {
    flexDirection: 'row',

  },
  userInfo: {
    flexDirection: 'row',
    paddingVertical: 18,
  },
  bordered: {
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base,
  },
  section: {
    flex: 1,
    alignItems: 'center',
  },
  space: {
    marginBottom: 3,
  },
  separator: {
    backgroundColor: theme.colors.border.base,
    alignSelf: 'center',
    flexDirection: 'row',
    flex: 0,
    width: 1,
    height: 42,
  },
  buttons: {
    flex: 1,
  },
  button: {
    marginTop: 27.5,
    alignSelf: 'center',
  },
}));

const mapStateToProps = state => {
  return {
    profile: state.Profile.profile,
  };
};

const mapDispatchToProps = {
  getProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileV2);