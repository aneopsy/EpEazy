import React from "react";
import { FlatList, View, Image, Dimensions } from "react-native";
import { connect } from "react-redux";
import { RkStyleSheet, RkText } from "react-native-ui-kitten";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";

import { getModules, getActivities } from "../../redux/modules/action";

const moment = require("moment");

class Modules extends React.Component {
  static navigationOptions = {
    title: "Modules and activities"
  };

  state = {
    index: 0,
    routes: [
      { key: "modules", title: "Modules" },
      { key: "activities", title: "Activities" }
    ]
  };

  componentDidMount() {
    this.props.getModules();
    this.props.getActivities();
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

  renderModuleItem = ({ item }) => (
    <View style={styles.container}>
      {/* <Avatar
        img={{uri: item.user.picture}}
        rkType='circle'
        style={styles.avatar}
      /> */}
      <View style={styles.content}>
        <View style={styles.mainContent}>
          <View style={styles.text}>
              <RkText rkType="header6">{item.acti_title}</RkText>
          </View>
        </View>
        {this.renderAttachment(item)}
      </View>
    </View>
  );

  renderActivitiesItem = ({ item }) => (
    <View style={styles.container}>
      {/* <Avatar
        img={{uri: item.user.picture}}
        rkType='circle'
        style={styles.avatar}
      /> */}
      <View style={styles.content}>
        <View style={styles.mainContent}>
          <View style={styles.text}>
              <RkText rkType="header6">{item.title}</RkText>
          </View>
        </View>
        {this.renderAttachment(item)}
      </View>
    </View>
  );

  modulesRoute = () =>
    (this.props.modules.length !== 0) ? (
      <FlatList
        style={styles.root}
        data={this.props.modules}
        renderItem={this.renderModuleItem}
        keyExtractor={this.extractItemKey}
      />
    ) : (
      <View style={styles.textContent}>
        <RkText rkType="light" style={styles.paragraph}>No message</RkText>
      </View>
    );

  activitiesRoute = () => 
    (this.props.activities.length !== 0) ? (
      <FlatList
        style={styles.root}
        data={this.props.activities}
        renderItem={this.renderActivitiesItem}
        keyExtractor={this.extractItemKey}
      />
    ) : (
      <View style={styles.textContent}>
        <RkText rkType="light" style={styles.paragraph}>No Alert</RkText>
      </View>
    );


  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          modules: this.modulesRoute,
          activities: this.activitiesRoute
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
    modules: state.Modules.modules,
    activities: state.Modules.activities.items,
  };
};

const mapDispatchToProps = {
  getModules,
  getActivities,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modules);
