import React from "react";
import { FlatList, View, Image, Dimensions } from "react-native";
import { connect } from "react-redux";
import { RkStyleSheet, RkText } from "react-native-ui-kitten";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";

import { getNotificationMessage } from "../../redux/notifications/action";

const moment = require("moment");

class Notifications extends React.Component {
  static navigationOptions = {
    title: "Notifications"
  };

  state = {
    index: 0,
    routes: [
      { key: "message", title: "Message" },
      { key: "alert", title: "Alert" },
      { key: "coming", title: "Coming" }
    ]
  };

  componentDidMount() {
    this.props.getNotificationMessage();
  }

  extractItemKey = item => `${item.id}`;

  renderAttachment = item => {
    const hasAttachment = item.attach !== undefined;
    return hasAttachment ? (
      <View />
    ) : (
      <Image style={styles.attachment} source={item.attach} />
    );
  };

  renderItem = ({ item }) => (
    <View style={styles.container}>
      {/* <Avatar
        img={{uri: item.user.picture}}
        rkType='circle'
        style={styles.avatar}
      /> */}
      <View style={styles.content}>
        <View style={styles.mainContent}>
          <View style={styles.text}>
            <RkText>
              <RkText rkType="header6">{item.title}</RkText>
            </RkText>
            <RkText>
              <RkText rkType="primary2">{item.content}</RkText>
            </RkText>
          </View>
          <RkText rkType="secondary5 hintColor">{item.date}</RkText>
        </View>
        {this.renderAttachment(item)}
      </View>
    </View>
  );

  messageRoute = () =>
    (this.props.message.length !== 0) ? (
      <FlatList
        style={styles.root}
        data={this.props.message}
        renderItem={this.renderItem}
        keyExtractor={this.extractItemKey}
      />
    ) : (
      <View style={styles.textContent}>
        <RkText rkType="light" style={styles.paragraph}>No message</RkText>
      </View>
    );

  alertRoute = () => 
    (this.props.alert.length !== 0) ? (
      <FlatList
        style={styles.root}
        data={this.props.alert}
        renderItem={this.renderItem}
        keyExtractor={this.extractItemKey}
      />
    ) : (
      <View style={styles.textContent}>
        <RkText rkType="light" style={styles.paragraph}>No Alert</RkText>
      </View>
    );

  comingRoute = () =>
    (this.props.coming.length !== 0) ? (
      <FlatList
        style={styles.root}
        data={this.props.coming}
        renderItem={this.renderItem}
        keyExtractor={this.extractItemKey}
      />
    ) : (
      <View style={styles.textContent}>
        <RkText rkType="light" style={styles.paragraph}>No Coming</RkText>
      </View>
    );

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          message: this.messageRoute,
          alert: this.alertRoute,
          coming: this.comingRoute
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height
        }}
      />
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  paragraph: {
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  root: {
    backgroundColor: theme.colors.screen.base
  },
  container: {
    padding: 16,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base,
    justifyContent: 'flex-start',
  },
  avatar: {
    alignSelf: "center"
  },
  text: {
    marginBottom: 5
  },
  content: {
    flex: 1,
    marginLeft: 15,
    marginRight: 0
  },
  mainContent: {},
  textContent: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  img: {
    height: 50,
    width: 50,
    margin: 0
  },
  attachment: {
    position: "absolute",
    right: 0
  }
}));

const mapStateToProps = state => {
  return {
    message: state.Notifications.message,
    alert: state.Notifications.alert,
    coming: state.Notifications.coming,
  };
};

const mapDispatchToProps = {
  getNotificationMessage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);
