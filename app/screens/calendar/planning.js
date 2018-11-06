import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Agenda } from "react-native-calendars";
import { connect } from "react-redux";
import { getPlanning } from "../../redux/planning/action";
import { RkStyleSheet, RkText } from "react-native-ui-kitten";

export class Planning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        renderDay={this.renderDay.bind(this)}
        selected={"2018-11-05"} //new Date().toISOString()}
        renderItem={this.renderItem.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        firstDay={1}
        refreshing={this.props.planning.loading}
      />
    );
  }

  renderEmptyDate() {
    return <View />;
  }

  loadItems(day) {
    const nbrDay = 7;
    this.props
      .getPlanning(
        this.timeToString(day.timestamp),
        this.timeToString(this.addDays(day, nbrDay))
      )
      .then(() => {
        let obj = this.props.planning.planning;
        obj = obj.sort(function(a, b) {
          var aa = a.start.split("-").join(),
            bb = b.start.split("-").join();
          return aa < bb ? -1 : aa > bb ? 1 : 0;
        });
        obj = obj.filter(word => word.semester === 7);
        obj = obj.reduce(function(acc, cur) {
          if (acc[cur.start.slice(0, 10)] === undefined) {
            acc[cur.start.slice(0, 10)] = [];
          }
          acc[cur.start.slice(0, 10)].push(cur);
          return acc;
        }, {});
        for (let i = 0; i < nbrDay; i++) {
          const time = day.timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = this.timeToString(time);
          if (!obj[strTime]) {
            obj[strTime] = [];
          }
        }
        this.setState({
          items: obj
        });
      });
  }

  renderDay(day, item) {
    if (day && item) {
      var a = new Date(day.timestamp * 1000);
      var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      var dayOfWeek = days[a.getDay()];
      return (
        <View
          style={[
            styles.containerHeader,
            { marginTop: 10, borderTopLeftRadius: 20, borderTopWidth: 1 },
            this.state.items[day.dateString].length == 1
              ? { borderBottomLeftRadius: 20 }
              : { borderBottomLeftRadius: 0 }
          ]}
        >
          <RkText
            rkType="header2"
            style={
              this.timeToString(day.timestamp) ==
              new Date().toISOString().split("T")[0]
                ? styles.todayHeader
                : {}
            }
          >
            {day.day}
          </RkText>
          <RkText
            rkType="header5"
            style={
              this.timeToString(day.timestamp) ==
              new Date().toISOString().split("T")[0]
                ? styles.todayHeader
                : {}
            }
          >
            {dayOfWeek}
          </RkText>
        </View>
      );
    } else if (!day && item) {
      return (
        <View
          style={[
            styles.containerHeader,
            this.state.items[item.start.slice(0, 10)].indexOf(item) ==
            this.state.items[item.start.slice(0, 10)].length - 1
              ? { borderBottomLeftRadius: 20 }
              : { borderBottomLeftRadius: 0 }
          ]}
        />
      );
    } else {
      return <View />;
    }
  }

  renderItem(item, firstItemInDay) {
    return (
      <View
        style={[
          styles.container,
          firstItemInDay
            ? {
                marginTop: 10,
                borderTopRightRadius: 20
              }
            : { marginTop: 0 },
          this.state.items[item.start.slice(0, 10)].length == 1 ||
          this.state.items[item.start.slice(0, 10)].indexOf(item) ==
            this.state.items[item.start.slice(0, 10)].length - 1
            ? { borderBottomRightRadius: 20 }
            : { borderBottomRightRadius: 0 }
        ]}
      >
        <RkText rkType="secondary5 hintColor">
          {item.start.slice(11, 16)} - {item.end.slice(11, 16)}
        </RkText>
        <RkText rkType="header6">{item.acti_title}</RkText>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.start == r2.start;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }

  addDays(date, days) {
    const time = date.timestamp + days * 24 * 60 * 60 * 1000;
    return this.timeToString(time);
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    padding: 15,
    flexDirection: "column",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: theme.colors.border.base,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#FFF",
    marginRight: 6
  },
  todayHeader: {
    color: theme.colors.twitter
  },
  containerHeader: {
    width: 60,
    flexDirection: "column",
    borderColor: theme.colors.border.base,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 6,
    backgroundColor: "#FFF"
  }
}));

const mapStateToProps = state => {
  return {
    planning: state.Planning
  };
};

const mapDispatchToProps = {
  getPlanning
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Planning);
